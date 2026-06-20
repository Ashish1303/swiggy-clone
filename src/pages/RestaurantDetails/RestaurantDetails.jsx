import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantById } from '../../features/restaurant/restaurantSlice';
import { fetchDishes } from '../../features/dishes/dishSlice';
import DishCard from '../../components/DishCard/DishCard';
import Loader from '../../components/Loader/Loader';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedRestaurant, loading } = useSelector((state) => state.restaurants);
  const { dishes } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
    dispatch(fetchDishes());
  }, [dispatch, id]);

  if (loading || !selectedRestaurant) return <Loader />;

  const menu = dishes.filter((dish) => dish.restaurantId === selectedRestaurant.id);
  const categories = ['Starters', 'Main Course', 'Pizza', 'Burger', 'Desserts', 'Beverages'];

  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0 overflow-hidden">
        <img src={selectedRestaurant.image} className="card-img-top" alt={selectedRestaurant.name} style={{ maxHeight: '420px', objectFit: 'cover' }} />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-column flex-md-row gap-3">
            <div>
              <h2>{selectedRestaurant.name}</h2>
              <p className="text-muted-small mb-1">{selectedRestaurant.cuisine}</p>
              <p className="text-muted-small">{selectedRestaurant.location}</p>
            </div>
            <div className="text-end">
              <span className="badge bg-success fs-6 me-2">{selectedRestaurant.rating} ★</span>
              <span className="badge bg-secondary fs-6">{selectedRestaurant.deliveryTime} mins</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-spacing">
        <h4 className="mb-4">Menu</h4>
        <div className="accordion" id="menuAccordion">
          {categories.map((category, index) => {
            const items = menu.filter((dish) => dish.category === category);
            return (
              <div className="accordion-item" key={category}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded={index === 0} aria-controls={`collapse-${index}`}>
                    {category} ({items.length})
                  </button>
                </h2>
                <div id={`collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading-${index}`} data-bs-parent="#menuAccordion">
                  <div className="accordion-body">
                    <div className="row g-4">
                      {items.length > 0 ? items.map((dish) => (
                        <div key={dish.id} className="col-md-6">
                          <DishCard dish={dish} />
                        </div>
                      )) : <p className="text-muted">No items in this category.</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default RestaurantDetails;
