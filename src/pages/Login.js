import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(form);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-left">
        <div className="auth-brand">
          <Link to="/" className="auth-logo"><FontAwesomeIcon icon={faCode} /> CodeHive</Link>
          <h2>Welcome back</h2>
          <p>Log in to continue your learning journey and access your coding challenges.</p>
        </div>
        <div className="auth-features">
          {['10,000+ Coding Problems', 'Mock Interview Sessions', 'Live Contests', 'Progress Tracking'].map(f => (
            <div key={f} className="auth-feature-item">
              <span className="check">✓</span> {f}
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Log in</h1>
          <p className="auth-sub">Don't have an account? <Link to="/signup">Sign up free</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <label>Email address</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <label>Password</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(s => !s)}>
                  <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Log in'}
            </button>
          </form>

          <div className="auth-demo">
            <p>Don't have an account yet?</p>
            <Link to="/signup" className="btn btn-outline" style={{display:'inline-flex', marginTop:'0.5rem'}}>Create account →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
