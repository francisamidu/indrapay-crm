"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconCircleCheck as CheckCircle,
  IconCircleX as CircleX,
  IconActivity as Activity,
  IconFilter as Filter,
  IconDots as MoreHorizontal,
  IconDownload as Download,
  IconCalendar as Calendar,
  IconRefresh as RefreshCw,
  IconArrowsUpDown as ArrowUpDown,
  IconEye as Eye,
  IconRotateClockwise as RotateCcw,
  IconBan as Ban,
} from "@tabler/icons-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { TransactionDetail, TransactionKPIs } from "@/types/transactions";

const TransactionManagement: React.FC<{
  onNavigate?: (page: string) => void;
}> = () => {
  const [searchQuery, _setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [corridorFilter, _setCorridorFilter] = useState<string>("all");
  const [typeFilter, _setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState("7days");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDetail | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [kpiData] = useState<TransactionKPIs>({
    paymentSuccess: { amount: 2847392, change: 12.5 },
    paymentPending: { amount: 156780, change: -2.1 },
    totalProcessed: { count: 24567, change: 8.3 },
    totalTransactions: { count: 25890, change: 6.7 },
    totalCancelled: { count: 432, change: -15.2 },
  });

  const [transactions] = useState<TransactionDetail[]>([
    {
      id: "TXN-D983274",
      amount: 1250.0,
      status: "success",
      sender: { name: "Acme Corp", email: "finance@acme.com", country: "US" },
      receiver: {
        name: "Tech Solutions Ltd",
        email: "billing@techsol.com",
        country: "GB",
      },
      corridor: "USD-GBP",
      fees: 12.5,
      fxRate: 0.79,
      timestamp: "2024-01-15T10:30:00Z",
      type: "transfer",
      reference: "INV-2024-001",
    },
    {
      id: "TXN-D574839",
      amount: 850.5,
      status: "failed",
      sender: {
        name: "Global Ventures",
        email: "pay@global.com",
        country: "DE",
      },
      receiver: {
        name: "StartUp Inc",
        email: "accounts@startup.com",
        country: "CA",
      },
      corridor: "EUR-CAD",
      fees: 8.5,
      fxRate: 1.45,
      timestamp: "2024-01-15T09:15:00Z",
      type: "payment",
      reference: "ORD-2024-789",
    },
    {
      id: "TXN-D109827",
      amount: 2100.75,
      status: "pending",
      sender: {
        name: "Digital Corp",
        email: "finance@digital.com",
        country: "US",
      },
      receiver: {
        name: "Innovation Ltd",
        email: "billing@innovation.com",
        country: "AU",
      },
      corridor: "USD-AUD",
      fees: 21.0,
      fxRate: 1.52,
      timestamp: "2024-01-15T08:45:00Z",
      type: "transfer",
      reference: "TRF-2024-456",
    },
    {
      id: "TXN-D485902",
      amount: 675.25,
      status: "cancelled",
      sender: {
        name: "Retail Chain",
        email: "payments@retail.com",
        country: "GB",
      },
      receiver: {
        name: "Supplier Co",
        email: "receivables@supplier.com",
        country: "FR",
      },
      corridor: "GBP-EUR",
      fees: 6.75,
      fxRate: 1.17,
      timestamp: "2024-01-15T07:20:00Z",
      type: "payment",
      reference: "PO-2024-123",
    },
    {
      id: "TXN-D768291",
      amount: 450.0,
      status: "success",
      sender: {
        name: "E-commerce Ltd",
        email: "finance@ecom.com",
        country: "CA",
      },
      receiver: {
        name: "Logistics Inc",
        email: "billing@logistics.com",
        country: "US",
      },
      corridor: "CAD-USD",
      fees: 4.5,
      fxRate: 0.74,
      timestamp: "2024-01-15T06:10:00Z",
      type: "refund",
      reference: "REF-2024-890",
    },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        debouncedSearch === "" ||
        transaction.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        transaction.sender.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        transaction.receiver.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        transaction.reference
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesCorridor =
        corridorFilter === "all" || transaction.corridor === corridorFilter;
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      return matchesSearch && matchesStatus && matchesCorridor && matchesType;
    });
  }, [transactions, debouncedSearch, statusFilter, corridorFilter, typeFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "failed":
        return <CircleX className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Activity className="h-4 w-4 text-chart-3" />;
      case "cancelled":
        return <Ban className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default";
      case "failed":
        return "destructive";
      case "pending":
        return "secondary";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map((t) => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (transactionId: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions((prev) => [...prev, transactionId]);
    } else {
      setSelectedTransactions((prev) =>
        prev.filter((id) => id !== transactionId)
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto flex flex-col space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <Calendar className="h-4 w-4 mr-2 text-teal-700" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payment Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(kpiData.paymentSuccess.amount)}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.paymentSuccess.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payment Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(kpiData.paymentPending.amount)}
            </div>
            <p className="text-xs text-destructive">
              {kpiData.paymentPending.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {kpiData.totalProcessed.count.toLocaleString()}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.totalProcessed.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {kpiData.totalTransactions.count.toLocaleString()}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.totalTransactions.change}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={
                  selectedTransactions.length === filteredTransactions.length &&
                  filteredTransactions.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Transaction ID</span>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              {selectedTransactions.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Retry ({selectedTransactions.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refund
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={selectedTransactions.includes(transaction.id)}
                  onCheckedChange={(checked) =>
                    handleSelectTransaction(transaction.id, checked as boolean)
                  }
                />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getStatusIcon(transaction.status)}
                  <div className="min-w-0">
                    <p className="font-medium text-card-foreground">
                      {transaction.id}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {transaction.type}
                    </p>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-card-foreground">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.corridor}
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground">
                    {transaction.sender.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    → {transaction.receiver.name}
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground">
                    Fee: {formatCurrency(transaction.fees)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rate: {transaction.fxRate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge
                      variant={getStatusBadgeVariant(transaction.status)}
                      className={`${transaction.status === "cancelled" ? "text-black" : "text-white"}`}
                    >
                      {transaction.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(transaction.timestamp)}
                    </p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Transaction Details</DialogTitle>
                        <DialogDescription>
                          Complete information for transaction {transaction.id}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedTransaction && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Sender</h4>
                              <p className="text-sm">
                                {selectedTransaction.sender.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedTransaction.sender.email}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedTransaction.sender.country}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Receiver</h4>
                              <p className="text-sm">
                                {selectedTransaction.receiver.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedTransaction.receiver.email}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedTransaction.receiver.country}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Amount</h4>
                              <p className="text-lg font-bold">
                                {formatCurrency(selectedTransaction.amount)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Fees</h4>
                              <p className="text-lg">
                                {formatCurrency(selectedTransaction.fees)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">FX Rate</h4>
                              <p className="text-lg">
                                {selectedTransaction.fxRate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={getStatusBadgeVariant(
                                  selectedTransaction.status
                                )}
                              >
                                {selectedTransaction.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDateTime(selectedTransaction.timestamp)}
                              </span>
                            </div>

                            {selectedTransaction.status === "failed" && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-transparent"
                                >
                                  <RefreshCw className="h-4 w-4" />
                                  Retry Transaction
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-transparent"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                  Process Refund
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {transaction.status === "failed" && (
                        <>
                          <DropdownMenuItem>Retry Transaction</DropdownMenuItem>
                          <DropdownMenuItem>Process Refund</DropdownMenuItem>
                        </>
                      )}
                      {transaction.status === "success" && (
                        <DropdownMenuItem>Process Reversal</DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default TransactionManagement;
