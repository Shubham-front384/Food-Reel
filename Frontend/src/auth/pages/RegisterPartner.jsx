import React, { useState } from 'react';
import '../styles/auth.css';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router';

const RegisterPartner = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { handlePartnerRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handlePartnerRegister(fullName, contactName, phone, address, email, password);

    if (success) {
      navigate("/food-partner/login");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" role="main">
        <h1>Partner sign up</h1>
        <p className="subtitle">Create an account for your food business</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact name</label>
              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                id="contact"
                name="contact"
                type="text"
                placeholder="Your partner name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 (555) 000-0000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Business email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="contact@business.com"
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
                placeholder="Choose a password"
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
            <div className="form-group form-group-full">
              <label htmlFor="address">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                name="address"
                type="text"
                placeholder="123 Business Street, City"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        <div className="alt-link">
          Already a partner? <a href="/food-partner/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPartner;
