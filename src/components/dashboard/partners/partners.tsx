"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Bell,
  Settings,
  CreditCard,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wallet,
  BarChart3,
  Download,
  Eye,
  Globe,
  Shield,
  FileText,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Upload,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import type { Partner, SettlementReport } from "@/types/partners";
import { formatCurrency } from "@/lib/utils";

const PartnersManagement: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSettlementReportsOpen, setIsSettlementReportsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [partners] = useState<Partner[]>([
    {
      id: "PTR-001",
      name: "TechPay Solutions",
      businessName: "TechPay Solutions Ltd",
      email: "contact@techpay.com",
      phone: "+1-555-0123",
      country: "United States",
      status: "active",
      registrationDate: "2023-06-15T10:30:00Z",
      lastActivity: "2024-01-15T14:20:00Z",
      totalVolume: 2450000,
      monthlyVolume: 185000,
      transactionCount: 1247,
      successRate: 98.5,
      avgSettlementTime: 24,
      feeStructure: {
        transactionFee: 2.5,
        settlementFee: 0.5,
        monthlyFee: 500,
      },
      payoutChannels: ["Bank Transfer", "Digital Wallet", "Check"],
      contactPerson: {
        name: "Sarah Johnson",
        email: "sarah@techpay.com",
        phone: "+1-555-0124",
        role: "Integration Manager",
      },
      bankDetails: {
        accountName: "TechPay Solutions Ltd",
        accountNumber: "1234567890",
        bankName: "Chase Bank",
        routingNumber: "021000021",
        currency: "USD",
      },
      documents: {
        businessLicense: "business-license-001.pdf",
        taxCertificate: "tax-cert-001.pdf",
        serviceAgreement: "service-agreement-001.pdf",
      },
      performanceMetrics: {
        uptime: 99.8,
        avgResponseTime: 150,
        errorRate: 0.2,
      },
    },
    {
      id: "PTR-002",
      name: "GlobalPay Network",
      businessName: "GlobalPay Network Inc",
      email: "info@globalpay.com",
      phone: "+44-20-7946-0958",
      country: "United Kingdom",
      status: "active",
      registrationDate: "2023-08-22T09:15:00Z",
      lastActivity: "2024-01-14T16:45:00Z",
      totalVolume: 1850000,
      monthlyVolume: 142000,
      transactionCount: 892,
      successRate: 97.2,
      avgSettlementTime: 48,
      feeStructure: {
        transactionFee: 3.0,
        settlementFee: 0.75,
        monthlyFee: 750,
      },
      payoutChannels: ["Bank Transfer", "SWIFT"],
      contactPerson: {
        name: "James Wilson",
        email: "james@globalpay.com",
        phone: "+44-20-7946-0959",
        role: "Business Development",
      },
      bankDetails: {
        accountName: "GlobalPay Network Inc",
        accountNumber: "GB29NWBK60161331926819",
        bankName: "NatWest Bank",
        routingNumber: "NWBKGB2L",
        currency: "GBP",
      },
      documents: {
        businessLicense: "business-license-002.pdf",
        taxCertificate: "tax-cert-002.pdf",
        serviceAgreement: "service-agreement-002.pdf",
      },
      performanceMetrics: {
        uptime: 99.2,
        avgResponseTime: 200,
        errorRate: 0.8,
      },
    },
    {
      id: "PTR-003",
      name: "FastTransfer Co",
      businessName: "FastTransfer Company",
      email: "support@fasttransfer.com",
      phone: "+1-555-0789",
      country: "Canada",
      status: "suspended",
      registrationDate: "2023-11-10T11:30:00Z",
      lastActivity: "2024-01-10T08:20:00Z",
      totalVolume: 950000,
      monthlyVolume: 45000,
      transactionCount: 324,
      successRate: 94.8,
      avgSettlementTime: 72,
      feeStructure: {
        transactionFee: 2.8,
        settlementFee: 1.0,
        monthlyFee: 400,
      },
      payoutChannels: ["Bank Transfer"],
      contactPerson: {
        name: "Michael Chen",
        email: "michael@fasttransfer.com",
        phone: "+1-555-0790",
        role: "Operations Manager",
      },
      bankDetails: {
        accountName: "FastTransfer Company",
        accountNumber: "123456789",
        bankName: "Royal Bank of Canada",
        routingNumber: "003",
        currency: "CAD",
      },
      documents: {
        businessLicense: "business-license-003.pdf",
        taxCertificate: "tax-cert-003.pdf",
        serviceAgreement: "service-agreement-003.pdf",
      },
      performanceMetrics: {
        uptime: 97.5,
        avgResponseTime: 350,
        errorRate: 2.5,
      },
    },
  ]);

  const [settlementReports] = useState<SettlementReport[]>([
    {
      id: "RPT-001",
      partnerId: "PTR-001",
      partnerName: "TechPay Solutions",
      period: "December 2023",
      totalTransactions: 156,
      totalVolume: 185000,
      totalFees: 4625,
      netAmount: 180375,
      status: "processed",
      generatedDate: "2024-01-01T00:00:00Z",
      processedDate: "2024-01-02T10:30:00Z",
    },
    {
      id: "RPT-002",
      partnerId: "PTR-002",
      partnerName: "GlobalPay Network",
      period: "December 2023",
      totalTransactions: 98,
      totalVolume: 142000,
      totalFees: 4260,
      netAmount: 137740,
      status: "processed",
      generatedDate: "2024-01-01T00:00:00Z",
      processedDate: "2024-01-03T14:15:00Z",
    },
    {
      id: "RPT-003",
      partnerId: "PTR-001",
      partnerName: "TechPay Solutions",
      period: "January 2024",
      totalTransactions: 142,
      totalVolume: 168000,
      totalFees: 4200,
      netAmount: 163800,
      status: "pending",
      generatedDate: "2024-02-01T00:00:00Z",
    },
  ]);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        debouncedSearch === "" ||
        partner.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        partner.businessName
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        partner.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        partner.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        partner.country.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || partner.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [partners, debouncedSearch, statusFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "suspended":
        return "destructive";
      case "inactive":
        return "outline";
      default:
        return "secondary";
    }
  };

  const openDetailDrawer = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsDetailDrawerOpen(true);
  };

  const handleSuspendPartner = (partnerId: string) => {
    console.log("[v0] Suspending partner:", partnerId);
    // Implementation for suspending partner
  };

  const handleActivatePartner = (partnerId: string) => {
    console.log("[v0] Activating partner:", partnerId);
    // Implementation for activating partner
  };

  const handleGenerateSettlement = (partnerId: string) => {
    console.log("[v0] Generating settlement for partner:", partnerId);
    // Implementation for generating settlement
  };

  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => p.status === "active").length;
  const totalVolume = partners.reduce((sum, p) => sum + p.totalVolume, 0);
  const avgSuccessRate =
    partners.reduce((sum, p) => sum + p.successRate, 0) / partners.length;

  return (
    <div className="bg-white">
      {/* Partners Content */}
      <main className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Partners
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {totalPartners}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Partners
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {activePartners}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Volume
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {formatCurrency(totalVolume)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Success Rate
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {avgSuccessRate.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              className="gap-2"
              onClick={() => setIsRegistrationOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => setIsSettlementReportsOpen(true)}
            >
              <FileText className="h-4 w-4" />
              Settlement Reports
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

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card
              key={partner.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetailDrawer(partner)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {partner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {partner.id}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(partner.status)}
                    className="text-xs"
                  >
                    {partner.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Volume</p>
                    <p className="font-semibold">
                      {formatCurrency(partner.monthlyVolume)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-semibold">{partner.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Transactions</p>
                    <p className="font-semibold">
                      {partner.transactionCount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Settlement</p>
                    <p className="font-semibold">
                      {partner.avgSettlementTime}h
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {partner.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailDrawer(partner);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(
                          "[v0] More actions for partner:",
                          partner.id
                        );
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Partner Detail Drawer */}
      <Sheet open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen}>
        <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Partner Details</span>
              {selectedPartner && (
                <Badge variant={getStatusBadgeVariant(selectedPartner.status)}>
                  {selectedPartner.status}
                </Badge>
              )}
            </SheetTitle>
            <SheetDescription>
              View and manage partner information and configurations
            </SheetDescription>
          </SheetHeader>

          {selectedPartner && (
            <div className="space-y-6 mt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="payout">Payout</TabsTrigger>
                  <TabsTrigger value="settlement">Settlement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {selectedPartner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedPartner.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedPartner.businessName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPartner.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {selectedPartner.successRate}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Success Rate
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total Volume
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(selectedPartner.totalVolume)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Monthly Volume
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(selectedPartner.monthlyVolume)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Transactions
                          </span>
                          <span className="font-semibold">
                            {selectedPartner.transactionCount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Avg Settlement
                          </span>
                          <span className="font-semibold">
                            {selectedPartner.avgSettlementTime}h
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-semibold">
                            {selectedPartner.performanceMetrics.uptime}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Fee Structure</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Transaction Fee
                          </span>
                          <span className="font-semibold">
                            {selectedPartner.feeStructure.transactionFee}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Settlement Fee
                          </span>
                          <span className="font-semibold">
                            {selectedPartner.feeStructure.settlementFee}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Monthly Fee
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(
                              selectedPartner.feeStructure.monthlyFee
                            )}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    {selectedPartner.status === "active" ? (
                      <Button
                        variant="destructive"
                        onClick={() => handleSuspendPartner(selectedPartner.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Suspend Partner
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleActivatePartner(selectedPartner.id)
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Activate Partner
                      </Button>
                    )}
                    <Button variant="outline" className="bg-transparent">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() =>
                        handleGenerateSettlement(selectedPartner.id)
                      }
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Settlement
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">
                            Business Name
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.businessName}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">
                            Country
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.country}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Email</Label>
                          <p className="font-medium">{selectedPartner.email}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Phone</Label>
                          <p className="font-medium">{selectedPartner.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Person</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Name</Label>
                          <p className="font-medium">
                            {selectedPartner.contactPerson.name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Role</Label>
                          <p className="font-medium">
                            {selectedPartner.contactPerson.role}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Email</Label>
                          <p className="font-medium">
                            {selectedPartner.contactPerson.email}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Phone</Label>
                          <p className="font-medium">
                            {selectedPartner.contactPerson.phone}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payout" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bank Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">
                            Account Name
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.bankDetails.accountName}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">
                            Account Number
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.bankDetails.accountNumber}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">
                            Bank Name
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.bankDetails.bankName}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">
                            Routing Number
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.bankDetails.routingNumber}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">
                            Currency
                          </Label>
                          <p className="font-medium">
                            {selectedPartner.bankDetails.currency}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payout Channels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedPartner.payoutChannels.map(
                          (channel, index) => (
                            <Badge key={index} variant="secondary">
                              {channel}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settlement" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Settlement History
                    </h3>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleGenerateSettlement(selectedPartner.id)
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Generate New
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {settlementReports
                      .filter(
                        (report) => report.partnerId === selectedPartner.id
                      )
                      .map((report) => (
                        <Card key={report.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{report.period}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {report.totalTransactions} transactions •{" "}
                                  {formatCurrency(report.totalVolume)} volume
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  {formatCurrency(report.netAmount)}
                                </p>
                                <Badge
                                  variant={
                                    report.status === "processed"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {report.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Partner Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Partner</DialogTitle>
            <DialogDescription>
              Add a new business partner to your payment gateway network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name</Label>
                <Input id="partnerName" placeholder="Enter partner name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Enter business name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Service Agreement</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload service agreement document
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  Choose File
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRegistrationOpen(false)}
              >
                Cancel
              </Button>
              <Button>Register Partner</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settlement Reports Dialog */}
      <Dialog
        open={isSettlementReportsOpen}
        onOpenChange={setIsSettlementReportsOpen}
      >
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Settlement Reports</DialogTitle>
            <DialogDescription>
              Generate and download settlement statements for partners
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="grid grid-cols-6 gap-4 p-4 border-b bg-muted/30 text-sm font-medium">
                <div>Partner</div>
                <div>Period</div>
                <div>Transactions</div>
                <div>Volume</div>
                <div>Net Amount</div>
                <div>Status</div>
              </div>
              {settlementReports.map((report) => (
                <div
                  key={report.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/30"
                >
                  <div className="font-medium">{report.partnerName}</div>
                  <div>{report.period}</div>
                  <div>{report.totalTransactions}</div>
                  <div>{formatCurrency(report.totalVolume)}</div>
                  <div className="font-semibold">
                    {formatCurrency(report.netAmount)}
                  </div>
                  <div>
                    <Badge
                      variant={
                        report.status === "processed" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnersManagement;
