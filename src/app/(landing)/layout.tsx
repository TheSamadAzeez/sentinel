import { Logo } from '@/components/custom/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      {/* <header className="sticky top-0 z-50 flex w-full items-center justify-between px-10 py-5 backdrop-blur-xs">
        <Logo variant="dark" />
      </header> */}

      <main className="h-full w-full bg-gray-200">
        {children}

        {/* <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>
                Powered by{' '}
                <a
                  href="https://haveibeenpwned.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#96A4D3] hover:underline"
                >
                  Have I Been Pwned
                </a>{' '}
                API
              </p>
              <p className="mt-2">
                Sentinel helps you stay informed about password security and maintain good security practices.
              </p>
            </div>
          </div>
        </footer> */}
      </main>
    </div>
  )
}
