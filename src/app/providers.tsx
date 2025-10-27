'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@/theme/theme'
import EmotionRegistry from './emotion/registry'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  )
}
