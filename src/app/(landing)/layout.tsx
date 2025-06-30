import { Navigation } from '@/components/custom/navigation'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <main className="flex w-full lg:mx-auto lg:h-fit lg:w-fit">{children}</main>
    </div>
  )
}
