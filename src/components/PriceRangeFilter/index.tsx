import { FC, ChangeEvent, useId } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { LABELS } from "./constants";
import { Label } from "../ui/label";

interface PriceRangeFilterProps {
  priceRange: [number | null, number | null];
  onPriceRangeChange: (range: [number | null, number | null]) => void;
  maxPrice: number;
}

const PriceRangeFilter: FC<PriceRangeFilterProps> = ({
  priceRange,
  onPriceRangeChange,
  maxPrice,
}) => {
  const [min, max] = priceRange;
  const minId = useId();
  const maxId = useId();

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newMin = value === "" ? null : Number(value);

    // Prevent negative numbers and invalid logic
    if (newMin !== null && (newMin < 0 || newMin > (max ?? maxPrice))) {
      return;
    }
    onPriceRangeChange([newMin, max]);
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newMax = value === "" ? null : Number(value);

    // Prevent negative numbers and invalid logic
    if (newMax !== null && (newMax < 0 || newMax < (min ?? 0))) {
      return;
    }
    onPriceRangeChange([min, newMax]);
  };

  const handleSliderChange = (newRange: [number, number]) => {
    const [newMin, newMax] = newRange;
    const finalMin = newMin === 0 ? null : newMin;
    const finalMax = newMax === maxPrice ? null : newMax;
    onPriceRangeChange([finalMin, finalMax]);
  };

  return (
    <fieldset className="border-0 p-0 m-0 space-y-4">
      <legend className="block text-sm font-medium text-gray-700">
        {LABELS.GROUP_LABEL}
      </legend>

      <Slider
        value={[min ?? 0, max ?? maxPrice]}
        onValueChange={handleSliderChange}
        max={maxPrice}
        step={10}
      />

      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1">
          <Label htmlFor={minId} className="sr-only">
            {LABELS.MIN_SR_LABEL}
          </Label>
          <Input
            id={minId}
            name="min-price"
            type="number"
            min="0" // <-- THE FIX
            value={min ?? ""}
            onChange={handleMinInputChange}
            placeholder={LABELS.MIN_PLACEHOLDER}
            className="bg-background"
          />
        </div>

        <span className="text-gray-500">-</span>

        <div className="flex-1">
          <Label htmlFor={maxId} className="sr-only">
            {LABELS.MAX_SR_LABEL}
          </Label>
          <Input
            id={maxId}
            name="max-price"
            type="number"
            min="0"
            value={max ?? ""}
            onChange={handleMaxInputChange}
            placeholder={LABELS.MAX_PLACEHOLDER}
            className="bg-background"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PriceRangeFilter;
