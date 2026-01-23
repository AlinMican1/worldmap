import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabaseServerClient } from "@/lib/supabaseServer";
import { UserDetails } from "@/types/interfaces";
import { GetLoggedInUserDetails } from "@/REST/GET";

export async function isAuthenticated(): Promise<UserDetails> {
  const cookieStore = await cookies(); // Note: cookies() is async in newer Next.js versions
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  const { data: user, error } = await supabaseServerClient.auth.getUser(accessToken);
  if (error || !user) redirect("/login");

  // Pass the token to the API call
  const profile = await GetLoggedInUserDetails(accessToken);

  return {
    email: user.user.email!,
    role: user.user.role ?? "user",
    created_at: user.user.created_at,
    name: profile.name,
  };
}
