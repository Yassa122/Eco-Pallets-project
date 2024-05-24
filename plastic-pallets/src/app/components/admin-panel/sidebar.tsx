"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import { useStore } from "../../../hooks/use-store";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "../../../hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import logo from "src/app/images/Logo/png/logo-white.png";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col items-center justify-center px-0 py-4 overflow-y-auto shadow-md dark:to-gray-200">
        <Link href="/dashboard" passHref>
          <Image
            src={logo}
            alt="Brand Logo"
            width={80} // Increased width
            height={80} // Increased height
            className={cn(
              "w-[80px] h-auto transition-[transform,opacity,display] ease-in-out duration-300",
              sidebar?.isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100"
            )}
          />
        </Link>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
