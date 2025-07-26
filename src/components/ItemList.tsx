// src/components/ItemList.tsx
import { AuctionItem } from "@/types/item";
import ItemCard from "./ItemCard";

export type ViewMode = "grid" | "list";

interface Props {
  items: AuctionItem[];
  viewMode: ViewMode;
}

export default function ItemList({ items, viewMode }: Props) {
  const containerClasses =
    viewMode === "grid"
      ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "space-y-4";

  return (
    <div className={containerClasses}>
      {items.map((item, idx) => (
        <ItemCard
          key={item.id}
          item={item}
          viewMode={viewMode}
          // grid: preload 1; list: preload 2 on narrow screens
          priority={
            viewMode === "grid"
              ? idx === 0
              : idx <
                (typeof window !== "undefined" && window.innerWidth < 768
                  ? 2
                  : 1)
          }
        />
      ))}
    </div>
  );
}
