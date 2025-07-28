import { AuctionItem, ItemStatus } from "@/types/item";
import ImageWithFallback from "./ImageWithFallback";
import { LABELS } from "@/constants/labels";
import { formatCurrency, getCategoryColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_VARIANT_MAP } from "./Badges/constants";
import { useMemo } from "react";

interface Props {
  item: AuctionItem;
}

export default function ItemDetailView({ item }: Props) {
  // recompute status on every render
  const status = useMemo<ItemStatus>(() => {
    const now = Date.now();
    const endTs = new Date(item.endDate).getTime();
    return endTs > now ? "live" : "ended";
  }, [item.endDate]);

  return (
    <div className="mx-auto mt-4 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <ImageWithFallback
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-56 md:h-96 rounded-lg mb-6"
        priority
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <header className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {item.title}
          </h1>
          {status && (
            <Badge
              variant={STATUS_VARIANT_MAP[status]}
              className="text-sm flex-shrink-0"
            >
              {status}
            </Badge>
          )}
        </div>
        <p className="text-base md:text-lg text-gray-600">{item.description}</p>
      </header>

      <hr className="my-6" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
        <div className="font-semibold text-gray-500">{LABELS.CATEGORY}</div>
        <div>
          <Badge
            className={cn(
              "border-transparent",
              getCategoryColor(item.category)
            )}
          >
            {item.category}
          </Badge>
        </div>

        <div className="font-semibold text-gray-500">
          {LABELS.ESTIMATED_VALUE}
        </div>
        <div className="text-lg font-semibold text-gray-900">
          {formatCurrency(item.estimatedValue)}
        </div>

        <div className="font-semibold text-gray-500">
          {LABELS.AUCTION_HOUSE}
        </div>
        <div>{item.auctionHouse}</div>

        <div className="font-semibold text-gray-500">{LABELS.ENDS}</div>
        <div>{new Date(item.endDate).toLocaleString()}</div>
      </div>
    </div>
  );
}
