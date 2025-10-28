'use client'

import { useQuery } from '@tanstack/react-query'
import IssueCard from './IssueCard'
import { Issue } from '@/app/types/issue'

// Data flow: IssueList owns the `issues` state (parent -> child via props).
// IssueCard asks for changes via `onToggleStatus` (child -> parent callback).
// IssueList updates state immutably and re-renders, pushing updated props back down.
export default function IssueList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const res = await fetch('/api/issues', { cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Failed to fetch issues${res.status}`)
      }
      return (await res.json()) as Issue[]
    },
    staleTime: 60 * 1000,
    retry: 2,
  })

  if (isError) {
    return (
      <div>
        Failed to load issues. <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading issues...</div>
  }

  if (!data || data.length === 0) {
    return <div>No issues found</div>
  }

  return (
    <ul>
      {data.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onToggleStatus={() => refetch()} />
      ))}
    </ul>
  )
}
