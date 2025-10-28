import type { Issue } from '@/app/types/issue'
import { Button } from '@mui/material'

type IssueCardProps = {
  issue: Issue
  onToggleStatus: (id: string) => void
}

// This component is stateless: it receives `issue` via props and calls `onToggleStatus(issue.id)`
// to request changes from the parent, keeping a single source of truth in IssueList.
export default function IssueCard({ issue, onToggleStatus }: IssueCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <div style={{ fontWeight: 600, color: issue.status === 'open' ? 'red' : 'green' }}>{issue.title}</div>
      <div style={{ fontSize: 12, color: '#666' }}>
        Status:{issue.status} | Assignee:{issue.assignee ?? 'Unassigned'}
      </div>
      <div style={{ fontSize: 12, color: '#999' }}>Created: {issue.createdAt}</div>
      <Button variant="contained" onClick={() => onToggleStatus(issue.id)} style={{ marginTop: 8 }}>
        Toggle Status
      </Button>
    </div>
  )
}
