export type Issue = {
  id: string
  title: string
  status: 'open' | 'closed'
  assignee?: string
  createdAt: string
}
