'use client'

import React, { useState } from 'react'
import { useStore } from '@/lib/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function MessagesPage() {
  const user = useStore((state) => state.user)
  const messages = useStore((state) => state.messages)
  const addMessage = useStore((state) => state.addMessage)
  
  const [newMessage, setNewMessage] = useState('')
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newMessage.trim()) {
      addMessage({
        id: `msg-${Date.now()}`,
        senderId: user?.id || 'unknown',
        senderName: user?.name || 'You',
        senderAvatar: user?.avatar,
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      })
      
      setNewMessage('')
    }
  }
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <div className="container py-6 flex flex-col h-[calc(100vh-80px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => {
              const isOwnMessage = message.senderId === user?.id
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {message.senderName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                      {message.senderAvatar && (
                        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      )}
                    </Avatar>
                    
                    <div className={`mx-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                      <div 
                        className={`rounded-lg px-4 py-2 inline-block ${
                          isOwnMessage 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center space-x-1">
                        {!isOwnMessage && <span>{message.senderName}</span>}
                        <span>•</span>
                        <span>{formatTimestamp(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          )}
        </div>
        
        <CardContent className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 