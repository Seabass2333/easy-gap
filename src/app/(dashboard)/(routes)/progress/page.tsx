'use client'

import React, { useState } from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import EntryForm from '@/components/dashboard/entry-form'

export default function ProgressPage() {
  const [showForm, setShowForm] = useState(false)
  const gapEntries = useStore((state) => state.gapEntries)
  
  // Group entries by month for the calendar view
  const entriesByMonth = gapEntries.reduce<Record<string, typeof gapEntries>>((acc, entry) => {
    const month = entry.date.substring(0, 7) // Format: YYYY-MM
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(entry)
    return acc
  }, {})
  
  // Get current month for default view
  const currentMonth = new Date().toISOString().substring(0, 7)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Progress Tracking</h1>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <EntryForm onComplete={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2 h-4 w-4" />
                  Entry Calendar
                </CardTitle>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="p-2 border rounded"
                >
                  {Object.keys(entriesByMonth).map(month => (
                    <option key={month} value={month}>
                      {new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid Placeholder */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-xs py-1">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const dateStr = `${selectedMonth}-${day.toString().padStart(2, '0')}`
                  const entry = gapEntries.find(e => e.date === dateStr)
                  
                  return (
                    <div key={day} className="aspect-square p-1">
                      <div 
                        className={`w-full h-full flex items-center justify-center rounded-full text-xs
                          ${entry ? 'bg-primary text-primary-foreground' : 'hover:bg-muted cursor-pointer'}
                        `}
                      >
                        {day}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">All Entries</CardTitle>
            </CardHeader>
            <CardContent>
              {gapEntries.length > 0 ? (
                <div className="space-y-4">
                  {gapEntries.map(entry => (
                    <Card key={entry.id} className="overflow-hidden">
                      <div className="flex">
                        <div 
                          className={`w-2 ${
                            entry.mood === 'great' ? 'bg-emerald-500' :
                            entry.mood === 'good' ? 'bg-green-500' :
                            entry.mood === 'neutral' ? 'bg-yellow-500' :
                            entry.mood === 'bad' ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                        />
                        <CardContent className="p-4 w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{entry.date}</p>
                              <p className="text-muted-foreground text-sm mt-1">
                                Mood: {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                              </p>
                              <p className="text-sm mt-2">Activities: {entry.activities.join(', ')}</p>
                              <p className="text-sm mt-2">{entry.notes}</p>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No entries yet</p>
                  <Button onClick={() => setShowForm(true)} className="mt-4">
                    Add Your First Entry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 