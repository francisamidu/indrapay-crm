"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconSearch as Search,
  IconBell as Bell,
  IconSettings as Settings,
  IconCreditCard as CreditCard,
  IconUsers as Users,
  IconTrendingUp as TrendingUp,
  IconChartBar as BarChart3,
  IconGlobe as Globe,
  IconShield as Shield,
  IconBuilding as Building2,
  IconUpload as Upload,
  IconDownload as Download,
  IconFileText as FileText,
  IconPlus as Plus,
  IconEdit as Edit,
  IconLock as Lock,
  IconLockOff as Unlock,
  IconRefresh as RefreshCw,
  IconCurrencyDollarCanadian as DollarSign,
  IconMessage as MessageSquare,
  IconLink as Link,
  IconEye as Eye,
  IconDots as MoreHorizontal,
  IconSettings2 as Wrench,
} from "@tabler/icons-react";
import type {
  BulkPayout,
  ManualTransaction,
  SupportTicket,
} from "@/types/operation";

export function OperationsTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("bulk-payouts");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const bulkPayouts: BulkPayout[] = [
    {
      id: "BP001",
      fileName: "monthly_payouts_jan_2025.csv",
      uploadDate: "2025-01-15 14:30",
      status: "completed",
      totalAmount: 125000,
      recordCount: 450,
      validRecords: 445,
      invalidRecords: 5,
    },
    {
      id: "BP002",
      fileName: "partner_settlements_dec_2024.csv",
      uploadDate: "2025-01-14 09:15",
      status: "processing",
      totalAmount: 89500,
      recordCount: 320,
      validRecords: 318,
      invalidRecords: 2,
    },
    {
      id: "BP003",
      fileName: "weekly_payouts_w2_2025.csv",
      uploadDate: "2025-01-13 16:45",
      status: "failed",
      totalAmount: 45000,
      recordCount: 180,
      validRecords: 165,
      invalidRecords: 15,
    },
  ];

  const manualTransactions: ManualTransaction[] = [
    {
      id: "MT001",
      type: "adjustment",
      amount: 250.0,
      description: "Balance correction for account reconciliation",
      createdBy: "John Admin",
      createdAt: "2025-01-15 11:30",
      status: "approved",
    },
    {
      id: "MT002",
      type: "reversal",
      amount: -1500.0,
      description: "Transaction reversal due to fraud detection",
      createdBy: "Sarah Manager",
      createdAt: "2025-01-15 09:15",
      status: "pending",
    },
    {
      id: "MT003",
      type: "correction",
      amount: 75.5,
      description: "Fee correction for incorrect calculation",
      createdBy: "Mike Operator",
      createdAt: "2025-01-14 15:20",
      status: "approved",
    },
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: "ST001",
      title: "Transaction stuck in processing",
      priority: "high",
      status: "in-progress",
      assignee: "Tech Support Team",
      createdAt: "2025-01-15 10:30",
      linkedTransactions: ["TXN123456", "TXN123457"],
    },
    {
      id: "ST002",
      title: "Partner payout discrepancy",
      priority: "medium",
      status: "open",
      assignee: "Finance Team",
      createdAt: "2025-01-15 08:45",
      linkedTransactions: ["TXN789012"],
    },
    {
      id: "ST003",
      title: "KYC document verification issue",
      priority: "urgent",
      status: "resolved",
      assignee: "Compliance Team",
      createdAt: "2025-01-14 14:20",
      linkedTransactions: [],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      case "processing":
      case "in-progress":
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {status}
          </Badge>
        );
      case "failed":
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {status}
          </Badge>
        );
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {status}
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {priority}
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            {priority}
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {priority}
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {priority}
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <main className="space-y-6">
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent">
          <TabsTrigger value="bulk-payouts">Bulk Payouts</TabsTrigger>
          <TabsTrigger value="manual-transactions">
            Manual Transactions
          </TabsTrigger>
          <TabsTrigger value="wallet-management">Wallet Management</TabsTrigger>
          <TabsTrigger value="support-tickets">Support Tickets</TabsTrigger>
        </TabsList>

        {/* Bulk Payouts Tab */}
        <TabsContent value="bulk-payouts" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Bulk Payout Management</h2>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload CSV
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Bulk Payout File</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" className="bg-transparent">
                        Choose File
                      </Button>
                    </Label>
                    {selectedFile && (
                      <p className="text-sm text-card-foreground mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowUploadDialog(false)}
                      className="flex-1 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1" disabled={!selectedFile}>
                      Upload & Validate
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {bulkPayouts.map((payout) => (
              <Card key={payout.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">
                          {payout.fileName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {payout.uploadDate}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">
                            <span className="font-medium">
                              ${payout.totalAmount.toLocaleString()}
                            </span>{" "}
                            total
                          </span>
                          <span className="text-sm">
                            <span className="font-medium">
                              {payout.recordCount}
                            </span>{" "}
                            records
                          </span>
                          <span className="text-sm text-green-600">
                            <span className="font-medium">
                              {payout.validRecords}
                            </span>{" "}
                            valid
                          </span>
                          {payout.invalidRecords > 0 && (
                            <span className="text-sm text-red-600">
                              <span className="font-medium">
                                {payout.invalidRecords}
                              </span>{" "}
                              invalid
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(payout.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Manual Transactions Tab */}
        <TabsContent value="manual-transactions" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Manual Transaction Tools</h2>
            <Dialog
              open={showTransactionDialog}
              onOpenChange={setShowTransactionDialog}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Manual Transaction</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transaction-type">Transaction Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adjustment">
                            Balance Adjustment
                          </SelectItem>
                          <SelectItem value="correction">
                            Fee Correction
                          </SelectItem>
                          <SelectItem value="reversal">
                            Transaction Reversal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter transaction description..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowTransactionDialog(false)}
                      className="flex-1 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1">Create Transaction</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-card rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      TYPE
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      AMOUNT
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      DESCRIPTION
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      CREATED BY
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      STATUS
                    </th>
                    <th className="w-12 p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {manualTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground max-w-xs truncate">
                        {transaction.description}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {transaction.createdBy}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Wallet Management Tab */}
        <TabsContent value="wallet-management" className="space-y-6 mt-6">
          <h2 className="text-lg font-semibold">Wallet Management Actions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Block/Unblock Wallets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wallet-id">Wallet ID</Label>
                  <Input id="wallet-id" placeholder="Enter wallet ID..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="block-reason">Reason</Label>
                  <Textarea
                    id="block-reason"
                    placeholder="Enter reason for blocking..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" className="flex-1 gap-2">
                    <Lock className="h-4 w-4" />
                    Block Wallet
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                  >
                    <Unlock className="h-4 w-4" />
                    Unblock Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  PIN Reset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-id">User ID</Label>
                  <Input id="user-id" placeholder="Enter user ID..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification">Verification Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Verification</SelectItem>
                      <SelectItem value="sms">SMS Verification</SelectItem>
                      <SelectItem value="manual">
                        Manual Verification
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reset PIN
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Balance Adjustment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-id">Account ID</Label>
                  <Input id="account-id" placeholder="Enter account ID..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adjustment-amount">Amount</Label>
                    <Input
                      id="adjustment-amount"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adjustment-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit</SelectItem>
                        <SelectItem value="debit">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adjustment-reason">Reason</Label>
                  <Textarea
                    id="adjustment-reason"
                    placeholder="Enter adjustment reason..."
                  />
                </div>
                <Button className="w-full gap-2">
                  <DollarSign className="h-4 w-4" />
                  Apply Adjustment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tickets Tab */}
        <TabsContent value="support-tickets" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Support Ticket Integration
            </h2>
            <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Ticket
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-title">Title</Label>
                    <Input
                      id="ticket-title"
                      placeholder="Enter ticket title..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticket-priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticket-assignee">Assignee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-support">
                            Tech Support Team
                          </SelectItem>
                          <SelectItem value="finance">Finance Team</SelectItem>
                          <SelectItem value="compliance">
                            Compliance Team
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-description">Description</Label>
                    <Textarea
                      id="ticket-description"
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linked-transactions">
                      Linked Transactions (Optional)
                    </Label>
                    <Input
                      id="linked-transactions"
                      placeholder="Enter transaction IDs separated by commas..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowTicketDialog(false)}
                      className="flex-1 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1">Create Ticket</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Assigned to: {ticket.assignee} • Created:{" "}
                          {ticket.createdAt}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                        {ticket.linkedTransactions.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Linked: {ticket.linkedTransactions.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
