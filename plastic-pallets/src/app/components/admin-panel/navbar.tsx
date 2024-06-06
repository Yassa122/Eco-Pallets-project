"use client";
import React, { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Search } from "lucide-react";
import product1 from "../../pics/p3 Background Removed.png";
import Image from "next/image";
interface NavbarProps {
  title: string;
}

interface SearchResult {
  name: string;
  price: number;
  rating: number;
}

interface SearchResultsPopupProps {
  results: SearchResult[];
  onClose: () => void;
}

const SearchResultsPopup: React.FC<SearchResultsPopupProps> = ({
  results,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Search Results</h2>
        <ul>
          {results.map((item, index) => (
            <li key={index} className="mb-4 text-black flex items-center">
              <Image src={product1} className="w-16 h-16 object-cover mr-4" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Rating: {item.rating}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export function Navbar({ title }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const foundItems = await searchItem(searchQuery);
        const filteredItems = foundItems.map(({ id, ...rest }) => ({
          ...rest,
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        console.log(filteredItems); // Debugging: Log the items to verify
        setSearchResults(filteredItems);
      } catch (error) {
        console.error("Error searching for items:", error);
        alert("Error searching for items. Please try again later.");
      }
    }
  };

  const searchItem = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:5555/favorites/searchItem/${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const foundItems = await response.json();
      return foundItems;
    } catch (error) {
      console.error("Error searching for items:", error);
      throw error;
    }
  };

  const closePopup = () => {
    setSearchResults(null);
  };

  return (
    <>
      <header className="z-10 supports-backdrop-blur:bg-background/60 sticky top-0 w-full shadow dark:shadow-secondary bg-background/95 backdrop-blur">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <h1 className="font-bold text-black dark:text-white ">{title}</h1>
          </div>
          <div className="flex items-center justify-center flex-grow">
            {/* Search Bar */}
            <div className="relative flex items-center space-x-2">
              <Search className="w-8 h-8 text-gray-500" />{" "}
              {/* Increase size of the icon */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress} // Added keypress event listener
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`px-4 py-2 rounded-md outline-none bg-transparent text-base text-white placeholder-gray-400 border ${
                  isSearchFocused ? "border-green-500" : "border-gray-300"
                }`}
              />
            </div>
            {/* End of Search Bar */}
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      {searchResults && (
        <SearchResultsPopup results={searchResults} onClose={closePopup} />
      )}
    </>
  );
}
