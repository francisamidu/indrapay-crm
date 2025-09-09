"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  IconCircle as XCircle,
  IconUsers as Users,
  IconAlertTriangle as AlertTriangle,
  IconCircleCheck as CheckCircle,
  IconActivity as Activity,
  IconFilter as Filter,
  IconDownload as Download,
  IconEye as Eye,
  IconShield as Shield,
  IconFileText as FileText,
  IconClock as Clock,
  IconAlertCircle as AlertCircle,
  IconFlag as Flag,
  IconLockOpen as Zap,
} from "@tabler/icons-react";
import type { Customer } from "@/types/compliance";
import { formatDateTime } from "@/lib/utils";

interface ComplianceKPIs {
  pendingVerifications: { count: number; change: number };
  verifiedCustomers: { count: number; change: number };
  flaggedCases: { count: number; change: number };
  avgProcessingTime: { hours: number; change: number };
  watchlistMatches: { count: number; change: number };
}

const ComplianceKYC: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate,
}) => {
  const [searchQuery, _setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [statusFilter, _setStatusFilter] = useState<string>("all");
  const [riskFilter, _setRiskFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("pending");
  const [newNote, setNewNote] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [revealedCustomers, setRevealedCustomers] = useState<Set<string>>(
    new Set()
  );
  const [showConfirmReveal, setShowConfirmReveal] = useState<string | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [kpiData] = useState<ComplianceKPIs>({
    pendingVerifications: { count: 47, change: 12.5 },
    verifiedCustomers: { count: 1284, change: 8.3 },
    flaggedCases: { count: 23, change: -15.2 },
    avgProcessingTime: { hours: 4.2, change: -18.5 },
    watchlistMatches: { count: 8, change: 25.0 },
  });

  const [customers] = useState<Customer[]>([
    {
      id: "CUS-001",
      name: "Ronald Richards",
      email: "ronald.richards@email.com",
      phone: "+1-555-0123",
      country: "United States",
      verificationStatus: "pending",
      riskScore: 75,
      riskLevel: "medium",
      documentsSubmitted: ["Driver's License", "Proof of Address"],
      lastActivity: "2024-01-15T10:30:00Z",
      registrationDate: "2024-01-10T14:20:00Z",
      totalTransactions: 12,
      totalVolume: 45000,
      watchlistMatch: false,
      sanctionsMatch: false,
      priority: "medium",
      assignedTo: "Sarah Johnson",
      caseNotes: [
        {
          id: "note-1",
          author: "Sarah Johnson",
          content:
            "Documents received and under review. Driver's license appears authentic.",
          timestamp: "2024-01-15T09:15:00Z",
          type: "note",
        },
      ],
    },
    {
      id: "CUS-002",
      name: "Albert Flores",
      email: "albert.flores@email.com",
      phone: "+44-20-7946-0958",
      country: "United Kingdom",
      verificationStatus: "flagged",
      riskScore: 92,
      riskLevel: "high",
      documentsSubmitted: ["Passport", "Bank Statement"],
      lastActivity: "2024-01-14T16:45:00Z",
      registrationDate: "2024-01-08T11:30:00Z",
      totalTransactions: 3,
      totalVolume: 125000,
      watchlistMatch: true,
      sanctionsMatch: false,
      priority: "urgent",
      assignedTo: "Mike Chen",
      caseNotes: [
        {
          id: "note-2",
          author: "System",
          content: "Watchlist match detected - requires manual review",
          timestamp: "2024-01-14T16:45:00Z",
          type: "system",
        },
        {
          id: "note-3",
          author: "Mike Chen",
          content: "Escalating to senior compliance officer for review",
          timestamp: "2024-01-14T17:00:00Z",
          type: "action",
        },
      ],
    },
    {
      id: "CUS-003",
      name: "Marvin McKinney",
      email: "marvin.mckinney@email.com",
      phone: "+1-555-0456",
      country: "Canada",
      verificationStatus: "verified",
      riskScore: 25,
      riskLevel: "low",
      documentsSubmitted: [
        "Driver's License",
        "Utility Bill",
        "Bank Statement",
      ],
      lastActivity: "2024-01-15T08:20:00Z",
      registrationDate: "2024-01-05T09:15:00Z",
      totalTransactions: 28,
      totalVolume: 78000,
      watchlistMatch: false,
      sanctionsMatch: false,
      priority: "low",
      assignedTo: "Lisa Wang",
      caseNotes: [
        {
          id: "note-4",
          author: "Lisa Wang",
          content: "All documents verified successfully. Customer approved.",
          timestamp: "2024-01-12T14:30:00Z",
          type: "action",
        },
      ],
    },
    {
      id: "CUS-004",
      name: "Dianne Russell",
      email: "dianne.russell@email.com",
      phone: "+61-2-9876-5432",
      country: "Australia",
      verificationStatus: "rejected",
      riskScore: 88,
      riskLevel: "high",
      documentsSubmitted: ["Passport"],
      lastActivity: "2024-01-13T12:15:00Z",
      registrationDate: "2024-01-07T16:45:00Z",
      totalTransactions: 1,
      totalVolume: 15000,
      watchlistMatch: false,
      sanctionsMatch: true,
      priority: "high",
      assignedTo: "David Kim",
      caseNotes: [
        {
          id: "note-5",
          author: "David Kim",
          content:
            "Sanctions match confirmed. Account rejected and reported to authorities.",
          timestamp: "2024-01-13T12:15:00Z",
          type: "action",
        },
      ],
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        debouncedSearch === "" ||
        customer.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.country.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || customer.verificationStatus === statusFilter;
      const matchesRisk =
        riskFilter === "all" || customer.riskLevel === riskFilter;
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "pending" &&
          customer.verificationStatus === "pending") ||
        (activeTab === "flagged" &&
          customer.verificationStatus === "flagged") ||
        (activeTab === "verified" &&
          customer.verificationStatus === "verified") ||
        (activeTab === "rejected" &&
          customer.verificationStatus === "rejected");

      return matchesSearch && matchesStatus && matchesRisk && matchesTab;
    });
  }, [customers, debouncedSearch, statusFilter, riskFilter, activeTab]);

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "flagged":
        return "destructive";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "high":
        return <Flag className="h-4 w-4 text-chart-3" />;
      case "medium":
        return <Clock className="h-4 w-4 text-chart-2" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const handleApprove = (customerId: string) => {
    console.log("[v0] Approving customer:", customerId);
    // Implementation for approval logic
  };

  const handleReject = (customerId: string) => {
    console.log("[v0] Rejecting customer:", customerId);
    // Implementation for rejection logic
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedCustomer) {
      console.log(
        "[v0] Adding note for customer:",
        selectedCustomer.id,
        newNote
      );
      setNewNote("");
      // Implementation for adding note
    }
  };

  const getRedactedName = (name: string, customerId: string) => {
    if (revealedCustomers.has(customerId)) {
      return name;
    }
    const parts = name.split(" ");
    return parts.map((part) => part.charAt(0) + "***").join(" ");
  };

  const handleRevealName = (customerId: string) => {
    setRevealedCustomers((prev) => new Set([...prev, customerId]));
    setShowConfirmReveal(null);
    console.log(
      "[v0] Name revealed for customer:",
      customerId,
      "- action logged"
    );
  };

  const openDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleBulkApprove = () => {
    if (selectedCustomers.length > 0) {
      console.log("[v0] Bulk approving customers:", selectedCustomers);
      setSelectedCustomers([]);
    }
  };

  const handleBulkAssign = () => {
    if (selectedCustomers.length > 0) {
      console.log("[v0] Bulk assigning customers:", selectedCustomers);
    }
  };

  const sortedFilteredCustomers = useMemo(() => {
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    return filteredCustomers.sort((a, b) => {
      const priorityDiff =
        priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return (
        new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      );
    });
  }, [filteredCustomers]);

  return (
    <div className="bg-white w-full">
      {/* Compliance Content */}
      <main className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Reviews
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {kpiData.pendingVerifications.count}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Open Alerts
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {kpiData.flaggedCases.count}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg TAT
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {kpiData.avgProcessingTime.hours}h
                  </p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Accounts Frozen
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">12</p>
                </div>
                <Shield className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                Top 5 Pending Verifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedFilteredCustomers.slice(0, 5).map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg cursor-pointer"
                  onClick={() => openDrawer(customer)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {getRedactedName(customer.name, customer.id)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {customer.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(customer.priority)}
                    <Badge
                      variant={getStatusBadgeVariant(
                        customer.verificationStatus
                      )}
                      className="text-xs"
                    >
                      {customer.verificationStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Top 5 AML Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedFilteredCustomers
                .filter((c) => c.watchlistMatch || c.sanctionsMatch)
                .slice(0, 5)
                .map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg cursor-pointer"
                    onClick={() => openDrawer(customer)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {getRedactedName(customer.name, customer.id)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Risk: {customer.riskScore}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {customer.watchlistMatch && (
                        <Badge variant="destructive" className="text-xs">
                          WL
                        </Badge>
                      )}
                      {customer.sanctionsMatch && (
                        <Badge variant="destructive" className="text-xs">
                          SN
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button className="gap-2">
              <Zap className="h-4 w-4" />
              Open Queue
            </Button>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="pending">KYC</TabsTrigger>
                <TabsTrigger value="flagged">AML</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            {selectedCustomers.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkApprove}
                  className="gap-2 bg-transparent"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve ({selectedCustomers.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkAssign}
                  className="gap-2 bg-transparent"
                >
                  <Users className="h-4 w-4" />
                  Assign ({selectedCustomers.length})
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border">
              <div className="flex items-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-3 w-8">
                  <Checkbox
                    checked={
                      selectedCustomers.length ===
                      sortedFilteredCustomers.length
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCustomers(
                          sortedFilteredCustomers.map((c) => c.id)
                        );
                      } else {
                        setSelectedCustomers([]);
                      }
                    }}
                  />
                </div>
                <div className="w-80">ID + Name</div>
                <div className="w-24">Type</div>
                <div className="w-32">Score/Status</div>
                <div className="w-32">Time Created</div>
                <div className="w-32">Actions</div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {sortedFilteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center px-4 py-3 hover:bg-muted/30 transition-colors group cursor-pointer"
                  onClick={() => openDrawer(customer)}
                >
                  {/* Checkbox */}
                  <div className="w-8" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCustomers((prev) => [
                            ...prev,
                            customer.id,
                          ]);
                        } else {
                          setSelectedCustomers((prev) =>
                            prev.filter((id) => id !== customer.id)
                          );
                        }
                      }}
                    />
                  </div>

                  {/* ID + Name */}
                  <div className="w-80 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {getRedactedName(customer.name, customer.id)}
                        </p>
                        {!revealedCustomers.has(customer.id) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowConfirmReveal(customer.id);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {customer.id}
                      </p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="w-24">
                    <Badge
                      variant={
                        customer.watchlistMatch || customer.sanctionsMatch
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {customer.watchlistMatch || customer.sanctionsMatch
                        ? "AML"
                        : "KYC"}
                    </Badge>
                  </div>

                  {/* Score/Status */}
                  <div className="w-32">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {customer.riskScore}
                      </span>
                      <Badge
                        variant={getRiskBadgeVariant(customer.riskLevel)}
                        className="text-xs"
                      >
                        {customer.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  {/* Time Created */}
                  <div className="w-32">
                    <p className="text-sm">
                      {formatDateTime(customer.lastActivity)}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div
                    className="w-32 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                      onClick={() => handleApprove(customer.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-chart-3 hover:bg-chart-3/10"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted"
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog
        open={showConfirmReveal !== null}
        onOpenChange={() => setShowConfirmReveal(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reveal Customer Information</DialogTitle>
            <DialogDescription>
              Revealing customer information will be recorded in the audit log.
              This action requires proper authorization.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmReveal(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                showConfirmReveal && handleRevealName(showConfirmReveal)
              }
            >
              Reveal - Record Action
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="!max-w-[800px] sm:w-[800px] overflow-y-auto p-3">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Case Details</span>
              {selectedCustomer && (
                <div className="flex items-center gap-2">
                  <Badge
                    variant={getStatusBadgeVariant(
                      selectedCustomer.verificationStatus
                    )}
                  >
                    {selectedCustomer.verificationStatus}
                  </Badge>
                  <Badge
                    variant={getRiskBadgeVariant(selectedCustomer.riskLevel)}
                  >
                    {selectedCustomer.riskLevel}
                  </Badge>
                </div>
              )}
            </SheetTitle>
            <SheetDescription>
              Review evidence, take action, and manage case timeline
            </SheetDescription>
          </SheetHeader>

          {selectedCustomer && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedCustomer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {getRedactedName(
                        selectedCustomer.name,
                        selectedCustomer.id
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCustomer.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to: {selectedCustomer.assignedTo || "Unassigned"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {selectedCustomer.riskScore}
                  </div>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                  <p className="text-xs text-chart-3">SLA: 2h remaining</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Evidence</h4>
                  <div className="space-y-2">
                    {selectedCustomer.documentsSubmitted.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted{" "}
                            {formatDateTime(selectedCustomer.lastActivity)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Quick Summary</h4>
                  <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">
                      Provider result: Documents verified
                    </p>
                    <p className="text-sm">
                      Reason:{" "}
                      {selectedCustomer.watchlistMatch
                        ? "Watchlist match detected"
                        : "Standard verification"}
                    </p>

                    <div className="space-y-2 pt-3 border-t">
                      <Button className="w-full" size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        size="sm"
                      >
                        Request Reupload
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        size="sm"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      {(selectedCustomer.watchlistMatch ||
                        selectedCustomer.sanctionsMatch) && (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          size="sm"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Freeze Account
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Quick Notes</h4>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a quick note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button onClick={handleAddNote} size="sm">
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Timeline (Latest 5)</h4>
                    <Button variant="link" size="sm" className="text-xs">
                      See full audit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {selectedCustomer.caseNotes.slice(0, 5).map((note) => (
                      <div key={note.id} className="flex gap-3 p-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{note.author}</span>
                            <Badge variant="outline" className="text-xs">
                              {note.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(note.timestamp)}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {note.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ComplianceKYC;
