import { MagazinePageContent } from "@/components/pages/MagazinePageContent";
import { getIsSubscriber } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export default async function MagazinePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSubscriber = await getIsSubscriber(user?.id);

  return <MagazinePageContent isSubscriber={isSubscriber} />;
}
