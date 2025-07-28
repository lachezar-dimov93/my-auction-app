import { ComboboxOption } from "@/components/ui/combobox";

export const SORT_OPTIONS: ComboboxOption[] = [
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "titleAsc", label: "Title: A → Z" },
  { value: "titleDesc", label: "Title: Z → A" },
  { value: "endDateAsc", label: "Ending Soon" },
  { value: "endDateDesc", label: "Ending Later" },
];

export const SORT_PLACEHOLDER = "Sort by...";
