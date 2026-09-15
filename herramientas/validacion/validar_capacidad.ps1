param(
    [ValidateSet('validar', 'empaquetar')]
    [string]$Operacion = 'validar',
    [string]$Capacidad = (Join-Path $PSScriptRoot '..\..\redsocial'),
    [string]$Destino = (Join-Path $PSScriptRoot '..\..\_validacion'),
    [string]$Centro = 'C:\Codeplex\ValidadorCapacidades\centro_capacidades.exe',
    [int]$MinutosLimite = 5,
    [switch]$ConservarAnteriores
)

$ErrorActionPreference = 'Stop'

function Extraer-ObjetoJson([string]$texto) {
    $inicio = $texto.IndexOf('{')
    while ($inicio -ge 0) {
        $profundidad = 0
        $enCadena = $false
        $escapado = $false
        for ($i = $inicio; $i -lt $texto.Length; $i++) {
            $c = $texto[$i]
            if ($escapado) { $escapado = $false; continue }
            if ($c -eq '\') { $escapado = $true; continue }
            if ($c -eq '"') { $enCadena = -not $enCadena; continue }
            if ($enCadena) { continue }
            if ($c -eq '{') { $profundidad++ }
            if ($c -eq '}') {
                $profundidad--
                if ($profundidad -eq 0) {
                    $candidato = $texto.Substring($inicio, $i - $inicio + 1)
                    try {
                        $objeto = $candidato | ConvertFrom-Json
                        if ($objeto.PSObject.Properties.Name -contains 'operacion') { return $objeto }
                    } catch { }
                    break
                }
            }
        }
        $inicio = $texto.IndexOf('{', $inicio + 1)
    }
    return $null
}

function Partes-Detalle([string]$detalle, [string]$raizCopia) {
    $partes = @($detalle -split '\s*\|\s*')
    $archivo = ''
    $motivo = '(sin detalle adicional)'
    if ($partes.Count -ge 2) { $archivo = $partes[1] }
    if ($partes.Count -ge 3) { $motivo = ($partes[2..($partes.Count - 1)] -join ' | ') }
    $relativo = $archivo -replace '\\', '/'
    $prefijo = (($raizCopia -replace '\\', '/').TrimEnd('/')) + '/'
    if ($relativo.StartsWith($prefijo, [System.StringComparison]::OrdinalIgnoreCase)) {
        $relativo = $relativo.Substring($prefijo.Length)
    }
    return [pscustomobject]@{ Archivo = $relativo; Motivo = $motivo }
}

if (-not (Test-Path $Centro)) { throw "No se encontro el Centro de Capacidades en $Centro" }
if (-not (Test-Path $Capacidad)) { throw "No existe la carpeta de la capacidad: $Capacidad" }

$capacidadResuelta = (Resolve-Path $Capacidad).Path
$nombreCapacidad = Split-Path $capacidadResuelta -Leaf
if (-not (Test-Path (Join-Path $capacidadResuelta 'manifiesto-capacidad.json'))) {
    throw "La carpeta $capacidadResuelta no tiene manifiesto-capacidad.json: no es la raiz de una capacidad"
}

New-Item -ItemType Directory -Force -Path $Destino | Out-Null
$destinoResuelto = (Resolve-Path $Destino).Path
if (-not $ConservarAnteriores) {
    Get-ChildItem -Path $destinoResuelto -Directory |
        Where-Object { $_.Name -match '^\d{8}_\d{6}$' } |
        Remove-Item -Recurse -Force
}

$marcaTiempo = Get-Date -Format 'yyyyMMdd_HHmmss'
$trabajo = Join-Path $destinoResuelto $marcaTiempo
$copia = Join-Path $trabajo $nombreCapacidad
New-Item -ItemType Directory -Force -Path $copia | Out-Null

& robocopy $capacidadResuelta $copia /E /XD node_modules dist .vite .git /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy fallo con codigo $LASTEXITCODE" }

if ($Operacion -eq 'validar') {
    $respuestas = @('2', $copia, 'n', '', '7')
} else {
    $respuestas = @('4', $copia, '', 'n', '', '7')
}

$utf8SinBom = New-Object System.Text.UTF8Encoding($false)
$entrada = Join-Path $trabajo 'entrada.txt'
[System.IO.File]::WriteAllText($entrada, (($respuestas -join "`r`n") + "`r`n"), $utf8SinBom)
$salidaEstandar = Join-Path $trabajo 'salida_estandar.txt'
$salidaErrores = Join-Path $trabajo 'salida_errores.txt'

$proceso = Start-Process -FilePath $Centro -WorkingDirectory (Split-Path $Centro) `
    -RedirectStandardInput $entrada -RedirectStandardOutput $salidaEstandar -RedirectStandardError $salidaErrores `
    -NoNewWindow -PassThru

if (-not $proceso.WaitForExit($MinutosLimite * 60 * 1000)) {
    Stop-Process -Id $proceso.Id -Force
    throw "El Centro no termino en $MinutosLimite minutos: revise que las respuestas del menu no hayan cambiado"
}

$texto = [System.IO.File]::ReadAllText($salidaEstandar, [System.Text.Encoding]::UTF8)
if (Test-Path $salidaErrores) { $texto += [System.IO.File]::ReadAllText($salidaErrores, [System.Text.Encoding]::UTF8) }
[System.IO.File]::WriteAllText((Join-Path $trabajo 'salida_completa.txt'), $texto, $utf8SinBom)

$resultado = Extraer-ObjetoJson $texto
if ($null -eq $resultado) {
    Write-Host "No se encontro el JSON de resultado. Revise $trabajo\salida_completa.txt" -ForegroundColor Red
    exit 2
}
[System.IO.File]::WriteAllText((Join-Path $trabajo 'resultado.json'), ($resultado | ConvertTo-Json -Depth 20), $utf8SinBom)

$errores = @()
if ($resultado.PSObject.Properties.Name -contains 'errores' -and $resultado.errores) { $errores = @($resultado.errores) }
elseif ($resultado.PSObject.Properties.Name -contains 'error' -and $resultado.error) { $errores = @($resultado.error) }

$filas = foreach ($e in $errores) {
    $partes = Partes-Detalle $e.detalle $copia
    [pscustomobject]@{ Codigo = $e.codigo; Archivo = $partes.Archivo; Motivo = $partes.Motivo }
}

$lineas = New-Object System.Collections.Generic.List[string]
$lineas.Add("Operacion: $Operacion")
$lineas.Add("Capacidad: $capacidadResuelta")
$lineas.Add("Copia validada: $copia")
$lineas.Add("Correcto: $($resultado.correcto)")
$lineas.Add("Errores: $($errores.Count)")
if ($resultado.PSObject.Properties.Name -contains 'datos' -and $resultado.datos -and $resultado.datos.ruta_zip) {
    $lineas.Add("Zip: $($resultado.datos.ruta_zip)")
}

if ($errores.Count -gt 0) {
    $lineas.Add('')
    $lineas.Add('== Por codigo ==')
    $filas | Group-Object Codigo | Sort-Object Count -Descending | ForEach-Object { $lineas.Add(('{0,5}  {1}' -f $_.Count, $_.Name)) }
    $lineas.Add('')
    $lineas.Add('== Por motivo ==')
    $filas | Group-Object Motivo | Sort-Object Count -Descending | ForEach-Object { $lineas.Add(('{0,5}  {1}' -f $_.Count, $_.Name)) }
    $lineas.Add('')
    $lineas.Add('== Detalle ==')
    $n = 0
    foreach ($f in $filas) {
        $n++
        $lineas.Add(('{0,3}. {1}' -f $n, $f.Codigo))
        $lineas.Add("     archivo: $($f.Archivo)")
        $lineas.Add("     motivo:  $($f.Motivo)")
    }
}

[System.IO.File]::WriteAllLines((Join-Path $trabajo 'resumen.txt'), $lineas, $utf8SinBom)
$lineas | ForEach-Object { Write-Host $_ }
Write-Host ''
Write-Host "Archivos de esta ejecucion: $trabajo" -ForegroundColor Cyan

if ($resultado.correcto -eq $true) { exit 0 }
exit 1
