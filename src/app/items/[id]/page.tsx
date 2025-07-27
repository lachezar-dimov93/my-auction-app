import { notFound } from "next/navigation";
import ItemDetailView from "@/components/ItemDetailView";
import { AuctionItem } from "@/types/item";
import { ITEMS_URL } from "@/constants/urls";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await fetch(ITEMS_URL, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch items");

  const items: AuctionItem[] = await res.json();
  const { id } = await params;
  const item = items.find((i) => i.id.toString() === id);

  if (!item) return notFound();

  return <ItemDetailView item={item} />;
}
