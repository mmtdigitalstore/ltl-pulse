import { VlogsPageContent } from "@/components/pages/VlogsPageContent";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export default async function VlogsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);

  return <VlogsPageContent isSubscriber={isSubscriber} />;
}
