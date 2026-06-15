import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../features/auth/authSlice';
import { validateSignup } from '../../utils/validators';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateSignup(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    dispatch(signup(formData)).unwrap().then(() => {
      toast.success('Signup successful. Please login.');
      navigate('/login');
    }).catch(() => {});
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="mb-4">Create your account</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                  {errors.name && <div className="form-text text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="form-text text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
                  {errors.mobile && <div className="form-text text-danger">{errors.mobile}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                  {errors.password && <div className="form-text text-danger">{errors.password}</div>}
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <div className="form-text text-danger">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Creating account...' : 'Signup'}</button>
              </form>
              <p className="text-center text-muted small mt-4">
                Already registered? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
