'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faChartLine,
  faUserGroup,
  faComment,
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
      icon: faChartLine
    },
    {
      name: 'Communities',
      href: '/communities',
      icon: faUserGroup
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: faComment
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: faUser
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            <div className={cn(
              'flex flex-col items-center justify-center w-16 py-2',
              pathname === item.href
                ? 'text-primary'
                : 'text-gray-400'
            )}>
              <FontAwesomeIcon
                icon={item.icon}
                className={cn(
                  'h-5 w-5 mb-1',
                  pathname === item.href && 'text-primary'
                )}
              />
              <span className="text-xs">{item.name}</span>
              
              {pathname === item.href && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
