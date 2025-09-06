import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

// Mock data fetch functions - will be replaced with actual API calls
const fetchKPIData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalTransactions: 1245,
    activeWallets: 892,
    successRate: 96.2,
    totalVolume: 1254300,
  };
};

export function KPICards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kpi-data"],
    queryFn: fetchKPIData,
  });

  if (isLoading) {
    return <div>Loading KPI data...</div>;
  }

  if (error) {
    return <div>Error loading KPI data</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          <span className="text-2xl">💸</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.totalTransactions.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
          <span className="text-2xl">👥</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.activeWallets.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <span className="text-2xl">✅</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.successRate}%</div>
          <p className="text-xs text-muted-foreground">+2.3% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          <span className="text-2xl">📊</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${data?.totalVolume.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
