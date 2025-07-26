import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import ItemCard from "./ItemCard";
import { ViewMode } from "./ItemList";
import { AuctionItem } from "@/types/item";

interface VirtualizedItemListProps {
  items: AuctionItem[];
  viewMode: ViewMode;
  width: number;
  height: number;
}

export default function VirtualizedItemList({
  items,
  viewMode,
  width,
  height,
}: VirtualizedItemListProps) {
  const columnCount = viewMode === "grid" ? 3 : 1;
  const itemHeight = viewMode === "grid" ? 300 : 120;
  const itemWidth = viewMode === "grid" ? Math.floor(width / columnCount) : width;

  const rowCount = Math.ceil(items.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.length) return null;
    const item = items[index];
    return (
      <div style={style}>
        <ItemCard item={item} />
      </div>
    );
  };

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={itemWidth}
      height={height}
      rowCount={rowCount}
      rowHeight={itemHeight}
      width={width}
    >
      {Cell}
    </FixedSizeGrid>
  );
}