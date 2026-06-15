import { useDispatch } from 'react-redux';
import { decreaseQty, increaseQty, removeFromCart } from '../../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-auto">
          <img src={item.image} alt={item.name} className="img-fluid rounded-start" style={{ width: '140px', height: '120px', objectFit: 'cover' }} />
        </div>
        <div className="col">
          <div className="card-body py-3">
            <h5 className="card-title mb-1">{item.name}</h5>
            <p className="mb-2 text-muted-small">{item.restaurantName}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <button type="button" className="btn btn-outline-light btn-sm disabled">{item.quantity}</button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(increaseQty(item.id))}>+</button>
              </div>
              <span className="fw-bold">₹{item.price * item.quantity}</span>
            </div>
            <button type="button" className="btn btn-link text-danger p-0 mt-2" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
