import type React from "react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { apiClient } from "@/router";
import type { Corridor } from "@/types/corridors";
import {
  IconActivity as Activity,
  IconArrowRight as ArrowRight,
  IconCheck as CheckCircle,
  IconCircle as XCircle,
  IconDots as MoreHorizontal,
  IconDownload as Download,
  IconEdit as Edit,
  IconEye as Eye,
  IconFilter as Filter,
  IconPlus as Plus,
  IconRefresh as RefreshCw,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

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

  const { data: corridorData } = useQuery({
    queryKey: ["corridors"],
    queryFn: () => apiClient.corridors.getCorridors(),
  });
  console.log(corridorData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [kpiData] = useState<any>({
    totalCorridors: { count: 24, change: 8.3 },
    activeCorridors: { count: 22, change: 4.5 },
    totalVolume: { amount: 12847392, change: 15.2 },
    avgSuccessRate: { rate: 97.8, change: 2.1 },
    maintenanceRequired: { count: 2, change: -25.0 },
  });

  const [corridors] = useState<Corridor[]>([
    {
      id: "COR-USD-KES-001",
      sourceCurrency: "USD",
      targetCurrency: "KES",
      targetCountry: "Kenya",
      baseRate: 150.75,
      markup: 2.5,
      percentageFee: 2.5,
      minAmount: 10,
      maxAmount: 10000,
      dailyLimit: 50000,
      monthlyLimit: 200000,
      riskLevel: "LOW",
      requiresApproval: false,
      status: "ACTIVE",
      metadata: { provider: "Provider A" },
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "COR-GBP-EUR-002",
      sourceCurrency: "GBP",
      targetCurrency: "EUR",
      targetCountry: "European Union",
      baseRate: 1.17,
      markup: 1.5,
      fixedFee: 5.0,
      minAmount: 20,
      maxAmount: 8000,
      dailyLimit: 40000,
      monthlyLimit: 150000,
      riskLevel: "MEDIUM",
      requiresApproval: true,
      status: "ACTIVE",
      metadata: { provider: "Provider B" },
      createdAt: "2024-01-02T09:00:00Z",
      updatedAt: "2024-01-15T09:45:00Z",
    },
    {
      id: "COR-USD-UGX-003",
      sourceCurrency: "USD",
      targetCurrency: "UGX",
      targetCountry: "Uganda",
      baseRate: 3750.25,
      markup: 3.0,
      percentageFee: 3.0,
      minAmount: 50,
      maxAmount: 5000,
      riskLevel: "HIGH",
      requiresApproval: true,
      status: "SUSPENDED",
      metadata: { provider: "Manual Entry" },
      createdAt: "2024-01-03T08:00:00Z",
      updatedAt: "2024-01-15T08:20:00Z",
    },
    {
      id: "COR-EUR-CAD-004",
      sourceCurrency: "EUR",
      targetCurrency: "CAD",
      targetCountry: "Canada",
      baseRate: 1.45,
      markup: 2.0,
      percentageFee: 2.0,
      minAmount: 15,
      maxAmount: 7000,
      dailyLimit: 30000,
      monthlyLimit: 120000,
      riskLevel: "LOW",
      requiresApproval: false,
      status: "ACTIVE",
      metadata: { provider: "Provider C" },
      createdAt: "2024-01-04T07:00:00Z",
      updatedAt: "2024-01-15T07:15:00Z",
    },
    {
      id: "COR-AUD-NZD-005",
      sourceCurrency: "AUD",
      targetCurrency: "NZD",
      targetCountry: "New Zealand",
      baseRate: 1.08,
      markup: 1.8,
      fixedFee: 8.0,
      minAmount: 25,
      maxAmount: 6000,
      riskLevel: "MEDIUM",
      requiresApproval: true,
      status: "INACTIVE",
      metadata: { provider: "Manual Entry" },
      createdAt: "2024-01-05T16:00:00Z",
      updatedAt: "2024-01-14T16:30:00Z",
    },
  ]);

  const filteredCorridors = useMemo(() => {
    return corridors.filter((corridor) => {
      const matchesSearch =
        debouncedSearch === "" ||
        corridor.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        corridor.sourceCurrency
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        corridor.targetCountry
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        corridor.targetCurrency
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || corridor.status === statusFilter;

      return matchesSearch && matchesStatus;
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
                  RISK LEVEL
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
                        {corridor.sourceCurrency}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-semibold text-card-foreground">
                        {corridor.targetCurrency}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {`${corridor.sourceCurrency} to ${corridor.targetCurrency} in ${corridor.targetCountry}`}
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
                    {formatCurrency(corridor.dailyLimit || 0)}
                  </p>
                </div>

                {/* Success Rate Column */}
                <div className="w-32">
                  <p className="text-sm font-semibold text-card-foreground">
                    {corridor.baseRate}%
                  </p>
                </div>

                {/* Fees Column */}
                <div className="w-24">
                  <p className="text-sm font-semibold text-card-foreground">
                    {formatCurrency(
                      corridor.percentageFee || corridor.fixedFee || 0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    percentage / fixed
                  </p>
                </div>

                {/* Last Updated Column */}
                <div className="w-32">
                  <p className="text-sm text-card-foreground">
                    {corridor.riskLevel}
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
                          performance for {selectedCorridor?.id}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedCorridor && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">From</h4>
                              <p className="text-sm">
                                {selectedCorridor.sourceCurrency}
                              </p>
                              <p className="text-lg font-bold">
                                {selectedCorridor.sourceCurrency}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">To</h4>
                              <p className="text-sm">
                                {selectedCorridor.targetCurrency}
                              </p>
                              <p className="text-lg font-bold">
                                {selectedCorridor.targetCurrency}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">
                                Exchange Rate
                              </h4>
                              <p className="text-lg font-bold">
                                {selectedCorridor.baseRate}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Source: {selectedCorridor.id}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">
                                Fee Structure
                              </h4>
                              <p className="text-lg font-bold">
                                {formatCurrency(
                                  selectedCorridor.percentageFee ||
                                    selectedCorridor.fixedFee ||
                                    0
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedCorridor.percentageFee
                                  ? "Percentage Fee"
                                  : "Fixed Fee"}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Risk Rate</h4>
                              <p className="text-lg font-bold capitalize">
                                {selectedCorridor.riskLevel}%
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
                                {formatDateTime(new Date().toISOString())}
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
                      {corridor.status === "INACTIVE" && (
                        <DropdownMenuItem>Activate Corridor</DropdownMenuItem>
                      )}
                      {corridor.status === "ACTIVE" && (
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
