"use client";
import React, { createContext, useContext, useState } from "react";

import type { ReactNode, Dispatch, SetStateAction } from "react";

import {
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
  IconUsersGroup,
  IconSettings,
  IconSettingsFilled,
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
    href: "/",
    icon: <DashboardIcon1 />,
    activeIcon: <DashboardIcon2 />,
  },
  {
    name: "Wallet Management",
    href: "/wallet-management",
    icon: <UsersIcon />,
    activeIcon: <UsersIcon2 />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <TransactionsIcon />,
    activeIcon: <TransactionsIcon2 />,
  },
  {
    name: "Corridors",
    href: "/corridors",
    icon: <CorridorIcon1 />,
    activeIcon: <CorridorIcon2 />,
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: <ComplianceIcon1 />,
    activeIcon: <ComplianceIcon2 />,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <ReportsIcon />,
    activeIcon: <ReportsIcon2 />,
  },
  {
    name: "Partners",
    href: "/partners",
    icon: <IconUsersGroup />,
    activeIcon: <IconUsersGroup />,
  },
  {
    name: "Operations",
    href: "/operations",
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
