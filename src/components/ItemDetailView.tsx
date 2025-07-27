import { AuctionItem } from "@/types/item";
import ImageWithFallback from "./ImageWithFallback";
import { LABELS } from "@/constants/labels";
import { formatCurrency, getCategoryColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_VARIANT_MAP } from "./Badges/constants";

interface Props {
  item: AuctionItem;
}

export default function ItemDetailView({ item }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ImageWithFallback
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-96 rounded-lg mb-6"
        priority={true}
      />
      <header className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
          {item.status && (
            <Badge
              variant={STATUS_VARIANT_MAP[item.status]}
              className="text-sm flex-shrink-0"
            >
              {item.status}
            </Badge>
          )}
        </div>
        <p className="text-lg text-gray-600">{item.description}</p>
      </header>

      <hr className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
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
