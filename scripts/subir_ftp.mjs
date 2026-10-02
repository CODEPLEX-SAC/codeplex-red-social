import { readFileSync, existsSync } from 'node:fs'
import { Client } from 'basic-ftp'

const archivoEnv = '.env.ftp'
if (!existsSync(archivoEnv)) {
  console.error(`Falta ${archivoEnv} (FTP_HOST, FTP_USER, FTP_PASSWORD).`)
  process.exit(1)
}

const env = Object.fromEntries(
  readFileSync(archivoEnv, 'utf8')
    .split(/\r?\n/)
    .filter((linea) => linea.includes('=') && !linea.startsWith('#'))
    .map((linea) => {
      const i = linea.indexOf('=')
      return [linea.slice(0, i).trim(), linea.slice(i + 1).trim()]
    }),
)

const cliente = new Client()
try {
  await cliente.access({
    host: env.FTP_HOST,
    port: Number(env.FTP_PORT || 21),
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  })
  await cliente.cd(env.FTP_DIR || '/')
  await cliente.ensureDir('assets')
  await cliente.clearWorkingDir()
  await cliente.cd(env.FTP_DIR || '/')
  await cliente.uploadFromDir('dist')
  console.log('Subida completa.')
} finally {
  cliente.close()
}
