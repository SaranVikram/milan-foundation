// src/layouts/components/SearchModal.tsx
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { debounce } from "@/layouts/helpers/Debounce";
import axios from "axios";

interface SearchItem {
  id: number;
  creator: string;
  title: string;
  description: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/search-data?q=${encodeURIComponent(searchQuery)}`);
      setResults(response.data);
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const debouncedSearch = debounce(performSearch, 1000);
    
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setResults([]);
      setHasSearched(false);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, performSearch]);

  const showResults = query.length > 0 && (hasSearched || isLoading);
  const noResults = hasSearched && !isLoading && results.length === 0 && !error;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[100px] bg-primary/30 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl mx-4 "
      >
        <div className="relative ">
          <div className="relative flex max-w-full min-h-[40px] items-center text-light rounded-[40px] gap-1 h-[56px] pl-4 pr-1 border border-solid border-border bg-body">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Verified Profiles"
              className="rounded-[40px] h-[56px] text-[18px] leading-[28px] outline-none overflow-hidden pl-[4px] text-ellipsis 
              bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none flex-grow font-normal w-full p-0"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              autoFocus
            />
            <div className="flex gap-1">
              <Search className="rounded-full h-12 w-12 outline-offset-4 p-3 inline-flex items-center justify-center gap-2 border border-primary bg-primary text-white" />
              
            </div>
                  </div>
                  {showResults && (
          <div 
            className="absolute z-50 mt-2 w-full max-h-[60vh] overflow-y-auto overflow-x-hidden rounded-[16px] bg-body shadow-[0_6px_20px_rgba(0,0,0,0.15)] border-none" >
          <ScrollArea className="w-full h-full">
            <div className="p-4 space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground text-center py-4">Searching...</p>
              ) : error ? (
                <p className="text-red-500 text-center py-4">{error}</p>
              ) : noResults ? (
                <p className="text-muted-foreground text-center py-4">
                  No results found for &quot;{query}&quot;
                </p>
              ) : (
                results.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card text-card-foreground p-4 rounded-lg border shadow-sm flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-lg font-medium leading-none">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?img=${item.id}`}
                          alt={item.creator}
                        />
                        <AvatarFallback>{item.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{item.creator}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div> )}
        </div>

        
      </div>
    </div>
  );
};

export default SearchModal;