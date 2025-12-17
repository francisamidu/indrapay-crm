import ky, { type KyInstance, type Options } from "ky";
import { CookieJar } from "tough-cookie";

import { storage } from "@/lib/storage";
import { generateHeaders } from "@/lib/utils";
import type { BaseApiResponse, PaginatedResponse } from "@/types";
import type {
  ChangePasswordRequest,
  CrmUser,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from "@/types/auth";
import type { Business, BusinessSearchParams } from "@/types/business";
import type { Case, CaseSearchParams, CreateCaseRequest } from "@/types/case";
import type { ComplianceCustomer as Customer } from "@/types/compliance";
import type {
  Corridor,
  CorridorSearchParams,
  CreateCorridorRequest,
} from "@/types/corridors";
import type { CustomerSearchParams } from "@/types/customer";
import type { DashboardKPIs } from "@/types/dashboard";
import { ApiError } from "@/types/error";
import type { CreatePartnerRequest, Partner } from "@/types/partners";
import type {
  RefundRequest,
  Transaction,
  TransactionSearchParams,
} from "@/types/transactions";
import type { Wallet } from "@/types/wallet";

const cookieJar = new CookieJar();

interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  retryLimit?: number;
  headers?: Record<string, string>;
}
class ApiClient {
  private client: KyInstance;
  private accessToken: string | null = null;

