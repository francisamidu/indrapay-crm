"use client"

import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { Alert } from "@/types/notification"

interface AlertDetailsProps {
  alert: Alert | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAcknowledge: (id: string) => void
  onResolve: (id: string) => void
}

export function AlertDetails({ alert, open, onOpenChange, onAcknowledge, onResolve }: AlertDetailsProps) {
  if (!alert) return null

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

  const handleAcknowledge = () => {
    onAcknowledge(alert.id)
    onOpenChange(false)
  }

  const handleResolve = () => {
    onResolve(alert.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>{alert.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`capitalize ${getSeverityColor(alert.severity)}`}>
                  {alert.severity} severity
                </Badge>
                <Badge variant="outline" className={`capitalize ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </Badge>
              </div>
            </div>
          </div>
          <DialogDescription className="flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3" />
            {format(new Date(alert.timestamp), "MMMM d, yyyy 'at' h:mm a")}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-muted p-4 text-sm">
              <h4 className="font-medium mb-2">Alert Information</h4>
              <dl className="grid gap-2">
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Source:</dt>
                  <dd>{alert.source}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="capitalize">{alert.status}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Severity:</dt>
                  <dd className="capitalize">{alert.severity}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Assigned To:</dt>
                  <dd>{alert.assignedTo ? alert.assignedTo.name : "Unassigned"}</dd>
                </div>
              </dl>
            </div>

            {alert.affectedEntity && (
              <div className="rounded-md bg-muted p-4 text-sm">
                <h4 className="font-medium mb-2">Affected Entity</h4>
                <dl className="grid gap-2">
                  <div className="grid grid-cols-2">
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd className="capitalize">{alert.affectedEntity.type}</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-muted-foreground">ID:</dt>
                    <dd>{alert.affectedEntity.id}</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-muted-foreground">Name:</dt>
                    <dd>{alert.affectedEntity.name}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {alert.status === "active" && (
            <Button
              variant="outline"
              onClick={handleAcknowledge}
              className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            >
              Acknowledge
            </Button>
          )}
          {(alert.status === "active" || alert.status === "acknowledged") && (
            <Button onClick={handleResolve} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
