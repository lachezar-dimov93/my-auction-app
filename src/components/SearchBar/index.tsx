import { ChangeEvent, FC, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LABELS } from "./constants";

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchText, onSearchTextChange }) => {
  const searchId = useId();

  return (
    <div>
      <Label htmlFor={searchId} className="sr-only">
        {LABELS.SR_LABEL}
      </Label>
      <Input
        id={searchId}
        type="text"
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearchTextChange(e.target.value)
        }
        placeholder={LABELS.PLACEHOLDER}
        className="bg-background"
      />
    </div>
  );
};

export default SearchBar;
