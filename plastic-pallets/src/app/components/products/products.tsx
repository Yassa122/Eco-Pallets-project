'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pallet1 from '../../images/Pallet1.png';
import './page-module.css';

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
        const response = await fetch('http://localhost:8080/product/getAllProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials if needed
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching products:', error.message);
          setError(error.message);
        } else {
          console.error('Unexpected error fetching products');
          setError('Unexpected error');
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
      <Container className="py-5">
        <h1 className="text-center mb-5">Our Products:</h1>
        {error ? (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <Row>
            {products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                <Link href={`/pages/product/${product._id}`} passHref>
                  <Card className="h-100 productCard">
                    <Card.Img variant="top" src={Pallet1.src} alt={product.name} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Products;
