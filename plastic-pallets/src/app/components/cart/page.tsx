"use client";

import Navbar from "../cartComponents/navbar";
import PhasesComponent from "../cartComponents/phases";
import ShoppingCart from "../cartComponents/cartItems";
import Proceed from "../cartComponents/proceed";
import Image from "next/image";
export default function Cart() {
  return (
    <main>
      <Navbar />
      <PhasesComponent />
      <div className="p-2">
        <ShoppingCart />
      </div>
    </main>
  );
}
