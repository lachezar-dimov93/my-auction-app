import { ChangeEvent } from "react";
import { SortOption } from "@/types/sort";

interface SortSelectProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function SortSelect({ sortOption, onSortChange }: SortSelectProps) {
  return (
    <select
      value={sortOption}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onSortChange(e.target.value as SortOption)
      }
      className="px-3 py-2 border rounded focus:ring focus:ring-blue-200"
      aria-label="Sort items"
    >
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="titleAsc">Title: A → Z</option>
      <option value="titleDesc">Title: Z → A</option>
      <option value="endDateAsc">Ends Soonest</option>
      <option value="endDateDesc">Ends Latest</option>
    </select>
  );
}