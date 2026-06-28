import { redirect } from "next/navigation";

interface SubscribePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      query.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((entry) => query.append(key, entry));
    }
  }

  const suffix = query.toString();
  redirect(suffix ? `/pricing?${suffix}` : "/pricing");
}
