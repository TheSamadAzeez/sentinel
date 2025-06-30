'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Shield, Search, Database, Key, Menu, X } from 'lucide-react'

interface NavigationProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Navigation(_props: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    {
      id: 'password-check',
      label: 'Password Check',
      icon: Search,
      href: '/',
    },
    {
      id: 'breach-browser',
      label: 'Breach Database',
      icon: Database,
      href: '/breach',
    },
    {
      id: 'password-generator',
      label: 'Password Generator',
      icon: Key,
      href: '/generator',
    },
  ]

  return (
    <nav className="bg-[#152046] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#96A4D3]" />
            <h1 className="text-2xl font-bold">Sentinel</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <Link key={tab.id} href={tab.href}>
                  <Button
                    variant={pathname == tab.href ? 'default' : 'ghost'}
                    className={
                      pathname == tab.href
                        ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90'
                        : 'text-white hover:bg-white/10'
                    }
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/10 md:hidden">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Link key={tab.id} href={tab.href}>
                  <Button
                    variant={pathname === tab.href ? 'default' : 'ghost'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full justify-start ${
                      pathname === tab.href
                        ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
