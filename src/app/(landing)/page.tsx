import { PasswordChecker } from '@/components/custom/password-checker'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-[#152046]">Password Security Check</h2>
        <p className="text-gray-600">
          Enter a password to check if it has been compromised in any known data breaches.
        </p>
      </div>

      <PasswordChecker />
    </main>
  )
}
