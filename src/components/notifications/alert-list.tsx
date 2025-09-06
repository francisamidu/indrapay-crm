"use client"

import { formatDistanceToNow } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Alert } from "@/types/notification"
import { AlertTriangle, CheckCircle, Eye } from "lucide-react"

interface AlertListProps {
  alerts: Alert[]
  onAcknowledge: (id: string) => void
  onResolve: (id: string) => void
  onViewDetails: (alert: Alert) => void
}

export function AlertList({ alerts, onAcknowledge, onResolve, onViewDetails }: AlertListProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "critical":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-50 text-red-700 border-red-200"
      case "acknowledged":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "resolved":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Alert</TableHead>
            <TableHead className="w-[100px]">Severity</TableHead>
            <TableHead className="w-[120px]">Time</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[150px]">Source</TableHead>
            <TableHead className="w-[150px]">Assigned To</TableHead>
            <TableHead className="w-[180px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No active alerts
              </TableCell>
            </TableRow>
          ) : (
            alerts.map((alert) => (
              <TableRow key={alert.id} className="group">
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{alert.source}</TableCell>
                <TableCell className="text-sm">{alert.assignedTo ? alert.assignedTo.name : "Unassigned"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(alert)}
                      className="h-8 px-2 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    {alert.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAcknowledge(alert.id)}
                        className="h-8 px-2 text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                      >
                        Acknowledge
                      </Button>
                    )}
                    {(alert.status === "active" || alert.status === "acknowledged") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onResolve(alert.id)}
                        className="h-8 px-2 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
