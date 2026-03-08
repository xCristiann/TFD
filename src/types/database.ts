export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AccountPhase = 'phase_1' | 'phase_2' | 'evaluation' | 'funded';
export type AccountStatus = 'active' | 'review' | 'passed' | 'failed' | 'funded' | 'suspended' | 'locked';
export type RoleKey = 'client' | 'support' | 'risk_admin' | 'admin' | 'super_admin';
export type PayoutStatus = 'requested' | 'under_review' | 'approved' | 'rejected' | 'paid' | 'cancelled';
export type ReviewStatus = 'queued' | 'in_review' | 'approved' | 'rejected' | 'needs_changes';
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
export type PaymentEventType = 'challenge_purchase' | 'payout' | 'refund' | 'chargeback';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          country: string | null;
          timezone: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          country?: string | null;
          timezone?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: RoleKey;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: RoleKey;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_roles']['Insert']>;
      };
      challenge_templates: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          starting_balance: number;
          profit_target_pct: number;
          daily_drawdown_pct: number;
          max_drawdown_pct: number;
          max_lot_size: number | null;
          max_open_positions: number | null;
          phase_count: number;
          fee_amount: number;
          currency: string;
          is_active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          starting_balance: number;
          profit_target_pct: number;
          daily_drawdown_pct: number;
          max_drawdown_pct: number;
          max_lot_size?: number | null;
          max_open_positions?: number | null;
          phase_count?: number;
          fee_amount?: number;
          currency?: string;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['challenge_templates']['Insert']>;
      };
      challenge_purchases: {
        Row: {
          id: string;
          user_id: string;
          challenge_template_id: string;
          stripe_payment_intent_id: string | null;
          amount: number;
          currency: string;
          status: string;
          purchased_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_template_id: string;
          stripe_payment_intent_id?: string | null;
          amount: number;
          currency?: string;
          status?: string;
          purchased_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['challenge_purchases']['Insert']>;
      };
      trading_accounts: {
        Row: {
          id: string;
          user_id: string;
          challenge_purchase_id: string | null;
          challenge_template_id: string;
          account_number: string;
          broker_name: string | null;
          platform_name: string | null;
          balance: number;
          equity: number;
          phase: AccountPhase;
          status: AccountStatus;
          profit_target: number;
          daily_drawdown: number;
          max_drawdown: number;
          locked_reason: string | null;
          passed_at: string | null;
          funded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_purchase_id?: string | null;
          challenge_template_id: string;
          account_number: string;
          broker_name?: string | null;
          platform_name?: string | null;
          balance: number;
          equity: number;
          phase?: AccountPhase;
          status?: AccountStatus;
          profit_target: number;
          daily_drawdown: number;
          max_drawdown: number;
          locked_reason?: string | null;
          passed_at?: string | null;
          funded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['trading_accounts']['Insert']>;
      };
      account_rules: {
        Row: {
          id: string;
          trading_account_id: string;
          max_daily_loss: number;
          max_total_loss: number;
          profit_target: number;
          min_trading_days: number | null;
          max_position_size: number | null;
          max_open_positions: number | null;
          allow_weekend_holding: boolean;
          allow_news_trading: boolean;
          effective_from: string;
          effective_to: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          max_daily_loss: number;
          max_total_loss: number;
          profit_target: number;
          min_trading_days?: number | null;
          max_position_size?: number | null;
          max_open_positions?: number | null;
          allow_weekend_holding?: boolean;
          allow_news_trading?: boolean;
          effective_from?: string;
          effective_to?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['account_rules']['Insert']>;
      };
      account_metrics: {
        Row: {
          id: string;
          trading_account_id: string;
          as_of: string;
          realized_pnl: number;
          unrealized_pnl: number;
          total_return_pct: number;
          daily_return_pct: number;
          win_rate_pct: number | null;
          profit_factor: number | null;
          expectancy: number | null;
          max_consecutive_losses: number | null;
          consistency_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          as_of?: string;
          realized_pnl?: number;
          unrealized_pnl?: number;
          total_return_pct?: number;
          daily_return_pct?: number;
          win_rate_pct?: number | null;
          profit_factor?: number | null;
          expectancy?: number | null;
          max_consecutive_losses?: number | null;
          consistency_score?: number | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['account_metrics']['Insert']>;
      };
      daily_snapshots: {
        Row: {
          id: string;
          trading_account_id: string;
          snapshot_date: string;
          balance: number;
          equity: number;
          daily_pnl: number;
          drawdown: number;
          open_positions: number;
          closed_trades: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          snapshot_date: string;
          balance: number;
          equity: number;
          daily_pnl?: number;
          drawdown?: number;
          open_positions?: number;
          closed_trades?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['daily_snapshots']['Insert']>;
      };
      trade_events: {
        Row: {
          id: string;
          trading_account_id: string;
          external_trade_id: string | null;
          symbol: string;
          side: string;
          quantity: number;
          entry_price: number;
          exit_price: number | null;
          pnl: number | null;
          commission: number | null;
          swap: number | null;
          opened_at: string;
          closed_at: string | null;
          raw_payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          external_trade_id?: string | null;
          symbol: string;
          side: string;
          quantity: number;
          entry_price: number;
          exit_price?: number | null;
          pnl?: number | null;
          commission?: number | null;
          swap?: number | null;
          opened_at: string;
          closed_at?: string | null;
          raw_payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['trade_events']['Insert']>;
      };
      open_positions: {
        Row: {
          id: string;
          trading_account_id: string;
          trade_event_id: string | null;
          symbol: string;
          side: string;
          quantity: number;
          average_entry_price: number;
          mark_price: number | null;
          unrealized_pnl: number | null;
          opened_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          trade_event_id?: string | null;
          symbol: string;
          side: string;
          quantity: number;
          average_entry_price: number;
          mark_price?: number | null;
          unrealized_pnl?: number | null;
          opened_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['open_positions']['Insert']>;
      };
      payout_requests: {
        Row: {
          id: string;
          trading_account_id: string;
          user_id: string;
          amount: number;
          currency: string;
          status: PayoutStatus;
          requested_at: string;
          processed_at: string | null;
          payout_method: string | null;
          payout_reference: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          user_id: string;
          amount: number;
          currency?: string;
          status?: PayoutStatus;
          requested_at?: string;
          processed_at?: string | null;
          payout_method?: string | null;
          payout_reference?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['payout_requests']['Insert']>;
      };
      payout_reviews: {
        Row: {
          id: string;
          payout_request_id: string;
          reviewer_id: string | null;
          status: ReviewStatus;
          reviewed_at: string | null;
          reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          payout_request_id: string;
          reviewer_id?: string | null;
          status?: ReviewStatus;
          reviewed_at?: string | null;
          reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['payout_reviews']['Insert']>;
      };
      account_reviews: {
        Row: {
          id: string;
          trading_account_id: string;
          reviewer_id: string | null;
          status: ReviewStatus;
          reason: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          reviewer_id?: string | null;
          status?: ReviewStatus;
          reason?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['account_reviews']['Insert']>;
      };
      admin_notes: {
        Row: {
          id: string;
          author_id: string | null;
          user_id: string | null;
          trading_account_id: string | null;
          payout_request_id: string | null;
          note: string;
          is_internal: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          user_id?: string | null;
          trading_account_id?: string | null;
          payout_request_id?: string | null;
          note: string;
          is_internal?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['admin_notes']['Insert']>;
      };
      crm_contacts: {
        Row: {
          id: string;
          user_id: string;
          owner_id: string | null;
          lifecycle_stage: string;
          source: string | null;
          risk_score: number | null;
          tags: string[];
          last_contact_at: string | null;
          next_follow_up_at: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          owner_id?: string | null;
          lifecycle_stage?: string;
          source?: string | null;
          risk_score?: number | null;
          tags?: string[];
          last_contact_at?: string | null;
          next_follow_up_at?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_contacts']['Insert']>;
      };
      crm_tasks: {
        Row: {
          id: string;
          crm_contact_id: string;
          assigned_to: string | null;
          title: string;
          description: string | null;
          due_at: string | null;
          status: TaskStatus;
          priority: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          crm_contact_id: string;
          assigned_to?: string | null;
          title: string;
          description?: string | null;
          due_at?: string | null;
          status?: TaskStatus;
          priority?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_tasks']['Insert']>;
      };
      account_status_history: {
        Row: {
          id: string;
          trading_account_id: string;
          from_status: AccountStatus | null;
          to_status: AccountStatus;
          reason: string | null;
          changed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trading_account_id: string;
          from_status?: AccountStatus | null;
          to_status: AccountStatus;
          reason?: string | null;
          changed_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['account_status_history']['Insert']>;
      };
      payment_events: {
        Row: {
          id: string;
          user_id: string;
          challenge_purchase_id: string | null;
          payout_request_id: string | null;
          event_type: PaymentEventType;
          provider: string;
          provider_event_id: string | null;
          amount: number;
          currency: string;
          status: string;
          payload: Json;
          occurred_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_purchase_id?: string | null;
          payout_request_id?: string | null;
          event_type: PaymentEventType;
          provider?: string;
          provider_event_id?: string | null;
          amount: number;
          currency?: string;
          status: string;
          payload?: Json;
          occurred_at?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['payment_events']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      account_phase: AccountPhase;
      account_status: AccountStatus;
      role_key: RoleKey;
      payout_status: PayoutStatus;
      review_status: ReviewStatus;
      task_status: TaskStatus;
      payment_event_type: PaymentEventType;
    };
  };
}
