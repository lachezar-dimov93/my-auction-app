// src/components/PriceRangeFilter.tsx
import { FC, ChangeEvent } from "react";

interface PriceRangeFilterProps {
  /** Current price range [min, max]; max = Infinity means no upper bound */
  priceRange: [number, number];
  /** Callback when min or max changes */
  onPriceRangeChange: (range: [number, number]) => void;
}

const PriceRangeFilter: FC<PriceRangeFilterProps> = ({
  priceRange,
  onPriceRangeChange,
}) => {
  const [min, max] = priceRange;

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    let parsed: number;
    if (valStr.trim() === "") {
      parsed = 0;
    } else {
      const num = Number(valStr);
      parsed = isNaN(num) || num < 0 ? 0 : num;
    }
    onPriceRangeChange([parsed, max]);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    let parsed: number;
    if (valStr.trim() === "") {
      parsed = Infinity;
    } else {
      const num = Number(valStr);
      parsed = isNaN(num) || num < 0 ? Infinity : num;
    }
    onPriceRangeChange([min, parsed]);
  };

  return (
    <div className="mb-4">
      <span className="block text-sm font-medium text-gray-700 mb-1">Price Range</span>
      <div className="flex space-x-2">
        <input
          type="number"
          min={0}
          value={min === 0 ? "" : min}
          onChange={handleMinChange}
          placeholder="Min"
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          min={0}
          value={max === Infinity ? "" : max}
          onChange={handleMaxChange}
          placeholder="Max"
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;