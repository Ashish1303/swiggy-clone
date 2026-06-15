import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../features/auth/authSlice';
import { validateLogin } from '../../utils/validators';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateLogin(credentials);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    dispatch(login(credentials)).unwrap().then(() => {
      toast.success('Logged in successfully');
      navigate('/');
    }).catch(() => {});
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="mb-4">Login to GharKaBite</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={credentials.email} onChange={handleChange} />
                  {errors.email && <div className="form-text text-danger">{errors.email}</div>}
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} />
                  {errors.password && <div className="form-text text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
              </form>
              <p className="text-center text-muted small mt-4">
                Don’t have an account? <Link to="/signup">Signup now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
