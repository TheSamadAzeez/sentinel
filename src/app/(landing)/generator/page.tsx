import { PasswordGenerator } from '@/components/custom/password-generator'

export default function PasswordGeneratorPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-[#152046]">Secure Password Generator</h2>
        <p className="text-gray-600">
          Generate strong, secure passwords with customizable options for maximum security.
        </p>
      </div>

      <PasswordGenerator />
    </main>
  )
}
