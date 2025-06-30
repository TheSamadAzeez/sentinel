import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Shield } from 'lucide-react'

interface LogoProps {
  className?: string
  containerClassName?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, containerClassName, variant = 'light' }: LogoProps) {
  return (
    <Link href="/" aria-label="Sentinel" className={cn('inline-block', containerClassName)}>
      <div className={cn('flex items-center gap-2', className)}>
        <Shield className={cn('h-8 w-8', variant === 'light' ? 'text-[#96A4D3]' : 'text-[#152046]')} />
        <span className={cn('text-xl font-bold', variant === 'light' ? 'text-white' : 'text-[#152046]')}>Sentinel</span>
      </div>
    </Link>
  )
}
