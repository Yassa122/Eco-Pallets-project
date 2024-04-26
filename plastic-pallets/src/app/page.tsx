import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Feature from "./components/feature";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />

      <Hero />
      <Feature />
    </main>
  );
}
