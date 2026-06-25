import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie, faPlus, faTh, faList, faChevronDown,
  faCalendarAlt, faClock, faCheckCircle, faTimesCircle,
  faSpinner, faLock
} from '@fortawesome/free-solid-svg-icons';
import './Interview.css';

const MONTHS_LIMIT = 10;

const InterviewModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ role: '', name: '', date: '', time: '', details: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.role.trim()) e.role = 'Job role is required';
    if (!form.name.trim()) e.name = 'Candidate name is required';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form, id: Date.now(), status: 'Scheduled', createdAt: new Date().toISOString() });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FontAwesomeIcon icon={faUserTie} /> Schedule Interview</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-row">
            <div className="modal-field">
              <label>Job Role *</label>
              <input
                placeholder="e.g. Frontend Engineer"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              />
              {errors.role && <span className="field-error">{errors.role}</span>}
            </div>
            <div className="modal-field">
              <label>Candidate Name *</label>
              <input
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Date *</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </div>
            <div className="modal-field">
              <label>Time *</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              />
              {errors.time && <span className="field-error">{errors.time}</span>}
            </div>
          </div>
          <div className="modal-field">
            <label>Additional Details</label>
            <textarea
              placeholder="Topics to cover, tech stack, notes..."
              value={form.details}
              rows={3}
              onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Schedule Interview</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const statusIcon = status => {
  if (status === 'Completed') return <span className="status completed"><FontAwesomeIcon icon={faCheckCircle} /> Completed</span>;
  if (status === 'Cancelled') return <span className="status cancelled"><FontAwesomeIcon icon={faTimesCircle} /> Cancelled</span>;
  return <span className="status scheduled"><FontAwesomeIcon icon={faSpinner} /> Scheduled</span>;
};

const Interview = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const usedThisMonth = interviews.filter(i => {
    const d = new Date(i.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const usagePct = Math.min((usedThisMonth / MONTHS_LIMIT) * 100, 100);

  const handleSave = interview => {
    setInterviews(prev => [interview, ...prev]);
  };

  const handleStatusChange = (id, status) => {
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const filtered = filterStatus === 'All' ? interviews : interviews.filter(i => i.status === filterStatus);

  if (!user) {
    return (
      <div className="interview-locked page-enter">
        <div className="locked-card">
          <div className="locked-icon"><FontAwesomeIcon icon={faLock} /></div>
          <h2>Sign in to access Interviews</h2>
          <p>Create and manage your mock interview sessions by logging into your CodeHive account.</p>
          <div className="locked-actions">
            <Link to="/login" className="btn btn-primary">Log in</Link>
            <Link to="/signup" className="btn btn-outline">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page page-enter">
      <div className="container">

        {/* Header */}
        <div className="interview-header">
          <div>
            <h1><FontAwesomeIcon icon={faUserTie} /> CodeHive Interview</h1>
            <p>Schedule and manage your mock interview sessions</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => usedThisMonth < MONTHS_LIMIT && setShowModal(true)}
            disabled={usedThisMonth >= MONTHS_LIMIT}
            title={usedThisMonth >= MONTHS_LIMIT ? 'Monthly limit reached' : ''}
          >
            <FontAwesomeIcon icon={faPlus} /> New Interview
          </button>
        </div>

        {/* Usage + Create card */}
        <div className="interview-top-grid">
          <div className="create-card" onClick={() => usedThisMonth < MONTHS_LIMIT && setShowModal(true)}>
            <div className="create-plus"><FontAwesomeIcon icon={faPlus} /></div>
            <p>Create an Interview</p>
          </div>

          <div className="usage-card">
            <h3>Monthly Usage</h3>
            <div className="usage-numbers">
              <span className="used-count">{usedThisMonth}</span>
              <span className="usage-sep">/</span>
              <span className="total-count">{MONTHS_LIMIT}</span>
            </div>
            <div className="usage-bar-wrap">
              <div className="usage-bar">
                <div className="usage-fill" style={{ width: `${usagePct}%`, background: usagePct >= 80 ? '#ef4444' : '#2563eb' }} />
              </div>
              <span className="usage-label">{MONTHS_LIMIT - usedThisMonth} remaining this month</span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-num">{interviews.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num" style={{color:'#10b981'}}>{interviews.filter(i=>i.status==='Completed').length}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num" style={{color:'#2563eb'}}>{interviews.filter(i=>i.status==='Scheduled').length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Past interviews */}
        <div className="past-section">
          <div className="past-header">
            <h2>Past Interviews</h2>
            <div className="past-controls">
              <div className="filter-wrap">
                <button className="filter-btn" onClick={() => setShowFilter(s => !s)}>
                  {filterStatus} <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {showFilter && (
                  <div className="filter-dropdown">
                    {['All', 'Scheduled', 'Completed', 'Cancelled'].map(s => (
                      <button key={s} className={filterStatus === s ? 'active' : ''} onClick={() => { setFilterStatus(s); setShowFilter(false); }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                <FontAwesomeIcon icon={faTh} />
              </button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FontAwesomeIcon icon={faUserTie} /></div>
              <h3>No interviews yet</h3>
              <p>Click "New Interview" to schedule your first session.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'interviews-grid' : 'interviews-list'}>
              {filtered.map(interview => (
                <div className="interview-card" key={interview.id}>
                  <div className="card-top">
                    <div>
                      <h3>{interview.role}</h3>
                      <p className="candidate-name">{interview.name}</p>
                    </div>
                    {statusIcon(interview.status)}
                  </div>
                  <div className="card-meta">
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {interview.date}</span>
                    <span><FontAwesomeIcon icon={faClock} /> {interview.time}</span>
                  </div>
                  {interview.details && <p className="card-details">{interview.details}</p>}
                  <div className="card-actions">
                    {interview.status === 'Scheduled' && (
                      <>
                        <button className="action-btn complete" onClick={() => handleStatusChange(interview.id, 'Completed')}>Mark Complete</button>
                        <button className="action-btn cancel" onClick={() => handleStatusChange(interview.id, 'Cancelled')}>Cancel</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <InterviewModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Interview;
