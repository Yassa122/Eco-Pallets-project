"use client";
import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <section className="flex flex-col items-center justify-center p-10 md:p-20 bg-gradient-to-br from-black to-[#040404]">
      <div className="text-center text-white mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our Plastic Pallets
        </h2>
        <p className="text-lg md:text-xl text-[#B8B8B8]">
          Discover the durability and sustainability of our high-quality plastic
          pallets.
        </p>
      </div>
      <div className="w-full max-w-6xl p-8 bg-zinc-900 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative w-full h-64 bg-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
              src="/palletg1.svg"
              alt="Plastic Pallet 1"
              width={500}
              height={300}
              className="transition-transform transform hover:scale-105"
            />
          </div>
          <div className="relative w-full h-64 bg-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
              src="/palletg2.svg"
              alt="Plastic Pallet 2"
              width={500}
              height={300}
              style={{ objectFit: "contain" }}
              className="transition-transform transform hover:scale-105"
            />
          </div>
          <div className="relative w-full h-64 bg-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
              src="/palletg3.svg"
              alt="Plastic Pallet 3"
              width={500}
              height={300}
              style={{ objectFit: "contain" }}
              className="transition-transform transform hover:scale-105"
            />
          </div>
          <div className="relative w-full h-64 bg-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
              src="/palletg4.svg"
              alt="Plastic Pallet 4"
              width={500}
              height={300}
              style={{ objectFit: "contain" }}
              className="transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
