export interface AuctionItem {
  id: number;
  title: string;
  description: string;
  category: string;
  estimatedValue: number;
  imageUrl: string;
  auctionHouse: string;
  endDate: string;  // ISO string
  status: "upcoming" | "live" | "ended";
}