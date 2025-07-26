import { ChangeEvent, FC } from "react";

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchText, onSearchTextChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="search" className="sr-only">
        Search items
      </label>
      <input
        id="search"
        type="text"
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearchTextChange(e.target.value)
        }
        placeholder="Search items…"
        className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default SearchBar;
