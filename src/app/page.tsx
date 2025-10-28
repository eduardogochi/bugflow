'use client'

import { AppLayout } from '@/components/AppLayout'
import { Typography, Container, Button } from '@mui/material'

import IssueList from '@/components/IssueList'
import AddIssueForm from '@/components/forms/AddIssueForm'

export default function Home() {
  return (
    <AppLayout>
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Hello Bugflow! 🐞
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, mb: 4 }} color="textSecondary">
          Bugflow is a bug tracking tool for software development teams.
        </Typography>
        <AddIssueForm />
        <IssueList />
      </Container>
    </AppLayout>
  )
}
