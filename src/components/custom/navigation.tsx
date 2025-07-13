'use client'

import { Button } from '@/components/ui/button'
import { Database, Key, Menu, Search, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'

export function Navigation() {
  const pathname = usePathname()

  const LINKS = [
    {
      label: 'Password Check',
      icon: Search,
      href: '/password-check',
    },
    {
      label: 'Breach Database',
      icon: Database,
      href: '/breach',
    },
    {
      label: 'Password Generator',
      icon: Key,
      href: '/generator',
    },
  ]

  return (
    <nav className="sticky top-0 z-10 bg-[#152046] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#96A4D3]" />
            <h1 className="text-2xl font-bold">Sentinel</h1>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {LINKS.map((link) => {
              const Icon = link.icon

              return (
                <Link key={link.label} href={link.href}>
                  <Button
                    variant={pathname == link.href ? 'default' : 'ghost'}
                    className={
                      pathname == link.href
                        ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90'
                        : 'text-white hover:bg-white/10'
                    }
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-200">
                <div className="flex flex-col gap-3 px-5 pt-20">
                  {LINKS.map((link) => {
                    return (
                      <SheetClose asChild key={link.label}>
                        <Link href={link.href}>
                          <p
                            className={`text-xl font-bold hover:text-gray-100 ${
                              pathname === link.href ? `text-[#17234b]` : `text-gray-600`
                            }`}
                          >
                            {link.label}
                          </p>
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
