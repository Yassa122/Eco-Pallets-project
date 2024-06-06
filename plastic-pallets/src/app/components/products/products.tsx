"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Pallet1 from "../../images/Pallet1.png";

// Define the Product type directly in the component file
interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  size: string;
  material: string;
  availability: boolean;
  rentalOptions: {
    available: boolean;
    duration?: number;
    price?: number;
  };
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/product/getAllProducts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials if needed
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching products:", error.message);
          setError(error.message);
        } else {
          console.error("Unexpected error fetching products");
          setError("Unexpected error");
        }
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Our Products</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 rounded-xl  text-gray-100 p-8">
        <div className="container mx-auto py-8">
          <h1 className="text-center text-4xl font-bold mb-10">Our Products</h1>
          {error ? (
            <div className="bg-red-600 text-gray-100 p-4 rounded-md">
              Error: {error}
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
                >
                  <Link href={`/pages/product/${product._id}`} passHref>
                    <div className="bg-zinc-800 hover:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                      <Image
                        src={Pallet1.src}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        width={500}
                        height={300}
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-100">
                          {product.name}
                        </h2>
                        <p className="text-lg font-bold text-blue-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
