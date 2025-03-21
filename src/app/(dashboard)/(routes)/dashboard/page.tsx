'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons'

export default function DashboardPage() {
  const user = useStore((state) => state.user)
  const gapEntries = useStore((state) => state.gapEntries)
  const achievements = useStore((state) => state.achievements)

  const completedAchievements = achievements.filter((a) => a.completed).length
  const streakDays = 7 // Mock value for UI purposes

  return (
    <div className='container py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Hello, {user?.name || 'User'}</h1>
        <div className='bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm'>
          Day {streakDays}
        </div>
      </div>

      <section className='space-y-4'>
        <h2 className='text-lg font-semibold'>Today&apos;s Overview</h2>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardContent className='p-4 flex flex-col items-center justify-center space-y-2'>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className='h-8 w-8 text-primary'
              />
              <CardTitle className='text-lg font-medium'>Gap Entries</CardTitle>
              <p className='text-3xl font-bold'>{gapEntries.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 flex flex-col items-center justify-center space-y-2'>
              <FontAwesomeIcon
                icon={faGraduationCap}
                className='h-8 w-8 text-primary'
              />
              <CardTitle className='text-lg font-medium'>
                Achievements
              </CardTitle>
              <p className='text-3xl font-bold'>
                {completedAchievements}/{achievements.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Mood Progress</h2>
          <button className='text-primary text-sm'>View Details</button>
        </div>

        {/* Placeholder for mood chart */}
        <Card className='h-40 flex items-center justify-center'>
          <div className='flex space-x-3'>
            {['terrible', 'bad', 'neutral', 'good', 'great'].map((mood, i) => (
              <div
                key={mood}
                className='flex flex-col items-center'
              >
                <div
                  className={`w-6 h-6 rounded-full ${
                    i === 0
                      ? 'bg-red-500'
                      : i === 1
                      ? 'bg-orange-500'
                      : i === 2
                      ? 'bg-yellow-500'
                      : i === 3
                      ? 'bg-green-500'
                      : 'bg-emerald-500'
                  }`}
                />
                <span className='text-xs mt-1'>{mood}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Recent Entries</h2>
          <button className='text-primary text-sm'>See All</button>
        </div>

        {gapEntries.length > 0 ? (
          <div className='space-y-3'>
            {gapEntries.slice(0, 3).map((entry) => (
              <Card key={entry.id}>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <p className='font-medium'>{entry.date}</p>
                      <p className='text-sm text-muted-foreground'>
                        {entry.activities.join(', ')}
                      </p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        entry.mood === 'great'
                          ? 'bg-emerald-500'
                          : entry.mood === 'good'
                          ? 'bg-green-500'
                          : entry.mood === 'neutral'
                          ? 'bg-yellow-500'
                          : entry.mood === 'bad'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <p className='text-sm mt-2 line-clamp-2'>{entry.notes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className='p-4 flex flex-col items-center justify-center py-8'>
              <p className='text-muted-foreground'>No entries yet</p>
              <button className='mt-4 bg-primary text-white px-4 py-2 rounded-md'>
                Add First Entry
              </button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
