import { Ticket, MessageSquare, Users, AlertTriangle, Bell } from "lucide-react"
import type { NotificationType } from "@/types/notification"
import { cn } from "@/lib/utils"

interface NotificationIconProps {
  type: NotificationType
  className?: string
}

export function NotificationIcon({ type, className }: NotificationIconProps) {
  const iconClassName = cn("h-5 w-5", className)

  switch (type) {
    case "ticket":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 text-blue-600">
          <Ticket className={iconClassName} />
        </div>
      )
    case "message":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100 text-green-600">
          <MessageSquare className={iconClassName} />
        </div>
      )
    case "team":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100 text-purple-600">
          <Users className={iconClassName} />
        </div>
      )
    case "system":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-100 text-amber-600">
          <AlertTriangle className={iconClassName} />
        </div>
      )
    case "alert":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-600">
          <AlertTriangle className={iconClassName} />
        </div>
      )
    default:
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600">
          <Bell className={iconClassName} />
        </div>
      )
  }
}
