import { redirect } from 'next/navigation'

// Redirect to login page by default
export default function Home() {
  // 服务端重定向
  redirect('/login')

  // 这行代码不会执行，但需要保留以满足 React 组件返回要求
  return null
}
