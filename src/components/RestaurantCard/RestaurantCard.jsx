import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => (
  <div className="card h-100 card-hover border-0 shadow-sm">
    <img src={restaurant.image} className="card-img-top" alt={restaurant.name} />
    <div className="card-body">
      <h5 className="card-title mb-2">{restaurant.name}</h5>
      <p className="mb-2 text-muted-small">{restaurant.cuisine}</p>
      <div className="d-flex justify-content-between align-items-center">
        <span className="badge bg-success">{restaurant.rating} ★</span>
        <span className="text-muted-small">{restaurant.deliveryTime} mins</span>
      </div>
    </div>
    <div className="card-footer bg-white border-0">
      <Link to={`/restaurants/${restaurant._id}`} className="btn btn-outline-primary btn-sm w-100">
        View Menu
      </Link>
    </div>
  </div>
);

export default RestaurantCard;
