"use client";

import { useState } from "react";
import { IconSearch as Search } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBell } from "../notifications/notification-bell";
import type { User } from "@/types";
import { alerts, notifications } from "@/shared/notifications-data";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-card border-b border-slate-50 px-6 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your payment gateway performance
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          <NotificationBell notifications={notifications} alerts={alerts} />

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
