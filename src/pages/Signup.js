import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEye, faEyeSlash, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup({ username: form.username, email: form.email, password: form.password });
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 400);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength] || '';
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#10b981'][strength] || '';

  return (
    <div className="auth-page page-enter">
      <div className="auth-left">
        <div className="auth-brand">
          <Link to="/" className="auth-logo"><FontAwesomeIcon icon={faCode} /> CodeHive</Link>
          <h2>Join CodeHive</h2>
          <p>Start your journey with thousands of developers who have already leveled up their skills.</p>
        </div>
        <div className="auth-features">
          {['Free to get started', 'Access 10,000+ problems', 'Track your progress', 'Prepare for top companies'].map(f => (
            <div key={f} className="auth-feature-item">
              <span className="check">✓</span> {f}
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Create account</h1>
          <p className="auth-sub">Already have an account? <Link to="/login">Log in</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <label>Username</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  autoComplete="username"
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(s => !s)}>
                  <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                </button>
              </div>
              {form.password && (
                <div className="strength-bar-wrap">
                  <div className="strength-bar">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor : '#e2e8f0' }} />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="field-group">
              <label>Confirm password</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
