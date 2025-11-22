"use client";

import type React from "react";
import { useState } from "react";

import { Bar, BarChart, Cell, Pie, PieChart, XAxis } from "recharts";

import { Alert as UIAlert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconActivity as Activity,
  IconAlertTriangle as AlertTriangle,
  IconCircleCheck as CheckCircle,
  IconCircleX as XCircle,
  IconCreditCard as CreditCard,
  IconCurrencyDollar as DollarSign,
  IconDotsCircleHorizontal as MoreHorizontal,
  IconFilter as Filter,
  IconTrendingUp as TrendingUp,
  IconWallet as Wallet,
} from "@tabler/icons-react";
import { useLoaderData } from "@tanstack/react-router";

const Overview: React.FC = () => {
  const [alerts, _setAlerts] = useState<any[]>([
    {
      id: "1",
      type: "error",
      message: "Failed transaction threshold exceeded in EUR-USD corridor",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      type: "warning",
      message: "Low balance alert: Wallet #4829 below $1,000",
      timestamp: "5 min ago",
    },
    {
      id: "3",
      type: "info",
      message: "System maintenance scheduled for 2:00 AM UTC",
      timestamp: "1 hour ago",
    },
  ]);
  const data = useLoaderData({
    from: "/(dashboard)/",
  });
  console.log(data);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [kpiData] = useState<any>({
    totalTransactions: 24567,
    activeWallets: 1847,
    successRate: 98.7,
    totalVolume: 2847392,
  });

  const [recentTransactions] = useState<any[]>([
    {
      id: "TXN-8429",
      amount: 1250.0,
      status: "success",
      customer: "Acme Corp",
      corridor: "USD-EUR",
      timestamp: "2 min ago",
    },
    {
      id: "TXN-8428",
      amount: 850.5,
      status: "failed",
      customer: "Tech Solutions Ltd",
      corridor: "GBP-USD",
      timestamp: "5 min ago",
    },
    {
      id: "TXN-8427",
      amount: 2100.75,
      status: "success",
      customer: "Global Ventures",
      corridor: "EUR-JPY",
      timestamp: "8 min ago",
    },
    {
      id: "TXN-8426",
      amount: 675.25,
      status: "pending",
      customer: "StartUp Inc",
      corridor: "USD-CAD",
      timestamp: "12 min ago",
    },
  ]);

  const [monthlyVolumeData] = useState<any[]>([
    { month: "Jan", volume: 125000, transactions: 2450 },
    { month: "Feb", volume: 98000, transactions: 1890 },
    { month: "Mar", volume: 142000, transactions: 2780 },
    { month: "Apr", volume: 168000, transactions: 3200 },
    { month: "May", volume: 195000, transactions: 3650 },
    { month: "Jun", volume: 178000, transactions: 3420 },
    { month: "Jul", volume: 210000, transactions: 4100 },
    { month: "Aug", volume: 156000, transactions: 2980 },
  ]);

  const [corridorData] = useState<any[]>([
    { name: "USD-KES", transactions: 4200, volume: 1250000, color: "#3b82f6" },
    { name: "GBP-USD", transactions: 2800, volume: 835000, color: "#f59e0b" },
    { name: "EUR-JPY", transactions: 1800, volume: 537000, color: "#ec4899" },
    { name: "KES-OTH", transactions: 1200, volume: 358000, color: "#10b981" },
    { name: "USD-EUR", transactions: 800, volume: 240000, color: "#8b5cf6" },
    { name: "USD-JPY", transactions: 600, volume: 180000, color: "#14b8a6" },
    { name: "KES-USD", transactions: 400, volume: 120000, color: "#f43f5e" },
  ]);

  const barChartConfig = {
    volume: {
      label: "Volume",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const pieChartConfig = {
    corridor: {
      label: "Corridor",
    },
    "USD-KES": {
      label: "USD - KES",
      color: "var(--chart-1)",
    },
    "USD-EUR": {
      label: "USD - EUR",
      color: "var(--chart-2)",
    },
    "USD-JPY": {
      label: "USD - JPY",
      color: "var(--chart-3)",
    },
    "KES-USD": {
      label: "KES - USD",
      color: "var(--chart-4)",
    },
    "KES-OTH": {
      label: "Other",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Activity className="h-4 w-4 text-chart-3" />;
      default:
        return null;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 !text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 !text-yellow-500" />;
      case "info":
        return <CheckCircle className="h-4 w-4 !text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Dashboard Content */}
      <main className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-around space-y-0 pb-2">
              <CardTitle className="text-md font-medium text-muted-foreground">
                Total Transactions
              </CardTitle>
              <CreditCard
                className="text-blue-600 bg-blue-50 p-1 rounded-lg"
                size={40}
              />
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold text-card-foreground">
                {kpiData.totalTransactions.toLocaleString()}
              </h1>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium text-muted-foreground">
                Active Wallets
              </CardTitle>
              <Wallet
                className="text-teal-600 bg-teal-50 p-1 rounded-lg"
                size={40}
              />
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold text-card-foreground">
                {kpiData.activeWallets.toLocaleString()}
              </h1>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Success Rate
              </CardTitle>
              <TrendingUp
                className="text-green-600 bg-green-50 p-1 rounded-lg"
                size={40}
              />
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold text-card-foreground">
                {kpiData.successRate}%
              </h1>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Volume
              </CardTitle>
              <DollarSign
                className="text-indigo-600 bg-indigo-50 p-1 rounded-lg"
                size={40}
              />
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold text-card-foreground">
                ${kpiData.totalVolume.toLocaleString()}
              </h1>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Volume Chart */}
            <Card className="!p-6 flex flex-col justify-between">
              <CardHeader className="flex flex-col px-0">
                <div className="flex flex-row items-center justify-between px-0 w-full">
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    Transaction Volume
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Tabs defaultValue={"Monthly"}>
                      <TabsList>
                        {["Monthly", "Quarterly", "Yearly"].map((period) => (
                          <TabsTrigger
                            key={period}
                            value={period.toLowerCase()}
                          >
                            {period}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                <CardDescription className="justify-self-start">
                  January - June 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ChartContainer
                  className="h-full w-full"
                  config={barChartConfig}
                >
                  <BarChart
                    accessibilityLayer
                    data={monthlyVolumeData}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="85%"
                      fill="url(#highlighted-pattern-dots)"
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="transactions"
                      radius={4}
                      fill="var(--chart-3)"
                    >
                      {monthlyVolumeData.map((_, index) => (
                        <Cell
                          className="duration-200"
                          key={`cell-${index}`}
                          fillOpacity={
                            activeIndex === null
                              ? 1
                              : activeIndex === index
                                ? 1
                                : 0.3
                          }
                          onMouseEnter={() => setActiveIndex(index)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Corridor Performance Chart */}
            <Card className="!p-6 flex flex-col justify-between">
              <CardHeader className="flex flex-col px-0">
                <div className="flex flex-row items-center justify-between px-0 w-full">
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    Top Corridors
                  </CardTitle>
                </div>
                <CardDescription className="justify-self-start">
                  January - June 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={pieChartConfig}
                  className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      content={<ChartTooltipContent nameKey="name" hideLabel />}
                    />
                    <Pie
                      data={corridorData}
                      innerRadius={30}
                      dataKey="volume"
                      nameKey="name"
                      radius={10}
                      cornerRadius={8}
                      paddingAngle={4}
                    >
                      {corridorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                {/* Legend */}
                <div className="mt-6 space-y-2">
                  {corridorData.map((corridor) => (
                    <div
                      key={corridor.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: corridor.color }}
                        />
                        <span className="text-sm text-card-foreground">
                          {corridor.name}
                        </span>
                      </div>
                      <div className="text-right flex flex-row items-center gap-2">
                        <div className="text-sm font-medium text-card-foreground">
                          ${(corridor.volume / 1000).toLocaleString()}K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(
                            (corridor.transactions /
                              corridorData.reduce(
                                (sum, c) => sum + c.transactions,
                                0
                              )) *
                            100
                          ).toFixed(0)}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
                <AlertTriangle className="text-muted-foreground" size={18} />
                <span> Recent Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col justify-between h-full">
              <div className="flex flex-col space-y-2">
                {alerts.map((alert) => (
                  <UIAlert
                    key={alert.id}
                    className={`border-l-4 ${alert.type === "error" ? "border-l-destructive" : alert.type === "info" ? "border-l-blue-500" : "border-l-yellow-500"} w-full`}
                  >
                    {getAlertIcon(alert.type)}
                    <div>
                      <AlertDescription className="text-sm text-card-foreground">
                        {alert.message}
                      </AlertDescription>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                  </UIAlert>
                ))}
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
                <DollarSign className="text-muted-foreground" size={18} />
                <span> Recent Transactions</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="font-medium text-card-foreground">
                          {transaction.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.customer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-card-foreground">
                        ${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.corridor}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`text-white text-xs font-bold ${transaction.status === "success" ? "bg-green-600" : transaction.status === "failed" ? "bg-red-600" : "bg-yellow-600"}`}
                        variant={
                          transaction.status === "success"
                            ? "outline"
                            : transaction.status === "failed"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {transaction.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {transaction.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Overview;
