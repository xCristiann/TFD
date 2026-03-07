export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = 'client' | 'admin' | 'support' | 'risk_manager';
export type TradingAccountPhase = 'challenge' | 'verification' | 'funded';
export type TradingAccountStatus = 'active' | 'review' | 'passed' | 'failed' | 'funded' | 'locked';
export type PayoutStatus = 'pending' | 'approved' | 'rejected' | 'paid';
export type ReviewStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  timezone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface ChallengeTemplate {
  id: string;
  name: string;
  description: string | null;
  initial_balance: number;
  profit_target_percent: number;
  daily_drawdown_percent: number;
  max_drawdown_percent: number;
  price_usd: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TradingAccount {
  id: string;
  user_id: string;
  challenge_template_id: string | null;
  account_number: string;
  phase: TradingAccountPhase;
  status: TradingAccountStatus;
  balance: number;
  equity: number;
  profit_target: number;
  daily_drawdown: number;
  max_drawdown: number;
  started_at: string | null;
  passed_at: string | null;
  locked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountRule {
  id: string;
  trading_account_id: string;
  rule_name: string;
  rule_value: number | null;
  rule_unit: string | null;
  is_breached: boolean;
  breached_at: string | null;
  created_at: string;
}

export interface AccountMetric {
  id: string;
  trading_account_id: string;
  metric_timestamp: string;
  balance: number;
  equity: number;
  daily_pnl: number;
  total_pnl: number;
  drawdown: number;
  metadata: Json;
}

export interface PayoutRequest {
  id: string;
  trading_account_id: string;
  user_id: string;
  amount: number;
  status: PayoutStatus;
  requested_at: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
}

export interface AccountReview {
  id: string;
  trading_account_id: string;
  requested_by: string;
  assigned_to: string | null;
  review_status: ReviewStatus;
  reason: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
}

export interface AdminNote {
  id: string;
  account_review_id: string | null;
  trading_account_id: string | null;
  author_id: string;
  note: string;
  is_internal: boolean;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile };
      user_roles: { Row: UserRole };
      challenge_templates: { Row: ChallengeTemplate };
      trading_accounts: { Row: TradingAccount };
      account_rules: { Row: AccountRule };
      account_metrics: { Row: AccountMetric };
      payout_requests: { Row: PayoutRequest };
      account_reviews: { Row: AccountReview };
      admin_notes: { Row: AdminNote };
    };
  };
};
