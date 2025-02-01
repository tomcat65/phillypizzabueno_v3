import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle error if cookie cannot be set
            console.error("Error setting cookie:", error);
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete(name, options);
          } catch (error) {
            // Handle error if cookie cannot be removed
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );
}
