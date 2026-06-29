export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  is_subscriber: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  email: string;
  lead_magnet: string;
  tag: string;
  source: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          is_subscriber?: boolean;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_status?: string | null;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          is_subscriber?: boolean;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_status?: string | null;
        };
      };
      leads: {
        Row: Lead;
        Insert: {
          email: string;
          lead_magnet: string;
          tag?: string;
          source?: string;
        };
        Update: {
          email?: string;
          lead_magnet?: string;
          tag?: string;
          source?: string;
        };
      };
    };
  };
};
