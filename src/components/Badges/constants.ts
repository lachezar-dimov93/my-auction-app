import { ItemStatus } from "@/types/item";

// Map each status to a badge variant
export const STATUS_VARIANT_MAP: Record<
  ItemStatus,
  "secondary" | "destructive" | "default"
> = {
  upcoming: "secondary",
  live: "destructive",
  ended: "default",
};
