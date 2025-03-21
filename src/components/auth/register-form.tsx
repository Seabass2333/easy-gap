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

const RegisterForm = () => {
  const router = useRouter()
  const login = useStore((state) => state.login)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // For demo purposes, we'll do a simple registration
    // In a real app, we would call an API to register the user
    login({
      id: 'new-user',
      name: name,
      email: email
    })

    router.push('/welcome')
  }

  const handleGoogleRegister = () => {
    // For demo purposes only
    login({
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    })

    router.push('/welcome')
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>
          Create Account
        </CardTitle>
        <CardDescription className='text-center'>
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleRegister}
          className='space-y-4'
        >
          {error && (
            <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>
              {error}
            </div>
          )}

          <div className='space-y-2'>
            <label
              htmlFor='name'
              className='text-sm font-medium'
            >
              Full Name
            </label>
            <Input
              id='name'
              placeholder='John Doe'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <label
              htmlFor='password'
              className='text-sm font-medium'
            >
              Password
            </label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='confirmPassword'
              className='text-sm font-medium'
            >
              Confirm Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type='submit'
            className='w-full'
          >
            Create Account
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
          onClick={handleGoogleRegister}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            className='w-5 h-5 mr-2'
          />
          Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-primary hover:underline'
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm
