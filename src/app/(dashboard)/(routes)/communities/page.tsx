'use client'

import React from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faComments } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { getInitials } from '@/lib/utils'

export default function CommunitiesPage() {
  const { communities, messages } = useStore((state) => ({
    communities: state.communities,
    messages: state.messages
  }))

  return (
    <div className='container max-w-lg mx-auto p-4'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Communities</h1>
        <div className='relative'>
          <Input
            placeholder='Search communities...'
            className='pl-10'
          />
          <FontAwesomeIcon
            icon={faSearch}
            className='absolute left-3 top-3 text-muted-foreground'
          />
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='text-lg font-semibold mb-3'>Your Communities</h2>
        <div className='space-y-3'>
          {communities
            .filter((c) => c.isJoined)
            .map((community) => (
              <Card key={community.id}>
                <CardContent className='p-4 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Avatar className='h-10 w-10 mr-3'>
                      <AvatarImage
                        src={community.avatar}
                        alt={community.name}
                      />
                      <AvatarFallback>
                        {getInitials(community.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-medium'>{community.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {community.members} members
                      </p>
                    </div>
                  </div>
                  <Button
                    size='sm'
                    variant='outline'
                  >
                    <FontAwesomeIcon
                      icon={faComments}
                      className='mr-2'
                    />
                    Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-3'>Discover</h2>
        <div className='space-y-3'>
          {communities
            .filter((c) => !c.isJoined)
            .map((community) => (
              <Card key={community.id}>
                <CardContent className='p-4 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Avatar className='h-10 w-10 mr-3'>
                      <AvatarImage
                        src={community.avatar}
                        alt={community.name}
                      />
                      <AvatarFallback>
                        {getInitials(community.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-medium'>{community.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {community.members} members
                      </p>
                    </div>
                  </div>
                  <Button size='sm'>Join</Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
