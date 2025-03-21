'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function JournalPage() {
  const { gapEntries } = useStore((state) => ({
    gapEntries: state.gapEntries
  }))

  return (
    <div className='container max-w-lg mx-auto p-4'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Journal</h1>
        <Button
          size='sm'
          variant='gradient'
        >
          <FontAwesomeIcon
            icon={faPlus}
            className='mr-2'
          />
          New Entry
        </Button>
      </div>

      <Tabs
        defaultValue='entries'
        className='mb-6'
      >
        <TabsList className='w-full'>
          <TabsTrigger
            value='entries'
            className='flex-1'
          >
            All Entries
          </TabsTrigger>
          <TabsTrigger
            value='calendar'
            className='flex-1'
          >
            Calendar
          </TabsTrigger>
        </TabsList>
        <TabsContent value='entries'>
          {gapEntries.length > 0 ? (
            <div className='space-y-4 mt-4'>
              {gapEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className='relative overflow-hidden'
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      entry.mood === 'great'
                        ? 'bg-green-500'
                        : entry.mood === 'good'
                        ? 'bg-green-300'
                        : entry.mood === 'neutral'
                        ? 'bg-yellow-300'
                        : entry.mood === 'bad'
                        ? 'bg-orange-300'
                        : 'bg-red-500'
                    }`}
                  />
                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-center'>
                      <CardTitle className='text-lg'>
                        {formatDate(entry.date)}
                      </CardTitle>
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          entry.mood === 'great'
                            ? 'bg-green-500'
                            : entry.mood === 'good'
                            ? 'bg-green-300'
                            : entry.mood === 'neutral'
                            ? 'bg-yellow-300'
                            : entry.mood === 'bad'
                            ? 'bg-orange-300'
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
                  </CardHeader>
                  <CardContent>
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
                    <p className='text-sm'>{entry.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className='mt-4'>
              <CardContent className='p-6 text-center'>
                <p className='text-muted-foreground mb-4'>
                  No journal entries yet. Start tracking your journey!
                </p>
                <Button>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className='mr-2'
                  />
                  Create First Entry
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value='calendar'>
          <Card className='mt-4'>
            <CardContent className='p-6 text-center'>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className='h-12 w-12 text-muted-foreground mb-4'
              />
              <p className='text-muted-foreground'>
                Calendar view coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
