'use client'

import { BreachData } from '@/types/hibp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatNumber } from '@/utils/helpers'
import { AlertCircle, Calendar, Database, Shield, Users } from 'lucide-react'

interface BreachCardProps {
  breach: BreachData
  compact?: boolean
}

export function BreachCard({ breach, compact = false }: BreachCardProps) {
  const getStatusColor = () => {
    if (breach.IsRetired) return 'bg-gray-500'
    if (breach.IsFabricated) return 'bg-orange-500'
    if (breach.IsSensitive) return 'bg-red-500'
    if (breach.IsVerified) return 'bg-[#96A4D3]'
    return 'bg-yellow-500'
  }

  const getStatusText = () => {
    if (breach.IsRetired) return 'Retired'
    if (breach.IsFabricated) return 'Fabricated'
    if (breach.IsSensitive) return 'Sensitive'
    if (breach.IsVerified) return 'Verified'
    return 'Unverified'
  }

  if (compact) {
    return (
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg text-[#152046]">{breach.Title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(breach.BreachDate)}
                <Users className="ml-2 h-4 w-4" />
                {formatNumber(breach.PwnCount)} accounts
              </CardDescription>
            </div>
            <Badge className={`${getStatusColor()} text-white`}>{getStatusText()}</Badge>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2 text-xl text-[#152046]">{breach.Title}</CardTitle>
            <CardDescription className="text-base">
              {breach.Domain && <span className="font-medium text-[#AA8F76]">{breach.Domain}</span>}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor()} text-white`}>{getStatusText()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: breach.Description }} />

        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#AA8F76]" />
            <span className="text-sm">
              <strong>Breach Date:</strong> {formatDate(breach.BreachDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#AA8F76]" />
            <span className="text-sm">
              <strong>Affected:</strong> {formatNumber(breach.PwnCount)} accounts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-[#AA8F76]" />
            <span className="text-sm">
              <strong>Added:</strong> {formatDate(breach.AddedDate)}
            </span>
          </div>

          {(breach.IsSensitive || breach.IsMalware || breach.IsSpamList) && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-600">
                {[breach.IsSensitive && 'Sensitive', breach.IsMalware && 'Malware', breach.IsSpamList && 'Spam List']
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
        </div>

        {breach.DataClasses.length > 0 && (
          <div className="border-t pt-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#AA8F76]" />
              <span className="text-sm font-medium">Compromised Data:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {breach.DataClasses.map((dataClass) => (
                <Badge key={dataClass} variant="outline" className="border-[#96A4D3] text-[#152046]">
                  {dataClass}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
