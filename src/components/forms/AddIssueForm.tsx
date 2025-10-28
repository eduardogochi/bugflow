'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema, type IssueInput } from '@/lib/validation/issues'

export default function AddIssueForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
    mode: 'onSubmit',
  })

  const onSubmit = async (data: IssueInput) => {
    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`Failed to create issue${res.status}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input {...register('title')} className="w-full border rounded px-3 py-2" placeholder="Short Summary" />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register('description')}
          className="w-full border rounded px-3 py-2"
          placeholder="What happened?"
          rows={4}
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 mb-4 bg-black text-white rounded disabled:opacity-60"
      >
        {isSubmitting ? 'Creating...' : 'Create Issue'}
      </button>
    </form>
  )
}
