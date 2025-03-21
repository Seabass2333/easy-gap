'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function WelcomeScreen() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const handleExplore = () => {
    router.push('/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8'>
      <div className='flex flex-col items-center space-y-2 text-center'>
        <div className='relative w-40 h-40 mb-4'>
          <Image
            src='/images/welcome.jpg'
            alt='Welcome illustration'
            fill
            className='object-cover rounded-lg'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.backgroundColor = '#f0f0f0'
              target.style.display = 'flex'
              target.style.alignItems = 'center'
              target.style.justifyContent = 'center'
            }}
          />
        </div>
        <h1 className='text-3xl font-bold'>Welcome to GapRise</h1>
        <p className='text-muted-foreground'>
          Your personal career gap manager to help you track, plan, and optimize
          your career breaks.
        </p>
      </div>

      <div className='space-y-4 w-full'>
        <Button
          onClick={handleGetStarted}
          className='w-full'
          size='lg'
        >
          Get Started
        </Button>
        <Button
          onClick={handleExplore}
          variant='outline'
          className='w-full'
          size='lg'
        >
          Explore Features
        </Button>
      </div>
    </div>
  )
}
