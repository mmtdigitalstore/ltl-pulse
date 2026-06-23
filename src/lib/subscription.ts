import { createClient } from "@/lib/supabase/server";

export async function getIsSubscriber(userId: string | undefined): Promise<boolean> {
  if (!userId) {
    return false;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("is_subscriber, subscription_status")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  return (
    data.is_subscriber === true &&
    (data.subscription_status === "active" ||
      data.subscription_status === "trialing" ||
      data.subscription_status === null)
  );
}

export async function getSubscriptionState(userId: string | undefined) {
  const isSubscriber = await getIsSubscriber(userId);
  return { isSubscriber };
}
