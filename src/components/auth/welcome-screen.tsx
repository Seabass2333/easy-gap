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
    <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto min-h-[calc(100vh-28px)] p-6'>
      <div className='flex flex-col items-center space-y-4 text-center mb-10'>
        <div className='w-64 h-48 relative mb-6'>
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
              target.src =
                'https://placehold.co/600x400?text=Welcome+to+GapRise'
            }}
          />
        </div>
        <h1 className='text-3xl font-bold'>Welcome to GapRise</h1>
        <p className='text-muted-foreground text-center max-w-xs'>
          Your personal career gap manager to help you track, plan, and optimize
          your career breaks.
        </p>
      </div>

      <div className='space-y-4 w-full max-w-xs'>
        <Button
          onClick={handleGetStarted}
          className='w-full'
          size='lg'
          variant='gradient'
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
