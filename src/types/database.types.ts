export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          is_active: boolean | null;
          created_at: string | null;
          created_by: string | null;
          modified_at: string | null;
          modified_by: string | null;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          display_order: number;
          is_active?: boolean | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          is_active?: boolean | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          image_url?: string | null;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          base_price: number;
          is_available: boolean | null;
          display_order: number | null;
          requires_size: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          max_sauces: number | null;
          allows_sides: boolean | null;
          max_sides: number | null;
          created_at: string | null;
          created_by: string | null;
          modified_at: string | null;
          modified_by: string | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          base_price: number;
          is_available?: boolean | null;
          display_order?: number | null;
          requires_size?: boolean | null;
          allows_toppings?: boolean | null;
          allows_sauces?: boolean | null;
          max_sauces?: number | null;
          allows_sides?: boolean | null;
          max_sides?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          description?: string | null;
          base_price?: number;
          is_available?: boolean | null;
          display_order?: number | null;
          requires_size?: boolean | null;
          allows_toppings?: boolean | null;
          allows_sauces?: boolean | null;
          max_sauces?: number | null;
          allows_sides?: boolean | null;
          max_sides?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
      };
    };
    Views: {
      active_categories: {
        Row: {
          id: string | null;
          name: string | null;
          display_order: number | null;
          image_url: string | null;
          created_at: string | null;
        };
      };
      menu_system_overview: {
        Row: {
          menu_category: string | null;
          item_name: string | null;
          description: string | null;
          starting_price: number | null;
          is_available: boolean | null;
          has_size_options: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          created_at: string | null;
        };
      };
      current_pricing_overview: {
        Row: {
          item_type: string | null;
          item_name: string | null;
          size: number | null;
          base_price: number | null;
          topping_option: string | null;
          topping_price: number | null;
        };
      };
    };
    Functions: {
      get_menu_system_overview: {
        Args: Record<string, never>;
        Returns: {
          menu_category: string | null;
          item_name: string | null;
          description: string | null;
          starting_price: number | null;
          is_available: boolean | null;
          has_size_options: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          created_at: string | null;
        }[];
      };
      get_current_pricing_overview: {
        Args: Record<string, never>;
        Returns: {
          item_type: string | null;
          item_name: string | null;
          size: number | null;
          base_price: number | null;
          topping_option: string | null;
          topping_price: number | null;
        }[];
      };
    };
  };
}
