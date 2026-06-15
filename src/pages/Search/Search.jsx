import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDishes } from '../../features/dishes/dishSlice';
import { fetchRestaurants as fetchRestaurantList } from '../../features/restaurant/restaurantSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import DishCard from '../../components/DishCard/DishCard';
import Loader from '../../components/Loader/Loader';
import useDebounce from '../../hooks/useDebounce';

const Search = () => {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.dishes);
  const { restaurants } = useSelector((state) => state.restaurants);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('restaurants');
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    dispatch(fetchRestaurantList());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchDishes(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  const restaurantMatches = restaurants.filter((rest) => {
    return rest.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || rest.cuisine.some((c) => c.toLowerCase().includes(debouncedQuery.toLowerCase()));
  });

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0 shadow-sm p-4">
            <SearchBar label="Search" placeholder="Search restaurants or dishes" onChange={setQuery} />
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'restaurants' ? 'active' : ''}`} onClick={() => setActiveTab('restaurants')}>Restaurants</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'dishes' ? 'active' : ''}`} onClick={() => setActiveTab('dishes')}>Dishes</button>
              </li>
            </ul>
            {loading && <Loader />}
            {!loading && activeTab === 'restaurants' && (
              <div className="list-group">
                {restaurantMatches.length > 0 ? restaurantMatches.map((restaurant) => (
                  <div key={restaurant.id} className="list-group-item list-group-item-action mb-3">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img src={restaurant.image} alt={restaurant.name} className="rounded-4" style={{ width: '140px', height: '100px', objectFit: 'cover' }} />
                      </div>
                      <div className="col">
                        <h5>{restaurant.name}</h5>
                        <p className="mb-1 text-muted-small">{restaurant.cuisine.join(' • ')}</p>
                        <p className="mb-1 text-muted-small">{restaurant.location} • {restaurant.deliveryTime} mins</p>
                      </div>
                    </div>
                  </div>
                )) : <p className="text-muted">No restaurants match your search.</p>}
              </div>
            )}
            {!loading && activeTab === 'dishes' && (
              <div className="row g-4">
                {searchResults.length > 0 ? searchResults.map((dish) => (
                  <div key={dish.id} className="col-sm-6 col-xl-4">
                    <DishCard dish={dish} />
                  </div>
                )) : <p className="text-muted">No dishes found for your search.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
