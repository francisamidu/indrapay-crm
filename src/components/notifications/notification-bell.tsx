"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationIcon } from "./notification-icon";
import { formatDistanceToNow } from "date-fns";
import type { Notification, Alert } from "@/types/notification";
import { Link } from "@tanstack/react-router";

interface NotificationBellProps {
  notifications: Notification[];
  alerts: Alert[];
}

export function NotificationBell({
  notifications,
  alerts,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);

  // Count unread notifications and active alerts
  const unreadNotifications = notifications.filter(
    (n) => n.status === "unread"
  ).length;
  const activeAlerts = alerts.filter((a) => a.status === "active").length;
  const totalUnread = unreadNotifications + activeAlerts;

  // Get recent items to display in the dropdown (max 5)
  const recentNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalUnread > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {totalUnread > 9 ? "9+" : totalUnread}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {totalUnread > 0 ? (
            <p className="text-xs text-muted-foreground">
              You have {totalUnread} unread{" "}
              {totalUnread === 1 ? "notification" : "notifications"}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              You're all caught up!
            </p>
          )}
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {recentNotifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 flex items-start gap-3 hover:bg-muted/50 ${
                    notification.status === "unread" ? "bg-muted/20" : ""
                  }`}
                >
                  <NotificationIcon
                    type={notification.type}
                    className="h-4 w-4"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {notification.status === "unread" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t text-center">
          <Link
            to="/alerts"
            className="text-sm font-medium text-primary hover:underline"
            onClick={() => setOpen(false)}
          >
            View all notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
