import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='container flex h-[80vh] flex-col items-center justify-center'>
      <h1 className='text-6xl font-bold'>404</h1>
      <h2 className='mb-4 mt-2 text-xl'>Page Not Found</h2>
      <p className='mb-8 max-w-md text-center text-muted-foreground'>
        We couldn&apos;t find the page you&apos;re looking for. Please check the
        URL or go back to the homepage.
      </p>
      <Link href='/'>
        <span className='rounded-md bg-primary px-4 py-2 text-primary-foreground'>
          Go Home
        </span>
      </Link>
    </div>
  )
}
