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

export default function IssueList() {
  return (
    <ul>
      {MOCK_ISSUES.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </ul>
  )
}
