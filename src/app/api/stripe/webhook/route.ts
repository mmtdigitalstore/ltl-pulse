import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

async function setSubscriptionStatus({
  userId,
  isSubscriber,
  subscriptionId,
  status,
  customerId,
}: {
  userId: string;
  isSubscriber: boolean;
  subscriptionId: string | null;
  status: string | null;
  customerId?: string | null;
}) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscriber: isSubscriber,
      stripe_subscription_id: subscriptionId,
      subscription_status: status,
      ...(customerId ? { stripe_customer_id: customerId } : {}),
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret is not configured." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId =
          session.client_reference_id ??
          session.metadata?.supabase_user_id ??
          null;

        if (!userId) {
          break;
        }

        await setSubscriptionStatus({
          userId,
          isSubscriber: true,
          subscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : (session.subscription?.id ?? null),
          status: "active",
          customerId:
            typeof session.customer === "string"
              ? session.customer
              : (session.customer?.id ?? null),
        });
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.supabase_user_id;

        if (!userId) {
          break;
        }

        const activeStatuses = new Set(["active", "trialing"]);
        const isSubscriber = activeStatuses.has(subscription.status);

        await setSubscriptionStatus({
          userId,
          isSubscriber,
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId:
            typeof subscription.customer === "string"
              ? subscription.customer
              : (subscription.customer?.id ?? null),
        });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
