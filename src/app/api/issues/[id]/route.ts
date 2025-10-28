import { issues } from '@/lib/mockIssues'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const numericId = Number(id)
  const issue = issues.find((issue) => issue.id === numericId)
  if (!issue) {
    return Response.json({ error: 'Issue not found' }, { status: 404 })
  }
  return Response.json(issue, { status: 200 })
}
