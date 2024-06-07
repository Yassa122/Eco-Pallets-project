/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image from "next/image";

const testimonials = [
  {
    company: "Amazon",
    logo: "/amazon.png",
    quote:
      "These pallets have significantly improved our logistics operations. Highly durable and sustainable.",
    name: "John Doe, Logistics Manager",
  },
  {
    company: "Walmart",
    logo: "/walmart.png",
    quote:
      "Our supply chain efficiency has increased thanks to these high-quality pallets.",
    name: "Jane Smith, Supply Chain Director",
  },
  {
    company: "FedEx",
    logo: "/fedex.png",
    quote:
      "We are very impressed with the durability and design of these pallets. They are a game-changer.",
    name: "Mike Johnson, Operations Director",
  },
  {
    company: "UPS",
    logo: "/ups.png",
    quote:
      "The best pallets we've ever used. They have transformed our operations and efficiency.",
    name: "Sarah Connor, Logistics Coordinator",
  },
];

const Testimonials = () => {
  return (
    <section className="flex flex-col items-center justify-center p-10 md:p-20 bg-gradient-to-br from-black to-[#040404]">
      <div className="text-center text-white mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
        <p className="text-lg md:text-xl text-[#B8B8B8]">
          Hear what our satisfied customers have to say about our plastic
          pallets.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-transparent border border-gray-700 p-6 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 hover:bg-gray-800"
          >
            <div className="flex items-center mb-4">
              <Image
                src={testimonial.logo}
                alt={`${testimonial.company} logo`}
                width={50}
                height={50}
                className="mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{testimonial.company}</h3>
              </div>
            </div>
            <p className="italic mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
