"use client";

import Navbar from "../../components/cartComponents/navbar";
import PhasesComponent from "../../components/cartComponents/phases";
import ShoppingCart from "@/app/components/cartComponents/cartItems";
import Proceed from "@/app/components/cartComponents/proceed";
import Image from "next/image";
export default function Cart() {
  return (
    <main>
      <Navbar />
      <PhasesComponent />
      <div className="p-16">
      <ShoppingCart />
</div>
    </main>
  );
}
