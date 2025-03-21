'use client'

import React from 'react'
import { WelcomeScreen } from '@/components/auth/welcome-screen'

export default function WelcomePage() {
  return (
    <div className='container flex h-screen flex-col items-center justify-center'>
      <WelcomeScreen />
    </div>
  )
}
