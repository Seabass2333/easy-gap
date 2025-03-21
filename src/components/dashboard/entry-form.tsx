'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store/useStore'
import { GapEntry } from '@/lib/types'

type EntryFormProps = {
  onComplete: () => void
  existingEntry?: GapEntry
}

export default function EntryForm({
  onComplete,
  existingEntry
}: EntryFormProps) {
  const addGapEntry = useStore((state) => state.addGapEntry)
  const updateGapEntry = useStore((state) => state.updateGapEntry)

  const [date, setDate] = useState(
    existingEntry?.date || new Date().toISOString().split('T')[0]
  )
  const [mood, setMood] = useState<GapEntry['mood']>(
    existingEntry?.mood || 'neutral'
  )
  const [activityInput, setActivityInput] = useState('')
  const [activities, setActivities] = useState<string[]>(
    existingEntry?.activities || []
  )
  const [notes, setNotes] = useState(existingEntry?.notes || '')

  const handleAddActivity = () => {
    if (activityInput.trim() && !activities.includes(activityInput.trim())) {
      setActivities([...activities, activityInput.trim()])
      setActivityInput('')
    }
  }

  const handleRemoveActivity = (activity: string) => {
    setActivities(activities.filter((a) => a !== activity))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (existingEntry) {
      updateGapEntry(existingEntry.id, {
        date,
        mood,
        activities,
        notes
      })
    } else {
      const newEntry: GapEntry = {
        id: `entry-${Date.now()}`,
        date,
        mood,
        activities,
        notes
      }
      addGapEntry(newEntry)
    }

    onComplete()
  }

  const moodOptions: Array<{
    value: GapEntry['mood']
    label: string
    color: string
  }> = [
    { value: 'terrible', label: 'Terrible', color: 'bg-red-500' },
    { value: 'bad', label: 'Bad', color: 'bg-orange-500' },
    { value: 'neutral', label: 'Neutral', color: 'bg-yellow-500' },
    { value: 'good', label: 'Good', color: 'bg-green-500' },
    { value: 'great', label: 'Great', color: 'bg-emerald-500' }
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <h3 className='text-lg font-medium'>
        {existingEntry ? 'Edit Entry' : 'Add New Entry'}
      </h3>

      <div className='space-y-2'>
        <label
          htmlFor='date'
          className='text-sm font-medium'
        >
          Date
        </label>
        <Input
          id='date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>
          How are you feeling today?
        </label>
        <div className='flex justify-between gap-2'>
          {moodOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              onClick={() => setMood(option.value)}
              className={`flex flex-col items-center rounded-md p-2 flex-1 ${
                mood === option.value
                  ? 'bg-muted ring-2 ring-primary'
                  : 'hover:bg-muted'
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${option.color} mb-1`} />
              <span className='text-xs'>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Activities</label>
        <div className='flex gap-2'>
          <Input
            value={activityInput}
            onChange={(e) => setActivityInput(e.target.value)}
            placeholder='Add an activity'
          />
          <Button
            type='button'
            onClick={handleAddActivity}
            variant='secondary'
          >
            Add
          </Button>
        </div>

        {activities.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-2'>
            {activities.map((activity) => (
              <div
                key={activity}
                className='bg-muted px-3 py-1 rounded-full text-sm flex items-center'
              >
                {activity}
                <button
                  type='button'
                  onClick={() => handleRemoveActivity(activity)}
                  className='ml-2 text-muted-foreground hover:text-foreground'
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='notes'
          className='text-sm font-medium'
        >
          Notes
        </label>
        <textarea
          id='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className='w-full min-h-[100px] p-2 border rounded-md'
          placeholder='How did your day go? What did you learn?'
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button
          type='button'
          variant='outline'
          onClick={onComplete}
        >
          Cancel
        </Button>
        <Button type='submit'>
          {existingEntry ? 'Update Entry' : 'Save Entry'}
        </Button>
      </div>
    </form>
  )
}
