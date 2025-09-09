"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  IconCheck as CheckCircle,
  IconCircle as XCircle,
  IconActivity as Activity,
  IconFilter as Filter,
  IconDots as MoreHorizontal,
  IconDownload as Download,
  IconRefresh as RefreshCw,
  IconEye as Eye,
  IconEdit as Edit,
  IconPlus as Plus,
  IconArrowRight as ArrowRight,
} from "@tabler/icons-react";
import type { Corridor, CorridorKPIs } from "@/types/corridors";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CorridorManagement: React.FC<{
  onNavigate?: (page: string) => void;
}> = () => {
  const [searchQuery, _setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCorridors, setSelectedCorridors] = useState<string[]>([]);
  const [statusFilter, _setStatusFilter] = useState<string>("all");
  const [regionFilter, _setRegionFilter] = useState<string>("all");
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [kpiData] = useState<CorridorKPIs>({
    totalCorridors: { count: 24, change: 8.3 },
    activeCorridors: { count: 22, change: 4.5 },
    totalVolume: { amount: 12847392, change: 15.2 },
    avgSuccessRate: { rate: 97.8, change: 2.1 },
    maintenanceRequired: { count: 2, change: -25.0 },
  });

  const [corridors] = useState<Corridor[]>([
    {
      id: "COR-USD-KES-001",
      name: "USD to KES",
      fromCountry: "United States",
      toCountry: "Kenya",
      fromCurrency: "USD",
      toCurrency: "KES",
      status: "active",
      feeType: "percentage",
      feeValue: 2.5,
      exchangeRate: 150.75,
      rateSource: "provider",
      volume24h: 2847392,
      successRate: 98.5,
      transactionCount: 1247,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: "COR-GBP-EUR-002",
      name: "GBP to EUR",
      fromCountry: "United Kingdom",
      toCountry: "European Union",
      fromCurrency: "GBP",
      toCurrency: "EUR",
      status: "active",
      feeType: "fixed",
      feeValue: 5.0,
      exchangeRate: 1.17,
      rateSource: "provider",
      volume24h: 1956780,
      successRate: 99.2,
      transactionCount: 892,
      lastUpdated: "2024-01-15T09:45:00Z",
    },
    {
      id: "COR-USD-UGX-003",
      name: "USD to UGX",
      fromCountry: "United States",
      toCountry: "Uganda",
      fromCurrency: "USD",
      toCurrency: "UGX",
      status: "maintenance",
      feeType: "percentage",
      feeValue: 3.0,
      exchangeRate: 3750.25,
      rateSource: "manual",
      volume24h: 456780,
      successRate: 95.8,
      transactionCount: 234,
      lastUpdated: "2024-01-15T08:20:00Z",
    },
    {
      id: "COR-EUR-CAD-004",
      name: "EUR to CAD",
      fromCountry: "European Union",
      toCountry: "Canada",
      fromCurrency: "EUR",
      toCurrency: "CAD",
      status: "active",
      feeType: "percentage",
      feeValue: 2.0,
      exchangeRate: 1.45,
      rateSource: "provider",
      volume24h: 1234567,
      successRate: 97.3,
      transactionCount: 567,
      lastUpdated: "2024-01-15T07:15:00Z",
    },
    {
      id: "COR-AUD-NZD-005",
      name: "AUD to NZD",
      fromCountry: "Australia",
      toCountry: "New Zealand",
      fromCurrency: "AUD",
      toCurrency: "NZD",
      status: "inactive",
      feeType: "fixed",
      feeValue: 8.0,
      exchangeRate: 1.08,
      rateSource: "manual",
      volume24h: 89456,
      successRate: 94.2,
      transactionCount: 45,
      lastUpdated: "2024-01-14T16:30:00Z",
    },
  ]);

  const filteredCorridors = useMemo(() => {
    return corridors.filter((corridor) => {
      const matchesSearch =
        debouncedSearch === "" ||
        corridor.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        corridor.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        corridor.fromCountry
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        corridor.toCountry
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        corridor.fromCurrency
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        corridor.toCurrency
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || corridor.status === statusFilter;
      const matchesRegion =
        regionFilter === "all" ||
        corridor.fromCountry
          .toLowerCase()
          .includes(regionFilter.toLowerCase()) ||
        corridor.toCountry.toLowerCase().includes(regionFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [corridors, debouncedSearch, statusFilter, regionFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "maintenance":
        return <Activity className="h-4 w-4 text-chart-3" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "destructive";
      case "maintenance":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCorridors(filteredCorridors.map((c) => c.id));
    } else {
      setSelectedCorridors([]);
    }
  };

  const handleSelectCorridor = (corridorId: string, checked: boolean) => {
    if (checked) {
      setSelectedCorridors((prev) => [...prev, corridorId]);
    } else {
      setSelectedCorridors((prev) => prev.filter((id) => id !== corridorId));
    }
  };

  return (
    <main className="p-6 space-y-6">
      {/* Tab Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Tabs defaultValue="active" className="w-auto">
            <TabsList className="bg-white">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
            <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-white">
              1
            </Badge>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create corridor
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Corridors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {kpiData.totalCorridors.count}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.totalCorridors.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Corridors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {kpiData.activeCorridors.count}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.activeCorridors.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(kpiData.totalVolume.amount)}
            </div>
            <p className="text-xs text-primary">
              +{kpiData.totalVolume.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {kpiData.avgSuccessRate.rate}%
            </div>
            <p className="text-xs text-primary">
              +{kpiData.avgSuccessRate.change}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Corridors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border">
            <div className="flex items-center px-6 py-4">
              <div className="flex items-center gap-4 w-80">
                <Checkbox
                  checked={
                    selectedCorridors.length === filteredCorridors.length &&
                    filteredCorridors.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  CORRIDOR
                </span>
              </div>
              <div className="flex items-center justify-around flex-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                  STATUS
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                  VOLUME (24H)
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                  SUCCESS RATE
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                  FEES
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                  LAST UPDATED
                </span>
                <div className="w-20"></div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {filteredCorridors.map((corridor) => (
              <div
                key={corridor.id}
                className="flex items-center px-6 py-4 hover:bg-muted/30 transition-colors group"
              >
                {/* Corridor Column */}
                <div className="flex items-center gap-4 w-80">
                  <Checkbox
                    checked={selectedCorridors.includes(corridor.id)}
                    onCheckedChange={(checked) =>
                      handleSelectCorridor(corridor.id, checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md">
                      <span className="text-sm font-semibold text-card-foreground">
                        {corridor.fromCurrency}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-semibold text-card-foreground">
                        {corridor.toCurrency}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {corridor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {corridor.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="w-24">
                  <Badge
                    variant={getStatusBadgeVariant(corridor.status)}
                    className="text-xs font-medium text-white"
                  >
                    {corridor.status}
                  </Badge>
                </div>

                {/* Volume Column */}
                <div className="w-32">
                  <p className="text-sm font-semibold text-card-foreground">
                    {formatCurrency(corridor.volume24h)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {corridor.transactionCount} transactions
                  </p>
                </div>

                {/* Success Rate Column */}
                <div className="w-32">
                  <p className="text-sm font-semibold text-card-foreground">
                    {corridor.successRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rate: {corridor.exchangeRate} ({corridor.rateSource})
                  </p>
                </div>

                {/* Fees Column */}
                <div className="w-24">
                  <p className="text-sm font-semibold text-card-foreground">
                    {corridor.feeType === "percentage"
                      ? `${corridor.feeValue}%`
                      : formatCurrency(corridor.feeValue)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {corridor.feeType}
                  </p>
                </div>

                {/* Last Updated Column */}
                <div className="w-32">
                  <p className="text-sm text-card-foreground">
                    {formatDateTime(corridor.lastUpdated)}
                  </p>
                </div>

                {/* Actions Column */}
                <div className="w-20 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted"
                        onClick={() => setSelectedCorridor(corridor)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Corridor Configuration</DialogTitle>
                        <DialogDescription>
                          Configure fees, exchange rates, and monitor
                          performance for {corridor.name}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedCorridor && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">From</h4>
                              <p className="text-sm">
                                {selectedCorridor.fromCountry}
                              </p>
                              <p className="text-lg font-bold">
                                {selectedCorridor.fromCurrency}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">To</h4>
                              <p className="text-sm">
                                {selectedCorridor.toCountry}
                              </p>
                              <p className="text-lg font-bold">
                                {selectedCorridor.toCurrency}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">
                                Exchange Rate
                              </h4>
                              <p className="text-lg font-bold">
                                {selectedCorridor.exchangeRate}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Source: {selectedCorridor.rateSource}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">
                                Fee Structure
                              </h4>
                              <p className="text-lg font-bold">
                                {selectedCorridor.feeType === "percentage"
                                  ? `${selectedCorridor.feeValue}%`
                                  : formatCurrency(selectedCorridor.feeValue)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedCorridor.feeType}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Success Rate</h4>
                              <p className="text-lg font-bold">
                                {selectedCorridor.successRate}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                24h performance
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={getStatusBadgeVariant(
                                  selectedCorridor.status
                                )}
                              >
                                {selectedCorridor.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Last updated:{" "}
                                {formatDateTime(selectedCorridor.lastUpdated)}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent"
                              >
                                <Edit className="h-4 w-4" />
                                Configure
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent"
                              >
                                <RefreshCw className="h-4 w-4" />
                                Update Rates
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Configure Corridor</DropdownMenuItem>
                      <DropdownMenuItem>Update Exchange Rate</DropdownMenuItem>
                      <DropdownMenuItem>Modify Fees</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      {corridor.status === "inactive" && (
                        <DropdownMenuItem>Activate Corridor</DropdownMenuItem>
                      )}
                      {corridor.status === "active" && (
                        <DropdownMenuItem>Deactivate Corridor</DropdownMenuItem>
                      )}
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

export default CorridorManagement;
