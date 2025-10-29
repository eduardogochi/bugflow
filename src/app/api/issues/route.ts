import { issues } from '@/lib/mockIssues'
import { NextResponse } from 'next/server'
import { issueSchema } from '@/lib/validation/issues'

export async function GET() {
  return NextResponse.json(issues)
}

export async function POST(req: Request) {
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
  const created = { id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() }

  return NextResponse.json(created, { status: 201 })
}
