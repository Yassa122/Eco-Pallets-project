"use client";

import Navbar from "../../components/cartComponents/navbar";
import PhasesComponent from "../../components/cartComponents/phases";
import ShoppingCart from "../../components/cartComponents/cartItems";
import Proceed from "../../components/cartComponents/proceed";
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
