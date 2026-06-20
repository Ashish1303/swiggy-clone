import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';

const DishCard = ({ dish }) => {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurantName: dish.restaurant,
    }));
  };

  return (
    <div className="card h-100 card-hover border-0 shadow-sm">
      <img src={dish.image} className="card-img-top" alt={dish.name} />
      <div className="card-body">
        <h5 className="card-title mb-1">{dish.name}</h5>
        <p className="mb-2 text-muted-small">{dish.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold">₹{dish.price}</span>
          <span className="badge bg-warning text-dark">{dish.rating} ★</span>
        </div>
        <div className="d-flex justify-content-between">
          <Link to={`/dishes/${dish._id}`} className="btn btn-outline-secondary btn-sm">Details</Link>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
