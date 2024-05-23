import React from 'react';
import Navbar from '../components/navbar'; // Corrected import and component name
import FeaturedProducts from '../components/FeaturedProducts'; // Corrected import and component name
import WelcomeHome from '../components/welcomeHome'; // Corrected import and component name
// import FeaturedProducts2 from '../../components/featuredProducts2'; // Corrected import and component name
import CategoriesComponent from './categories';
import Offers from '../components/offer'; // Corrected import and component name



const HomeComponents = () => {
    return (
    <div>
      <Navbar />
      <WelcomeHome /> {/* Capitalized component name */}
      <main>
        {/* <h1>Welcome to Our Store!</h1> */}
        <FeaturedProducts />
        <Offers />

        <CategoriesComponent />
        {/* <FeaturedProducts2 /> */}
      </main>
    </div>
  );
};

export default HomeComponents;
