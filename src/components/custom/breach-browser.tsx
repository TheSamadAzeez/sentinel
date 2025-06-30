'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BreachCard } from './breach-card'
import { getAllBreaches } from '@/actions/hibp'
import { BreachData } from '@/types/hibp'
import { Search, Database, Filter, Loader2 } from 'lucide-react'
import { formatNumber } from '@/utils/helpers'
import { ScrollArea } from '@/components/ui/scroll-area'

export function BreachBrowser() {
  const [breaches, setBreaches] = useState<BreachData[]>([])
  const [filteredBreaches, setFilteredBreaches] = useState<BreachData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'name'>('date')
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'sensitive'>('all')

  useEffect(() => {
    const fetchBreaches = async () => {
      setLoading(true)
      try {
        const result = await getAllBreaches()
        if (result.success && result.data) {
          setBreaches(result.data)
          setFilteredBreaches(result.data)
        } else {
          setError(result.error || 'Failed to fetch breaches')
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Fetch breaches error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBreaches()
  }, [])

  useEffect(() => {
    let filtered = [...breaches]

    // Apply text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (breach) =>
          breach.Title.toLowerCase().includes(query) ||
          breach.Domain.toLowerCase().includes(query) ||
          breach.Description.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (filterBy === 'verified') {
      filtered = filtered.filter((breach) => breach.IsVerified)
    } else if (filterBy === 'sensitive') {
      filtered = filtered.filter((breach) => breach.IsSensitive)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.BreachDate).getTime() - new Date(a.BreachDate).getTime()
        case 'size':
          return b.PwnCount - a.PwnCount
        case 'name':
          return a.Title.localeCompare(b.Title)
        default:
          return 0
      }
    })

    setFilteredBreaches(filtered)
  }, [breaches, searchQuery, sortBy, filterBy])

  const totalAccounts = breaches.reduce((sum, breach) => sum + breach.PwnCount, 0)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-[#152046]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading breach data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mb-4 text-red-600">
            <Database className="mx-auto mb-2 h-12 w-12" />
            <p className="font-medium">Failed to Load Breach Data</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#152046]">
            <Database className="h-6 w-6 text-[#96A4D3]" />
            Breach Database
          </CardTitle>
          <CardDescription>
            Browse {formatNumber(breaches.length)} known data breaches affecting {formatNumber(totalAccounts)} accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search breaches by name, domain, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#AA8F76]" />
              <span className="text-sm font-medium text-[#152046]">Filter:</span>
              <div className="flex gap-1">
                <Button
                  variant={filterBy === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterBy('all')}
                  className={filterBy === 'all' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterBy === 'verified' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterBy('verified')}
                  className={filterBy === 'verified' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  Verified
                </Button>
                <Button
                  variant={filterBy === 'sensitive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterBy('sensitive')}
                  className={filterBy === 'sensitive' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  Sensitive
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#152046]">Sort by:</span>
              <div className="flex gap-1">
                <Button
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('date')}
                  className={sortBy === 'date' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  Date
                </Button>
                <Button
                  variant={sortBy === 'size' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('size')}
                  className={sortBy === 'size' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  Size
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                  className={sortBy === 'name' ? 'bg-[#96A4D3] text-white hover:bg-[#96A4D3]/90' : ''}
                >
                  Name
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-[#96A4D3] text-[#152046]">
              {formatNumber(filteredBreaches.length)} breach
              {filteredBreaches.length !== 1 ? 'es' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Breach List */}
      {filteredBreaches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-gray-500">
              <Search className="mx-auto mb-4 h-12 w-12" />
              <p className="text-lg font-medium">No breaches found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-500px)]">
          <div className="grid gap-4">
            {filteredBreaches.map((breach) => (
              <BreachCard key={breach.Name} breach={breach} compact />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
