"use client";

import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NotificationIcon } from "@/components/dashboard/notifications/notification-icon";
import type { Notification } from "@/types/notification";

interface NotificationDetailsProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationDetails({
  notification,
  open,
  onOpenChange,
  onMarkAsRead,
}: NotificationDetailsProps) {
  if (!notification) return null;

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <NotificationIcon type={notification.type} />
            <DialogTitle>{notification.title}</DialogTitle>
          </div>
          <DialogDescription>
            {format(
              new Date(notification.timestamp),
              "MMMM d, yyyy 'at' h:mm a"
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            {notification.description}
          </p>

          {notification.metadata && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <h4 className="font-medium mb-2">Additional Information</h4>
              <dl className="grid grid-cols-2 gap-2">
                {notification.metadata.ticketId && (
                  <>
                    <dt className="text-muted-foreground">Ticket ID:</dt>
                    <dd>#{notification.metadata.ticketId}</dd>
                  </>
                )}
                {notification.metadata.userId && (
                  <>
                    <dt className="text-muted-foreground">User ID:</dt>
                    <dd>{notification.metadata.userId}</dd>
                  </>
                )}
                {notification.metadata.projectId && (
                  <>
                    <dt className="text-muted-foreground">Project ID:</dt>
                    <dd>{notification.metadata.projectId}</dd>
                  </>
                )}
                {notification.metadata.documentId && (
                  <>
                    <dt className="text-muted-foreground">Document ID:</dt>
                    <dd>{notification.metadata.documentId}</dd>
                  </>
                )}
                {notification.metadata.alertId && (
                  <>
                    <dt className="text-muted-foreground">Alert ID:</dt>
                    <dd>{notification.metadata.alertId}</dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {notification.status === "unread" && (
            <Button onClick={handleMarkAsRead}>Mark as Read</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
