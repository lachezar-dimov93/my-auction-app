import { Badge } from "@/components/ui/badge";
import { ItemStatus } from "@/types/item";
import { cn, getCategoryColor } from "@/lib/utils";
import { STATUS_VARIANT_MAP } from "./constants";

interface BadgesProps {
  status?: ItemStatus;
  category?: string;
  className?: string;
}

export default function Badges({ status, category, className }: BadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {status && (
        <Badge
          variant={STATUS_VARIANT_MAP[status]}
          className={cn(
            "flex-shrink-0",
            status === "live" && "motion-safe:animate-pulse"
          )}
        >
          {status}
        </Badge>
      )}

      {category && (
        <Badge className={cn("min-w-0 truncate", getCategoryColor(category))}>
          {category}
        </Badge>
      )}
    </div>
  );
}
