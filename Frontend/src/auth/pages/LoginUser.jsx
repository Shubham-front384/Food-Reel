import React, { useState } from 'react';
import '../styles/auth.css';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router';

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { handleUserLogin, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleUserLogin(email, password);

    if (success) {
      console.log("Hello");
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="main">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to your Food Reel account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row single">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="form-group password-field">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                className="password-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="alt-link">
          New here? <a href="/user/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
