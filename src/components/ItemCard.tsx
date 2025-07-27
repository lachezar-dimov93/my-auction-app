"use client";

import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import { AuctionItem } from "@/types/item";
import { ViewMode } from "./ItemList";
import Badges from "./Badges";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  item: AuctionItem;
  viewMode: ViewMode;
  priority?: boolean;
}

export default function ItemCard({ item, viewMode, priority = false }: Props) {
  return (
    <Link
      href={`/items/${item.id}`}
      className={cn(
        "group block border rounded-lg overflow-hidden hover:shadow-xl",
        "transition-all duration-300 hover:scale-105",
        "flex",
        viewMode === "grid" ? "flex-col" : "items-start"
      )}
    >
      <div
        className={cn(
          "relative bg-gray-200",
          viewMode === "grid" ? "w-full h-48" : "w-32 h-32 flex-shrink-0"
        )}
      >
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
          className="w-full h-full"
          loading={priority ? "eager" : "lazy"}
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
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
            className="mb-2"
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
