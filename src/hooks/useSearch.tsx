import { useRef, useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  const previousSearch = useRef(search);

  const handleSupabaseSearch = () => {
    // Trim
    const trimmedSearch = search.trim();
    // If empty, return
    if (trimmedSearch.length === 0) return;

    // Split search by spaces
    const splittedSearch = trimmedSearch.split(" ");
    // Remove empty strings
    const filteredSearch = splittedSearch.filter((search) => search !== "");
    // Surround each search term with single quotes and join with ' & '
    const parsedSearch = filteredSearch.map((term) => `'${term}'`).join(" & ");

    // If same as previous, return
    const currentParsedSearch = parsedSearch.toLowerCase();
    const previousSearchParsed = previousSearch.current.toLowerCase();
    if (currentParsedSearch === previousSearchParsed) return;

    // Update previous search
    previousSearch.current = parsedSearch;

    return parsedSearch;
  };

  const onClearSearch = () => {
    setSearch("");
    previousSearch.current = "";
  };

  return { search, setSearch, handleSupabaseSearch, onClearSearch };
};
