import { issues } from '@/lib/mockIssues'

export async function GET() {
  return new Response(JSON.stringify(issues))
}
