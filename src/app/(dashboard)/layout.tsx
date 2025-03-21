import React from 'react'
import { redirect } from 'next/navigation'
import NavBar from '@/components/layout/navbar'
import { useStore } from '@/lib/store/useStore'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // In a real app with server components, we would use a server-side check
  // For this demo, we're using client-side auth check but in a way that works
  // with SSR

  // This is a simple client-side auth check using localStorage
  // In a real app, you would use a proper auth solution
  const isAuthenticated = useStore.getState().isAuthenticated

  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pb-20'>{children}</main>
      <NavBar />
    </div>
  )
}
