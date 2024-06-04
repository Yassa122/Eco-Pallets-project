"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pallet2 from "../../../images/cart/pallet2.png";

interface Order {
  _id: string;
  date: string;
  totalPrice: number;
  status: string;
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch("http://localhost:7000/orderhistory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Fetched order history:", data);
          setOrders(data);
        } else {
          throw new Error(data.message || "Failed to fetch order history");
        }
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleViewOrderDetails = (order) => {
    router.push(`/pages/profile/orderDetails/`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orders.length) {
    return <p>No order history found.</p>;
  }

  return (
    <div className="order-history-container">
      <h1 className="order-history-header">Order History</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <div className="order-details">
            <div className="order-number">Order Number: {order._id}</div>
            <Image
              src={Pallet2}
              alt="Pallet2"
              width={200}
              height={200}
              className="pallet-image"
            />
            <div className="order-date">
              Date: {new Date(order.date).toLocaleDateString()}
            </div>
            <div className="order-status">Status: {order.status}</div>
            <button
              className="add-to-cart"
              onClick={() => handleViewOrderDetails(order._id)}
            >
              View Order Details
            </button>
            <div className="order-total">
              Total Amount: ${order.totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .order-item {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 20px;
          position: relative;
        }

        .order-details {
          margin-bottom: 10px;
          position: relative;
        }

        .pallet-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
          opacity: 0.2;
        }

        .order-number,
        .order-status,
        .order-total {
          margin-bottom: 5px;
          color: grey;
        }

        .order-date {
          margin-bottom: 5px;
          color: grey;
        }

        .order-status {
          position: absolute;
          top: 10px;
          right: 10px;
          color: grey;
        }

        .add-to-cart {
          background: transparent;
          position: absolute;
          top: 70px;
          right: 5px;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid #38b2ac;
          border-radius: 25px;
          outline: none;
          overflow: hidden;
          color: #38b2ac;
          transition: color 0.3s 0.1s ease-out;
          text-align: center;
        }

        .add-to-cart span {
          margin: 10px;
        }

        .add-to-cart::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          content: "";
          border-radius: 50%;
          display: block;
          width: 20em;
          height: 20em;
          left: -5em;
          text-align: center;
          transition: box-shadow 0.5s ease-out;
          z-index: -1;
        }

        .add-to-cart:hover {
          color: #fff;
          border: 1px solid #38b2ac;
        }

        .add-to-cart:hover::before {
          box-shadow: inset 0 0 0 10em #38b2ac;
        }

        .add-to-cart:disabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
        }

        .order-total {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: grey;
        }

        .order-history-header {
          font-size: 24px;
          color: grey;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default OrderHistoryPage;
