import argparse
import pathlib
import re
import struct
import subprocess
import sys
import tempfile

RUTA_CENTRO = "C:/Codeplex/ValidadorCapacidades/centro_capacidades.exe"
PAQUETE = "plataforma/descubrimiento\\."


def argumentos():
    lector = argparse.ArgumentParser(description="Lee del binario del Centro de Capacidades las reglas que mide el validador.")
    lector.add_argument("--centro", default=RUTA_CENTRO, help="ruta de centro_capacidades.exe")
    lector.add_argument("--patrones", action="store_true", help="lista las expresiones regulares que usan las reglas")
    lector.add_argument("--buscar", metavar="TEXTO", help="muestra la funcion que emite un mensaje y los textos que usa")
    lector.add_argument("--funcion", metavar="NOMBRE", help="muestra los textos y llamadas de una funcion por su nombre")
    return lector.parse_args()


def ejecutar(orden, carpeta):
    resultado = subprocess.run(orden, capture_output=True, text=True, cwd=carpeta, encoding="utf-8", errors="replace")
    if resultado.returncode != 0:
        sys.exit("No se pudo ejecutar " + " ".join(orden) + ". Se necesita Go instalado y en el PATH.\n" + resultado.stderr[:400])
    return resultado.stdout


class Binario:
    def __init__(self, ruta):
        self.ruta = pathlib.Path(ruta)
        self.datos = self.ruta.read_bytes()
        pe = struct.unpack_from("<I", self.datos, 0x3C)[0]
        secciones = struct.unpack_from("<H", self.datos, pe + 6)[0]
        opcional = struct.unpack_from("<H", self.datos, pe + 20)[0]
        self.base_imagen = struct.unpack_from("<Q", self.datos, pe + 48)[0]
        tabla = pe + 24 + opcional
        self.secciones = [struct.unpack_from("<8sIIII", self.datos, tabla + 40 * i) for i in range(secciones)]
        simbolos = ejecutar(["go", "tool", "nm", str(self.ruta)], str(self.ruta.parent))
        self.base_cadenas = int([l.split()[0] for l in simbolos.splitlines() if l.split()[-1:] == ["go:string.*"]][0], 16)

    def desplazamiento(self, direccion):
        relativa = direccion - self.base_imagen
        for _, tamano_virtual, virtual, tamano_crudo, crudo in self.secciones:
            if virtual <= relativa < virtual + max(tamano_virtual, tamano_crudo):
                return relativa - virtual + crudo
        return None

    def cadena(self, posicion, largo):
        inicio = self.desplazamiento(self.base_cadenas + posicion)
        if inicio is None or largo is None or largo <= 0 or largo > 512:
            return None
        return self.datos[inicio:inicio + largo].decode("utf-8", "replace")

    def posiciones_de_texto(self, texto):
        objetivo = texto.encode("utf-8")
        encontradas = []
        indice = self.datos.find(objetivo)
        while indice != -1:
            for _, tamano_virtual, virtual, tamano_crudo, crudo in self.secciones:
                if crudo <= indice < crudo + tamano_crudo:
                    direccion = self.base_imagen + virtual + (indice - crudo)
                    encontradas.append(direccion - self.base_cadenas)
            indice = self.datos.find(objetivo, indice + 1)
        return encontradas


def volcar_funciones(binario):
    destino = pathlib.Path(tempfile.gettempdir()) / "volcado_descubrimiento.txt"
    texto = ejecutar(["go", "tool", "objdump", "-s", PAQUETE, str(binario.ruta)], str(binario.ruta.parent))
    destino.write_text(texto, encoding="utf-8")
    funciones = {}
    actual = None
    for linea in texto.splitlines():
        if linea.startswith("TEXT "):
            actual = linea.split()[1].split("descubrimiento.")[-1].split("(")[0]
            funciones[actual] = []
            continue
        if actual is None:
            continue
        campos = [c.strip() for c in linea.split("\t") if c.strip()]
        if len(campos) >= 2:
            funciones[actual].append((campos[0], campos[-1]))
    return funciones


def inmediato(instruccion):
    coincidencia = re.search(r"MOV[LQ] \$0x([0-9a-f]+), ", instruccion)
    return int(coincidencia.group(1), 16) if coincidencia else None


BLOQUES_POR_LARGO = {}