  constructor(config: ApiClientConfig) {
    this.client = ky.create({
      prefixUrl: config.baseUrl,
      cache: "no-store",
      credentials: "include",
      timeout: config.timeout || 30000,
      retry: {
        limit: config.retryLimit || 2,
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      hooks: {
        beforeRequest: [
          async (request) => {
            request.headers.set("channel-id", generateHeaders()["channel-id"]);
            request.headers.set(
              "x-transaction-id",
              generateHeaders()["x-transaction-id"]
            );
            // request.headers.set("ngrok-skip-browser-warning", "1");
            request.headers.set(
              "x-correlation-conversation-id",
              generateHeaders()["x-correlation-conversation-id"]
            );
            request.headers.set(
              "x-originator-conversation-id",
              generateHeaders()["x-originator-conversation-id"]
            );
            request.headers.set(
              "x-conversation-id",
              generateHeaders()["x-conversation-id"]
            );
            request.headers.set("x-version", generateHeaders()["x-version"]);
            request.headers.set(
              "x-source-system",
              generateHeaders()["x-source-system"]
            );
            request.headers.set(
              "x-source-identity-token",
              generateHeaders()["x-source-identity-token"]
            );
            const url = request.url;
            const cookies = await cookieJar.getCookies(url);
            const cookieString = cookies.join("; ");
            request.headers.set("cookie", cookieString);

            const token = storage.get<string>("accessToken");
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
        afterResponse: [
          async (request, _options, response) => {
            const url = request.url;
            const cookies = response.headers.getSetCookie();
            if (cookies) {
              for (const cookie of cookies) {
                await cookieJar.setCookie(cookie, url);
              }
            }
          },
          async (_request, _options, response) => {
            if (!response.ok) {
              const errorData = (await response
                .json()
                .catch(() => ({}))) as any;
              throw new ApiError(
                response.status,
                errorData.resultCode || "UNKNOWN_ERROR",
                errorData.resultDescription || response.statusText,
                errorData
              );
            }
          },
        ],
      },
    });
  }

  setAccessToken = (token: string | null) => {
    this.accessToken = token;
  };

  getAccessToken = (): string | null => {
    return this.accessToken;
  };

  request = async <T>(url: string, options?: Options): Promise<T> => {
    try {
      const response = await this.client(url, options);
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.log(error);
      throw new ApiError(
        500,
        "NETWORK_ERROR",
        "An unexpected network error occurred",
        error
      );
    }
  };
}

// ============================================================================
// API Service Classes
// ============================================================================

/**
 * Authentication Service
 * Handles CRM user login, token refresh, and session management
 */
class AuthService {
  constructor(private client: ApiClient) {}

  /**
   * Authenticate CRM staff user
   * @param credentials - Username and password
   * @returns Authentication tokens and user data
   */
  login = async (credentials: LoginRequest): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<LoginResponse>>(
      "v1/auth/crm/login",
      {
        method: "POST",
        json: credentials,
      }
    );

    // Store access token
    storage.set("accessToken", response.data.accessToken);
    storage.set("user", response.data.user);
    storage.set("sessionId", response.data.sessionId);

    return {
      success: true,
    };
  };

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns New authentication tokens
   */
  refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<LoginResponse> => {
    const response = await this.client.request<BaseApiResponse<LoginResponse>>(
      "v1/crm/auth/token/refresh",
      {
        method: "POST",
        json: refreshToken,
      }
    );

    // Update access token
    this.client.setAccessToken(response.data.accessToken);

    return response.data;
  };

  /**
   * Logout current CRM user
   */
  logout = async (): Promise<void> => {
    await this.client.request<BaseApiResponse<void>>("v1/crm/auth/logout", {
      method: "POST",
    });

    // Clear access token
    this.client.setAccessToken(null);
  };

  /**
   * Get current authenticated user profile
   * @returns CRM user profile data
   */
  getProfile = async (): Promise<CrmUser> => {
    const response = await this.client.request<BaseApiResponse<CrmUser>>(
      "v1/crm/auth/profile",
      {
        method: "GET",
      }
    );

    return response.data;
  };

  /**
   * Change password for authenticated CRM user
   * @param passwordData - Current and new password
   */
  changePassword = async (
    passwordData: ChangePasswordRequest
  ): Promise<void> => {
    await this.client.request<BaseApiResponse<void>>(
      "v1/crm/auth/password/change",
      {
        method: "POST",
        json: passwordData,
      }
    );
  };
}

/**
 * Customer Service
 * Manages end-user customer accounts
 */
class CustomerService {
  constructor(private client: ApiClient) {}

  /**
   * Search for customers by various criteria
   * @param params - Search filters
   * @returns Paginated list of customers
   */
  searchCustomers = async (
    params: CustomerSearchParams
  ): Promise<PaginatedResponse<Customer>> => {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Customer>>
    >("v1/crm/customers/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return response.data;
  };

  /**
   * Get wallet information for a specific customer
   * @param customerId - Customer ID
   * @param currency - Optional currency filter
   * @returns Wallet details
   */
  getCustomerWallet = async (
    customerId: string,
    currency?: string
  ): Promise<Wallet> => {
    const response = await this.client.request<BaseApiResponse<Wallet>>(
      `v1/crm/customers/${customerId}/wallet`,
      {
        method: "GET",
        searchParams: currency ? { currency } : undefined,
      }
    );

    return response.data;
  };

  /**
   * Freeze a customer wallet to prevent transactions
   * @param customerId - Customer ID
   * @param walletId - Wallet ID
   * @param reason - Reason for freezing
   */
  freezeWallet = async (
    customerId: string,
    walletId: string,
    reason: string
  ): Promise<void> => {
    await this.client.request<BaseApiResponse<void>>(
      `v1/crm/customers/${customerId}/wallets/${walletId}/freeze`,
      {
        method: "POST",
        json: { reason },
      }
    );
  };

  /**
   * Unfreeze a previously frozen wallet
   * @param customerId - Customer ID
   * @param walletId - Wallet ID
   */
  unfreezeWallet = async (
    customerId: string,
    walletId: string
  ): Promise<void> => {
    await this.client.request<BaseApiResponse<void>>(
      `v1/crm/customers/${customerId}/wallets/${walletId}/unfreeze`,
      {
        method: "POST",
      }
    );
  };

  /**
   * Get transaction history for a customer
   * @param customerId - Customer ID
   * @param params - Transaction filters
   * @returns Paginated transaction list
   */
  getCustomerTransactions = async (
    customerId: string,
    params?: Omit<TransactionSearchParams, "userId">
  ): Promise<PaginatedResponse<Transaction>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        transactions: Transaction[];
        total: number;
        page: number;
        limit: number;
      }>
    >(`v1/crm/customers/${customerId}/transactions`, {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.transactions,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };
}

/**
 * Transaction Service
 * Handles transaction monitoring and operations
 */
class TransactionService {
  constructor(private client: ApiClient) {}

  /**
   * Search for transactions by various criteria
   * @param params - Search filters
   * @returns Paginated list of transactions
   */
  searchTransactions = async (
    params: TransactionSearchParams
  ): Promise<PaginatedResponse<Transaction>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        transactions: Transaction[];
        total: number;
        page: number;
        limit: number;
      }>
    >("v1/crm/transactions/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.transactions,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };

  /**
   * Get detailed information about a specific transaction
   * @param txnId - Transaction ID
   * @returns Transaction details
   */
  getTransaction = async (txnId: string): Promise<Transaction> => {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `v1/crm/transactions/${txnId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  };

  /**
   * Retry a failed transaction
   * @param txnId - Transaction ID
   * @param reason - Optional reason for retry
   */
  retryTransaction = async (
    txnId: string,
    reason?: string
  ): Promise<Transaction> => {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `v1/crm/transactions/${txnId}/retry`,
      {
        method: "POST",
        json: reason ? { reason } : undefined,
      }
    );

    return response.data;
  };

  /**
   * Process a refund for a transaction
   * @param txnId - Transaction ID
   * @param refundData - Refund amount and reason
   */
  refundTransaction = async (
    txnId: string,
    refundData: RefundRequest
  ): Promise<Transaction> => {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `v1/crm/transactions/${txnId}/refund`,
      {
        method: "POST",
        json: refundData,
      }
    );

    return response.data;
  };

  /**
   * Reverse a completed transaction
   * @param txnId - Transaction ID
   * @param reason - Reason for reversal
   */
  reverseTransaction = async (
    txnId: string,
    reason: string
  ): Promise<Transaction> => {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `v1/crm/transactions/${txnId}/reverse`,
      {
        method: "POST",
        json: { reason },
      }
    );

    return response.data;
  };
}

/**
 * Corridor Service
 * Manages payment corridors and exchange rates
 */
class CorridorService {
  constructor(private client: ApiClient) {}

  /**
   * Search for corridors by various criteria
   * @param params - Search filters
   * @returns Paginated list of corridors
   */
  searchCorridors = async (
    params: CorridorSearchParams
  ): Promise<PaginatedResponse<Corridor>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        corridors: Corridor[];
        total: number;
        page: number;
        limit: number;
      }>
    >("v1/crm/corridors/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.corridors,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };

  /**
   * Create a new payment corridor
   * @param corridorData - Corridor configuration
   * @returns Created corridor
   */
  createCorridor = async (
    corridorData: CreateCorridorRequest
  ): Promise<Corridor> => {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      "v1/crm/corridors/",
      {
        method: "POST",
        json: corridorData,
      }
    );

    return response.data;
  };

  /**
   * Get detailed information about a corridor
   * @param corridorId - Corridor ID
   * @returns Corridor details
   */
  getCorridor = async (corridorId: string): Promise<Corridor> => {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `v1/crm/corridors/${corridorId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  };
  /**
   * Get a paginated list of all corridors
   * @param page - Page number
   * @param limit - Number of items per page
   * @returns Paginated list of corridors
   */
  getCorridors = async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Corridor>> => {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Corridor>>
    >("v1/crm/corridors", {
      method: "GET",
      searchParams: { page: page.toString(), limit: limit.toString() },
    });

    return response.data;
  };

  /**
   * Update corridor configuration
   * @param corridorId - Corridor ID
   * @param updates - Corridor updates
   * @returns Updated corridor
   */
  updateCorridor = async (
    corridorId: string,
    updates: Partial<CreateCorridorRequest>
  ): Promise<Corridor> => {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `v1/crm/corridors/${corridorId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  };

  /**
   * Activate a corridor to allow transactions
   * @param corridorId - Corridor ID
   */
  activateCorridor = async (corridorId: string): Promise<Corridor> => {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `v1/crm/corridors/${corridorId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  };

  /**
   * Deactivate a corridor to prevent new transactions
   * @param corridorId - Corridor ID
   * @param reason - Reason for deactivation
   */
  deactivateCorridor = async (
    corridorId: string,
    reason: string
  ): Promise<Corridor> => {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `v1/crm/corridors/${corridorId}/deactivate`,
      {
        method: "POST",
        json: { reason },
      }
    );

    return response.data;
  };

  /**
   * Get performance metrics for a corridor
   * @param corridorId - Corridor ID
   * @param startDate - Start date for metrics
   * @param endDate - End date for metrics
   * @returns Performance data
   */
  getCorridorPerformance = async (
    corridorId: string,
    startDate: string,
    endDate: string
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/corridors/${corridorId}/performance`,
      {
        method: "GET",
        searchParams: { startDate, endDate },
      }
    );

    return response.data;
  };
}

/**
 * Case Service
 * Manages support cases and tickets
 */
class CaseService {
  constructor(private client: ApiClient) {}

  /**
   * Search for cases by various criteria
   * @param params - Search filters
   * @returns Paginated list of cases
   */
  searchCases = async (
    params: CaseSearchParams
  ): Promise<PaginatedResponse<Case>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        cases: Case[];
        total: number;
        page: number;
        limit: number;
      }>
    >("v1/crm/cases/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.cases,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };

  /**
   * Create a new support case
   * @param caseData - Case information
   * @returns Created case
   */
  createCase = async (caseData: CreateCaseRequest): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      "v1/crm/cases/",
      {
        method: "POST",
        json: caseData,
      }
    );

    return response.data;
  };

  /**
   * Get detailed information about a case
   * @param caseId - Case ID
   * @returns Case details
   */
  getCase = async (caseId: string): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `v1/crm/cases/${caseId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  };
  /**
   * Get a paginated list of cases
   * @param page - Page number
   * @param limit - Number of items per page
   * @returns Paginated list of cases
   */
  getCases = async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Case>> => {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Case>>
    >("v1/crm/cases", {
      method: "GET",
      searchParams: { page: page.toString(), limit: limit.toString() },
    });

    return response.data;
  };
  /**
   * Update case information
   * @param caseId - Case ID
   * @param updates - Case updates
   * @returns Updated case
   */
  updateCase = async (
    caseId: string,
    updates: Partial<CreateCaseRequest>
  ): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `v1/crm/cases/${caseId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  };

  /**
   * Assign a case to a user
   * @param caseId - Case ID
   * @param assigneeId - User ID to assign to
   */
  assignCase = async (caseId: string, assigneeId: string): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `v1/crm/cases/${caseId}/assign`,
      {
        method: "POST",
        json: { assigneeId },
      }
    );

    return response.data;
  };

  /**
   * Mark a case as resolved
   * @param caseId - Case ID
   * @param resolution - Resolution description
   */
  resolveCase = async (caseId: string, resolution: string): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `v1/crm/cases/${caseId}/resolve`,
      {
        method: "POST",
        json: { resolution },
      }
    );

    return response.data;
  };

  /**
   * Close a resolved case
   * @param caseId - Case ID
   */
  closeCase = async (caseId: string): Promise<Case> => {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `v1/crm/cases/${caseId}/close`,
      {
        method: "POST",
      }
    );

    return response.data;
  };
}

/**
 * Partner Service
 * Manages partner organizations
 */
class PartnerService {
  constructor(private client: ApiClient) {}

  /**
   * Search for partners
   * @param params - Search filters
   * @returns Paginated list of partners
   */
  searchPartners = async (params?: {
    name?: string;
    businessType?: Partner["businessType"];
    status?: Partner["status"];
    country?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Partner>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        partners: Partner[];
        total: number;
        page: number;
        limit: number;
      }>
    >("v1/crm/partners/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.partners,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };

  /**
   * Register a new partner
   * @param partnerData - Partner information
   * @returns Created partner
   */
  createPartner = async (
    partnerData: CreatePartnerRequest
  ): Promise<Partner> => {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      "v1/crm/partners/",
      {
        method: "POST",
        json: partnerData,
      }
    );

    return response.data;
  };

  /**
   * Get partner details
   * @param partnerId - Partner ID
   * @returns Partner details
   */
  getPartner = async (partnerId: string): Promise<Partner> => {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `v1/crm/partners/${partnerId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  };
  /**
   * Get a paginated list of all partners
   * @param page - Page number
   * @param limit - Number of items per page
   * @returns Paginated list of partners
   */
  getPartners = async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Partner>> => {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Partner>>
    >("v1/crm/partners", {
      method: "GET",
      searchParams: { page: page.toString(), limit: limit.toString() },
    });

    return response.data;
  };
  /**
   * Update partner information
   * @param partnerId - Partner ID
   * @param updates - Partner updates
   * @returns Updated partner
   */
  updatePartner = async (
    partnerId: string,
    updates: Partial<CreatePartnerRequest>
  ): Promise<Partner> => {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `v1/crm/partners/${partnerId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  };

  /**
   * Activate a partner
   * @param partnerId - Partner ID
   */
  activatePartner = async (partnerId: string): Promise<Partner> => {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `v1/crm/partners/${partnerId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  };

  /**
   * Deactivate a partner
   * @param partnerId - Partner ID
   * @param reason - Reason for deactivation
   */
  deactivatePartner = async (
    partnerId: string,
    reason?: string
  ): Promise<Partner> => {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `v1/crm/partners/${partnerId}/deactivate`,
      {
        method: "POST",
        json: reason ? { reason } : undefined,
      }
    );

    return response.data;
  };

  /**
   * Generate API key for partner integration
   * @param partnerId - Partner ID
   * @param keyData - API key configuration
   */
  generateApiKey = async (
    partnerId: string,
    keyData: { expiresInDays?: number; scopes: string[] }
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/partners/${partnerId}/api-keys`,
      {
        method: "POST",
        json: keyData,
      }
    );

    return response.data;
  };

  /**
   * Revoke a partner's API key
   * @param partnerId - Partner ID
   * @param keyId - API key ID
   */
  revokeApiKey = async (partnerId: string, keyId: string): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/partners/${partnerId}/api-keys/${keyId}`,
      {
        method: "DELETE",
      }
    );

    return response.data;
  };

  /**
   * Get settlement history for a partner
   * @param partnerId - Partner ID
   * @param startDate - Start date
   * @param endDate - End date
   */
  getSettlements = async (
    partnerId: string,
    startDate: string,
    endDate: string
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/partners/${partnerId}/settlements`,
      {
        method: "GET",
        searchParams: { startDate, endDate },
      }
    );

    return response.data;
  };
}

/**
 * Business Service
 * Manages business accounts
 */
class BusinessService {
  constructor(private client: ApiClient) {}

  /**
   * Search for businesses
   * @param params - Search filters
   * @returns Paginated list of businesses
   */
  searchBusinesses = async (
    params: BusinessSearchParams
  ): Promise<PaginatedResponse<Business>> => {
    const response = await this.client.request<
      BaseApiResponse<{
        businesses: Business[];
        total: number;
        page: number;
        limit: number;
      }>
    >("v1/crm/businesses/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.businesses,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  };

  /**
   * Get business details
   * @param businessId - Business ID
   * @returns Business details
   */
  getBusiness = async (businessId: string): Promise<Business> => {
    const response = await this.client.request<BaseApiResponse<Business>>(
      `v1/crm/businesses/${businessId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  };
  /**
   * Get a paginated list of businesses
   * @param page - Page number
   * @param limit - Number of items per page
   * @returns Paginated list of businesses
   */
  getBusinesses = async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Business>> => {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Business>>
    >("v1/crm/businesses", {
      method: "GET",
      searchParams: { page: page.toString(), limit: limit.toString() },
    });

    return response.data;
  };

  /**
   * Approve business KYC verification
   * @param businessId - Business ID
   * @param approvalData - Comments and risk score
   */
  approveKyc = async (
    businessId: string,
    approvalData?: { comments?: string; riskScore?: number }
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/businesses/${businessId}/kyc/approve`,
      {
        method: "POST",
        json: approvalData,
      }
    );

    return response.data;
  };

  /**
   * Reject business KYC verification
   * @param businessId - Business ID
   * @param rejectionData - Reason and review notes
   */
  rejectKyc = async (
    businessId: string,
    rejectionData: { reason: string; reviewNotes?: string }
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/businesses/${businessId}/kyc/reject`,
      {
        method: "POST",
        json: rejectionData,
      }
    );

    return response.data;
  };

  /**
   * Suspend a business account
   * @param businessId - Business ID
   * @param suspensionData - Reason and optional end date
   */
  suspendBusiness = async (
    businessId: string,
    suspensionData: { reason: string; suspendUntil?: string }
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/businesses/${businessId}/suspend`,
      {
        method: "POST",
        json: suspensionData,
      }
    );

    return response.data;
  };

  /**
   * Activate a suspended or inactive business
   * @param businessId - Business ID
   */
  activateBusiness = async (businessId: string): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/businesses/${businessId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  };

  /**
   * Update business profile
   * @param businessId - Business ID
   * @param updates - Profile updates
   */
  updateProfile = async (
    businessId: string,
    updates: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      address?: string;
      website?: string;
      industry?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<any> => {
    const response = await this.client.request<BaseApiResponse<any>>(
      `v1/crm/businesses/${businessId}/profile`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  };
}

/**
 * Dashboard Service
 * Provides analytics and KPI data
 */
class DashboardService {
  constructor(private client: ApiClient) {}

  /**
   * Get real-time platform KPIs
   * @returns Current KPI metrics
   */
  getKPIs = async (): Promise<DashboardKPIs> => {
    const response = await this.client.request<BaseApiResponse<DashboardKPIs>>(
      "v1/crm/dashboard/kpis",
      {
        method: "GET",
      }
    );

    return response.data;
  };

  /**
   * Get cached metrics for a date range
   * @param metricType - Type of metrics (DAILY, WEEKLY, MONTHLY)
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Historical metrics
   */
  getMetrics = async (
    metricType: "DAILY" | "WEEKLY" | "MONTHLY",
    startDate: string,
    endDate: string
  ): Promise<any[]> => {
    const response = await this.client.request<BaseApiResponse<any[]>>(
      "v1/crm/dashboard/metrics",
      {
        method: "GET",
        searchParams: { metricType, startDate, endDate },
      }
    );

    return response.data;
  };

  /**
   * Get trend analysis comparing periods
   * @param metricType - Type of trend analysis
   * @returns Trend comparison data
   */
  getTrends = async (
    metricType: "DAILY" | "WEEKLY" | "MONTHLY"
  ): Promise<{
    current: any;
    previous: any | null;
    changes: any | null;
  }> => {
    const response = await this.client.request<
      BaseApiResponse<{
        current: any;
        previous: any | null;
        changes: any | null;
      }>
    >("v1/crm/dashboard/trends", {
      method: "GET",
      searchParams: { metricType },
    });

    return response.data;
  };
}

// ============================================================================
// Main IndraPay CRM API Client
// ============================================================================

export class IndraPayCrmApi {
  private client: ApiClient;

  public readonly auth: AuthService;
  public readonly customers: CustomerService;
  public readonly transactions: TransactionService;
  public readonly corridors: CorridorService;
  public readonly cases: CaseService;
  public readonly partners: PartnerService;
  public readonly businesses: BusinessService;
  public readonly dashboard: DashboardService;

  constructor(config: ApiClientConfig) {
    this.client = new ApiClient(config);
    // Initialize all services
    this.auth = new AuthService(this.client);
    this.customers = new CustomerService(this.client);
    this.transactions = new TransactionService(this.client);
    this.corridors = new CorridorService(this.client);
    this.cases = new CaseService(this.client);
    this.partners = new PartnerService(this.client);
    this.businesses = new BusinessService(this.client);
    this.dashboard = new DashboardService(this.client);
  }

  /**
   * Set the access token for authenticated requests
   * @param token - JWT access token
   */
  setAccessToken = (token: string | null): void => {
    this.client.setAccessToken(token);
  };

  /**
   * Get the current access token
   * @returns Current access token or null
   */
  getAccessToken = (): string | null => {
    return this.client.getAccessToken();
  };
}

export type ApiClientType = InstanceType<typeof IndraPayCrmApi>;
