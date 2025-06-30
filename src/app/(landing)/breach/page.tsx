import { BreachBrowser } from '@/components/custom/breach-browser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Breach Database',
  description: 'Explore a comprehensive database of known security breaches and incidents.',
}

export default function BreachDatabasePage() {
  return (
    <main className="w-full flex-1 px-4 py-8 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="mb-2 text-2xl font-bold text-[#152046] lg:text-3xl">Data Breach Database</h2>
        <p className="text-gray-600">
          Browse through a comprehensive database of known security breaches and incidents.
        </p>
      </div>

      <BreachBrowser />
    </main>
  )
}
