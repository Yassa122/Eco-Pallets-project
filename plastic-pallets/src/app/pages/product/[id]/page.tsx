// src/app/product/[id]/page.tsx
'use client';
import ProductDetails from "./ProductDetails";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="min-h-screen bg-black text-white">
      {id ? <ProductDetails _id={id} /> : <p>Loading...</p>}
    </div>
  );
};

export default ProductPage;