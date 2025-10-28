import type { Issue } from './IssueList'

type IssueCardProps = {
  issue: Issue
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <div style={{ fontWeight: 600 }}>{issue.title}</div>
      <div style={{ fontSize: 12, color: '#666' }}>
        Status:{issue.status} | Assignee:{issue.assignee ?? 'Unassigned'}
      </div>
      <div style={{ fontSize: 12, color: '#999' }}>Created: {issue.createdAt}</div>
    </div>
  )
}
