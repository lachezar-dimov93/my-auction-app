// app/items/page.tsx
import ItemsPageClient from "@/components/ItemsPageClient";
import { ITEMS_URL } from "@/constants/urls";
import type { AuctionItem, ItemStatus } from "@/types/item";

export default async function ItemsPage() {
  const res = await fetch(ITEMS_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch items");

  const raw: AuctionItem[] = await res.json();

  const now = Date.now();
  const items: AuctionItem[] = raw.map((item) => {
    // compute a new status
    const endTs = new Date(item.endDate).getTime();
    const status: ItemStatus = endTs > now ? "live" : "ended";
    return {
      ...item,
      status,
    };
  });

  return <ItemsPageClient initialItems={items} />;
}
