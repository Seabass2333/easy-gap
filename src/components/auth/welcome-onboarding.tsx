import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const WelcomeOnboarding = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/home')
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='items-center text-center pb-2'>
        <CardTitle className='text-2xl font-bold'>Welcome to GapRise</CardTitle>
      </CardHeader>
      <CardContent className='text-center space-y-6'>
        <div className='relative w-full h-48 mx-auto'>
          <Image
            src='/onboarding.jpg'
            alt='Welcome to GapRise'
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-lg'
          />
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>Track Your Career Journey</h3>
          <p className='text-muted-foreground'>
            GapRise helps you manage career gaps effectively, track your
            progress, and connect with others on similar journeys.
          </p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <div className='h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
              1
            </div>
            <p className='text-sm'>Track your daily activities and mood</p>
          </div>

          <div className='flex items-center space-x-2'>
            <div className='h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
              2
            </div>
            <p className='text-sm'>Set goals and earn achievements</p>
          </div>

          <div className='flex items-center space-x-2'>
            <div className='h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
              3
            </div>
            <p className='text-sm'>Connect with communities for support</p>
          </div>

          <div className='flex items-center space-x-2'>
            <div className='h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
              4
            </div>
            <p className='text-sm'>Build your profile for future employers</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center pb-8'>
        <Button
          onClick={handleGetStarted}
          className='w-full'
          variant='gradient'
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WelcomeOnboarding
