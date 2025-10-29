import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  _form: z.string().optional(), // virtual for global form errors
})

export type IssueInput = z.infer<typeof issueSchema>
