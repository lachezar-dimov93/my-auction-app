// src/components/ItemCard.tsx
"use client";

import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import { AuctionItem } from "@/types/item";
import { ViewMode } from "./ItemList";

interface Props {
  item: AuctionItem;
  viewMode: ViewMode;
  priority?: boolean;
}

export default function ItemCard({ item, viewMode, priority = false }: Props) {
  // grid: stacked column; list: horizontal flex
  const wrapperClasses =
    viewMode === "grid"
      ? "block border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
      : "block border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-start";

  // image container sizing
  const imgContainerClasses =
    viewMode === "grid"
      ? "relative w-full h-48 bg-gray-200"
      : "relative w-32 h-32 flex-shrink-0 bg-gray-200";

  return (
    <Link href={`/items/${item.id}`} className={wrapperClasses}>
      <div className={imgContainerClasses}>
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 bg-gray-200"
          loading={priority ? "eager" : "lazy"}
          sizes="
    (max-width: 640px) 100vw,   /* mobile: one column, full width */
    (max-width: 1024px) 50vw,   /* tablet: two columns */
    33vw                        /* desktop: three columns */
  "
        />
      </div>
      <div className={`p-4 bg-white flex-1 ${viewMode === "list" ? "" : ""}`}>
        <h2 className="text-lg font-semibold truncate group-hover:text-blue-600">
          {item.title}
        </h2>
        <p className="text-gray-700 mt-1">
          ${item.estimatedValue.toLocaleString()}
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
