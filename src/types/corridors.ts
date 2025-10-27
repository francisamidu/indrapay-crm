export interface Corridor {
  id: string;
  name: string;
  fromCountry: string;
  toCountry: string;
  fromCurrency: string;
  toCurrency: string;
  status: "active" | "inactive" | "maintenance";
  feeType: "fixed" | "percentage";
  feeValue: number;
  exchangeRate: number;
  rateSource: "manual" | "provider";
  volume24h: number;
  successRate: number;
  transactionCount: number;
  lastUpdated: string;
}

export interface CorridorKPIs {
  totalCorridors: { count: number; change: number };
  activeCorridors: { count: number; change: number };
  totalVolume: { amount: number; change: number };
  avgSuccessRate: { rate: number; change: number };
  maintenanceRequired: { count: number; change: number };
}
