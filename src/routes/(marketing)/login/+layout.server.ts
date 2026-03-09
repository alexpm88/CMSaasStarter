import { env } from "$env/dynamic/private"
import { env as publicEnv } from "$env/dynamic/public"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({
  locals: { session },
  cookies,
  url,
}) => {
  return {
    url: url.origin,
    cookies: cookies.getAll(),
    session,
    supabaseUrl:
      publicEnv.PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL ?? "",
    supabaseAnonKey:
      publicEnv.PUBLIC_SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY ?? "",
  }
}
