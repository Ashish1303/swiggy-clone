import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfile } from '../../features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', mobile: user?.mobile || '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
    toast.success('Profile updated successfully');
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <div className="text-center mb-4">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: 90, height: 90, fontSize: 42 }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h4 className="text-center mb-4">My Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input type="tel" name="mobile" className="form-control" value={form.mobile} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
