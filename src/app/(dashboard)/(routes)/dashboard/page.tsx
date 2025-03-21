'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faGraduationCap,
  faPlus,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import { getInitials, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const user = useStore((state) => state.user)
  const gapEntries = useStore((state) => state.gapEntries)
  const achievements = useStore((state) => state.achievements)

  const completedAchievements = achievements.filter((a) => a.completed).length
  const streakDays = 7 // Mock value for UI purposes
  const today = new Date()

  return (
    <div className='container max-w-lg mx-auto p-4'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            Hello, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className='text-muted-foreground'>{formatDate(today)}</p>
        </div>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src={user?.avatar}
            alt={user?.name}
          />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </div>

      <Card className='mb-6'>
        <CardContent className='p-4'>
          <h2 className='text-lg font-semibold mb-3'>How are you today?</h2>
          <div className='grid grid-cols-5 gap-2 mb-4'>
            {['terrible', 'bad', 'neutral', 'good', 'great'].map((mood, i) => (
              <button
                key={mood}
                className='flex flex-col items-center p-2 rounded-lg hover:bg-accent transition-colors'
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    i === 0
                      ? 'bg-red-500'
                      : i === 1
                      ? 'bg-orange-400'
                      : i === 2
                      ? 'bg-yellow-400'
                      : i === 3
                      ? 'bg-green-400'
                      : 'bg-emerald-500'
                  } text-white mb-1`}
                >
                  {i === 0
                    ? '😞'
                    : i === 1
                    ? '🙁'
                    : i === 2
                    ? '😐'
                    : i === 3
                    ? '🙂'
                    : '😄'}
                </div>
                <span className='text-xs capitalize'>{mood}</span>
              </button>
            ))}
          </div>
          <Button
            className='w-full'
            variant='gradient'
          >
            <FontAwesomeIcon
              icon={faPlus}
              className='mr-2 h-4 w-4'
            />
            Add Today&apos;s Entry
          </Button>
        </CardContent>
      </Card>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm'>Streak</p>
                <p className='text-2xl font-bold'>{streakDays} Days</p>
              </div>
              <div className='h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='h-5 w-5'
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted-foreground text-sm'>Achievements</p>
                <p className='text-2xl font-bold'>
                  {completedAchievements}/{achievements.length}
                </p>
              </div>
              <div className='h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary'>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className='h-5 w-5'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
      {gapEntries.length > 0 ? (
        <div className='space-y-3'>
          {gapEntries.slice(0, 3).map((entry) => (
            <Card key={entry.id}>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='font-medium'>{formatDate(entry.date)}</p>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      entry.mood === 'great'
                        ? 'bg-emerald-500'
                        : entry.mood === 'good'
                        ? 'bg-green-400'
                        : entry.mood === 'neutral'
                        ? 'bg-yellow-400'
                        : entry.mood === 'bad'
                        ? 'bg-orange-400'
                        : 'bg-red-500'
                    } text-white text-xs`}
                  >
                    {entry.mood === 'great'
                      ? '😄'
                      : entry.mood === 'good'
                      ? '🙂'
                      : entry.mood === 'neutral'
                      ? '😐'
                      : entry.mood === 'bad'
                      ? '🙁'
                      : '😞'}
                  </div>
                </div>
                <div className='flex flex-wrap gap-1 mb-2'>
                  {entry.activities.map((activity, index) => (
                    <span
                      key={index}
                      className='text-xs bg-muted px-2 py-1 rounded-full'
                    >
                      {activity}
                    </span>
                  ))}
                </div>
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {entry.notes}
                </p>
              </CardContent>
            </Card>
          ))}
          <Button
            variant='outline'
            className='w-full flex items-center justify-center'
          >
            View All Entries{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              className='ml-2 h-4 w-4'
            />
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className='p-6 text-center'>
            <p className='text-muted-foreground'>
              No recent activity. Add your first entry!
            </p>
            <Button
              className='mt-4'
              variant='outline'
            >
              <FontAwesomeIcon
                icon={faPlus}
                className='mr-2 h-4 w-4'
              />
              Add Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
