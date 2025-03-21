'use client'

import React, { createContext, useRef, useContext } from 'react'
import { useStore } from '@/lib/store/useStore'
import type { StoreApi } from 'zustand'

interface StoreProviderProps {
  children: React.ReactNode
}

const StoreContext = createContext<typeof useStore | null>(null)

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStoreContext must be used within StoreProvider')
  }
  return store
}
