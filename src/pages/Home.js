import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faComments, faTrophy, faStar, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const courses = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Python.svg',
    title: 'Learn Python',
    desc: 'Get hands-on practice and nail down the fundamentals of Python.',
    level: 'Beginner', learners: '160k+', rating: '4.7'
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
    title: 'Learn Java',
    desc: 'Get practical experience coding in Java with interactive exercises.',
    level: 'Beginner', learners: '108k+', rating: '4.7'
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
    title: 'Learn C++',
    desc: 'Master the basic syntax of C++ through hands-on practice.',
    level: 'Beginner', learners: '60k+', rating: '4.7'
  },
];

const webDevCards = [
  { img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg', title: 'HTML', desc: 'Learn the basics of HTML, the building block of web pages.', link: '/learn/html', modules: 15, color: '#e34c26' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg', title: 'CSS', desc: 'Master CSS for styling and designing beautiful web pages.', link: '/learn/css', modules: 12, color: '#264de4' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', title: 'JavaScript', desc: 'Dive into JavaScript to create interactive web applications.', link: '/learn/javascript', modules: 10, color: '#f7df1e' },
];

const Home = () => (
  <div className="home page-enter">
    {/* Hero */}
    <section className="hero">
      <div className="hero-content container">
        <div className="hero-badge">Trusted by 500k+ developers</div>
        <h1>Welcome to <span className="hero-highlight">CodeHive</span></h1>
        <p>Your ultimate destination to practice coding, prepare for interviews, and master programming skills. Join a hive of learners building their future.</p>
        <div className="hero-actions">
          <a href="#topics" className="btn btn-primary">Get Started <FontAwesomeIcon icon={faArrowRight} /></a>
          <Link to="/explore" className="btn btn-outline">Explore Platform</Link>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>500k+</strong><span>Learners</span></div>
          <div className="stat"><strong>2,000+</strong><span>Problems</span></div>
          <div className="stat"><strong>50+</strong><span>Courses</span></div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2>What We Offer</h2>
          <p>Everything you need to go from beginner to interview-ready.</p>
        </div>
        <div className="feature-grid">
          {[
            { icon: faBook, title: 'Practice Problems', desc: 'Access a vast collection of problems across different topics and difficulty levels.', color: '#eff6ff' },
            { icon: faComments, title: 'Interview Prep', desc: 'Prepare for your next technical interview with curated questions and mock interviews.', color: '#f0fdf4' },
            { icon: faTrophy, title: 'Contests', desc: 'Participate in live coding contests and improve your problem-solving skills in real-time.', color: '#fffbeb' },
          ].map(f => (
            <div className="feature-card" key={f.title} style={{ '--card-bg': f.color }}>
              <div className="feature-icon"><FontAwesomeIcon icon={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Problem Categories */}
    <section className="topics" id="topics">
      <div className="container">
        <div className="section-header">
          <h2>Explore Topics</h2>
          <p>Dive into the most in-demand algorithmic topics.</p>
        </div>
        <div className="topics-grid">
          {[
            { icon: '▦', label: 'Arrays', color: '#2563eb', id: 'arrays', count: 40 },
            { icon: 'Aa', label: 'Strings', color: '#7c3aed', id: 'strings', count: 21 },
            { icon: '⬡', label: 'Graphs', color: '#059669', id: 'graphs', count: 30 },
            { icon: '◈', label: 'Dynamic Programming', color: '#7c3aed', id: 'dynamic-programming', count: 41 },
            { icon: '↻', label: 'Recursion', color: '#dc2626', id: 'recursion', count: 24 },
            { icon: '↔', label: 'Linked List', color: '#0891b2', id: 'linked-list', count: 23 },
            { icon: '☰', label: 'Stacks & Queues', color: '#059669', id: 'stacks-queues', count: 17 },
            { icon: '⚡', label: 'Greedy', color: '#d97706', id: 'greedy', count: 15 },
          ].map(t => (
            <Link to={`/problems/${t.id}`} className="topic-card" key={t.label} style={{ textDecoration: 'none' }}>
              <div className="topic-icon-wrap" style={{ background: t.color + '18', color: t.color }}>
                <span className="topic-emoji">{t.icon}</span>
              </div>
              <h4>{t.label}</h4>
              <p className="topic-count">{t.count} problems</p>
              <span className="topic-link">Explore <FontAwesomeIcon icon={faArrowRight} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Courses */}
    <section className="courses">
      <div className="container">
        <div className="section-header">
          <h2>Learn to Code</h2>
          <p>Pick a language and start your journey today.</p>
        </div>
        <div className="courses-list">
          {courses.map(c => (
            <div className="course-card" key={c.title}>
              <img src={c.img} alt={c.title} className="course-icon" />
              <div className="course-info">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="level-badge">{c.level}</span>
                <div className="course-stats">
                  <span>{c.learners} learners</span>
                  <span className="rating"><FontAwesomeIcon icon={faStar} /> {c.rating}</span>
                </div>
              </div>
              <button className="btn btn-outline">View Course</button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Web Dev */}
    <section className="webdev">
      <div className="container">
        <div className="section-header">
          <h2>Web Development</h2>
          <p>Build the web from scratch with our structured paths.</p>
        </div>
        <div className="webdev-grid">
          {webDevCards.map(w => (
            <div className="webdev-card" key={w.title} style={{ borderTop: `4px solid ${w.color}` }}>
              <img src={w.img} alt={w.title} className="webdev-icon" />
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="webdev-meta">
                <span className="webdev-modules">{w.modules} modules</span>
              </div>
              <Link to={w.link} className="btn btn-outline btn-sm">
                Start Learning <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
        </div>
        <div className="testimonial-grid">
          {[
            { text: '"CodeHive helped me land my dream job. The problems and interview prep resources are top-notch!"', name: 'Jane Doe', role: 'Software Engineer @ Google' },
            { text: '"I love the contests! They are challenging and a great way to improve my coding skills."', name: 'John Smith', role: 'Backend Developer' },
          ].map(t => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">{'★'.repeat(5)}</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
