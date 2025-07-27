import { LABELS } from "@/constants/labels";
import { FC, useId } from "react";
import { Combobox } from "./ui/combobox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const comboboxOptions = [
    { value: "", label: LABELS.ALL_CATEGORIES },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const comboboxId = useId();

  return (
    <div>
      <Label
        htmlFor={comboboxId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {LABELS.CATEGORY}
      </Label>
      <Combobox
        id={comboboxId}
        options={comboboxOptions}
        value={selectedCategory}
        onValueChange={onCategoryChange}
        placeholder={LABELS.SELECT_CATEGORY}
        searchPlaceholder={LABELS.SEARCH_CATEGORY}
      />
    </div>
  );
};

export default CategoryFilter;
