import {
  Tag,
  Users,
  Settings,
  Bookmark,
  ShoppingCart, // Import the ShoppingCart icon
  LayoutGrid,
  Heart
} from "lucide-react";

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/cart",
          label: "Cart",
          active: pathname.includes("/cart"),
          icon: ShoppingCart // Change the icon to ShoppingCart
        },
        {
          href: "/favorites",
          label: "Favorites",
          active: pathname.includes("/favorites"),
          icon: Heart
        },
        {
          href: "/wishlist",
          label: "Wishlist",
          active: pathname.includes("/wishlist"),
          icon: Bookmark
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings
        }
      ]
    }
  ];
}
