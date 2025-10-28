'use client'

import { useState, useEffect } from 'react'
import IssueCard from './IssueCard'
import { Issue } from '@/app/types/issue'

// Data flow: IssueList owns the `issues` state (parent -> child via props).
// IssueCard asks for changes via `onToggleStatus` (child -> parent callback).
// IssueList updates state immutably and re-renders, pushing updated props back down.
export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        setError(null)
        setLoading(true)
        const res = await fetch('/api/issues', { signal: ac.signal, cache: 'no-store' })

        if (!res.ok) {
          throw new Error(`Failed to fetch issues${res.status}`)
        }

        const data: Issue[] = await res.json()
        setIssues(data)
      } catch (error: any) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    })()
    return () => ac.abort()
  }, [])

  const handleToggleStatus = (id: string) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, status: issue.status === 'open' ? 'closed' : 'open' } : issue))
    )
  }

  if (error) {
    return (
      <div>
        Failed to load issues. <button>Retry</button>
      </div>
    )
  }

  if (loading) {
    return <div>Loading issues...</div>
  }

  if (issues.length === 0) {
    return <div>No issues found</div>
  }

  return (
    <ul>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onToggleStatus={handleToggleStatus} />
      ))}
    </ul>
  )
}
