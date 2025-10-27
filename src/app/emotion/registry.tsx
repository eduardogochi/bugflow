'use client'

import * as React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'css', prepend: true })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []

    cache.insert = (...args: any[]) => {
      const serialized = args[1] as { name: string }
      if (!cache.inserted[serialized.name]) {
        inserted.push(serialized.name)
      }
      // Forward all args to the original insert
      // @ts-ignore
      return prevInsert(...args)
    }

    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null

    let styles = ''
    for (const name of names) {
      // cache.inserted holds the CSS text by name
      styles += (cache.inserted as any)[name]
    }

    return <style data-emotion={`${cache.key} ${names.join(' ')}`} dangerouslySetInnerHTML={{ __html: styles }} />
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
