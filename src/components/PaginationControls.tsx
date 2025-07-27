import { LABELS } from "@/constants/labels";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  // Logic to determine which page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    if (totalPages > 0) pageNumbers.push(1);

    // Ellipsis after first page
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Pages around current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Ellipsis before last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // Always show last page
    if (totalPages > 1) pageNumbers.push(totalPages);

    return [...new Set(pageNumbers)]; // Remove duplicates
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            // shadcn's PaginationPrevious is a link, so we check for aria-disabled
            aria-disabled={currentPage === 1}
            // Add a class to visually style the disabled state
            className={cn(
              "cursor-pointer",
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            )}
          >
            {LABELS.PREV}
          </PaginationPrevious>
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {typeof page === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                className={cn(page !== currentPage && "cursor-pointer")}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={cn(
              "cursor-pointer",
              currentPage === totalPages && "pointer-events-none opacity-50"
            )}
          >
            {LABELS.NEXT}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
