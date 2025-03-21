'use client'

import React from 'react'
import LoginForm from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-transparent bg-clip-text'>
          GapRise
        </h1>
        <p className='text-muted-foreground mt-2'>Career Gap Management App</p>
      </div>

      <LoginForm />
    </div>
  )
}
