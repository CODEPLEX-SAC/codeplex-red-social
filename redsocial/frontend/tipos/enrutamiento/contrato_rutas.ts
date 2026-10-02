import type { ReactNode } from 'react'

export interface RutaApp {
  path: string
  render: () => ReactNode
}
