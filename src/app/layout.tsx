import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/providers/store-provider'
import { ClientNavBar } from '@/components/layout/client-navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'GapRise - Career Gap Management App',
  description: 'Track and manage your career gaps with GapRise',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='max-w-md mx-auto min-h-[100dvh] flex flex-col bg-background relative overflow-hidden'>
          <div className='fixed top-0 left-0 right-0 h-[28px] bg-gradient z-50'>
            <div className='flex justify-between items-center px-4 h-full text-white text-xs'>
              <div>9:41</div>
              <div className='flex items-center space-x-1'>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
          </div>
          <main className='flex-1 pt-[28px] pb-16 overflow-y-auto'>
            <StoreProvider>{children}</StoreProvider>
          </main>
          <ClientNavBar />
        </div>
      </body>
    </html>
  )
}
