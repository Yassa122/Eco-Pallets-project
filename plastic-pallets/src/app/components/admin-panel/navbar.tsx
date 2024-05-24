import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Search } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
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
              className="px-4 py-2 rounded-md outline-none bg-transparent text-base text-gray-500 placeholder-gray-500" // Increase padding and font size
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
