"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProductDetails from "./ProductDetails"; // Import the ProductDetails component
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success"); // Accessing query parameter 'success'
  const { id } = params;

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
        {id ? <ProductDetails _id={id} /> : <p>Loading...</p>}{" "}
        {/* Render ProductDetails with id */}
      </PlaceholderContent>
    </ContentLayout>
  );
}
