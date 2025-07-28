// src/hooks/useFetchItems.ts
import { AuctionItem } from "@/types/item";
import { useState, useEffect } from "react";

const URL = "/api/items";

export function useFetchItems() {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: AuctionItem[]) => {
        if (!isMounted) return;

        const now = Date.now();
        const normalized = data.map((item) => {
          const endTs = new Date(item.endDate).getTime();
          const status: "live" | "ended" = endTs > now ? "live" : "ended";
          return { ...item, status };
        });

        setItems(normalized);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { items, loading, error };
}
