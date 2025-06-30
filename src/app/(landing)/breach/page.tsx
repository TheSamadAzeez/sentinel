import { BreachBrowser } from '@/components/custom/breach-browser'

export default function BreachDatabasePage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-[#152046]">Data Breach Database</h2>
        <p className="text-gray-600">
          Browse through a comprehensive database of known security breaches and incidents.
        </p>
      </div>

      <BreachBrowser />
    </main>
  )
}
