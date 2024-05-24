import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Search } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const foundItems = await searchItem(searchQuery);
        alert(JSON.stringify(foundItems)); // Show found items in a pop-up message
      } catch (error) {
        console.error("Error searching for items:", error);
        alert("Error searching for items. Please try again later.");
      }
    }
  };

  const searchItem = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5555/searchItem/${query}`);
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

  return (
    <header className="z-10 supports-backdrop-blur:bg-background/60 sticky top-0 w-full shadow dark:shadow-secondary bg-background/95 backdrop-blur">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex items-center justify-center flex-grow">
          {/* Search Bar */}
          <div className="relative flex items-center space-x-2">
            <Search className="w-8 h-8 text-gray-500" /> {/* Increase size of the icon */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress} // Added keypress event listener
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`px-4 py-2 rounded-md outline-none bg-transparent text-base text-gray-500 placeholder-gray-500 border ${isSearchFocused ? 'border-green-500' : 'border-gray-300'}`}
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
  );
}
