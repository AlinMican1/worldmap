import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabaseServerClient } from "@/lib/supabaseServer";

export async function isAuthenticated() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;

  if (!accessToken) redirect("/login");

  const { data: user, error } = await supabaseServerClient.auth.getUser(accessToken);
  if (error || !user) redirect("/login");
}
