// src/components/ViewModeToggle.tsx
import { ViewMode } from "./ItemList";

interface Props {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewModeToggle({ viewMode, onChange }: Props) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 border rounded ${
          viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        aria-label="Grid view"
      >
        📦
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-2 border rounded ${
          viewMode === "list" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        aria-label="List view"
      >
        📋
      </button>
    </div>
  );
}