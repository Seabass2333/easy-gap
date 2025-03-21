'use client'

import { usePathname } from 'next/navigation'
import NavBar from '@/components/layout/navbar'

export function ClientNavBar() {
  const pathname = usePathname()
  const authRoutes = ['/login', '/register', '/welcome']

  // Don't show navbar on auth pages
  if (authRoutes.some((route) => pathname?.startsWith(route))) {
    return null
  }

  return <NavBar />
}
