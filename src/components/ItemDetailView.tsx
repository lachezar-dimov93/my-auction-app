// src/components/ItemDetailView.tsx
import { AuctionItem } from "@/types/item";
import ImageWithFallback from "./ImageWithFallback";
import { LABELS } from "@/constants/labels";

interface Props {
  item: AuctionItem;
}

export default function ItemDetailView({ item }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <ImageWithFallback
        src={item.imageUrl}
        alt={item.title}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-96 rounded-lg mb-4"
        priority={true}
        loading="eager"
      />
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-gray-700 mb-4">{item.description}</p>
      <ul className="space-y-1 mb-4">
        <li>
          <strong>{LABELS.CATEGORY}:</strong> {item.category}
        </li>
        <li>
          <strong>{LABELS.ESTIMATED_VALUE}:</strong> $
          {item.estimatedValue.toLocaleString()}
        </li>
        <li>
          <strong>${LABELS.AUCTION_HOUSE}:</strong> {item.auctionHouse}
        </li>
        <li>
          <strong>{LABELS.ENDS}:</strong> {new Date(item.endDate).toLocaleString()}
        </li>
        <li>
          <strong>{LABELS.STATUS}:</strong> {item.status}
        </li>
      </ul>
    </div>
  );
}
