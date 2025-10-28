This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Reflections

- **Core React data flow**
  - Why do we keep `filter` in `IssueList` instead of `IssueCard`?
  - Why do we compute `filteredIssues` instead of storing it in state?
  - What happens if you toggle a card while the filter is “open”? Where does it go and why?
  - When should state live in a parent vs a child component? What trade-offs are we making?

- **Next.js App Router and API routes**
  - Where do API routes live, and how does the folder map to the URL path?
  - How do API routes differ from Client Components in responsibilities and environments?
  - Why might `context.params` be a Promise in route handlers, and how should we handle it?
  - Why do we normalize URL params (e.g., `Number(id)`) before lookups?

- **Fetching and UX states**
  - What belongs in `try/catch`, and what messages should users see vs what we log?
  - Why use `AbortController` when fetching in client components?
  - When would you add `cache: 'no-store'` to `fetch`?
  - How do we design loading, error, and empty states so the UI feels responsive and clear?

- **TanStack Query (React Query)**
  - What problems does `useQuery` solve compared to manual `useEffect` + state?
  - How do `queryKey`, `staleTime`, and `retry` influence caching and refetch behavior?
  - When should a user-driven “Retry” call `refetch`, and when should we let background refetch handle it?
  - How would we approach mutations and optimistic updates for creating/updating issues?

- **CI and quality gates**
  - What should CI validate for this project (build, lint, tests), and when should it run (push/PR)?
  - Which next steps (tests, deploy triggers, env vars) will provide the most value soonest?
