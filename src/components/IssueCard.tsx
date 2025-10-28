import { useState } from 'react'
import type { Issue } from '@/app/types/issue'
import { Button } from '@mui/material'

type IssueCardProps = {
  issue: Issue
}

export default function IssueCard({ issue }: IssueCardProps) {
  const [status, setStatus] = useState<Issue['status']>(issue.status)

  const handleToggle = () => {
    setStatus((prev) => (prev === 'open' ? 'closed' : 'open'))
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <div style={{ fontWeight: 600, color: status === 'open' ? 'red' : 'green' }}>{issue.title}</div>
      <div style={{ fontSize: 12, color: '#666' }}>
        Status:{status} | Assignee:{issue.assignee ?? 'Unassigned'}
      </div>
      <div style={{ fontSize: 12, color: '#999' }}>Created: {issue.createdAt}</div>
      <Button variant="contained" onClick={handleToggle} style={{ marginTop: 8 }}>
        Toggle Status
      </Button>
    </div>
  )
}
