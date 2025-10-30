enum Status {
  New = 'new',
  Open = 'open',
  InProgress = 'in-progress',
  InReview = 'in-review',
  Testing = 'testing',
  Resolved = 'resolved',
  Closed = 'closed',
}

export type Issue = {
  id: string
  title: string
  description: string
  status: Status
  assignee?: string
  createdAt: string
  updatedAt: string
}
