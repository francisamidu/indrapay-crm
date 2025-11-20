interface Partner {
  id: string;
  name: string;
  businessType:
    | "BANK"
    | "FINTECH"
    | "MERCHANT"
    | "AGGREGATOR"
    | "MNO"
    | "OTHER";
  email: string;
  phoneNumber: string;
  country: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  settlementCurrency: string;
  settlementFrequency: "DAILY" | "WEEKLY" | "MONTHLY";
  settlementThreshold?: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface CreatePartnerRequest {
  name: string;
  businessType: Partner["businessType"];
  email: string;
  phoneNumber: string;
  country: string;
  address?: string;
  contactPerson?: string;
  settlementCurrency: string;
  settlementFrequency?: Partner["settlementFrequency"];
  settlementThreshold?: number;
  metadata?: Record<string, any>;
}

export type { Partner, CreatePartnerRequest };
