import { Navigation } from '@/components/custom/navigation'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navigation />

      <main className="flex w-full bg-gray-200 lg:mx-auto lg:h-fit lg:w-fit">{children}</main>
    </div>
  )
}
