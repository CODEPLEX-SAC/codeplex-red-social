import { createContext } from 'react'
import type { UsuarioDirectorio } from '@/tipos/compartido/contrato_directorio_usuarios'

export const ContextoDirectorioUsuarios = createContext<readonly UsuarioDirectorio[]>([])
