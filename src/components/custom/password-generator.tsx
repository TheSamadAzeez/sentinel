'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generatePassword, getPasswordStrength } from '@/utils/helpers'
import { PasswordGeneratorOptions } from '@/types/hibp'
import { Key, RefreshCw, Copy, CheckCircle } from 'lucide-react'

export function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [options, setOptions] = useState<PasswordGeneratorOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  })
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    try {
      const newPassword = generatePassword(options)
      setPassword(newPassword)
      setCopied(false)
    } catch (error) {
      console.error('Failed to generate password:', error)
    }
  }

  const handleCopy = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy password:', error)
    }
  }

  const strength = password ? getPasswordStrength(password) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-[#152046]">
          <Key className="h-6 w-6 text-[#96A4D3]" />
          Password Generator
        </CardTitle>
        <CardDescription>Generate secure passwords with customizable options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Options */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#152046]">Length: {options.length}</label>
            <input
              type="range"
              min="8"
              max="64"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
              style={{
                background: `linear-gradient(to right, #96A4D3 0%, #96A4D3 ${
                  ((options.length - 8) / (64 - 8)) * 100
                }%, #e5e7eb ${((options.length - 8) / (64 - 8)) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#96A4D3] focus:ring-[#96A4D3]"
              />
              <span className="text-sm text-[#152046]">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#96A4D3] focus:ring-[#96A4D3]"
              />
              <span className="text-sm text-[#152046]">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#96A4D3] focus:ring-[#96A4D3]"
              />
              <span className="text-sm text-[#152046]">Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#96A4D3] focus:ring-[#96A4D3]"
              />
              <span className="text-sm text-[#152046]">Symbols (!@#$%)</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} className="w-full bg-[#96A4D3] px-6 text-white hover:bg-[#96A4D3]/90">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>

        {/* Generated Password */}
        {password && (
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center gap-2 rounded-lg border bg-gray-50 p-4">
                <code className="flex-1 font-mono text-sm break-all text-[#152046]">{password}</code>
                <Button onClick={handleCopy} variant="outline" size="sm" className="shrink-0">
                  {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Password Strength */}
            {strength && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#152046]">Password Strength:</span>
                  <span className="text-sm font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(strength.score / 7) * 100}%`,
                      backgroundColor: strength.color,
                    }}
                  />
                </div>
              </div>
            )}

            {copied && <div className="text-center text-sm text-green-600">Password copied to clipboard!</div>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
