import React from 'react';
import Navbar from '../../components/navbar'; // Corrected import and component name
import FeaturedProducts from '../../components/FeaturedProducts'; // Corrected import and component name
import WelcomeHome from '../../components/welcomeHome'; // Corrected import and component name
// import FeaturedProducts2 from '../../components/featuredProducts2'; // Corrected import and component name
import Components from '../../components/categories'; // Corrected import and component name
import Drum from "../../components/drum"
import DrumInfo from "../../components/DrumInfo"



const Metal = () => {
  return (
    <div>
      <Navbar />
      {/* <WelcomeHome /> Capitalized component name */}
      <main>
        {/* <h1>Welcome to Our Store!</h1> */}
        {/* <FeaturedProducts /> */}
{/* "        <Components /> */}
     <Drum />
     <DrumInfo/>
      </main>
    </div>
  );
};

export default Metal;
