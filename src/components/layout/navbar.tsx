'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faJournalWhills,
  faUserGroup,
  faTrophy,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

const NavBar = () => {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Home',
      href: '/home',
      icon: faHome
    },
    {
      name: 'Journal',
      href: '/journal',
      icon: faJournalWhills
    },
    {
      name: 'Community',
      href: '/communities',
      icon: faUserGroup
    },
    {
      name: 'Achievements',
      href: '/achievements',
      icon: faTrophy
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: faUser
    }
  ]

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10'>
      <div className='flex justify-around items-center h-16'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full px-2 text-xs transition-colors',
              pathname === item.href
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
            )}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className='h-6 w-6 mb-1'
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
