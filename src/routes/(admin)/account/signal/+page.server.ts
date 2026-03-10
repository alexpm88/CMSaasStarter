import { error } from "@sveltejs/kit"
import {
  fetchSubscription,
  getOrCreateCustomerId,
} from "../subscription_helpers.server"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  const { supabaseServiceRole, session } = locals

  if (!session) {
    error(401, "Unauthorized")
  }

  const user = session.user

  // Check if the user has an active subscription
  const { customerId, error: customerError } = await getOrCreateCustomerId({
    supabaseServiceRole,
    user,
  })

  if (customerError || !customerId) {
    // No Stripe customer yet — no subscription
    return { hasAccess: false }
  }

  const { primarySubscription, error: subError } = await fetchSubscription({
    customerId,
  })

  if (subError) {
    return { hasAccess: false }
  }

  const hasAccess = !!primarySubscription

  return { hasAccess }
}
