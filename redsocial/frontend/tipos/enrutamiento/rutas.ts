import type { ReactNode } from 'react'

export interface RutaApp {
  path: string
  archivo: string
  render: () => ReactNode
}
