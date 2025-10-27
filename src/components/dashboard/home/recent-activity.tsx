import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

// Mock data for recent activity
const fetchRecentActivity = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [
    {
      id: 1,
      action: "Transaction Completed",
      user: "Customer A",
      amount: 1250,
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Wallet Created",
      user: "Customer B",
      amount: null,
      time: "5 minutes ago",
      status: "info",
    },
    {
      id: 3,
      action: "Transaction Failed",
      user: "Customer C",
      amount: 500,
      time: "10 minutes ago",
      status: "error",
    },
    {
      id: 4,
      action: "KYC Approved",
      user: "Customer D",
      amount: null,
      time: "15 minutes ago",
      status: "success",
    },
    {
      id: 5,
      action: "Transaction Completed",
      user: "Customer E",
      amount: 3200,
      time: "20 minutes ago",
      status: "success",
    },
  ];
};

export function RecentActivity() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: fetchRecentActivity,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading recent activity...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Error loading recent activity</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`}
                ></div>
              </div>
              <div className="ml-3 space-y-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.user} {activity.amount && `• $${activity.amount}`}
                </p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
