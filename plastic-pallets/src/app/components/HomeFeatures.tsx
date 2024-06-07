// components/Feature.tsx
"use client";
import Image from "next/image";

const HomeFeatures = () => {
  return (
    <section className="flex flex-col items-center justify-center p-10 md:p-20">
      <div className="text-white text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">FEATURES</h2>
      </div>
      <div className="w-full max-w-full rounded-xl bg-custom-gradient p-10 md:p-32">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="w-full md:w-1/2 p-5 md:p-10">
            <div className="transition-transform transform hover:scale-105">
              <Image
                src="/pallets1.svg"
                alt="Feature Image 1"
                width={500}
                height={300}
                className="w-full md:w-auto"
              />
            </div>
            <div className="transition-transform transform hover:scale-105 mt-5">
              <Image
                src="/pallet2.svg"
                alt="Feature Image 2"
                width={500}
                height={300}
                className="w-full md:w-auto"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-5 md:p-10">
            <div className="mb-8 md:mb-16 text-white">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Durability
              </h3>
              <p className="text-base md:text-lg">
                Crafted from high-quality, robust materials, our pallets are
                built to withstand heavy loads and harsh conditions, ensuring a
                longer life span for your storage needs.
              </p>
            </div>
            <div className="mb-8 md:mb-16 text-white">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Intuitive Interface
              </h3>
              <p className="text-base md:text-lg">
                With an easy-to-use design, our pallets ensure you can
                effortlessly organize and access your items.
              </p>
            </div>
            <div className="mb-8 md:mb-16 text-white">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Customization Options
              </h3>
              <p className="text-base md:text-lg">
                Tailored to your specific requirements, our pallets offer
                customizable sizes, colors, and configurations to match your
                unique storage environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
