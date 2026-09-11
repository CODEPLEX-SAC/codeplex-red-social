import type { ReactNode } from 'react'

export type InsigniaProps =
  | { variant: 'counter'; children: ReactNode }
  | { variant: 'status'; color: string; background: string; children: ReactNode }
  | { variant: 'privacy'; tone: 'publico' | 'privado'; children: ReactNode }
  | { variant: 'privateTag'; children: ReactNode }
