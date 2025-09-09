"use client";

import { useState, useEffect, useMemo } from "react";
import {
  IconSearch as Search,
  IconDownload as Download,
  IconPlus as Plus,
  IconEdit as Edit,
  IconTrash as Trash2,
  IconLock as Lock,
  IconUnlink as Unlock,
  IconCreditCard as CreditCard,
  IconPhone as Smartphone,
  IconBuilding as Building2,
  IconDots as MoreHorizontal,
  IconEye as Eye,
  IconRefresh as RefreshCw,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for users and wallets
const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    walletId: "WLT-001",
    balance: 2450.75,
    status: "active",
    createdDate: "2024-01-15",
    lastActivity: "2024-01-20",
    avatar: "/avatar.png",
    paymentInstruments: [
      { type: "bank", name: "Chase Bank ****1234", status: "active" },
      { type: "card", name: "Visa ****5678", status: "active" },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0456",
    walletId: "WLT-002",
    balance: 1875.5,
    status: "suspended",
    createdDate: "2024-01-10",
    lastActivity: "2024-01-18",
    avatar: "/avatar.png",
    paymentInstruments: [
      { type: "mobile", name: "M-Pesa +254712345678", status: "active" },
    ],
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0789",
    walletId: "WLT-003",
    balance: 3200.25,
    status: "active",
    createdDate: "2024-01-05",
    lastActivity: "2024-01-19",
    avatar: "/avatar.png",
    paymentInstruments: [
      { type: "bank", name: "Wells Fargo ****9876", status: "active" },
      { type: "card", name: "Mastercard ****4321", status: "inactive" },
    ],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1-555-0321",
    walletId: "WLT-004",
    balance: 950.0,
    status: "pending",
    createdDate: "2024-01-12",
    lastActivity: "2024-01-17",
    avatar: "/avatar-2.png",
    paymentInstruments: [
      { type: "card", name: "Amex ****7890", status: "pending" },
    ],
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1-555-0654",
    walletId: "WLT-005",
    balance: 5420.8,
    status: "active",
    createdDate: "2024-01-08",
    lastActivity: "2024-01-20",
    avatar: "/avatar.png",
    paymentInstruments: [
      { type: "bank", name: "Bank of America ****2468", status: "active" },
      { type: "mobile", name: "Venmo @davidw", status: "active" },
      { type: "card", name: "Visa ****1357", status: "active" },
    ],
  },
];

const mockTransactions = [
  {
    id: "TXN-001",
    type: "send",
    amount: -150.0,
    date: "2024-01-20",
    status: "completed",
    recipient: "Sarah Johnson",
  },
  {
    id: "TXN-002",
    type: "receive",
    amount: 500.0,
    date: "2024-01-19",
    status: "completed",
    sender: "Michael Chen",
  },
  {
    id: "TXN-003",
    type: "send",
    amount: -75.25,
    date: "2024-01-18",
    status: "pending",
    recipient: "Emily Rodriguez",
  },
  {
    id: "TXN-004",
    type: "receive",
    amount: 200.0,
    date: "2024-01-17",
    status: "completed",
    sender: "David Wilson",
  },
];

// Custom hook for debounced search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function UserWalletManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsers)[0] | null
  >(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.phone.includes(debouncedSearchTerm) ||
        user.walletId.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-emerald-100 text-emerald-800 border-emerald-200",
      suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      closed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const getPaymentInstrumentIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Building2 className="h-4 w-4" />;
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleWalletAction = (action: string, userId: string) => {
    console.log(`[v0] Performing ${action} on user ${userId}`);
    // Implementation would go here
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-1 gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, phone, or wallet ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Wallet</DialogTitle>
                <DialogDescription>
                  Create a new wallet for an existing or new customer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Create Wallet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users Table */}
      <Card className="pt-0 rounded-xl">
        <CardContent className="p-0 rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 !rounded-xl">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Wallet ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Balance
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Last Activity
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm">{user.walletId}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold">
                        ${user.balance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">
                        {user.lastActivity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              Wallet Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleWalletAction("edit", user.id)
                              }
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleWalletAction("resetPin", user.id)
                              }
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reset PIN
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleWalletAction("suspend", user.id)
                                }
                              >
                                <Lock className="h-4 w-4 mr-2" />
                                Suspend Wallet
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleWalletAction("activate", user.id)
                                }
                              >
                                <Unlock className="h-4 w-4 mr-2" />
                                Activate Wallet
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleWalletAction("close", user.id)
                              }
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Close Wallet
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 px-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <Dialog
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={selectedUser.avatar || "/placeholder.svg"}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold">
                    {selectedUser.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedUser.walletId}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="instruments">
                  Payment Instruments
                </TabsTrigger>
                <TabsTrigger value="transactions">
                  Transaction History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <p className="mt-1">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <p className="mt-1">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Wallet Balance
                    </Label>
                    <p className="mt-1 text-2xl font-bold text-emerald-600">
                      ${selectedUser.balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <div className="mt-1">
                      <Badge className={getStatusBadge(selectedUser.status)}>
                        {selectedUser.status.charAt(0).toUpperCase() +
                          selectedUser.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Created Date
                    </Label>
                    <p className="mt-1">{selectedUser.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Last Activity
                    </Label>
                    <p className="mt-1">{selectedUser.lastActivity}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instruments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Payment Instruments</h3>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instrument
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedUser.paymentInstruments.map((instrument, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getPaymentInstrumentIcon(instrument.type)}
                        <div>
                          <div className="font-medium">{instrument.name}</div>
                          <div className="text-sm text-gray-500 capitalize">
                            {instrument.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(instrument.status)}>
                          {instrument.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <h3 className="text-lg font-medium">Recent Transactions</h3>
                <div className="space-y-3">
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "send"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          <span
                            className={`text-sm font-medium ${
                              transaction.type === "send"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {transaction.type === "send" ? "-" : "+"}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{transaction.id}</div>
                          <div className="text-sm text-gray-500">
                            {transaction.type === "send"
                              ? `To: ${transaction.recipient}`
                              : `From: ${transaction.sender}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            transaction.type === "send"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <Badge className={getStatusBadge(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