def aprender_bloques(funciones):
    for instrucciones in funciones.values():
        for i, (_, instruccion) in enumerate(instrucciones[:-1]):
            cadena = re.search(r"go:string\.\*\+(\d+)\(SB\)", instruccion)
            largo = re.match(r"MOVL \$0x([0-9a-f]+), (BX|DI|SI|CX)$", instrucciones[i + 1][1])
            if cadena and largo:
                posicion, n = int(cadena.group(1)), int(largo.group(1), 16)
                minimo, maximo = BLOQUES_POR_LARGO.get(n, (posicion, posicion))
                BLOQUES_POR_LARGO[n] = (min(minimo, posicion), max(maximo, posicion))


def largo_en_bloque(posicion, candidatos):
    for n in candidatos:
        if n and n in BLOQUES_POR_LARGO and BLOQUES_POR_LARGO[n][0] <= posicion <= BLOQUES_POR_LARGO[n][1] + n:
            return n
    return None


def lecturas(binario, instrucciones):
    salida = []
    for i, (origen, instruccion) in enumerate(instrucciones):
        cadena = re.search(r"go:string\.\*\+(\d+)\(SB\)", instruccion)
        if cadena:
            posicion = int(cadena.group(1))
            despues = next((inmediato(x) for _, x in instrucciones[i + 1:i + 4] if inmediato(x)), None)
            antes = next((inmediato(x) for _, x in reversed(instrucciones[max(0, i - 3):i]) if inmediato(x)), None)
            elegido = largo_en_bloque(posicion, [despues, antes]) or despues
            otro = antes if elegido == despues else despues
            lectura = binario.cadena(posicion, elegido)
            alterna = binario.cadena(posicion, otro) if otro and otro != elegido and largo_en_bloque(posicion, [elegido]) is None else None
            salida.append((origen, "texto", posicion, lectura, alterna))
        llamada = re.search(r"CALL ([^\s(]+)", instruccion)
        if llamada:
            salida.append((origen, "llama", None, llamada.group(1).split("/")[-1], None))
        referencia = re.search(r"descubrimiento\.(patron\w+)\(SB\)", instruccion)
        if referencia and "CALL" not in instruccion:
            salida.append((origen, "usa", None, referencia.group(1), None))
    return salida


def imprimir_funcion(binario, nombre, instrucciones):
    print(f"\n######## {nombre} ########")
    vistos = set()
    for origen, tipo, _, valor, alterna in lecturas(binario, instrucciones):
        if tipo == "llama" and not any(x in valor for x in ("descubrimiento", "regexp", "strings", "filepath", "json", "os.")):
            continue
        clave = (origen, tipo, valor, alterna)
        if clave in vistos:
            continue
        vistos.add(clave)
        extra = f"   (lectura alterna: {alterna!r})" if alterna else ""
        print(f"  {origen:40} {tipo:6} {valor!r}{extra}")


def main():
    opciones = argumentos()
    binario = Binario(opciones.centro)
    funciones = volcar_funciones(binario)
    aprender_bloques(funciones)

    if opciones.patrones:
        print("######## expresiones regulares de las reglas ########")
        vistos = set()
        ultima = None
        for _, tipo, _, valor, _ in lecturas(binario, funciones.get("init", [])):
            if tipo == "texto" and valor:
                ultima = valor
            if tipo == "usa" and valor not in vistos:
                vistos.add(valor)
                print(f"{valor:36} = {ultima!r}")

    if opciones.buscar:
        posiciones = set()
        for base in binario.posiciones_de_texto(opciones.buscar):
            posiciones.update(range(base - 8, base + 1))
        duenas = [n for n, ins in funciones.items() if any(p in posiciones for _, t, p, _, _ in lecturas(binario, ins) if t == "texto")]
        if not duenas:
            print("Ninguna funcion usa ese texto. Pruebe con un fragmento mas corto del mensaje.")
        for nombre in duenas:
            imprimir_funcion(binario, nombre, funciones[nombre])

    if opciones.funcion:
        coincidentes = [n for n in funciones if opciones.funcion in n]
        for nombre in coincidentes:
            imprimir_funcion(binario, nombre, funciones[nombre])

    if not (opciones.patrones or opciones.buscar or opciones.funcion):
        print("Indique --patrones, --buscar \"texto del mensaje\" o --funcion NOMBRE. Funciones disponibles:")
        for nombre in sorted(funciones):
            print("  ", nombre)


if __name__ == "__main__":
    main()
