import { PasswordGenerator } from '@/components/custom/password-generator'

export default function PasswordGeneratorPage() {
  return (
    <main className="w-full flex-1 px-4 py-8 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="mb-2 text-2xl font-bold text-[#152046] lg:text-3xl">Secure Password Generator</h2>
        <p className="text-gray-600">
          Generate strong, secure passwords with customizable options for maximum security.
        </p>
      </div>

      <PasswordGenerator />
    </main>
  )
}
