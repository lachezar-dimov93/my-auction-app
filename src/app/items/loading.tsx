// app/items/loading.tsx
import { LABELS } from "@/constants/labels";

export default function LoadingItems() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[200px]">
      <div
        className="
          animate-spin
          rounded-full
          h-12 w-12
          border-4
          border-gray-200
          border-t-primary
          mb-4
        "
      />
      <p className="text-center text-lg text-gray-600">{LABELS.LOADING}</p>
    </div>
  );
}
