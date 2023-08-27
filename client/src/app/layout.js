'use client'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

import { Providers } from '../redux/provider'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { usePathname } from 'next/navigation'

export const metadata = {
  title: 'Hyper Events',
  description: 'In progess',
}

export default function RootLayout({ children }) {

  const pathname = usePathname()
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Providers>

          <header>
            <nav>
          {pathname === "/login"  || pathname === "/create_event" || pathname === "/singup" ? null : <NavBar />}
            </nav>
          </header>

        <main>
          {children}
        </main>

        </Providers>
        
        <Footer/>
        </body>
    </html>
  )
}
