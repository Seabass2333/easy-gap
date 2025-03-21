'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
    <div className='flex flex-col min-h-[calc(100vh-28px)]'>
      <main className='flex-1 pb-16 overflow-y-auto'>{children}</main>
    </div>
  )
}
