import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faCheckSquare, faSquare, faHome,
  faChevronRight, faBars, faTimes, faSun, faMoon,
  faSignOutAlt, faCheck, faCode, faStickyNote,
  faLayerGroup, faFont, faProjectDiagram, faBrain,
  faRedo, faLink, faStream, faBolt, faListUl,
  faBookOpen, faClipboardList, faTh, faPercent
} from '@fortawesome/free-solid-svg-icons';
import { TOPICS } from '../data/problemsData';
import './Problems.css';

const PROBLEMS_PER_PAGE = 15;

/* ── Topic icon map ── */
const TOPIC_ICONS = {
  'arrays':               faTh,
  'strings':              faFont,
  'linked-list':          faLink,
  'stacks':               faStream,
  'recursion':            faRedo,
  'dp':                   faBrain,
  'graphs':               faProjectDiagram,
  'greedy':               faBolt,
};

const TopicIcon = ({ iconId, ...props }) => (
  <FontAwesomeIcon icon={TOPIC_ICONS[iconId] || faLayerGroup} {...props} />
);

const DiffBadge = ({ d }) => (
  <span className={`diff-badge diff-${d}`}>
    {d === 'easy' ? 'Easy' : d === 'medium' ? 'Medium' : 'Hard'}
  </span>
);

const PlatformLink = ({ platform, link }) => {
  if (!link) return null;
  const isLC = platform === 'lc';
  return (
    <a href={link} target="_blank" rel="noreferrer" className={`platform-link ${isLC ? 'lc' : 'gfg'}`}
      onClick={e => e.stopPropagation()}>
      {isLC ? <span className="lc-logo">&lt;/&gt;</span> : <span className="gfg-logo">GFG</span>}
    </a>
  );
};

