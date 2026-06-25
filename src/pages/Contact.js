import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 800);
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  return (
    <div className="contact-page page-enter">
      <div className="contact-banner">
        <h1>Get In Touch</h1>
        <p>Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Reach out through any of the channels below and we'll get back to you within 24 hours.</p>

            <div className="info-items">
              {[
                { icon: faEnvelope, label: 'Email', value: 'support@codehive.com' },
                { icon: faPhone, label: 'Phone', value: '+91 98765 43210' },
                { icon: faMapMarkerAlt, label: 'Address', value: 'Greater Noida, Uttar Pradesh, India' },
              ].map(item => (
                <div className="info-item" key={item.label}>
                  <div className="info-icon"><FontAwesomeIcon icon={item.icon} /></div>
                  <div>
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-box">
              <h3>Common Questions</h3>
              {[
                { q: 'How do I reset my password?', a: 'Go to login page and click "Forgot password".' },
                { q: 'Is CodeHive free?', a: 'Yes! Basic access is free. Premium plans available.' },
                { q: 'How do mock interviews work?', a: 'Schedule via the Interview section after logging in.' },
              ].map(f => (
                <div className="faq-item" key={f.q}>
                  <strong>{f.q}</strong>
                  <span>{f.a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {sent ? (
              <div className="success-state">
                <div className="success-icon"><FontAwesomeIcon icon={faCheckCircle} /></div>
                <h2>Message Sent!</h2>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name:'',email:'',subject:'',message:'' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Full Name</label>
                      <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
                      {errors.name && <span className="field-err">{errors.name}</span>}
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                      {errors.email && <span className="field-err">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Subject</label>
                    <input name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
                    {errors.subject && <span className="field-err">{errors.subject}</span>}
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea name="message" rows={5} placeholder="Write your message here..." value={form.message} onChange={handleChange} />
                    {errors.message && <span className="field-err">{errors.message}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%', justifyContent:'center', padding:'0.8rem'}}>
                    {loading ? 'Sending…' : <><FontAwesomeIcon icon={faPaperPlane} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
