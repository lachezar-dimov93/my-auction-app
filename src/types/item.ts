export type ItemStatus = "upcoming" | "live" | "ended";

export interface AuctionItem {
  id: number;
  title: string;
  description: string;
  category: string;
  estimatedValue: number;
  imageUrl: string;
  auctionHouse: string;
  endDate: string;  // ISO string
  status: ItemStatus;
}