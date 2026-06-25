import React from 'react';
import './Explore.css';

const services = [
  { label: 'Interview As A Service', img: 'https://images.ctfassets.net/pdf29us7flmy/nFQzlQRFpWdpAaVgN1bUV/7b4dc7d3b728810c8194555f759e8e3d/motivational_interview_GettyImages-1142966869-red_.jpg' },
  { label: 'Resume As A Service', img: 'https://tse1.mm.bing.net/th?id=OIP.nbYS83N4vDprKLDy69syrAHaD8&pid=Api&P=0&h=180' },
  { label: 'Assessment As A Service', img: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/2147486453/images/X2vEbAe5TnWgiMaFjYo2_Cadre_Blog_The_Interview.jpg' },
  { label: 'Training Programs', img: 'https://www.betterup.com/hs-fs/hubfs/successful-job-interview.jpg?width=2892&name=successful-job-interview.jpg' },
  { label: 'Practice Questions', img: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { label: 'Expert Panel', img: 'https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const Explore = () => (
  <div className="explore-page page-enter">

    {/* Banner */}
    <div className="explore-banner">
      <span className="banner-chip">New: Try our Talent Assessment Platform</span>
      <h1>We Simplify Your Hiring</h1>
      <p>Our services make your recruitment process effortless and efficient.</p>
    </div>

    {/* Services grid */}
    <div className="container">
      <div className="services-grid">
        {services.map(s => (
          <div className="service-card" key={s.label}>
            <img src={s.img} alt={s.label} />
            <div className="service-overlay">
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* About section */}
      <div className="about-section">
        <h2>Welcome to <span className="highlight">CodeHive</span></h2>
        <div className="about-body">
          <p>Your one-stop platform that bridges the gap between interviewees and interviewers. Whether you're a job seeker aiming to showcase your skills or a professional interviewer looking to share expertise, our platform streamlines the process by connecting individuals in a user-friendly, efficient, and secure environment.</p>
          <p>Interviewees can practice and refine their interview skills through mock sessions with experienced professionals, while interviewers can offer their expertise, earn rewards, and contribute to the growth of upcoming talent.</p>
          <p>With features like real-time scheduling, feedback systems, and industry-specific matching, CodeHive empowers users to prepare, connect, and grow like never before.</p>
          <div className="mission-box">
            <h3>Our Mission</h3>
            <p>We are passionate about creating a platform that fosters professional growth and opportunity. Our mission is to revolutionize the way interview preparation and talent discovery happen by connecting aspiring individuals with seasoned professionals.</p>
            <p>Join us in shaping careers and redefining the interview experience!</p>
          </div>
        </div>
      </div>

      {/* Stats images */}
      <div className="explore-stats-imgs">
        <img src="https://interviewdesk.ai/wp-content/uploads/2024/04/Achievements-of-InterviewDesk.webp" alt="Achievements" className="stats-img" />
        <img src="https://interviewdesk.ai/wp-content/uploads/2024/05/Interview-as-a-service-in-action.webp" alt="Interview in action" className="stats-img" />
        <img src="https://interviewdesk.ai/wp-content/uploads/2024/05/Resume-as-a-service-in-action.webp" alt="Resume in action" className="stats-img" />
      </div>
    </div>
  </div>
);

export default Explore;
