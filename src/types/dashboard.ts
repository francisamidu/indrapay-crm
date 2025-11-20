interface DashboardKPIs {
  transactions: {
    total: number;
    successful: number;
    failed: number;
    volume: number;
    growthRate: number;
  };
  customers: {
    activeWallets: number;
    newCustomers: number;
    pendingKyc: number;
    verificationRate: number;
  };
  compliance: {
    openCases: number;
    resolvedCases: number;
    avgResolutionTime: number;
    highPriorityCases: number;
  };
  corridors: {
    activeCorridors: number;
    totalVolume: number;
    topPerforming: Array<{
      corridorId: string;
      corridorName: string;
      sourceCurrency: string;
      targetCurrency: string;
      totalVolume: number;
      transactionCount: number;
      successRate: number;
      avgProcessingTime: number;
    }>;
  };
}

export type { DashboardKPIs };
