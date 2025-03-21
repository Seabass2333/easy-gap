'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

export default function AchievementsPage() {
  const achievements = useStore((state) => state.achievements)

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Achievements</h1>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={achievement.completed ? "border-primary" : "opacity-60"}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${achievement.completed ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <FontAwesomeIcon icon={faTrophy} className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">{achievement.date}</span>
                    {achievement.completed && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Completed</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
