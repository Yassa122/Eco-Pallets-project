"use client";
import Navbar from '../../components/navbar';
import FeaturedProducts from '../../components/FeaturedProducts';
import WelcomeHome from '../../components/welcomeHome'; // Corrected import and component name

const HomePage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <WelcomeHome /> {/* Capitalized component name */}
      <main>
        <h1>Welcome to Our Store!</h1>
        <FeaturedProducts />
      </main>
    </div>
  );
};

export default HomePage;
