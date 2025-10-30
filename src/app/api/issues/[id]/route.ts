import prisma from '@/lib/prisma'

const toClientStatus = (db: string) => {
  switch (db) {
    case 'New':
      return 'new'
    case 'Open':
      return 'open'
    case 'InProgress':
      return 'in-progress'
    case 'InReview':
      return 'in-review'
    case 'Testing':
      return 'testing'
    case 'Resolved':
      return 'resolved'
    case 'Closed':
      return 'closed'
    default:
      return 'new'
  }
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const r = await prisma.issue.findUnique({ where: { id } })
  if (!r) {
    return Response.json({ error: 'Issue not found' }, { status: 404 })
  }
  const issue = {
    id: r.id,
    title: r.title,
    description: r.description,
    status: toClientStatus(r.status),
    assignee: r.assignee ?? undefined,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }
  return Response.json(issue, { status: 200 })
}
