'use client'

import { useState } from 'react'
import { Navigation } from '@/components/custom/navigation'
import { PasswordChecker } from '@/components/custom/password-checker'
import { BreachBrowser } from '@/components/custom/breach-browser'
import { PasswordGenerator } from '@/components/custom/password-generator'

export default function Home() {
  const [activeTab, setActiveTab] = useState('password-check')

  const renderContent = () => {
    switch (activeTab) {
      case 'password-check':
        return <PasswordChecker />
      case 'breach-browser':
        return <BreachBrowser />
      case 'password-generator':
        return <PasswordGenerator />
      default:
        return <PasswordChecker />
    }
  }

  return (
    <div className="flex flex-col">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-[#152046]">
            {activeTab === 'password-check' && 'Password Security Check'}
            {activeTab === 'breach-browser' && 'Data Breach Database'}
            {activeTab === 'password-generator' && 'Secure Password Generator'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'password-check' &&
              'Enter a password to check if it has been compromised in any known data breaches.'}
            {activeTab === 'breach-browser' &&
              'Browse through a comprehensive database of known security breaches and incidents.'}
            {activeTab === 'password-generator' &&
              'Generate strong, secure passwords with customizable options for maximum security.'}
          </p>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}
