import React, { useState } from 'react';
import '../styles/auth.css';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router';

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { handleUserRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleUserRegister(fullName, email, password);
    if (success) {
      navigate("/user/login");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" role="main">
        <h1>Create account</h1>
        <p className="subtitle">Sign up as a Food Reel user</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Choose a password"
                className="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="alt-link">
          Have an account? <a href="/user/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
