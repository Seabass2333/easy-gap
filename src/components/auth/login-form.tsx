import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-solid-svg-icons'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { useStore } from '@/lib/store/useStore'

const LoginForm = () => {
  const router = useRouter()
  const login = useStore((state) => state.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // For demo purposes, we'll do a simple login
    // In a real app, we would validate with an API
    login({
      id: 'user1',
      name: 'John Doe',
      email: email
    })

    router.push('/home')
  }

  const handleGoogleLogin = () => {
    // For demo purposes only
    login({
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    })

    router.push('/home')
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
        <CardDescription className='text-center'>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleLogin}
          className='space-y-4'
        >
          {error && (
            <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>
              {error}
            </div>
          )}

          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium'
            >
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='name@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='text-sm font-medium'
              >
                Password
              </label>
              <Link
                href='/forgot-password'
                className='text-sm text-primary hover:underline'
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type='submit'
            className='w-full'
          >
            Login
          </Button>
        </form>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white dark:bg-gray-900 px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          className='w-full'
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            className='w-5 h-5 mr-2'
          />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <p className='text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link
            href='/register'
            className='text-primary hover:underline'
          >
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
