# IndraPay CRM

A comprehensive Customer Relationship Management system designed for payment platform operations, built with modern web technologies.

## 🚀 Overview

IndraPay CRM is a full-featured dashboard for managing payment operations, customer relationships, compliance monitoring, and transaction processing. The system provides real-time insights into payment corridors, wallet management, compliance workflows, and partner integrations.

## ✨ Features

### 🏠 **Dashboard & Analytics**
- Real-time KPI monitoring (transactions, wallets, success rates, volume)
- Interactive charts for transaction volume and corridor performance
- Recent activity tracking and alerts system

### 👥 **Customer Management**
- Comprehensive customer profiles and wallet management
- KYC/AML compliance workflows
- Risk scoring and monitoring
- Transaction history and account management

### 💳 **Transaction Operations**
- Real-time transaction monitoring
- Transaction search and filtering
- Refund and reversal capabilities
- Bulk payout processing

### 🌐 **Corridor Management**
- Payment corridor configuration and monitoring
- Exchange rate management
- Fee structure configuration
- Performance analytics by corridor

### 🛡️ **Compliance & Security**
- Automated compliance checks
- Case management system
- Document verification workflows
- Audit logging and reporting

### 🤝 **Partner Management**
- Partner onboarding and management
- Settlement tracking and reporting
- API key management for integrations
- Performance monitoring

### ⚙️ **Operations Tools**
- Manual transaction processing
- Wallet management tools
- Support ticket system
- Bulk operations

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Router** for routing
- **TanStack Query** for data fetching
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **Recharts** for data visualization

### Backend Integration
- **TypeScript API client** with full type safety
- **Ky** for HTTP requests
- **Error handling** with custom API error classes

### Database
- **Prisma** ORM with PostgreSQL
- Structured database schema for financial operations

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** strict configuration

## 📁 Project Structure

```
francisamidu-indrapay-crm/
├── src/
│   ├── api/              # API client and services
│   ├── components/       # React components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard feature components
│   │   ├── layout/      # Layout components
│   │   ├── notifications/# Notification components
│   │   └── ui/          # Reusable UI components (shadcn/ui)
│   ├── contexts/        # React contexts
│   ├── lib/            # Utility functions
│   ├── providers/      # React providers (Query, etc.)
│   ├── routes/         # TanStack Router routes
│   ├── shared/         # Shared data and constants
│   └── types/          # TypeScript type definitions
├── schema.prisma       # Database schema
└── indrapay_crm_integration.ts # Core API integration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd francisamidu-indrapay-crm
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/indrapay_crm"
VITE_API_URL="http://localhost:4000"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 API Integration

The project includes a comprehensive API client for CRM operations:

### Services Available
- **AuthService**: User authentication and session management
- **CustomerService**: Customer account management
- **TransactionService**: Transaction operations and monitoring
- **CorridorService**: Payment corridor management
- **CaseService**: Support case management
- **PartnerService**: Partner organization management
- **BusinessService**: Business account management
- **DashboardService**: Analytics and KPI data

### Example Usage
```typescript
import { IndraPayCrmApi } from './api/client';

const crmApi = new IndraPayCrmApi({
  baseUrl: import.meta.env.VITE_API_URL,
});

// Login
const { accessToken } = await crmApi.auth.login({
  username: 'admin@indrapay.com',
  password: 'password123',
});

// Search customers
const customers = await crmApi.customers.searchCustomers({
  kycStatus: 'PENDING',
  page: 1,
  limit: 20,
});
```

## 🎨 Styling & Theming

The project uses **Tailwind CSS** with a custom design system:
- Custom color palette with primary (`#14748b`) and secondary (`#125e8a`) colors
- Dark mode support
- Custom scrollbars and component styling
- Responsive design throughout

## 🔐 Authentication Flow

The application implements a secure authentication system:
- Email/password login
- Google OAuth integration
- Multi-factor authentication (MFA) setup
- Password recovery
- Session management with JWT tokens

## 📱 Dashboard Modules

1. **Home/Overview**: High-level metrics and recent activity
2. **Compliance**: KYC/AML workflows and case management
3. **Corridors**: Payment corridor configuration and monitoring
4. **Operations**: Manual transaction processing and support tools
5. **Partners**: Partner organization management
6. **Reports**: Analytics and reporting
7. **Transactions**: Transaction monitoring and management
8. **Wallet Management**: Customer wallet administration

## 🗄️ Database Schema

The Prisma schema includes models for:
- User accounts and profiles
- Wallet and ledger management
- Transaction records
- Compliance cases and disputes
- Partner configurations
- API key management
- Country and limit configurations

## 🧪 Testing

The project is configured with:
- TypeScript strict mode
- ESLint for code quality
- Prettier for code formatting
- TanStack Router type-safe routing

## 📈 Performance Optimizations

- Code splitting with TanStack Router
- React Query for efficient data fetching
- Optimized re-renders with proper React patterns
- Tailwind CSS for minimal CSS bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- Check the project documentation
- Review the TypeScript type definitions
- Examine the example components for implementation patterns
