'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faCheck, faLock } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/lib/utils'

export default function AchievementsPage() {
  const { achievements } = useStore((state) => ({
    achievements: state.achievements
  }))

  const completedCount = achievements.filter((a) => a.completed).length
  const totalCount = achievements.length
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className='container max-w-lg mx-auto p-4'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Achievements</h1>
        <p className='text-muted-foreground'>
          Track your progress and earn badges
        </p>
      </div>

      <Card className='mb-6'>
        <CardContent className='p-4'>
          <div className='flex items-center justify-between mb-3'>
            <div>
              <h2 className='font-semibold'>Progress</h2>
              <p className='text-muted-foreground text-sm'>
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary'>
              <FontAwesomeIcon
                icon={faTrophy}
                className='h-6 w-6'
              />
            </div>
          </div>
          <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to'
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`overflow-hidden transition-all ${
              achievement.completed ? 'border-primary' : 'opacity-70'
            }`}
          >
            <CardContent className='p-4 flex items-start gap-4'>
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  achievement.completed
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <FontAwesomeIcon
                  icon={achievement.completed ? faCheck : faLock}
                  className='h-5 w-5'
                />
              </div>
              <div className='flex-1'>
                <h3 className='font-medium'>{achievement.title}</h3>
                <p className='text-sm text-muted-foreground mb-2'>
                  {achievement.description}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {achievement.completed
                    ? `Completed on ${formatDate(achievement.date)}`
                    : `Target: ${formatDate(achievement.date)}`}
                </p>
              </div>
              {!achievement.completed && (
                <Button
                  size='sm'
                  variant='outline'
                >
                  Start
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
