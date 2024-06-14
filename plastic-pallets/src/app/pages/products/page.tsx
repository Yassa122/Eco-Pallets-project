"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Products from "@/components/products/products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Modal from "@/components/modalTest";
import { useState, useEffect, Suspense } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (success) {
      setIsModalOpen(true);
    }
  }, [success]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Products />
        </PlaceholderContent>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </ContentLayout>
    </Suspense>
  );
}
