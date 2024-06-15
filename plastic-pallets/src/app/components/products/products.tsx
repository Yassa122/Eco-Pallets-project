"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

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
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from local storage
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

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:7000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from local storage
        },
        credentials: "include", // Include credentials
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/product/${productId}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from local storage
          },
          credentials: "include", // Include credentials
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Product added to wishlist successfully");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const handleAddToFavorites = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:5555/favorites/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from local storage
        },
        credentials: "include", // Include credentials
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Product added to favorites successfully");
    } catch (error) {
      console.error("Error adding product to favorites:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Our Products</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 rounded-xl text-gray-100 p-8">
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
                      <div className="relative w-full h-48">
                        <Image
                          src={`/${product.images[0]}`}
                          alt={product.name}
                          className="object-contain"
                          layout="fill"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-100">
                          {product.name}
                        </h2>
                        <p className="text-lg font-bold text-blue-400">
                          ${product.price}
                        </p>
                      </div>
                      <div className="bg-black p-4 flex justify-around">
                        <button
                          title="Add to Cart"
                          className="text-gray-400 hover:text-gray-100 transition-colors duration-200"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </button>
                        <button
                          title="Add to Wishlist"
                          className="text-gray-400 hover:text-gray-100 transition-colors duration-200"
                          onClick={() => handleAddToWishlist(product._id)}
                        >
                          <FontAwesomeIcon icon={faHeart} size="lg" />
                        </button>
                        <button
                          title="Add to Favorites"
                          className="text-gray-400 hover:text-gray-100 transition-colors duration-200"
                          onClick={() => handleAddToFavorites(product._id)}
                        >
                          <FontAwesomeIcon icon={faStar} size="lg" />
                        </button>
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
