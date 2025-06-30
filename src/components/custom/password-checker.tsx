'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { checkPasswordPwned } from '@/actions/hibp'
import { getPasswordStrength } from '@/utils/helpers'
import { Search, AlertTriangle, CheckCircle, Loader2, Eye, EyeOff, Shield } from 'lucide-react'

export function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    isPwned: boolean
    count: number
  } | null>(null)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSearch = async () => {
    if (!password.trim()) {
      setError('Please enter a password')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)
    setHasSearched(false)

    try {
      const response = await checkPasswordPwned(password)
      if (!response.success) {
        setError(response.error || 'Failed to check password')
        return
      }

      setResult({
        isPwned: response.isPwned,
        count: response.count || 0,
      })
      setHasSearched(true)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const passwordStrength = password ? getPasswordStrength(password) : null
  const isSecure = hasSearched && result && !result.isPwned

  return (
    <div className="w-full space-y-6 lg:w-[50vw]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-[#152046] lg:text-2xl">
            <Search className="h-6 w-6 text-[#96A4D3]" />
            Check Password Security
          </CardTitle>
          <CardDescription>
            Enter a password to check if it has been compromised in any known data breaches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !password.trim()}
              className="bg-[#96A4D3] px-6 text-white hover:bg-[#96A4D3]/90"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check'}
            </Button>
          </div>

          {/* Password Strength Indicator */}
          {password && passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                <span className="text-sm font-medium" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${(passwordStrength.score / 7) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
            </div>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {isSecure && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Great! This password has not been found in any known data breaches.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {hasSearched && result && result.isPwned && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Password Compromised
            </CardTitle>
            <CardDescription>This password has been found in data breaches and should not be used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-red-50 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Password found in {result.count.toLocaleString()} breach{result.count !== 1 ? 'es' : ''}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        This password has been seen {result.count.toLocaleString()} time{result.count !== 1 ? 's' : ''}{' '}
                        in previous data breaches. Using this password puts your accounts at risk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-[#152046]">Recommendations:</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                  <li>Create a new, unique password immediately</li>
                  <li>Use a combination of uppercase and lowercase letters, numbers, and symbols</li>
                  <li>Make it at least 12 characters long</li>
                  <li>Consider using a password manager to generate and store strong passwords</li>
                  <li>Enable two-factor authentication whenever possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasSearched && (
        <Card>
          <CardContent className="">
            <div className="text-center text-sm text-gray-500">
              <p>
                Password checking powered by{' '}
                <a
                  href="https://haveibeenpwned.com/Passwords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#96A4D3] hover:underline"
                >
                  Have I Been Pwned
                </a>
              </p>
              <p className="">Your password is checked using k-anonymity to protect your privacy.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
