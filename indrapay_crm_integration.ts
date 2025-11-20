// ============================================================================
// Type Definitions
// ============================================================================

// Base API Response Types
interface BaseApiResponse<T> {
  success: boolean;
  resultCode: string;
  resultDescription: string;
  transactionId: string;
  data: T;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth Types
interface CrmUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  permissions?: string[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: CrmUser;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Customer Types
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

// Wallet Types
interface Wallet {
  wallet_reference_number: string;
  wallet_currency: string;
  wallet_status: "ACTIVE" | "INACTIVE" | "FROZEN";
  wallet_is_frozen: boolean;
  wallet_balance: number;
  wallet_ledger_balance: number;
  wallet_pending_holds: number;
  wallet_country_code: string | null;
}

interface FreezeWalletRequest {
  reason: string;
}

// Transaction Types
interface Transaction {
  id: string;
  ledger_entry_type:
    | "FUND"
    | "WITHDRAW"
    | "TRANSFER"
    | "CONVERT"
    | "FEE"
    | "TAX";
  ledger_entry_amount: number;
  ledger_entry_currency: string;
  ledger_entry_status:
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "REVERSED"
    | "INITIATED";
  ledger_entry_fee_amount?: number;
  ledger_entry_created_at_information: string;
  ledger_entry_debit_wallet_informationId?: string;
  ledger_entry_credit_wallet_informationId?: string;
}

interface TransactionSearchParams {
  transactionId?: string;
  userId?: string;
  walletId?: string;
  status?: Transaction["ledger_entry_status"];
  currency?: string;
  railType?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface RefundRequest {
  amount: number;
  reason: string;
}

interface ReverseTransactionRequest {
  reason: string;
}

// Corridor Types
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

// Case Types

interface Case {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: "TRANSACTION" | "COMPLIANCE" | "TECHNICAL" | "ACCOUNT" | "OTHER";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  customerId?: string;
  transactionId?: string;
  assigneeId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface CreateCaseRequest {
  title: string;
  description: string;
  priority?: Case["priority"];
  category: Case["category"];
  customerId?: string;
  transactionId?: string;
  metadata?: Record<string, any>;
}

interface CaseSearchParams {
  status?: Case["status"];
  priority?: Case["priority"];
  assigneeId?: string;
  category?: Case["category"];
  customerId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Partner Types
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

// Business Types
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

// Dashboard Types
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

// Error Types
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ============================================================================
// API Client Configuration
// ============================================================================

import ky, { type KyInstance, type Options } from "ky";

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
          (request) => {
            if (this.accessToken) {
              request.headers.set(
                "Authorization",
                `Bearer ${this.accessToken}`
              );
            }
          },
        ],
        afterResponse: [
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

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  async request<T>(url: string, options?: Options): Promise<T> {
    try {
      const response = await this.client(url, options);
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        "NETWORK_ERROR",
        "An unexpected network error occurred",
        error
      );
    }
  }
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
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.request<BaseApiResponse<LoginResponse>>(
      "api/v1/crm/auth/login",
      {
        method: "POST",
        json: credentials,
      }
    );

    // Store access token
    this.client.setAccessToken(response.data.accessToken);

    return response.data;
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns New authentication tokens
   */
  async refreshToken(
    refreshToken: RefreshTokenRequest
  ): Promise<LoginResponse> {
    const response = await this.client.request<BaseApiResponse<LoginResponse>>(
      "api/v1/crm/auth/token/refresh",
      {
        method: "POST",
        json: refreshToken,
      }
    );

    // Update access token
    this.client.setAccessToken(response.data.accessToken);

    return response.data;
  }

  /**
   * Logout current CRM user
   */
  async logout(): Promise<void> {
    await this.client.request<BaseApiResponse<void>>("api/v1/crm/auth/logout", {
      method: "POST",
    });

    // Clear access token
    this.client.setAccessToken(null);
  }

  /**
   * Get current authenticated user profile
   * @returns CRM user profile data
   */
  async getProfile(): Promise<CrmUser> {
    const response = await this.client.request<BaseApiResponse<CrmUser>>(
      "api/v1/crm/auth/profile",
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Change password for authenticated CRM user
   * @param passwordData - Current and new password
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    await this.client.request<BaseApiResponse<void>>(
      "api/v1/crm/auth/password/change",
      {
        method: "POST",
        json: passwordData,
      }
    );
  }
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
  async searchCustomers(
    params: CustomerSearchParams
  ): Promise<PaginatedResponse<Customer>> {
    const response = await this.client.request<
      BaseApiResponse<PaginatedResponse<Customer>>
    >("api/v1/crm/customers/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return response.data;
  }

  /**
   * Get wallet information for a specific customer
   * @param customerId - Customer ID
   * @param currency - Optional currency filter
   * @returns Wallet details
   */
  async getCustomerWallet(
    customerId: string,
    currency?: string
  ): Promise<Wallet> {
    const response = await this.client.request<BaseApiResponse<Wallet>>(
      `api/v1/crm/customers/${customerId}/wallet`,
      {
        method: "GET",
        searchParams: currency ? { currency } : undefined,
      }
    );

    return response.data;
  }

  /**
   * Freeze a customer wallet to prevent transactions
   * @param customerId - Customer ID
   * @param walletId - Wallet ID
   * @param reason - Reason for freezing
   */
  async freezeWallet(
    customerId: string,
    walletId: string,
    reason: string
  ): Promise<void> {
    await this.client.request<BaseApiResponse<void>>(
      `api/v1/crm/customers/${customerId}/wallets/${walletId}/freeze`,
      {
        method: "POST",
        json: { reason },
      }
    );
  }

  /**
   * Unfreeze a previously frozen wallet
   * @param customerId - Customer ID
   * @param walletId - Wallet ID
   */
  async unfreezeWallet(customerId: string, walletId: string): Promise<void> {
    await this.client.request<BaseApiResponse<void>>(
      `api/v1/crm/customers/${customerId}/wallets/${walletId}/unfreeze`,
      {
        method: "POST",
      }
    );
  }

  /**
   * Get transaction history for a customer
   * @param customerId - Customer ID
   * @param params - Transaction filters
   * @returns Paginated transaction list
   */
  async getCustomerTransactions(
    customerId: string,
    params?: Omit<TransactionSearchParams, "userId">
  ): Promise<PaginatedResponse<Transaction>> {
    const response = await this.client.request<
      BaseApiResponse<{
        transactions: Transaction[];
        total: number;
        page: number;
        limit: number;
      }>
    >(`api/v1/crm/customers/${customerId}/transactions`, {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.transactions,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }
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
  async searchTransactions(
    params: TransactionSearchParams
  ): Promise<PaginatedResponse<Transaction>> {
    const response = await this.client.request<
      BaseApiResponse<{
        transactions: Transaction[];
        total: number;
        page: number;
        limit: number;
      }>
    >("api/v1/crm/transactions/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.transactions,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  /**
   * Get detailed information about a specific transaction
   * @param txnId - Transaction ID
   * @returns Transaction details
   */
  async getTransaction(txnId: string): Promise<Transaction> {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `api/v1/crm/transactions/${txnId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Retry a failed transaction
   * @param txnId - Transaction ID
   * @param reason - Optional reason for retry
   */
  async retryTransaction(txnId: string, reason?: string): Promise<Transaction> {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `api/v1/crm/transactions/${txnId}/retry`,
      {
        method: "POST",
        json: reason ? { reason } : undefined,
      }
    );

    return response.data;
  }

  /**
   * Process a refund for a transaction
   * @param txnId - Transaction ID
   * @param refundData - Refund amount and reason
   */
  async refundTransaction(
    txnId: string,
    refundData: RefundRequest
  ): Promise<Transaction> {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `api/v1/crm/transactions/${txnId}/refund`,
      {
        method: "POST",
        json: refundData,
      }
    );

    return response.data;
  }

  /**
   * Reverse a completed transaction
   * @param txnId - Transaction ID
   * @param reason - Reason for reversal
   */
  async reverseTransaction(
    txnId: string,
    reason: string
  ): Promise<Transaction> {
    const response = await this.client.request<BaseApiResponse<Transaction>>(
      `api/v1/crm/transactions/${txnId}/reverse`,
      {
        method: "POST",
        json: { reason },
      }
    );

    return response.data;
  }
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
  async searchCorridors(
    params: CorridorSearchParams
  ): Promise<PaginatedResponse<Corridor>> {
    const response = await this.client.request<
      BaseApiResponse<{
        corridors: Corridor[];
        total: number;
        page: number;
        limit: number;
      }>
    >("api/v1/crm/corridors/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.corridors,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  /**
   * Create a new payment corridor
   * @param corridorData - Corridor configuration
   * @returns Created corridor
   */
  async createCorridor(corridorData: CreateCorridorRequest): Promise<Corridor> {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      "api/v1/crm/corridors/",
      {
        method: "POST",
        json: corridorData,
      }
    );

    return response.data;
  }

  /**
   * Get detailed information about a corridor
   * @param corridorId - Corridor ID
   * @returns Corridor details
   */
  async getCorridor(corridorId: string): Promise<Corridor> {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `api/v1/crm/corridors/${corridorId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Update corridor configuration
   * @param corridorId - Corridor ID
   * @param updates - Corridor updates
   * @returns Updated corridor
   */
  async updateCorridor(
    corridorId: string,
    updates: Partial<CreateCorridorRequest>
  ): Promise<Corridor> {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `api/v1/crm/corridors/${corridorId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  }

  /**
   * Activate a corridor to allow transactions
   * @param corridorId - Corridor ID
   */
  async activateCorridor(corridorId: string): Promise<Corridor> {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `api/v1/crm/corridors/${corridorId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  }

  /**
   * Deactivate a corridor to prevent new transactions
   * @param corridorId - Corridor ID
   * @param reason - Reason for deactivation
   */
  async deactivateCorridor(
    corridorId: string,
    reason: string
  ): Promise<Corridor> {
    const response = await this.client.request<BaseApiResponse<Corridor>>(
      `api/v1/crm/corridors/${corridorId}/deactivate`,
      {
        method: "POST",
        json: { reason },
      }
    );

    return response.data;
  }

  /**
   * Get performance metrics for a corridor
   * @param corridorId - Corridor ID
   * @param startDate - Start date for metrics
   * @param endDate - End date for metrics
   * @returns Performance data
   */
  async getCorridorPerformance(
    corridorId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/corridors/${corridorId}/performance`,
      {
        method: "GET",
        searchParams: { startDate, endDate },
      }
    );

    return response.data;
  }
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
  async searchCases(
    params: CaseSearchParams
  ): Promise<PaginatedResponse<Case>> {
    const response = await this.client.request<
      BaseApiResponse<{
        cases: Case[];
        total: number;
        page: number;
        limit: number;
      }>
    >("api/v1/crm/cases/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.cases,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  /**
   * Create a new support case
   * @param caseData - Case information
   * @returns Created case
   */
  async createCase(caseData: CreateCaseRequest): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      "api/v1/crm/cases/",
      {
        method: "POST",
        json: caseData,
      }
    );

    return response.data;
  }

  /**
   * Get detailed information about a case
   * @param caseId - Case ID
   * @returns Case details
   */
  async getCase(caseId: string): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `api/v1/crm/cases/${caseId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Update case information
   * @param caseId - Case ID
   * @param updates - Case updates
   * @returns Updated case
   */
  async updateCase(
    caseId: string,
    updates: Partial<CreateCaseRequest>
  ): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `api/v1/crm/cases/${caseId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  }

  /**
   * Assign a case to a user
   * @param caseId - Case ID
   * @param assigneeId - User ID to assign to
   */
  async assignCase(caseId: string, assigneeId: string): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `api/v1/crm/cases/${caseId}/assign`,
      {
        method: "POST",
        json: { assigneeId },
      }
    );

    return response.data;
  }

  /**
   * Mark a case as resolved
   * @param caseId - Case ID
   * @param resolution - Resolution description
   */
  async resolveCase(caseId: string, resolution: string): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `api/v1/crm/cases/${caseId}/resolve`,
      {
        method: "POST",
        json: { resolution },
      }
    );

    return response.data;
  }

  /**
   * Close a resolved case
   * @param caseId - Case ID
   */
  async closeCase(caseId: string): Promise<Case> {
    const response = await this.client.request<BaseApiResponse<Case>>(
      `api/v1/crm/cases/${caseId}/close`,
      {
        method: "POST",
      }
    );

    return response.data;
  }
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
  async searchPartners(params?: {
    name?: string;
    businessType?: Partner["businessType"];
    status?: Partner["status"];
    country?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Partner>> {
    const response = await this.client.request<
      BaseApiResponse<{
        partners: Partner[];
        total: number;
        page: number;
        limit: number;
      }>
    >("api/v1/crm/partners/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.partners,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  /**
   * Register a new partner
   * @param partnerData - Partner information
   * @returns Created partner
   */
  async createPartner(partnerData: CreatePartnerRequest): Promise<Partner> {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      "api/v1/crm/partners/",
      {
        method: "POST",
        json: partnerData,
      }
    );

    return response.data;
  }

  /**
   * Get partner details
   * @param partnerId - Partner ID
   * @returns Partner details
   */
  async getPartner(partnerId: string): Promise<Partner> {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `api/v1/crm/partners/${partnerId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Update partner information
   * @param partnerId - Partner ID
   * @param updates - Partner updates
   * @returns Updated partner
   */
  async updatePartner(
    partnerId: string,
    updates: Partial<CreatePartnerRequest>
  ): Promise<Partner> {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `api/v1/crm/partners/${partnerId}`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  }

  /**
   * Activate a partner
   * @param partnerId - Partner ID
   */
  async activatePartner(partnerId: string): Promise<Partner> {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `api/v1/crm/partners/${partnerId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  }

  /**
   * Deactivate a partner
   * @param partnerId - Partner ID
   * @param reason - Reason for deactivation
   */
  async deactivatePartner(
    partnerId: string,
    reason?: string
  ): Promise<Partner> {
    const response = await this.client.request<BaseApiResponse<Partner>>(
      `api/v1/crm/partners/${partnerId}/deactivate`,
      {
        method: "POST",
        json: reason ? { reason } : undefined,
      }
    );

    return response.data;
  }

  /**
   * Generate API key for partner integration
   * @param partnerId - Partner ID
   * @param keyData - API key configuration
   */
  async generateApiKey(
    partnerId: string,
    keyData: { expiresInDays?: number; scopes: string[] }
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/partners/${partnerId}/api-keys`,
      {
        method: "POST",
        json: keyData,
      }
    );

    return response.data;
  }

  /**
   * Revoke a partner's API key
   * @param partnerId - Partner ID
   * @param keyId - API key ID
   */
  async revokeApiKey(partnerId: string, keyId: string): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/partners/${partnerId}/api-keys/${keyId}`,
      {
        method: "DELETE",
      }
    );

    return response.data;
  }

  /**
   * Get settlement history for a partner
   * @param partnerId - Partner ID
   * @param startDate - Start date
   * @param endDate - End date
   */
  async getSettlements(
    partnerId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/partners/${partnerId}/settlements`,
      {
        method: "GET",
        searchParams: { startDate, endDate },
      }
    );

    return response.data;
  }
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
  async searchBusinesses(
    params: BusinessSearchParams
  ): Promise<PaginatedResponse<Business>> {
    const response = await this.client.request<
      BaseApiResponse<{
        businesses: Business[];
        total: number;
        page: number;
        limit: number;
      }>
    >("api/v1/crm/businesses/search", {
      method: "GET",
      searchParams: params as Record<string, string>,
    });

    return {
      items: response.data.businesses,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  /**
   * Get business details
   * @param businessId - Business ID
   * @returns Business details
   */
  async getBusiness(businessId: string): Promise<Business> {
    const response = await this.client.request<BaseApiResponse<Business>>(
      `api/v1/crm/businesses/${businessId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Approve business KYC verification
   * @param businessId - Business ID
   * @param approvalData - Comments and risk score
   */
  async approveKyc(
    businessId: string,
    approvalData?: { comments?: string; riskScore?: number }
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/businesses/${businessId}/kyc/approve`,
      {
        method: "POST",
        json: approvalData,
      }
    );

    return response.data;
  }

  /**
   * Reject business KYC verification
   * @param businessId - Business ID
   * @param rejectionData - Reason and review notes
   */
  async rejectKyc(
    businessId: string,
    rejectionData: { reason: string; reviewNotes?: string }
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/businesses/${businessId}/kyc/reject`,
      {
        method: "POST",
        json: rejectionData,
      }
    );

    return response.data;
  }

  /**
   * Suspend a business account
   * @param businessId - Business ID
   * @param suspensionData - Reason and optional end date
   */
  async suspendBusiness(
    businessId: string,
    suspensionData: { reason: string; suspendUntil?: string }
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/businesses/${businessId}/suspend`,
      {
        method: "POST",
        json: suspensionData,
      }
    );

    return response.data;
  }

  /**
   * Activate a suspended or inactive business
   * @param businessId - Business ID
   */
  async activateBusiness(businessId: string): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/businesses/${businessId}/activate`,
      {
        method: "POST",
      }
    );

    return response.data;
  }

  /**
   * Update business profile
   * @param businessId - Business ID
   * @param updates - Profile updates
   */
  async updateProfile(
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
  ): Promise<any> {
    const response = await this.client.request<BaseApiResponse<any>>(
      `api/v1/crm/businesses/${businessId}/profile`,
      {
        method: "PUT",
        json: updates,
      }
    );

    return response.data;
  }
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
  async getKPIs(): Promise<DashboardKPIs> {
    const response = await this.client.request<BaseApiResponse<DashboardKPIs>>(
      "api/v1/crm/dashboard/kpis",
      {
        method: "GET",
      }
    );

    return response.data;
  }

  /**
   * Get cached metrics for a date range
   * @param metricType - Type of metrics (DAILY, WEEKLY, MONTHLY)
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Historical metrics
   */
  async getMetrics(
    metricType: "DAILY" | "WEEKLY" | "MONTHLY",
    startDate: string,
    endDate: string
  ): Promise<any[]> {
    const response = await this.client.request<BaseApiResponse<any[]>>(
      "api/v1/crm/dashboard/metrics",
      {
        method: "GET",
        searchParams: { metricType, startDate, endDate },
      }
    );

    return response.data;
  }

  /**
   * Get trend analysis comparing periods
   * @param metricType - Type of trend analysis
   * @returns Trend comparison data
   */
  async getTrends(metricType: "DAILY" | "WEEKLY" | "MONTHLY"): Promise<{
    current: any;
    previous: any | null;
    changes: any | null;
  }> {
    const response = await this.client.request<
      BaseApiResponse<{
        current: any;
        previous: any | null;
        changes: any | null;
      }>
    >("api/v1/crm/dashboard/trends", {
      method: "GET",
      searchParams: { metricType },
    });

    return response.data;
  }
}

// ============================================================================
// Main IndraPay CRM API Client
// ============================================================================

/**
 * IndraPay CRM API Client
 * Main entry point for all CRM API operations
 *
 * @example
 * ```typescript
 * const crmApi = new IndraPayCrmApi({
 *   baseUrl: 'https://api.indrapay.com',
 *   timeout: 30000,
 * });
 *
 * // Login
 * const { accessToken, user } = await crmApi.auth.login({
 *   username: 'admin@indrapay.com',
 *   password: 'securePassword123!',
 * });
 *
 * // Search customers
 * const customers = await crmApi.customers.searchCustomers({
 *   kycStatus: 'PENDING',
 *   page: 1,
 *   limit: 20,
 * });
 *
 * // Get transaction details
 * const transaction = await crmApi.transactions.getTransaction('txn-123');
 * ```
 */
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
  setAccessToken(token: string | null): void {
    this.client.setAccessToken(token);
  }

  /**
   * Get the current access token
   * @returns Current access token or null
   */
  getAccessToken(): string | null {
    return this.client.getAccessToken();
  }
}

// ============================================================================
// Export all types
// ============================================================================

export type {
  ApiClientConfig,
  BaseApiResponse,
  PaginatedResponse,
  CrmUser,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  ChangePasswordRequest,
  Customer,
  CustomerSearchParams,
  Wallet,
  FreezeWalletRequest,
  Transaction,
  TransactionSearchParams,
  RefundRequest,
  ReverseTransactionRequest,
  Corridor,
  CreateCorridorRequest,
  CorridorSearchParams,
  Case,
  CreateCaseRequest,
  CaseSearchParams,
  Partner,
  CreatePartnerRequest,
  Business,
  BusinessSearchParams,
  DashboardKPIs,
};

export { ApiError };
