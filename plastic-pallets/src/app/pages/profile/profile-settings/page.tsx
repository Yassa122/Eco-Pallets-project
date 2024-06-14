"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
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
import Profile from "@/components/profileComponent/profile";

export default function ProfileSettingsPage() {
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
          <Profile />
        </PlaceholderContent>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </ContentLayout>
    </Suspense>
  );
}
