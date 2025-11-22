import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMenuContext } from "@/contexts/menu-context";
import { cn } from "@/lib/utils";
import {
  IconLayoutSidebar as SidebarIcon1,
  IconMoon as DarkIcon,
  IconSun as LightIcon,
} from "@tabler/icons-react";
import { Link, useLocation } from "@tanstack/react-router";

import { LogoIcon } from "../logo";
import { Button } from "../ui/button";

export function Sidebar() {
  const pathname = useLocation().pathname;
  const { menuItems: navigation } = useMenuContext();
  console.log("Sidebar navigation items:", navigation);
  return (
    <div className="w-64 !bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto fixed top-0 left-0 z-20">
      <div className="flex flex-grow flex-col overflow-y-auto pt-5">
        <div className="flex justify-between items-center px-2">
          <h1 className="text-xl font-bold flex space-x-2">
            <LogoIcon className="!bg-gray-100" />
            <span>Indrapay CRM</span>
          </h1>
          <Button className="!bg-white -mt-1" variant="ghost">
            <SidebarIcon1 />
          </Button>
        </div>
        <div className="mt-8 flex flex-1 flex-col px-4">
          <nav className="flex-1 space-y-1  pb-4">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? " !border-primary !text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:bg-accent",
                    "hover:bg-primary/10 group border-l-4 border-transparent flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200"
                  )}
                >
                  <span
                    className="mr-3 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {isActive ? item.activeIcon : item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <Tabs defaultValue="light">
            <TabsList className="bg-transparent border rounded-md p-1 w-full">
              <TabsTrigger value="light" asChild>
                <Button variant="ghost">
                  {" "}
                  <LightIcon className="mr-2" />
                  Light
                </Button>
              </TabsTrigger>
              <TabsTrigger value="dark" asChild>
                <Button variant="ghost">
                  {" "}
                  <DarkIcon className="mr-2" />
                  Dark
                </Button>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
