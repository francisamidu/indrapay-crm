interface Business {
  id: string;
  name: string;
  registrationNumber?: string;
  email: string;
  phoneNumber: string;
  country: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";
  industry?: string;
  website?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface BusinessSearchParams {
  name?: string;
  registrationNumber?: string;
  status?: Business["status"];
  kycStatus?: Business["kycStatus"];
  country?: string;
  page?: number;
  limit?: number;
}
export type { Business, BusinessSearchParams };
