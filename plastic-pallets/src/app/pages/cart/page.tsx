import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "./global.css";
import Carts from "@/components/cart/page"; // Adjust the import path as needed
import PlaceholderContent from "@/components/demo/placeholder-content"; // Adjust the import path as needed

import Navbar from "../../components/cartComponents/navbar";
import PhasesComponent from "../../components/cartComponents/phases";
import ShoppingCart from "../../components/cartComponents/cartItems";
import Proceed from "../../components/cartComponents/proceed";
import Image from "next/image";
export default function Cart() {
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <Carts /> {/* Cart component is rendered inside PlaceholderContent */}
      </PlaceholderContent>
    </ContentLayout>
  );
}
