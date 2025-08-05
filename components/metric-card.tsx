import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: ReactNode
  trend?: string
  color?: "blue" | "green" | "purple" | "orange" | "red"
  className?: string
}

export function MetricCard({ title, value, subtitle, icon, trend, color = "blue", className }: MetricCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
    red: "bg-red-50 border-red-200",
  }

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
  }

  return (
    <Card className={cn("border-0 shadow-sm", colorClasses[color], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {icon && <div className={iconColorClasses[color]}>{icon}</div>}
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {trend && (
          <div className="mt-3">
            <Badge variant="secondary" className="text-xs bg-white/50">
              {trend}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
