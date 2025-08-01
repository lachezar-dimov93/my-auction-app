// src/components/ItemCard.tsx
"use client";

import Link from "next/link";
import { AuctionItem } from "@/types/item";
import ImageWithFallback from "./ImageWithFallback";
import Badges from "./Badges";
import { ViewMode } from "./ItemList";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  item: AuctionItem;
  viewMode: ViewMode;
  priority?: boolean;
}

export default function ItemCard({ item, viewMode, priority = false }: Props) {
  // flex-col on mobile; flex-row on sm+ when in list mode; stretch items
  const wrapperClasses = cn(
    "group block border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105",
    "flex",
    viewMode === "grid" ? "flex-col" : "flex-col sm:flex-row sm:items-stretch"
  );

  // grid: full width, fixed height; list: full width fixed height on mobile, fixed width auto height on sm+
  const imageWrapperClasses = cn(
    "relative bg-gray-200",
    viewMode === "grid"
      ? "w-full h-48"
      : "w-full h-48 sm:w-32 sm:h-auto flex-shrink-0"
  );

  return (
    <Link href={`/items/${item.id}`} className={wrapperClasses}>
      <div className={imageWrapperClasses}>
        {viewMode === "grid" && (
          <Badges
            status={item.status}
            category={item.category}
            className="absolute top-2 left-2 right-2 z-10"
          />
        )}
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          sizes={`
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          `}
        />
      </div>

      <div className="p-4 bg-white flex-1">
        <h2 className="text-lg font-semibold truncate group-hover:text-blue-600">
          {item.title}
        </h2>

        {viewMode === "list" && (
          <Badges
            status={item.status}
            category={item.category}
            className="mt-2 mb-2"
          />
        )}

        <p className="text-gray-700 mt-1">
          {formatCurrency(item.estimatedValue)}
        </p>

        {viewMode === "list" && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}
