"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ItemList, { ViewMode } from "@/components/ItemList";
import ViewModeToggle from "@/components/ViewModeToggle";
import SortSelect from "@/components/SortSelect";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import { useFetchItems } from "@/hooks/useFetchItems";
import { useDebounce } from "@/hooks/useDebounce";
import type { SortOption } from "@/types/sort";
import type { AuctionItem } from "@/types/item";
import { LABELS } from "@/constants/labels";

export default function ItemsPage() {
  const { items = [], loading, error } = useFetchItems();
  const searchParams = useSearchParams();
  const router = useRouter();

  // --- State Initialization from URL ---
  const paramPage = parseInt(searchParams.get("page") || "1", 10);
  const paramCategory = searchParams.get("category") || "";
  const paramSearch = searchParams.get("search") || "";
  const paramMin = searchParams.get("min") || "";
  const paramMax = searchParams.get("max") || "";
  const paramSort = (searchParams.get("sort") as SortOption) || "endDateAsc";

  const [searchText, setSearchText] = useState(paramSearch);
  const debouncedSearch = useDebounce(searchText, 300);
  const [category, setCategory] = useState(paramCategory);
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    paramMin === "" ? null : Number(paramMin),
    paramMax === "" ? null : Number(paramMax),
  ]);
  const [sortOption, setSortOption] = useState<SortOption>(paramSort);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(paramPage);

  const ITEMS_PER_PAGE = 30;

  // --- URL Synchronization ---

  // Helper to update URL search params without adding to history
  const updateParams = useCallback(
    (p: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(p).forEach(([k, v]) => {
        if (v == null || v === "") {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      });
      // Use replace to avoid polluting browser history on filter changes
      router.replace(`${window.location.pathname}?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Syncs state when browser back/forward buttons are used
  useEffect(() => {
    setSearchText(paramSearch);
    setCategory(paramCategory);
    setPriceRange([
      paramMin === "" ? null : Number(paramMin),
      paramMax === "" ? null : Number(paramMax),
    ]);
    setSortOption(paramSort);
    setCurrentPage(paramPage);
  }, [paramSearch, paramCategory, paramMin, paramMax, paramSort, paramPage]);

  // Syncs the default sort option to the URL on initial load
  useEffect(() => {
    if (!searchParams.has("sort")) {
      updateParams({ sort: "endDateAsc" });
    }
  }, [searchParams, updateParams]);

  useEffect(() => {
    if (debouncedSearch !== paramSearch) {
      updateParams({ search: debouncedSearch, page: "1" });
    }
  }, [debouncedSearch, paramSearch, updateParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateParams({ page: String(page) });
  };
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateParams({ category: cat, page: "1" });
  };
  const handleSearchChange = (txt: string) => setSearchText(txt);
  const handlePriceChange = ([min, max]: [number | null, number | null]) => {
    setPriceRange([min, max]);
    updateParams({
      min: min != null ? String(min) : null,
      max: max != null ? String(max) : null,
      page: "1",
    });
  };
  const handleSortChange = (so: SortOption) => {
    setSortOption(so);
    updateParams({ sort: so, page: "1" });
  };

  const categories = useMemo(
    () => Array.from(new Set(items.map((i: AuctionItem) => i.category))).sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    const lowerSearch = debouncedSearch.toLowerCase();
    const [minPrice, maxPrice] = priceRange;
    return items.filter((item) => {
      const passesSearch =
        !lowerSearch || item.title.toLowerCase().includes(lowerSearch);
      const passesCategory = !category || item.category === category;
      const passesMinPrice =
        minPrice === null || item.estimatedValue >= minPrice;
      const passesMaxPrice =
        maxPrice === null || item.estimatedValue <= maxPrice;
      return passesSearch && passesCategory && passesMinPrice && passesMaxPrice;
    });
  }, [items, debouncedSearch, category, priceRange]);
  const now = Date.now();

  const sortedItems = useMemo(() => {
    const arr = [...filteredItems];
    switch (sortOption) {
      case "priceAsc":
        return arr.sort((a, b) => a.estimatedValue - b.estimatedValue);
      case "priceDesc":
        return arr.sort((a, b) => b.estimatedValue - a.estimatedValue);
      case "titleAsc":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "titleDesc":
        return arr.sort((a, b) => b.title.localeCompare(a.title));

      case "endDateAsc": {
        // Split into future (active/upcoming) and past (ended)
        const future = arr
          .filter((item) => new Date(item.endDate).getTime() > now)
          .sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          );
        const past = arr
          .filter((item) => new Date(item.endDate).getTime() <= now)
          .sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
        return [...future, ...past];
      }

      case "endDateDesc": {
        // First show the items that just ended most recently
        const past = arr
          .filter((item) => new Date(item.endDate).getTime() <= now)
          .sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
        const future = arr
          .filter((item) => new Date(item.endDate).getTime() > now)
          .sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
        return [...past, ...future];
      }
      default:
        return arr;
    }
  }, [filteredItems, sortOption]);

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const pagedItems = useMemo(
    () =>
      sortedItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [sortedItems, currentPage]
  );
  const maxPrice = useMemo(
    () => Math.max(...items.map((i) => i.estimatedValue), 1000),
    [items]
  );

  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto pt-4 pb-4">
      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="lg:col-span-2">
          <SearchBar
            searchText={searchText}
            onSearchTextChange={handleSearchChange}
          />
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        <PriceRangeFilter
          priceRange={priceRange}
          onPriceRangeChange={handlePriceChange}
          maxPrice={maxPrice}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
        <SortSelect sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      {/* List */}
      <ItemList items={pagedItems} viewMode={viewMode} />

      {/* No results */}
      {!loading && sortedItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">{LABELS.NO_RESULTS}</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
