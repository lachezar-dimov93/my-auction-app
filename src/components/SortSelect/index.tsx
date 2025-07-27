import { FC } from "react";
import { Combobox } from "../ui/combobox";
import type { SortOption } from "@/types/sort";
import { SORT_PLACEHOLDER, SORT_OPTIONS } from "./constants";

interface SortSelectProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortSelect: FC<SortSelectProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="w-[200px]">
      <Combobox
        options={SORT_OPTIONS}
        value={sortOption}
        onValueChange={(value) => onSortChange(value as SortOption)}
        placeholder={SORT_PLACEHOLDER}
        showSearch={false}
      />
    </div>
  );
};

export default SortSelect;
