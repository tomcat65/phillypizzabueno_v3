import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

// View Types
export type ActiveCategory =
  Database["public"]["Views"]["active_categories"]["Row"];
export type MenuOverview =
  Database["public"]["Views"]["menu_system_overview"]["Row"];
export type PricingOverview =
  Database["public"]["Views"]["current_pricing_overview"]["Row"];
export type ActiveSpecial =
  Database["public"]["Views"]["active_specials"]["Row"];

// Table Types
export type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
export type BasePizza = Database["public"]["Tables"]["base_pizzas"]["Row"];
export type PizzaSize = {
  id: string;
  size_inches: number;
  size_name: string;
  price_modifier: number;
  created_at: string | null;
};
export type PizzaVariant = {
  id: string;
  base_pizza_id: string;
  size_id: string;
  base_price: number;
  created_at: string | null;
  created_by: string | null;
  modified_at: string | null;
  modified_by: string | null;
};
export type Topping = Database["public"]["Tables"]["toppings"]["Row"];
export type WingType = Database["public"]["Tables"]["wing_types"]["Row"];
export type WingVariant = Database["public"]["Tables"]["wing_variants"]["Row"];
export type WingQuantity =
  Database["public"]["Tables"]["wing_quantities"]["Row"];
export type WingSauce = Database["public"]["Tables"]["wing_sauces"]["Row"];
export type SideDish = Database["public"]["Tables"]["side_dishes"]["Row"];
export type Beverage = Database["public"]["Tables"]["beverages"]["Row"];

// Extended Types for API Responses
export interface MenuItemWithDetails extends MenuItem {
  base_pizza?: BasePizza & {
    variants: (PizzaVariant & {
      size: PizzaSize;
    })[];
  };
  category: ActiveCategory;
}

export interface PizzaWithDetails extends BasePizza {
  variants: (PizzaVariant & {
    size: PizzaSize;
    toppings: Topping[];
  })[];
}

interface WingWithDetails extends WingType {
  variants: (WingVariant & {
    quantity: WingQuantity;
  })[];
  available_sauces: WingSauce[];
}

interface SideDishWithDetails extends SideDish {
  menu_item: MenuItem;
}

interface BeverageWithDetails extends Beverage {
  menu_item: MenuItem;
}

export class MenuServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "MenuServiceError";
  }
}

export async function getActiveCategories(): Promise<ActiveCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("active_categories")
    .select("*")
    .order("display_order");

  if (error) {
    throw new MenuServiceError("Failed to fetch active categories", error);
  }

  return data ?? [];
}

export async function getMenuSystemOverview(): Promise<MenuItemWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select(
      `
      *,
      base_pizza:base_pizzas (
        *,
        variants:pizza_variants (
          *,
          size:pizza_sizes (*)
        )
      ),
      category:menu_categories (*)
    `
    )
    .eq("is_available", true)
    .order("display_order");

  if (error) {
    throw new MenuServiceError("Failed to fetch menu system overview", error);
  }

  return data ?? [];
}

export async function getCurrentPricingOverview(): Promise<PricingOverview[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_current_pricing_overview");

  if (error) {
    throw new MenuServiceError(
      "Failed to fetch current pricing overview",
      error
    );
  }

  return data ?? [];
}

export async function getActiveSpecials(): Promise<ActiveSpecial[]> {
  const supabase = await createClient();
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

export async function getPizzaDetails(
  pizzaId: string
): Promise<PizzaWithDetails | null> {
  const supabase = await createClient();
  const { data: pizza, error: pizzaError } = await supabase
    .from("base_pizzas")
    .select(
      `
      *,
      variants:pizza_variants (
        *,
        size:pizza_sizes (*),
        toppings:pizza_variant_toppings (
          topping:toppings (*)
        )
      )
    `
    )
    .eq("id", pizzaId)
    .single();

  if (pizzaError) {
    console.error("Error fetching pizza details:", pizzaError);
    return null;
  }

  return pizza as PizzaWithDetails;
}

export async function getWingDetails(
  wingTypeId: string
): Promise<WingWithDetails | null> {
  const supabase = await createClient();
  const { data: wing, error: wingError } = await supabase
    .from("wing_types")
    .select(
      `
      *,
      variants:wing_variants (
        *,
        quantity:wing_quantities (*)
      )
    `
    )
    .eq("id", wingTypeId)
    .single();

  if (wingError) {
    console.error("Error fetching wing details:", wingError);
    return null;
  }

  // Get available sauces
  const { data: sauces, error: saucesError } = await supabase
    .from("wing_sauces")
    .select("*")
    .order("name");

  if (saucesError) {
    console.error("Error fetching wing sauces:", saucesError);
    return null;
  }

  return {
    ...wing,
    available_sauces: sauces,
  } as WingWithDetails;
}

export async function getSideDishes(): Promise<SideDishWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("side_dishes")
    .select(
      `
      *,
      menu_item:menu_items (*)
    `
    )
    .order("name");

  if (error) {
    console.error("Error fetching side dishes:", error);
    return [];
  }

  return data as SideDishWithDetails[];
}

export async function getBeverages(): Promise<BeverageWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beverages")
    .select(
      `
      *,
      menu_item:menu_items (*)
    `
    )
    .order("name");

  if (error) {
    console.error("Error fetching beverages:", error);
    return [];
  }

  return data as BeverageWithDetails[];
}

// Category mapping utilities
export const CATEGORY_MAPPING = {
  pizzas: "Pizzas",
  wings: "Wings",
  sides: "Sides",
  beverages: "Beverages",
} as const;

export type CategorySlug = keyof typeof CATEGORY_MAPPING;

export function getCategoryBySlug(slug: string): string | null {
  return CATEGORY_MAPPING[slug as CategorySlug] || null;
}

export function getSlugByCategory(category: string): string {
  return (
    Object.entries(CATEGORY_MAPPING).find(
      ([_, value]) => value === category
    )?.[0] || ""
  );
}
