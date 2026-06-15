import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../features/restaurant/restaurantSlice';
import { fetchDishes } from '../../features/dishes/dishSlice';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import DishCard from '../../components/DishCard/DishCard';
import Loader from '../../components/Loader/Loader';

const categories = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Biryani', icon: '🍛' },
  { name: 'South Indian', icon: '🫓' },
  { name: 'Chinese', icon: '🥡' },
  { name: 'Desserts', icon: '🍰' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading: restaurantLoading } = useSelector((state) => state.restaurants);
  const { dishes, loading: dishLoading } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchDishes());
  }, [dispatch]);

  if (restaurantLoading || dishLoading) return <Loader />;

  return (
    <main className="container py-4">
      <section className="hero-banner p-4 mb-5 rounded-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold">Fresh food delivered fast from top local restaurants.</h1>
            <p className="text-muted mt-3">Choose from hundreds of restaurants, popular dishes, and offers across the city.</p>
            <a href="#restaurants" className="btn btn-primary btn-lg mt-3">Order Now</a>
          </div>
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="Food delivery" className="img-fluid rounded-4 shadow" />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Top Categories</h3>
        </div>
        <div className="d-flex gap-3 overflow-auto pb-2">
          {categories.map((category) => (
            <div key={category.name} className="py-3 px-4 bg-white rounded-4 shadow-sm text-center flex-shrink-0">
              <div className="fs-3">{category.icon}</div>
              <p className="mb-0 mt-2 fw-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="restaurants" className="section-spacing">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Top Restaurants</h3>
        </div>
        <div className="row g-4">
          {restaurants.slice(0, 6).map((restaurant) => (
            <div key={restaurant.id} className="col-sm-6 col-xl-4">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Popular Dishes</h3>
        </div>
        <div className="row g-4">
          {dishes.slice(0, 6).map((dish) => (
            <div key={dish.id} className="col-sm-6 col-xl-4">
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
