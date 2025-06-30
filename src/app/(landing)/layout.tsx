import { Navigation } from '@/components/custom/navigation'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navigation />

      <main className="mx-auto flex h-fit w-fit bg-gray-200">{children}</main>
    </div>
  )
}
