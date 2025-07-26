// app/items/page.tsx  (make sure it's a Client Component)
"use client";

import { useState, useMemo } from "react";
import { useFetchItems } from "@/hooks/useFetchItems";
// import SearchFilters from "@/components/SearchFilters";
import ItemList, { ViewMode } from "@/components/ItemList";
import ViewModeToggle from "@/components/ViewModeToggle";
import VirtualizedItemList from "@/components/VirtualizedItemList";
import SortSelect from "@/components/SortSelect";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import CategoryFilter from "@/components/CategoryFilter";

type SortOption =
  | "priceAsc"
  | "priceDesc"
  | "titleAsc"
  | "titleDesc"
  | "endDateAsc"
  | "endDateDesc";

export default function ItemsPage() {
  const { items = [], loading, error } = useFetchItems();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("priceAsc");

  const ITEMS_PER_PAGE = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  // debounce the search term:
  const debouncedSearch = useDebounce(searchText, 300);

  // ... your intersection observer / load-more logic that bumps visibleCount …

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );

  const filtered = useMemo(() => {
    const lower = debouncedSearch.toLowerCase();
    return items.filter((item) => {
      const combined = Object.values(item)
        .map((v) => String(v).toLowerCase())
        .join(" ");
      return (
        combined.includes(lower) &&
        (!category || item.category === category) &&
        item.estimatedValue >= priceRange[0] &&
        item.estimatedValue <= priceRange[1]
      );
    });
  }, [items, debouncedSearch, category, priceRange]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortOption) {
      case "priceAsc":
        return arr.sort((a, b) => a.estimatedValue - b.estimatedValue);
      case "priceDesc":
        return arr.sort((a, b) => b.estimatedValue - a.estimatedValue);
      case "titleAsc":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "titleDesc":
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      case "endDateAsc":
        return arr.sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        );
      case "endDateDesc":
        return arr.sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
      default:
        return arr;
    }
  }, [filtered, sortOption]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, currentPage]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      {/* <SearchFilters
        categories={categories}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      /> */}

      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      <PriceRangeFilter
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
        <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      <ItemList items={pagedItems} viewMode={viewMode} />

      {pagedItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">No results found</p>
      )}

      {pagedItems.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
