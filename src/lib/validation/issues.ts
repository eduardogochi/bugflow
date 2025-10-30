import { z } from 'zod'

export const statusValues = ['new', 'open', 'in-progress', 'in-review', 'testing', 'resolved', 'closed'] as const

export const issueSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  status: z.enum(statusValues).default('new'),
  assignee: z
    .string()
    .trim()
    .transform((v) => (v === '' ? undefined : v))
    .optional(),
  _form: z.string().optional(), // virtual for global form errors
})

export type IssueInput = z.input<typeof issueSchema>
