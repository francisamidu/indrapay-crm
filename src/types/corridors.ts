interface Corridor {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  targetCountry: string;
  baseRate: number;
  markup: number;
  fixedFee?: number;
  percentageFee?: number;
  minAmount: number;
  maxAmount: number;
  dailyLimit?: number;
  monthlyLimit?: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  requiresApproval: boolean;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface CreateCorridorRequest {
  sourceCurrency: string;
  targetCurrency: string;
  targetCountry: string;
  baseRate: number;
  markup: number;
  fixedFee?: number;
  percentageFee?: number;
  minAmount: number;
  maxAmount: number;
  dailyLimit?: number;
  monthlyLimit?: number;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
  requiresApproval?: boolean;
  metadata?: Record<string, any>;
}

interface CorridorSearchParams {
  sourceCurrency?: string;
  targetCurrency?: string;
  targetCountry?: string;
  status?: Corridor["status"];
  riskLevel?: Corridor["riskLevel"];
  page?: number;
  limit?: number;
}
export type { Corridor, CreateCorridorRequest, CorridorSearchParams };
