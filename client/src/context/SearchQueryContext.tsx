"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

interface SearchQueryContextType {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

const SearchQueryContext = createContext<SearchQueryContextType | undefined>(
  undefined
);

export const SearchQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const updateSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  return (
    <SearchQueryContext.Provider
      value={{
        searchQuery,
        updateSearchQuery,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);
  if (context === undefined) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
};
