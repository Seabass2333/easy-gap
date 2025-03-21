'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store/useStore'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 直接使用email和password登录
      login(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full max-w-[320px] mx-auto'>
      <div className='mb-8 text-center'>
        <div className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4'>
          <FontAwesomeIcon
            icon={faGoogle}
            className='h-6 w-6'
          />
        </div>
        <h2 className='text-2xl font-bold'>Sign In</h2>
        <p className='text-gray-500 text-sm mt-1'>Welcome back to GapRise</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='text-sm font-medium block'
          >
            Email
          </label>
          <Input
            id='email'
            placeholder='name@example.com'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-11'
            required
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='password'
              className='text-sm font-medium'
            >
              Password
            </label>
            <Link
              href='/forgot-password'
              className='text-xs text-primary'
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            id='password'
            placeholder='••••••••'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-11'
            required
          />
        </div>

        <Button
          type='submit'
          className='w-full h-11'
          variant='gradient'
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className='mt-8 text-center space-y-4'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-200'></span>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-gray-500'>
              or continue with
            </span>
          </div>
        </div>

        <div className='flex gap-4 justify-center'>
          <button className='w-full flex items-center justify-center h-10 border border-gray-200 rounded-md hover:bg-gray-50'>
            <span className='text-lg'>G</span>
          </button>
          <button className='w-full flex items-center justify-center h-10 border border-gray-200 rounded-md hover:bg-gray-50'>
            <span className='text-lg'>A</span>
          </button>
          <button className='w-full flex items-center justify-center h-10 border border-gray-200 rounded-md hover:bg-gray-50'>
            <span className='text-lg'>f</span>
          </button>
        </div>

        <p className='text-sm text-gray-500'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='text-primary font-medium'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
