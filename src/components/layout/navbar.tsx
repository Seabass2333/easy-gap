'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faCalendarDays,
  faUserGroup,
  faMessage,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

const NavBar = () => {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: faHome
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: faCalendarDays
    },
    {
      name: 'Communities',
      href: '/communities',
      icon: faUserGroup
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: faMessage
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: faUser
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full px-2 text-xs transition-colors',
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="h-5 w-5 mb-1"
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
