'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/layout/navbar'
import { useStore } from '@/lib/store/useStore'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Return null during the redirect to prevent flash of content
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pb-20'>{children}</main>
      <NavBar />
    </div>
  )
}
