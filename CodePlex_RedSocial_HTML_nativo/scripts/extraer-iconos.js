#!/usr/bin/env node
/**
 * Script: extraer-iconos.js
 * Extrae todos los SVG inline únicos de las páginas HTML y genera un reporte.
 * Utilidad de mantenimiento para verificar el estado del sistema de iconos.
 */

const fs = require('fs');
const path = require('path');

const PAGINAS_DIR = path.join(__dirname, '..', 'paginas');
const ICONOS_DIR = path.join(__dirname, '..', 'iconos');

const archivosHTML = fs.readdirSync(PAGINAS_DIR)
  .filter(f => f.endsWith('.html'))
  .sort();

const svgUnicos = new Map();

for (const archivo of archivosHTML) {
  const ruta = path.join(PAGINAS_DIR, archivo);
  const contenido = fs.readFileSync(ruta, 'utf-8');

  // Buscar SVGs inline CON contenido real (no <use>)
  const regex = /<svg\s+class="icono[^"]*"\s+viewBox="0 0 24 24"[^>]*>(?!<use)([\s\S]*?)<\/svg>/g;
  let coincidencia;

  while ((coincidencia = regex.exec(contenido)) !== null) {
    const svgNormalizado = coincidencia[0].replace(/\s+/g, ' ').trim();
    if (!svgUnicos.has(svgNormalizado)) {
      svgUnicos.set(svgNormalizado, { svg: coincidencia[0], paginas: [] });
    }
    svgUnicos.get(svgNormalizado).paginas.push(archivo);
  }

  // Contar referencias <use>
  const regexUse = /<use href="[^"]*">/g;
  let countUse = 0;
  while (regexUse.exec(contenido)) countUse++;

  if (countUse > 0) {
    // OK - página usando el sistema de iconos
  }
}

const iconosExistentes = fs.readdirSync(ICONOS_DIR)
  .filter(f => f.endsWith('.svg'))
  .map(f => f.replace('.svg', ''));

console.log('=== REPORTE DEL SISTEMA DE ICONOS ===\n');
console.log(`Páginas analizadas: ${archivosHTML.length}`);
console.log(`Iconos en iconos/: ${iconosExistentes.length}`);
console.log(`SVGs inline restantes: ${svgUnicos.size}`);

if (svgUnicos.size > 0) {
  console.log('\n⚠️  SVGs inline pendientes de migrar:');
  for (const [svg, datos] of svgUnicos) {
    console.log(`  - ${datos.paginas.join(', ')}`);
    console.log(`    ${svg.substring(0, 100)}...`);
  }
} else {
  console.log('\n✅ Todas las páginas usan el sistema de iconos <use>');
}

console.log('\nIconos disponibles:', iconosExistentes.join(', '));
