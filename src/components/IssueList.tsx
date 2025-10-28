import { useState } from 'react'
import IssueCard from './IssueCard'
import { Issue } from '@/app/types/issue'

const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Issue 1',
    status: 'open',
    assignee: 'John Doe',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    title: 'Issue 2',
    status: 'closed',
    assignee: 'Jane Doe',
    createdAt: '2023-01-02',
  },
  {
    id: '3',
    title: 'Issue 3',
    status: 'open',
    assignee: 'John Doe',
    createdAt: '2023-01-03',
  },
]

// Data flow: IssueList owns the `issues` state (parent -> child via props).
// IssueCard asks for changes via `onToggleStatus` (child -> parent callback).
// IssueList updates state immutably and re-renders, pushing updated props back down.
export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES)

  const handleToggleStatus = (id: string) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, status: issue.status === 'open' ? 'closed' : 'open' } : issue))
    )
  }

  return (
    <ul>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onToggleStatus={handleToggleStatus} />
      ))}
    </ul>
  )
}
