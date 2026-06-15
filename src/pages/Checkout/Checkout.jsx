import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../../features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);
  const [form, setForm] = useState({ name: '', mobile: '', address: '', city: '', state: '', pincode: '', payment: 'UPI' });

  const deliveryCharges = totalItems > 0 ? 40 : 0;
  const gst = Math.round((totalAmount + deliveryCharges) * 0.05);
  const total = totalAmount + deliveryCharges + gst;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error('Please complete the shipping details.');
      return;
    }
    const orderId = `SWG-${Date.now()}`;
    dispatch(clearCart());
    toast.success(`Order placed successfully! Order ID: ${orderId}`);
    navigate('/');
  };

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h4 className="mb-4">Delivery Details</h4>
            <form onSubmit={handleOrder}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile</label>
                  <input type="tel" name="mobile" className="form-control" value={form.mobile} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea name="address" rows="3" className="form-control" value={form.address} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input type="text" name="state" className="form-control" value={form.state} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Pincode</label>
                  <input type="text" name="pincode" className="form-control" value={form.pincode} onChange={handleChange} />
                </div>
              </div>
              <div className="mt-4">
                <h5>Payment Method</h5>
                {['UPI', 'Credit Card', 'Debit Card', 'Cash On Delivery'].map((method) => (
                  <div key={method} className="form-check">
                    <input className="form-check-input" type="radio" name="payment" id={method} value={method} checked={form.payment === method} onChange={handleChange} />
                    <label className="form-check-label" htmlFor={method}>{method}</label>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-primary mt-4">Place Order</button>
            </form>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4">Order Summary</h5>
            <div className="mb-3 d-flex justify-content-between"><span>Items</span><span>{totalItems} items</span></div>
            <div className="mb-3 d-flex justify-content-between"><span>Subtotal</span><span>₹{totalAmount}</span></div>
            <div className="mb-3 d-flex justify-content-between"><span>Delivery</span><span>₹{deliveryCharges}</span></div>
            <div className="mb-3 d-flex justify-content-between"><span>GST</span><span>₹{gst}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{total}</span></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
