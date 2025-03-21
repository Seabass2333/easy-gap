'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faGear,
  faRightFromBracket,
  faBell,
  faShield,
  faCircleInfo,
  faMoon
} from '@fortawesome/free-solid-svg-icons'

export default function ProfilePage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const settingsItems = [
    {
      icon: faGear,
      label: 'Account Settings',
      description: 'Manage your account details and preferences',
      href: '/settings/account'
    },
    {
      icon: faBell,
      label: 'Notifications',
      description: 'Configure your notification preferences',
      href: '/settings/notifications'
    },
    {
      icon: faShield,
      label: 'Privacy',
      description: 'Manage your privacy settings',
      href: '/settings/privacy'
    },
    {
      icon: faMoon,
      label: 'Appearance',
      description: 'Change theme and visual preferences',
      href: '/settings/appearance'
    },
    {
      icon: faCircleInfo,
      label: 'Help & Support',
      description: 'Get help with using GapRise',
      href: '/settings/help'
    }
  ]

  return (
    <div className='container py-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Profile</h1>

      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col items-center space-y-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={user?.avatar}
                alt={user?.name}
              />
              <AvatarFallback className='bg-primary text-lg'>
                {user?.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('') || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className='text-center'>
              <h2 className='text-xl font-bold'>{user?.name}</h2>
              <p className='text-muted-foreground'>{user?.email}</p>
            </div>

            <Button
              variant='outline'
              className='w-full'
            >
              <FontAwesomeIcon
                icon={faUser}
                className='mr-2 h-4 w-4'
              />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className='text-lg font-semibold mt-6'>Settings</h2>

      <div className='space-y-3'>
        {settingsItems.map((item) => (
          <Card
            key={item.label}
            className='cursor-pointer hover:bg-muted/50'
          >
            <CardContent className='p-4 flex items-center space-x-4'>
              <div className='bg-primary/10 p-2 rounded-full'>
                <FontAwesomeIcon
                  icon={item.icon}
                  className='h-5 w-5 text-primary'
                />
              </div>
              <div>
                <h3 className='font-medium'>{item.label}</h3>
                <p className='text-sm text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant='destructive'
        className='w-full mt-6'
        onClick={handleLogout}
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className='mr-2 h-4 w-4'
        />
        Logout
      </Button>
    </div>
  )
}
