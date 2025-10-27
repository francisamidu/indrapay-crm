"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

// Mock data for corridor performance
const fetchCorridorData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    { name: "US-EU", volume: 400000, successRate: 98 },
    { name: "US-UK", volume: 300000, successRate: 96 },
    { name: "EU-UK", volume: 200000, successRate: 97 },
    { name: "US-CA", volume: 180000, successRate: 95 },
    { name: "EU-CA", volume: 140000, successRate: 94 },
    { name: "UK-AU", volume: 120000, successRate: 93 },
  ];
};

export function CorridorPerformanceChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["corridor-data"],
    queryFn: fetchCorridorData,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Corridor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Corridor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            Error loading chart data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Corridor Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "volume")
                    return [`$${value.toLocaleString()}`, "Volume"];
                  if (name === "successRate")
                    return [`${value}%`, "Success Rate"];
                  return [value, name];
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="volume"
                fill="#8884d8"
                name="Volume"
              />
              <Bar
                yAxisId="right"
                dataKey="successRate"
                fill="#82ca9d"
                name="Success Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
