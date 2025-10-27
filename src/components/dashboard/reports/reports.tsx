"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconTrendingUp as TrendingUp,
  IconRefresh as RefreshCw,
  IconDots as MoreHorizontal,
  IconUpload as Upload,
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
  IconCalendar as Calendar,
  IconMail as Mail,
  IconMessage as MessageSquare,
} from "@tabler/icons-react";
import type { Report } from "@/types/report";

export default function ReportsAnalytics() {
  const [searchQuery, _setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-reports");
  const [selectedDateRange, setSelectedDateRange] = useState("Last 30 days");
  const [selectedFilters, setSelectedFilters] = useState({
    transaction: true,
    corridor: true,
    partner: false,
    compliance: false,
  });
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(true);
  const itemsPerPage = 10;

  const reports: Report[] = [
    {
      id: "RPT001",
      source: "Transaction Summary Report",
      sourceIcon: "📊",
      date: "04/01/2025",
      time: "12:10 PM",
      readScore: 87,
      tag: "completed",
      tagColor: "green",
      owner: "Mike Taylor",
      type: "transaction",
    },
    {
      id: "RPT002",
      source: "Corridor Performance Analysis",
      sourceIcon: "🌐",
      date: "03/01/2025",
      time: "11:30 PM",
      readScore: 72,
      tag: "pending",
      tagColor: "red",
      owner: "David Lee",
      type: "corridor",
    },
    {
      id: "RPT003",
      source: "Partner Revenue Report",
      sourceIcon: "🏢",
      date: "02/01/2025",
      time: "10:00 PM",
      readScore: 68,
      tag: "completed",
      tagColor: "green",
      owner: "Thomas Taylor",
      type: "partner",
    },
    {
      id: "RPT004",
      source: "Compliance Audit Summary",
      sourceIcon: "🛡️",
      date: "01/01/2025",
      time: "12:30 PM",
      readScore: 87,
      tag: "pending",
      tagColor: "red",
      owner: "Andrea Tie",
      type: "compliance",
    },
    {
      id: "RPT005",
      source: "Monthly Revenue Analysis",
      sourceIcon: "💰",
      date: "31/12/2024",
      time: "11:30 AM",
      readScore: 40,
      tag: "completed",
      tagColor: "green",
      owner: "Denial Marknol",
      type: "revenue",
    },
    {
      id: "RPT006",
      source: "Corridor Settlement Report",
      sourceIcon: "🔄",
      date: "30/12/2024",
      time: "08:30 PM",
      readScore: 34,
      tag: "pending",
      tagColor: "red",
      owner: "Mark Hussey",
      type: "corridor",
    },
    {
      id: "RPT007",
      source: "KYC Verification Insights",
      sourceIcon: "🔍",
      date: "30/12/2024",
      time: "02:30 PM",
      readScore: 44,
      tag: "completed",
      tagColor: "green",
      owner: "Richard Monas",
      type: "compliance",
    },
    {
      id: "RPT008",
      source: "Partner Fee Structure Analysis",
      sourceIcon: "📈",
      date: "29/12/2024",
      time: "06:57 PM",
      readScore: 91,
      tag: "completed",
      tagColor: "green",
      owner: "Sarah Wilson",
      type: "partner",
    },
  ];

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.source
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilters =
        selectedFilters[report.type as keyof typeof selectedFilters];
      const matchesSource =
        selectedSource === "all" || report.type === selectedSource;
      const matchesTag = selectedTag === "all" || report.tag === selectedTag;
      return matchesSearch && matchesFilters && matchesSource && matchesTag;
    });
  }, [searchQuery, selectedFilters, selectedSource, selectedTag, reports]);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReports, currentPage]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const getTagBadgeClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "red":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "blue":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "orange":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <main className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Reports</h1>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedDateRange}
            onValueChange={setSelectedDateRange}
          >
            <SelectTrigger className="w-40 bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last 30 days">Last 30 days</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
              <SelectItem value="Last 90 days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Dec 3, Jan 2, 2025
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className=" bg-white">
            <TabsTrigger value="my-reports">My reports</TabsTrigger>
            <TabsTrigger value="shared">Shared with me</TabsTrigger>
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Uploads
            </Button>
          </div>
        </div>

        <TabsContent value="my-reports" className="space-y-6 mt-6">
          {/* Notification Card */}
          {showNotification && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-1">
                        Analytics Insights
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate comprehensive payment gateway analytics with
                        key metrics, transaction patterns, and performance
                        indicators.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <Mail className="h-4 w-4" />
                          Emails
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <MessageSquare className="h-4 w-4" />1 Thread
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">
                        Generating Analytics Report
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Identifying patterns, trends and insights
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotification(false)}
                    className="text-muted-foreground hover:text-card-foreground"
                  >
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transaction"
                  checked={selectedFilters.transaction}
                  onCheckedChange={(checked) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      transaction: !!checked,
                    })
                  }
                />
                <label htmlFor="transaction" className="text-sm font-medium">
                  Transaction
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="corridor"
                  checked={selectedFilters.corridor}
                  onCheckedChange={(checked) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      corridor: !!checked,
                    })
                  }
                />
                <label htmlFor="corridor" className="text-sm font-medium">
                  Corridor
                </label>
              </div>
            </div>

            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="transaction">Transaction</SelectItem>
                <SelectItem value="corridor">Corridor</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-32 bg-transparent">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Table */}
          <div className="bg-card rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      SOURCE
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      DATE
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      TIME
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      READ SCORE
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      TAG
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground uppercase text-xs tracking-wide">
                      OWNER
                    </th>
                    <th className="w-12 p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{report.sourceIcon}</span>
                          <span className="font-medium text-card-foreground">
                            {report.source}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {report.date}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {report.time}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">
                            {report.readScore}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getTagBadgeClass(report.tagColor)}>
                          {report.tag}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {report.owner}
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

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing 1-{Math.min(itemsPerPage, filteredReports.length)} of{" "}
                {filteredReports.length} entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "" : "bg-transparent"}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-transparent"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No shared reports available</p>
          </div>
        </TabsContent>

        <TabsContent value="incomplete" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No incomplete reports</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
