'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

interface StoreProviderProps {
  children: ReactNode
}

// 定义一个具体的上下文类型
interface StoreContextType {
  initialized: boolean // 添加一个简单的属性，防止空接口错误
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={{ initialized: true }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}
