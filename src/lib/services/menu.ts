import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

// View Types
type ActiveCategory = Database["public"]["Views"]["active_categories"]["Row"];
type MenuOverview = Database["public"]["Views"]["menu_system_overview"]["Row"];
type PricingOverview =
  Database["public"]["Views"]["current_pricing_overview"]["Row"];
type ActiveSpecial = Database["public"]["Views"]["active_specials"]["Row"];

// Table Types
type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
type BasePizza = Database["public"]["Tables"]["base_pizzas"]["Row"];
type PizzaSize = Database["public"]["Tables"]["pizza_sizes"]["Row"];
type PizzaVariant = Database["public"]["Tables"]["pizza_variants"]["Row"];
type Topping = Database["public"]["Tables"]["toppings"]["Row"];
type WingType = Database["public"]["Tables"]["wing_types"]["Row"];
type WingVariant = Database["public"]["Tables"]["wing_variants"]["Row"];
type WingQuantity = Database["public"]["Tables"]["wing_quantities"]["Row"];
type WingSauce = Database["public"]["Tables"]["wing_sauces"]["Row"];
type SideDish = Database["public"]["Tables"]["side_dishes"]["Row"];
type Beverage = Database["public"]["Tables"]["beverages"]["Row"];

// Extended Types for API Responses
interface MenuItemWithDetails extends MenuItem {
  base_pizza?: BasePizza;
  category: ActiveCategory;
}

interface PizzaWithDetails extends BasePizza {
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

export async function getActiveCategories(): Promise<ActiveCategory[]> {
  const supabase = await createClient();
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

export async function getMenuSystemOverview(): Promise<MenuItemWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select(
      `
      *,
      base_pizza:base_pizzas (*),
      category:menu_categories (*)
    `
    )
    .eq("is_available", true)
    .order("display_order");

  if (error) {
    console.error("Error fetching menu overview:", error);
    return [];
  }

  return data as MenuItemWithDetails[];
}

export async function getCurrentPricingOverview(): Promise<PricingOverview[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_current_pricing_overview");

  if (error) {
    console.error("Error fetching pricing overview:", error);
    return [];
  }

  return data;
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
