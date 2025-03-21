'use client'

import React, { useState } from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faUserGroup,
  faPlus,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

export default function CommunitiesPage() {
  const communities = useStore((state) => state.communities)
  const joinCommunity = useStore((state) => state.joinCommunity)
  const leaveCommunity = useStore((state) => state.leaveCommunity)

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'joined'>('all')

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch = community.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    if (activeTab === 'joined') {
      return matchesSearch && community.isJoined
    }
    return matchesSearch
  })

  const handleToggleJoin = (id: string, isJoined: boolean) => {
    if (isJoined) {
      leaveCommunity(id)
    } else {
      joinCommunity(id)
    }
  }

  return (
    <div className='container py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Communities</h1>
      </div>

      <div className='relative'>
        <FontAwesomeIcon
          icon={faSearch}
          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
        />
        <Input
          placeholder='Search communities...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-10'
        />
      </div>

      <div className='flex border-b'>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Communities
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'joined'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('joined')}
        >
          My Communities
        </button>
      </div>

      <div className='space-y-4'>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <Card key={community.id}>
              <CardContent className='p-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        <FontAwesomeIcon icon={faUserGroup} />
                      </AvatarFallback>
                      {community.avatar && (
                        <AvatarImage
                          src={community.avatar}
                          alt={community.name}
                        />
                      )}
                    </Avatar>
                    <div>
                      <h3 className='font-medium'>{community.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {community.members} members
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={community.isJoined ? 'outline' : 'default'}
                    size='sm'
                    onClick={() =>
                      handleToggleJoin(community.id, community.isJoined)
                    }
                  >
                    {community.isJoined ? (
                      <>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className='mr-2 h-4 w-4'
                        />
                        Joined
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className='mr-2 h-4 w-4'
                        />
                        Join
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className='text-center py-8'>
            <FontAwesomeIcon
              icon={faUserGroup}
              className='h-12 w-12 text-muted-foreground mb-4'
            />
            <p className='text-muted-foreground'>
              {searchQuery
                ? 'No communities found matching your search'
                : activeTab === 'joined'
                ? "You haven't joined any communities yet"
                : 'No communities available'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
