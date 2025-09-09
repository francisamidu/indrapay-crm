export interface Partner {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  status: "active" | "suspended" | "pending" | "inactive";
  registrationDate: string;
  lastActivity: string;
  totalVolume: number;
  monthlyVolume: number;
  transactionCount: number;
  successRate: number;
  avgSettlementTime: number;
  feeStructure: {
    transactionFee: number;
    settlementFee: number;
    monthlyFee: number;
  };
  payoutChannels: string[];
  contactPerson: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    currency: string;
  };
  documents: {
    businessLicense: string;
    taxCertificate: string;
    serviceAgreement: string;
  };
  performanceMetrics: {
    uptime: number;
    avgResponseTime: number;
    errorRate: number;
  };
}

export interface SettlementReport {
  id: string;
  partnerId: string;
  partnerName: string;
  period: string;
  totalTransactions: number;
  totalVolume: number;
  totalFees: number;
  netAmount: number;
  status: "pending" | "processed" | "failed";
  generatedDate: string;
  processedDate?: string;
}
