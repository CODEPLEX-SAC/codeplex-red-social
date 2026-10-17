import { Workbook } from 'exceljs'
import { vi } from 'vitest'

export function interceptarDescargas() {
  const blobs: Blob[] = []
  const nombres: string[] = []
  URL.createObjectURL = vi.fn((blob: Blob) => {
    blobs.push(blob)
    return 'blob:prueba'
  })
  URL.revokeObjectURL = vi.fn()
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    nombres.push(this.download)
  })
  return { blobs, nombres }
}

export async function leerExcel(contenido: ArrayBuffer | Blob) {
  const buffer = contenido instanceof Blob ? await contenido.arrayBuffer() : contenido
  const libro = new Workbook()
  await libro.xlsx.load(buffer)
  return libro
}

export function bytesComoTexto(contenido: ArrayBuffer): string {
  return new TextDecoder('latin1').decode(new Uint8Array(contenido))
}

export function paginasDelPdf(contenido: ArrayBuffer): number {
  const bruto = bytesComoTexto(contenido)
  return Number(bruto.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/)?.[1] ?? bruto.match(/\/Count\s+(\d+)/)?.[1])
}
