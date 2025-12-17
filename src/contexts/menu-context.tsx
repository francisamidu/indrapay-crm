"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import React, { createContext, useContext, useState } from "react";

import {
  IconChartPie as ReportsIcon,
  IconChartPieFilled as ReportsIcon2,
  IconCopyCheck as ComplianceIcon1,
  IconCopyCheckFilled as ComplianceIcon2,
  IconCurrencyDollar as TransactionsIcon,
  IconLayout2 as DashboardIcon1,
  IconLayout2Filled as DashboardIcon2,
  IconReceiptDollarFilled as TransactionsIcon2,
  IconReceiptEuro as CorridorIcon1,
  IconReceiptEuroFilled as CorridorIcon2,
  IconSettings,
  IconSettingsFilled,
  IconUserFilled as UsersIcon2,
  IconUsers as UsersIcon,
  IconUsersGroup,
} from "@tabler/icons-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

// Define context shape
interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
  pageRoles: string[];
}

// Create context with default empty values
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Define initial state
const initialMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon1 />,
    activeIcon: <DashboardIcon2 />,
  },
  {
    name: "Wallet Management",
    href: "/dashboard/wallet-management",
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
  {
    name: "Partners",
    href: "/dashboard/partners",
    icon: <IconUsersGroup />,
    activeIcon: <IconUsersGroup />,
  },
  {
    name: "Operations",
    href: "/dashboard/operations",
    icon: <IconSettings />,
    activeIcon: <IconSettingsFilled />,
  },
];

const _pageRoles = [
  "Monitor your payment gateway performance",
  "Manage your accounts & wallet",
  "Manage your transactions",
  "Manage corridors",
  "Manage compliance",
  "View reports",
  "Manage partners",
  "Manage bulk operations, manual transactions, and support workflows",
];

// Context Provider
export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [pageRoles, _setPageRoles] = useState<string[]>(_pageRoles);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems, pageRoles }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
};
