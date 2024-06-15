"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/pages/home"); // Redirect to your home page or dashboard
    }
  }, [router]);

  return <div>Loading...</div>;
}
