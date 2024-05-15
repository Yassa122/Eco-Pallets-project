import Navbar from '../components/navbar';
import FeaturedProducts from '../components/FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Our Store!</h1>
        <FeaturedProducts />
      </main>
    </div>
  );
};

export default HomePage;
