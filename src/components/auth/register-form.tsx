'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store/useStore'
import { User } from '@/lib/types'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, we would register the user with an API
      // For demo, create a user and log them in
      const newUser: User = {
        id: 'user-' + Date.now(),
        name,
        email
      }

      login(newUser)
      router.push('/welcome')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid gap-6'>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <label
              htmlFor='name'
              className='text-sm font-medium'
            >
              Full Name
            </label>
            <Input
              id='name'
              placeholder='John Doe'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
              required
            />
          </div>

          <div className='grid gap-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium'
            >
              Email
            </label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              required
            />
          </div>

          <div className='grid gap-2'>
            <label
              htmlFor='password'
              className='text-sm font-medium'
            >
              Password
            </label>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full'
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant='outline'
        type='button'
        disabled={isLoading}
        className='w-full'
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className='mr-2 h-4 w-4'
        />
        Google
      </Button>

      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link
          href='/login'
          className='text-primary hover:underline'
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
