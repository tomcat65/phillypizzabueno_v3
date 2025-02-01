import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

type ActiveCategory = Database["public"]["Views"]["active_categories"]["Row"];
type MenuOverview = Database["public"]["Views"]["menu_system_overview"]["Row"];
type PricingOverview =
  Database["public"]["Views"]["current_pricing_overview"]["Row"];
type ActiveSpecial = Database["public"]["Views"]["active_specials"]["Row"];

export async function getActiveCategories(): Promise<ActiveCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("active_categories")
    .select("*")
    .order("display_order");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

export async function getMenuSystemOverview(): Promise<MenuOverview[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_menu_system_overview");

  if (error) {
    console.error("Error fetching menu overview:", error);
    return [];
  }

  return data;
}

export async function getCurrentPricingOverview(): Promise<PricingOverview[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_current_pricing_overview");

  if (error) {
    console.error("Error fetching pricing overview:", error);
    return [];
  }

  return data;
}

export async function getActiveSpecials(): Promise<ActiveSpecial[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("active_specials")
    .select("*")
    .order("discount_percentage", { ascending: false });

  if (error) {
    console.error("Error fetching active specials:", error);
    return [];
  }

  return data;
}

export async function getMenuItemsByCategory(categoryId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_available", true)
    .order("display_order");

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  return data;
}
