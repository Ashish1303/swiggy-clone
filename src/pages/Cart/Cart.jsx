import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);
  const deliveryCharges = totalItems > 0 ? 40 : 0;
  const gst = Math.round((totalAmount + deliveryCharges) * 0.05);
  const total = totalAmount + deliveryCharges + gst;

  if (!items.length) {
    return <EmptyState title="Your cart is empty" description="Add some delicious items to place your order." buttonText="Continue shopping" buttonAction={() => navigate('/')} />;
  }

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-xl-8">
          {items.map((item) => (<CartItem key={item.id} item={item} />))}
        </div>
        <div className="col-xl-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>₹{totalAmount}</span></div>
            <div className="d-flex justify-content-between mb-2"><span>Delivery Charges</span><span>₹{deliveryCharges}</span></div>
            <div className="d-flex justify-content-between mb-2"><span>GST (5%)</span><span>₹{gst}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-4"><span>Total</span><span>₹{total}</span></div>
            <Link to="/checkout" className="btn btn-primary w-100">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
