'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BreachCard } from './breach-card'
import { checkBreachByEmail, checkPastesByEmail } from '@/actions/hibp'
import { validateEmail, debounce } from '@/utils/helpers'
import { BreachData, PasteData } from '@/types/hibp'
import { Search, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'

export function EmailChecker() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [breaches, setBreaches] = useState<BreachData[]>([])
  const [pastes, setPastes] = useState<PasteData[]>([])
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!email.trim()) {
      setError('Please enter an email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')
    setBreaches([])
    setPastes([])
    setHasSearched(false)

    try {
      // Check breaches
      const breachResult = await checkBreachByEmail(email)
      if (!breachResult.success) {
        setError(breachResult.error || 'Failed to check breaches')
        return
      }

      // Check pastes
      const pasteResult = await checkPastesByEmail(email)
      if (!pasteResult.success) {
        // Don't fail completely if pastes check fails
        console.warn('Paste check failed:', pasteResult.error)
      }

      setBreaches(breachResult.data || [])
      setPastes(pasteResult.data || [])
      setHasSearched(true)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const _debouncedSearch = debounce(handleSearch, 300)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const isClean = hasSearched && breaches.length === 0 && pastes.length === 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#152046]">
            <Search className="h-6 w-6 text-[#96A4D3]" />
            Check Email Address
          </CardTitle>
          <CardDescription>
            Enter an email address to check if it has been compromised in any known data breaches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={loading}
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !email.trim()}
              className="bg-[#96A4D3] px-6 text-white hover:bg-[#96A4D3]/90"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check'}
            </Button>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {isClean && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Good news! This email address was not found in any known data breaches.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {hasSearched && (breaches.length > 0 || pastes.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-[#152046]">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Security Alert
            </CardTitle>
            <CardDescription>
              This email address has been found in {breaches.length} data breach
              {breaches.length !== 1 ? 'es' : ''}
              {pastes.length > 0 && ` and ${pastes.length} paste${pastes.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {breaches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#152046]">Data Breaches ({breaches.length})</h3>
          <div className="grid gap-4">
            {breaches.map((breach) => (
              <BreachCard key={breach.Name} breach={breach} />
            ))}
          </div>
        </div>
      )}

      {pastes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#152046]">Pastes ({pastes.length})</h3>
          <div className="grid gap-4">
            {pastes.map((paste) => (
              <Card key={paste.Id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-[#152046]">{paste.Title || 'Untitled Paste'}</h4>
                      <p className="mt-1 text-sm text-gray-600">Source: {paste.Source}</p>
                      {paste.Date && (
                        <p className="text-sm text-gray-500">Date: {new Date(paste.Date).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#AA8F76]">{paste.EmailCount.toLocaleString()} emails</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
