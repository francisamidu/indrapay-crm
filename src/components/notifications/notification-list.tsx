"use client";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationIcon } from "@/components/dashboard/notifications/notification-icon";
import type { Notification, NotificationFilter } from "@/types/notification";
import { Edit } from "lucide-react";

interface NotificationListProps {
  notifications: Notification[];
  filter: NotificationFilter;
  onMarkAsRead: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
}

export function NotificationList({
  notifications,
  filter,
  onMarkAsRead,
  onViewDetails,
}: NotificationListProps) {
  // Apply filters
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (
      filter.type &&
      filter.type !== "all" &&
      notification.type !== filter.type
    ) {
      return false;
    }

    // Filter by status
    if (
      filter.status &&
      filter.status !== "all" &&
      notification.status !== filter.status
    ) {
      return false;
    }

    // Filter by search term
    if (filter.search && filter.search.trim() !== "") {
      const searchTerm = filter.search.toLowerCase();
      return (
        notification.title.toLowerCase().includes(searchTerm) ||
        notification.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by time range
    if (filter.timeRange && filter.timeRange !== "all") {
      const now = new Date();
      const notificationDate = new Date(notification.timestamp);

      switch (filter.timeRange) {
        case "today":
          return notificationDate.toDateString() === now.toDateString();
        case "yesterday": {
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          return notificationDate.toDateString() === yesterday.toDateString();
        }
        case "week": {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return notificationDate >= weekAgo;
        }
        case "month": {
          const monthAgo = new Date(now);
          monthAgo.setMonth(now.getMonth() - 1);
          return notificationDate >= monthAgo;
        }
        default:
          return true;
      }
    }

    return true;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Notification</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="w-[120px]">Time</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredNotifications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No notifications found
              </TableCell>
            </TableRow>
          ) : (
            filteredNotifications.map((notification) => (
              <TableRow key={notification.id} className="group">
                <TableCell>
                  <div className="flex items-start gap-3">
                    <NotificationIcon type={notification.type} />
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {notification.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      notification.type === "ticket"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : notification.type === "message"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : notification.type === "team"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {notification.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.timestamp), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      notification.status === "unread"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {notification.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(notification)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
