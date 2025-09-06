import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { LogoIcon } from "../logo";
import {
  IconLayoutSidebar as SidebarIcon1,
  IconLayoutSidebarFilled as SidebarIcon2,
  IconLayout2 as DashboardIcon1,
  IconLayout2Filled as DashboardIcon2,
  IconUsers as UsersIcon,
  IconUserFilled as UsersIcon2,
  IconCurrencyDollar as TransactionsIcon,
  IconReceiptDollarFilled as TransactionsIcon2,
  IconChartPie as ReportsIcon,
  IconChartPieFilled as ReportsIcon2,
  IconCopyCheck as ComplianceIcon1,
  IconCopyCheckFilled as ComplianceIcon2,
  IconReceiptEuro as CorridorIcon1,
  IconReceiptEuroFilled as CorridorIcon2,
} from "@tabler/icons-react";
import { Button } from "../ui/button";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: <DashboardIcon1 />,
    activeIcon: <DashboardIcon2 />,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: <UsersIcon />,
    activeIcon: <UsersIcon2 />,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <TransactionsIcon />,
    activeIcon: <TransactionsIcon2 />,
  },
  {
    name: "Corridors",
    href: "/dashboard/corridors",
    icon: <CorridorIcon1 />,
    activeIcon: <CorridorIcon2 />,
  },
  {
    name: "Compliance",
    href: "/dashboard/compliance",
    icon: <ComplianceIcon1 />,
    activeIcon: <ComplianceIcon2 />,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: <ReportsIcon />,
    activeIcon: <ReportsIcon2 />,
  },
];

export function Sidebar() {
  const pathname = useLocation().pathname;

  return (
    <div className="w-64 !bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto fixed top-0 left-0 z-20">
      <div className="flex flex-grow flex-col overflow-y-auto pt-5">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-xl font-bold flex space-x-2">
            <LogoIcon className="!bg-gray-100" />
            <span>Indrapay CRM</span>
          </h1>
          <Button className="!bg-white -mt-1" variant="ghost">
            <SidebarIcon1 />
          </Button>
        </div>
        <div className="mt-8 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
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
                      ? "bg-gray-200 !border-teal-800"
                      : "text-muted-foreground hover:bg-accent",
                    "group border-l-4 border-transparent flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200"
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
        </div>
      </div>
    </div>
  );
}
