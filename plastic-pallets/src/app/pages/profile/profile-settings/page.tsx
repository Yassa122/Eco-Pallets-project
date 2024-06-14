"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Profile from "@/components/profileComponent/profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useEffect, Suspense } from "react";
import Modal from "@/components/modalTest";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success"); // Accessing query parameter 'success'
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
          <Profile />
          {/* Cart component is rendered inside PlaceholderContent */}
        </PlaceholderContent>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </ContentLayout>
    </Suspense>
  );
}
