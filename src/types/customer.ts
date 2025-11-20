interface Customer {
  id: string;
  email: string;
  phoneNumber?: string;
  walletId?: string;
  countryCode?: string;
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
}

interface CustomerSearchParams {
  email?: string;
  phoneNumber?: string;
  walletId?: string;
  countryCode?: string;
  kycStatus?: Customer["kycStatus"];
  page?: number;
  limit?: number;
}

export type { Customer, CustomerSearchParams };
