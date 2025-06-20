import Header from '@/components/Header'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container'>
            <Header />
            {/* Body */}
            <Outlet />
        </main>

        <div className=' p-10 text-center bg-gray-800 mt-10'>
          Made with ❤️ by <Link to="https://github.com/rajanarahul93" target="_blank">Rahul</Link>
        </div>
    </div>
  )
}

export default AppLayout