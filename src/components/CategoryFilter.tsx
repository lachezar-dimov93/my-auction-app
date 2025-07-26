// src/components/CategoryFilter.tsx
import { LABELS } from "@/constants/labels";
import { FC, ChangeEvent } from "react";

interface CategoryFilterProps {
  /** List of all available categories */
  categories: string[];
  /** Currently selected category (empty string = all) */
  selectedCategory: string;
  /** Called when the user picks a new category */
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        {LABELS.CATEGORY}
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onCategoryChange(e.target.value)
        }
        className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="">{LABELS.ALL_CATEGORIES}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;