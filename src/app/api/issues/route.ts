import { NextResponse } from 'next/server'
import { issueSchema } from '@/lib/validation/issues'
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

const toDbStatus = (client: string) => {
  switch (client) {
    case 'new':
      return 'New'
    case 'open':
      return 'Open'
    case 'in-progress':
      return 'InProgress'
    case 'in-review':
      return 'InReview'
    case 'testing':
      return 'Testing'
    case 'resolved':
      return 'Resolved'
    case 'closed':
      return 'Closed'
    default:
      return 'New'
  }
}

export async function GET() {
  try {
    const rows = await prisma.issue.findMany({ orderBy: { createdAt: 'desc' } })
    const data = rows.map(
      (r: {
        id: string
        title: string
        description: string
        status: string
        assignee: string | null
        createdAt: Date
        updatedAt: Date
      }) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        status: toClientStatus(r.status),
        assignee: r.assignee ?? undefined,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })
    )
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch issues', detail: e?.message ?? String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = issueSchema.safeParse(json)
    if (!parsed.success) {
      const issues = parsed.error?.flatten((issue) => issue.message)
      return NextResponse.json(
        {
          error: 'Invalid input',
          issues,
        },
        { status: 400 }
      )
    }
    const data = parsed.data
    const created = await prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
        status: toDbStatus(data.status ?? 'new'),
        assignee: data.assignee ?? null,
      },
    })

    const payload = {
      id: created.id,
      title: created.title,
      description: created.description,
      status: toClientStatus(created.status),
      assignee: created.assignee ?? undefined,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    }

    return NextResponse.json(payload, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create issue', detail: e?.message ?? String(e) }, { status: 500 })
  }
}
