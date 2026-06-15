import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishById } from '../../features/dishes/dishSlice';
import { addToCart, increaseQty, decreaseQty } from '../../features/cart/cartSlice';
import Loader from '../../components/Loader/Loader';

const DishDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedDish, loading } = useSelector((state) => state.dishes);
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === Number(id)));

  useEffect(() => {
    dispatch(fetchDishById(id));
  }, [dispatch, id]);

  if (loading || !selectedDish) return <Loader />;

  const handleAdd = () => dispatch(addToCart({
    id: selectedDish.id,
    name: selectedDish.name,
    image: selectedDish.image,
    price: selectedDish.price,
    restaurantName: selectedDish.restaurant,
  }));

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <img src={selectedDish.image} alt={selectedDish.name} className="rounded-4 shadow-sm w-100" style={{ objectFit: 'cover', minHeight: '420px' }} />
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h2>{selectedDish.name}</h2>
            <p className="text-muted-small">{selectedDish.restaurant}</p>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="badge bg-success">{selectedDish.rating} ★</span>
              <span className="badge bg-secondary">₹{selectedDish.price}</span>
            </div>
            <p>{selectedDish.description}</p>
            <p className="text-muted-small"><strong>Ingredients:</strong> {selectedDish.ingredients.join(', ')}</p>
            <div className="d-flex align-items-center gap-2 mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(decreaseQty(selectedDish.id))} disabled={!cartItem}>-</button>
              <button type="button" className="btn btn-outline-light disabled">{cartItem?.quantity || 0}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(increaseQty(selectedDish.id))} disabled={!cartItem}>+</button>
            </div>
            <div className="mt-4">
              <button type="button" className="btn btn-primary me-3" onClick={handleAdd}>Add to Cart</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(addToCart({
                id: selectedDish.id,
                name: selectedDish.name,
                image: selectedDish.image,
                price: selectedDish.price,
                restaurantName: selectedDish.restaurant,
              }))}>Add one more</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DishDetails;
