import { LayoutGrid, List } from "lucide-react";
import { ViewMode } from "../ItemList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LABELS } from "./constants";

interface Props {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewModeToggle({ viewMode, onChange }: Props) {
  const handleValueChange = (newMode: ViewMode) => {
    if (newMode) {
      onChange(newMode);
    }
  };

  const toggleGroupItemClasses =
    "border bg-background data-[state=on]:bg-primary data-[state=on]:text-primary-foreground";

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={handleValueChange}
      className="mb-4"
      aria-label={LABELS.VIEW_MODE_ARIA}
    >
      <ToggleGroupItem
        value="grid"
        aria-label={LABELS.GRID_VIEW_ARIA}
        className={toggleGroupItemClasses}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        <span>{LABELS.GRID}</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        aria-label={LABELS.LIST_VIEW_ARIA}
        className={toggleGroupItemClasses}
      >
        <List className="h-4 w-4 mr-2" />
        <span>{LABELS.LIST}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
