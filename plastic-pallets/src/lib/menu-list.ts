import {
  Tag,
  Users,
  Settings,
  Bookmark,
  ShoppingCart,
  LayoutGrid,
  Heart,
  LogIn,
  LogOut
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
          href: "http://localhost:3000/pages/cart",
          label: "Cart",
          active: pathname.includes("/cart"),
          icon: ShoppingCart
        },
        {
          href: "http://localhost:3000/pages/wishlist",
          label: "Favorites",
          active: pathname.includes("/favorites") || pathname.includes("/wishlist"),
          icon: Heart
        },
        {
          href: "http://localhost:3000/pages/wishlist",
          label: "Wishlist",
          active: pathname.includes("/wishlist") || pathname.includes("/favorites"),
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
    },
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/login",
          label: "Login",
          active: pathname.includes("/login"),
          icon: LogIn
        },
        {
          href: "/logout",
          label: "Logout",
          active: pathname.includes("/logout"),
          icon: LogOut
        }
      ]
    }
  ];
}
