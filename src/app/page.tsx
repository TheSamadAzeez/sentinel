import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Search, Database, Key, AlertTriangle, Lock, Users, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#152046] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#152046] to-[#1a2751] opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-[#96A4D3]/20 p-6">
                <Shield className="h-16 w-16 text-[#96A4D3]" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Digital Security <span className="text-[#96A4D3]">Guardian</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Protect yourself from data breaches with comprehensive password security checks, breach monitoring, and
              secure password generation tools.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/password-check">
                <Button size="lg" className="w-full bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90 sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Check Your Password
                </Button>
              </Link>
              <Link href="/breach">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white bg-[#152046] text-white hover:bg-white hover:text-[#152046] sm:w-auto"
                >
                  <Database className="mr-2 h-5 w-5" />
                  Browse Breaches
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#152046] sm:text-4xl">Complete Security Toolkit</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to stay protected in the digital world
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Password Check Feature */}
            <Card className="border-2 transition-colors duration-300 hover:border-[#96A4D3]/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/10">
                  <Search className="h-8 w-8 text-[#96A4D3]" />
                </div>
                <CardTitle className="text-[#152046]">Password Security Check</CardTitle>
                <CardDescription>
                  Instantly verify if your password has been compromised in known data breaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/password-check">
                  <Button className="w-full bg-[#152046] hover:bg-[#152046]/90">Start Checking</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Breach Database Feature */}
            <Card className="border-2 transition-colors duration-300 hover:border-[#96A4D3]/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/10">
                  <Database className="h-8 w-8 text-[#96A4D3]" />
                </div>
                <CardTitle className="text-[#152046]">Breach Database</CardTitle>
                <CardDescription>Explore comprehensive database of security breaches and incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/breach">
                  <Button className="w-full bg-[#152046] hover:bg-[#152046]/90">Browse Breaches</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Password Generator Feature */}
            <Card className="border-2 transition-colors duration-300 hover:border-[#96A4D3]/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/10">
                  <Key className="h-8 w-8 text-[#96A4D3]" />
                </div>
                <CardTitle className="text-[#152046]">Password Generator</CardTitle>
                <CardDescription>Generate strong, secure passwords with customizable complexity</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/generator">
                  <Button className="w-full bg-[#152046] hover:bg-[#152046]/90">Generate Password</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#152046] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Security by the Numbers</h2>
            <p className="text-lg text-gray-300">The scale of digital security threats</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/20">
                <AlertTriangle className="h-8 w-8 text-[#96A4D3]" />
              </div>
              <div className="mb-2 text-3xl font-bold text-[#96A4D3]">15B+</div>
              <div className="text-gray-300">Compromised Accounts</div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/20">
                <Users className="h-8 w-8 text-[#96A4D3]" />
              </div>
              <div className="mb-2 text-3xl font-bold text-[#96A4D3]">800+</div>
              <div className="text-gray-300">Known Data Breaches</div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A4D3]/20">
                <TrendingUp className="h-8 w-8 text-[#96A4D3]" />
              </div>
              <div className="mb-2 text-3xl font-bold text-[#96A4D3]">45%</div>
              <div className="text-gray-300">Password Reuse Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#96A4D3]/10 to-[#152046]/10 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8">
            <Lock className="mx-auto mb-6 h-16 w-16 text-[#96A4D3]" />
            <h2 className="mb-4 text-3xl font-bold text-[#152046]">Take Control of Your Digital Security</h2>
            <p className="mb-8 text-lg text-gray-600">
              Don&apos;t wait for a breach to happen. Start protecting yourself today with our comprehensive security
              tools and stay one step ahead of cyber threats.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/password-check">
              <Button size="lg" className="w-full bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90 sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/breach">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-[#152046] text-[#152046] hover:bg-[#152046] hover:text-white sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