const Problems = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const mainRef = useRef(null);

  const topic = TOPICS.find(t => t.id === topicId) || TOPICS[0];
  const [activeTopic, setActiveTopic] = useState(topic);

  const [solved, setSolved] = useState(() => {
    const s = localStorage.getItem('codehive_solved');
    return s ? JSON.parse(s) : {};
  });
  const [notes, setNotes] = useState(() => {
    const n = localStorage.getItem('codehive_notes');
    return n ? JSON.parse(n) : {};
  });
  const [activeNote, setActiveNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('all');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync activeTopic when URL changes
  useEffect(() => {
    const t = TOPICS.find(t => t.id === topicId);
    if (t) setActiveTopic(t);
  }, [topicId]);

  // ✅ FIX: scroll to top of page (not footer) on topic/page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTopic, page]);

  const allProblems = activeTopic.sections.flatMap((sec) =>
    sec.problems.map(p => ({ ...p, section: sec.title, difficulty: sec.difficulty }))
  );

  const filtered = allProblems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDiff === 'all' || p.difficulty === filterDiff;
    return matchSearch && matchDiff;
  });

  const totalPages = Math.ceil(filtered.length / PROBLEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * PROBLEMS_PER_PAGE, page * PROBLEMS_PER_PAGE);

  const solvedCount = allProblems.filter(p => solved[`${activeTopic.id}-${p.id}`]).length;

  const toggleSolved = (p) => {
    const key = `${activeTopic.id}-${p.id}`;
    const updated = { ...solved, [key]: !solved[key] };
    setSolved(updated);
    localStorage.setItem('codehive_solved', JSON.stringify(updated));
  };

  const openNote = (p) => {
    const key = `${activeTopic.id}-${p.id}`;
    setActiveNote({ key, title: p.title });
    setNoteText(notes[key] || '');
  };

  const saveNote = () => {
    if (!activeNote) return;
    const updated = { ...notes, [activeNote.key]: noteText };
    setNotes(updated);
    localStorage.setItem('codehive_notes', JSON.stringify(updated));
    setActiveNote(null);
  };

  const handleTopicChange = (t) => {
    setActiveTopic(t);
    setPage(1);
    setSearch('');
    setFilterDiff('all');
    setSidebarOpen(false);
    navigate(`/problems/${t.id}`, { replace: true });
  };

  useEffect(() => { setPage(1); }, [search, filterDiff, activeTopic]);

  const isSolved = (p) => !!solved[`${activeTopic.id}-${p.id}`];
  const hasNote = (p) => !!notes[`${activeTopic.id}-${p.id}`];

  // Pagination helpers
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  return (
    <div className="prob-page">
      {/* ── Top Nav ── */}
      <nav className="prob-nav">
        <div className="prob-nav-inner">
          <button className="prob-sidebar-btn" onClick={() => setSidebarOpen(s => !s)}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
          <Link to="/" className="prob-logo">
            <FontAwesomeIcon icon={faCode} /> CodeHive
          </Link>
          <div className="prob-breadcrumb">
            <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
            <FontAwesomeIcon icon={faChevronRight} className="bc-sep" />
            <span className="bc-link">Explore Topics</span>
            <FontAwesomeIcon icon={faChevronRight} className="bc-sep" />
            <span>{activeTopic.label}</span>
          </div>

          <div className="prob-nav-right">
            {searchOpen ? (
              <div className="prob-search-bar">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  autoFocus
                  placeholder="Search problems..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onBlur={() => { if (!search) setSearchOpen(false); }}
                />
                {search && <button onClick={() => setSearch('')}>×</button>}
              </div>
            ) : (
              <button className="icon-btn" onClick={() => setSearchOpen(true)}>
                <FontAwesomeIcon icon={faSearch} />
                <span className="icon-btn-label">Search</span>
                <kbd>Ctrl K</kbd>
              </button>
            )}

            <button className="icon-btn theme-btn" onClick={toggleTheme}>
              <FontAwesomeIcon icon={dark ? faSun : faMoon} />
            </button>

            {user ? (
              <div className="prob-user">
                <div className="prob-avatar">{user.username[0].toUpperCase()}</div>
                <button className="icon-btn icon-btn-ghost" onClick={() => { logout(); navigate('/'); }}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm-nav">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="prob-body">
        {/* ── Sidebar ── */}
        <aside className={`prob-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-section-label">EXPLORE TOPICS</div>
          {TOPICS.map(t => (
            <button
              key={t.id}
              className={`prob-sidebar-item ${activeTopic.id === t.id ? 'active' : ''}`}
              onClick={() => handleTopicChange(t)}
              style={activeTopic.id === t.id ? { '--item-color': t.color } : {}}
            >
              <span className="sidebar-item-icon" style={{ color: t.color }}>
                <TopicIcon iconId={t.icon} />
              </span>
              <span>{t.label}</span>
              <span className="sidebar-item-count">
                {t.sections.flatMap(s => s.problems).length}
              </span>
            </button>
          ))}

          <div className="sidebar-section-label sidebar-section-spacer">MY SPACE</div>
          <Link to="/interview" className="prob-sidebar-item">
            <span className="sidebar-item-icon" style={{ color: '#7c3aed' }}>
              <FontAwesomeIcon icon={faClipboardList} />
            </span>
            <span>My Progress</span>
          </Link>
        </aside>

        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* ── Main ── */}
        <main className="prob-main" ref={mainRef}>
          {/* Topic Header */}
          <div className="topic-header">
            <div className="topic-header-left">
              <div className="topic-icon-lg" style={{ background: activeTopic.color + '18', color: activeTopic.color }}>
                <TopicIcon iconId={activeTopic.icon} />
              </div>
              <div>
                <h1>{activeTopic.label}</h1>
                <p>{activeTopic.desc}</p>
              </div>
            </div>
            <div className="topic-stats">
              <div className="stat-pill">
                <FontAwesomeIcon icon={faListUl} className="stat-icon" style={{ color: activeTopic.color }} />
                <div>
                  <div className="stat-label">Total Problems</div>
                  <div className="stat-val">{allProblems.length}</div>
                </div>
              </div>
              <div className="stat-pill">
                <FontAwesomeIcon icon={faCheck} className="stat-icon" style={{ color: '#10b981' }} />
                <div>
                  <div className="stat-label">Solved</div>
                  <div className="stat-val" style={{ color: '#10b981' }}>{solvedCount}</div>
                </div>
              </div>
              <div className="stat-pill">
                <FontAwesomeIcon icon={faPercent} className="stat-icon" style={{ color: '#2563eb' }} />
                <div>
                  <div className="stat-label">Progress</div>
                  <div className="stat-val" style={{ color: '#2563eb' }}>
                    {allProblems.length ? Math.round((solvedCount / allProblems.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="topic-progress-bar-wrap">
            <div className="topic-progress-bar">
              <div
                className="topic-progress-fill"
                style={{
                  width: `${allProblems.length ? (solvedCount / allProblems.length) * 100 : 0}%`,
                  background: activeTopic.color
                }}
              />
            </div>
            <span>{solvedCount} / {allProblems.length} solved</span>
          </div>

          {/* Filters */}
          <div className="prob-filters">
            <div className="diff-filters">
              {['all', 'easy', 'medium', 'hard'].map(d => (
                <button
                  key={d}
                  className={`diff-filter-btn ${filterDiff === d ? 'active' : ''} diff-btn-${d}`}
                  onClick={() => setFilterDiff(d)}
                >
                  {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
            <div className="search-wrap">
              <FontAwesomeIcon icon={faSearch} />
              <input
                placeholder="Search problems..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className="clear-search" onClick={() => setSearch('')}>×</button>}
            </div>
          </div>

          {/* Two-panel layout */}
          <div className="prob-panels">
            {/* Problem Table */}
            <div className="prob-table-wrap">
              <table className="prob-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Problem</th>
                    <th>Difficulty</th>
                    <th>Links</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="empty-row">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '0.5rem' }} />
                        No problems match your filters
                      </td>
                    </tr>
                  ) : paginated.map((p, i) => (
                    <tr key={`${p.id}-${p.title}`} className={isSolved(p) ? 'row-solved' : ''}>
                      <td className="col-num">{(page - 1) * PROBLEMS_PER_PAGE + i + 1}</td>
                      <td className="col-title">
                        <span className="prob-title">{p.title}</span>
                        <span className="prob-section-label">{p.section}</span>
                      </td>
                      <td className="col-diff">
                        <DiffBadge d={p.difficulty} />
                      </td>
                      <td className="col-links">
                        <PlatformLink platform={p.platform} link={p.link} />
                      </td>
                      <td className="col-status">
                        <button
                          className={`status-btn ${isSolved(p) ? 'solved' : ''}`}
                          onClick={() => toggleSolved(p)}
                          title={isSolved(p) ? 'Mark as unsolved' : 'Mark as solved'}
                        >
                          <FontAwesomeIcon icon={isSolved(p) ? faCheckSquare : faSquare} />
                        </button>
                      </td>
                      <td className="col-note">
                        <button
                          className={`note-btn ${hasNote(p) ? 'has-note' : ''}`}
                          onClick={() => openNote(p)}
                          title="Add / view note"
                        >
                          <FontAwesomeIcon icon={faStickyNote} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                  {getPageNumbers().map((p, i) =>
                    p === '...' ? (
                      <span key={`e${i}`} className="page-ellipsis">…</span>
                    ) : (
                      <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                    )
                  )}
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                </div>
              )}
            </div>

            {/* Notes Panel */}
            <div className="notes-panel">
              <div className="notes-panel-header">
                <FontAwesomeIcon icon={faStickyNote} style={{ color: '#7c3aed' }} />
                <span>Problem Notes</span>
                {activeNote && (
                  <span className="notes-problem-name">{activeNote.title}</span>
                )}
              </div>

              {activeNote ? (
                <div className="notes-editor">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Write your approach, key insights, time complexity..."
                    rows={9}
                    autoFocus
                  />
                  <div className="notes-editor-actions">
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                      onClick={saveNote}
                    >
                      Save Note
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                      onClick={() => setActiveNote(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="notes-empty">
                  <div className="notes-empty-icon">
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                  <p>Click the <FontAwesomeIcon icon={faStickyNote} style={{ color: '#7c3aed' }} /> icon on any problem to write notes</p>
                </div>
              )}

              {/* Saved notes */}
              {Object.keys(notes).filter(k => notes[k]).length > 0 && (
                <div className="saved-notes">
                  <div className="saved-notes-title">
                    <FontAwesomeIcon icon={faBookOpen} /> Saved Notes ({Object.keys(notes).filter(k => notes[k]).length})
                  </div>
                  {Object.entries(notes).filter(([, v]) => v).map(([k, v]) => {
                    const [tid, ...pidParts] = k.split('-');
                    const pid = parseInt(pidParts.join('-'));
                    const t = TOPICS.find(t => t.id === tid);
                    const prob = t?.sections.flatMap(s => s.problems).find(p => p.id === pid);
                    return prob ? (
                      <div className="saved-note-item" key={k}>
                        <strong>{prob.title}</strong>
                        <p>{v.substring(0, 90)}{v.length > 90 ? '…' : ''}</p>
                        <button onClick={() => { setActiveNote({ key: k, title: prob.title }); setNoteText(v); }}>
                          Edit
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Progress overview */}
              <div className="quick-stats">
                <div className="qs-title">
                  <FontAwesomeIcon icon={faPercent} /> Progress Overview
                </div>
                {TOPICS.map(t => {
                  const total = t.sections.flatMap(s => s.problems).length;
                  const done = t.sections.flatMap(s => s.problems).filter(p => solved[`${t.id}-${p.id}`]).length;
                  const pct = total ? Math.round((done / total) * 100) : 0;
                  return (
                    <div key={t.id} className="qs-item" onClick={() => handleTopicChange(t)}>
                      <div className="qs-row">
                        <span style={{ color: t.color }}>
                          <TopicIcon iconId={t.icon} style={{ marginRight: '0.35rem', fontSize: '0.75rem' }} />
                          {t.label}
                        </span>
                        <span className="qs-count">{done}/{total}</span>
                      </div>
                      <div className="qs-bar">
                        <div className="qs-fill" style={{ width: `${pct}%`, background: t.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Problems;
