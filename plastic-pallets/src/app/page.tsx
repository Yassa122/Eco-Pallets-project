// pages/index.tsx
import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import HomeFeatures from "./components/HomeFeatures";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <Hero />
      <HomeFeatures />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
