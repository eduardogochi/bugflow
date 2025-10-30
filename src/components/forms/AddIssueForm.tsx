'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema, type IssueInput } from '@/lib/validation/issues'
import { Snackbar, Alert } from '@mui/material'

export default function AddIssueForm() {
  const qc = useQueryClient()
  const [isSubmittingSuccessful, setIsSubmittingSuccessful] = useState(false)
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
    mode: 'onBlur',
    defaultValues: { status: 'new', assignee: '' },
  })

  const onSubmit = async (data: IssueInput) => {
    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const body = await res.json().catch(() => ({}))

    if (!res.ok) {
      const fieldErrors = body?.issues?.fieldErrors
      const formErrors = body?.issues?.formErrors

      if (fieldErrors && typeof fieldErrors === 'object') {
        Object.entries(fieldErrors).forEach(([name, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : String(messages)
          setError(name as keyof IssueInput, { type: 'server', message })
        })
      }

      if (Array.isArray(formErrors) && formErrors.length > 0) {
        setError('_form', { type: 'server', message: formErrors[0] })
      } else if (body?.error || body?.detail) {
        const msg = [body?.error, body?.detail].filter(Boolean).join(': ')
        setError('_form', { type: 'server', message: msg })
      }

      setSnack({
        open: true,
        message: body?.detail || body?.error || 'Failed to create issue',
        severity: 'error',
      })
      return
    }
    qc.invalidateQueries({ queryKey: ['issues'] })
    reset()
    setSnack({
      open: true,
      message: 'Issue created successfully',
      severity: 'success',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('_form')} />
      {errors._form?.message && <p className="text-red-600 text-sm">{errors._form.message}</p>}
      <div>
        <label className="block text-sm font-medium text-slate-800">Title</label>
        <input
          {...register('title')}
          className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Short Summary"
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">Description</label>
        <textarea
          {...register('description')}
          className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What happened?"
          rows={4}
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">Status</label>
        <select
          {...register('status')}
          className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="in-review">In Review</option>
          <option value="testing">Testing</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && <p className="text-red-600 text-sm">{String(errors.status.message)}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">Assignee (optional)</label>
        <input
          {...register('assignee')}
          className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="username or email"
        />
        {errors.assignee && <p className="text-red-600 text-sm">{errors.assignee.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 mb-4 bg-black text-white rounded disabled:opacity-60"
      >
        {isSubmitting ? 'Creating...' : 'Create Issue'}
      </button>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return
          setSnack((s) => ({ ...s, open: false }))
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </form>
  )
}
