'use client'

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import HomeComponents from "@/components/HomeComponents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Modal from "@/components/modalTest"; // Import Modal component
import "./global.css";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success'); // Accessing query parameter 'success'
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
        < HomeComponents/> {/* Cart component is rendered inside PlaceholderContent */}
      </PlaceholderContent>      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </ContentLayout>
  );
}