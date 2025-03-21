'use client';

import React from 'react';
import { useStore } from '@/lib/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials, formatDate } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendar, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const { user, gapEntries, achievements } = useStore((state) => ({
    user: state.user,
    gapEntries: state.gapEntries,
    achievements: state.achievements,
  }));

  const completedAchievements = achievements.filter(a => a.completed).length;
  const recentEntries = gapEntries.slice(0, 3);
  const today = new Date();

  return (
    <div className="container max-w-lg mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.name?.split(' ')[0] || 'there'}!</h1>
          <p className="text-muted-foreground">{formatDate(today)}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">How are you today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {['terrible', 'bad', 'neutral', 'good', 'great'].map((mood) => (
              <button
                key={mood}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  mood === 'great' ? 'bg-green-500' :
                  mood === 'good' ? 'bg-green-300' :
                  mood === 'neutral' ? 'bg-yellow-300' :
                  mood === 'bad' ? 'bg-orange-300' :
                  'bg-red-500'
                } text-white mb-1`}>
                  {mood === 'great' ? '😄' : 
                   mood === 'good' ? '🙂' : 
                   mood === 'neutral' ? '😐' : 
                   mood === 'bad' ? '🙁' : '😞'}
                </div>
                <span className="text-xs capitalize">{mood}</span>
              </button>
            ))}
          </div>
          <Button className="w-full" variant="gradient">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Today's Entry
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Streak</p>
                <p className="text-2xl font-bold">7 Days</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Achievements</p>
                <p className="text-2xl font-bold">{completedAchievements}/{achievements.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      {recentEntries.length > 0 ? (
        <div className="space-y-3">
          {recentEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{formatDate(entry.date)}</p>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    entry.mood === 'great' ? 'bg-green-500' :
                    entry.mood === 'good' ? 'bg-green-300' :
                    entry.mood === 'neutral' ? 'bg-yellow-300' :
                    entry.mood === 'bad' ? 'bg-orange-300' :
                    'bg-red-500'
                  } text-white text-xs`}>
                    {entry.mood === 'great' ? '😄' : 
                     entry.mood === 'good' ? '🙂' : 
                     entry.mood === 'neutral' ? '😐' : 
                     entry.mood === 'bad' ? '🙁' : '😞'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {entry.activities.map((activity, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{entry.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No recent activity. Add your first entry!</p>
            <Button className="mt-4" variant="outline">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 