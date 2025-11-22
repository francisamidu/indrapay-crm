// ============================================================================
// Type Definitions
// ============================================================================

import type {
  ChangePasswordRequest,
  CrmUser,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from "./auth";
import type { Business, BusinessSearchParams } from "./business";
import type { Case, CaseSearchParams, CreateCaseRequest } from "./case";
import type {
  DateTimeString,
  ISO_COUNTRY,
  ISO_CURRENCY,
  ISO_DATE,
  Password,
  UUID,
} from "./common";
import type { ComplianceCustomer } from "./compliance";
import type {
  Corridor,
  CorridorSearchParams,
  CreateCorridorRequest,
} from "./corridors";
import type { Customer, CustomerSearchParams } from "./customer";
import type { DashboardKPIs } from "./dashboard";
import type { ApiError } from "./error";
import type {
  Alert,
  AlertSeverity,
  Notification,
  NotificationFilter,
  NotificationSettings,
  NotificationStatus,
  NotificationType,
} from "./notification";
import type { CreatePartnerRequest, Partner } from "./partners";
import type { Report } from "./report";
import type { Transaction, TransactionSearchParams } from "./transactions";
import type { User } from "./user";
import type { FreezeWalletRequest, Wallet } from "./wallet";

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
export type {
  Alert,
  AlertSeverity,
  ApiError,
  BaseApiResponse,
  Business,
  BusinessSearchParams,
  Case,
  CaseSearchParams,
  ChangePasswordRequest,
  ComplianceCustomer,
  Corridor,
  CorridorSearchParams,
  CreateCaseRequest,
  CreateCorridorRequest,
  CreatePartnerRequest,
  CrmUser,
  Customer,
  CustomerSearchParams,
  DashboardKPIs,
  DateTimeString,
  FreezeWalletRequest,
  ISO_COUNTRY,
  ISO_CURRENCY,
  ISO_DATE,
  LoginRequest,
  LoginResponse,
  Notification,
  NotificationFilter,
  NotificationSettings,
  NotificationStatus,
  NotificationType,
  PaginatedResponse,
  Partner,
  Password,
  RefreshTokenRequest,
  Report,
  Transaction,
  TransactionSearchParams,
  User,
  UUID,
  Wallet,
};
