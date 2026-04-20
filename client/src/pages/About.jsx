import '../styles/about.css';
import { useEffect, useRef } from 'react';
import { FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import images
import adhirImg from '../assets/images/management/adhir saha.jpg.jpeg';
import kamalImg from '../assets/images/management/kamal saha.jpeg';
import antaraImg from '../assets/images/management/antara saha.jpeg';
import chiranjitImg from '../assets/images/management/CHIRANJIT.png';
import bappaImg from '../assets/images/management/bappa.jpeg';
import ayanImg from '../assets/images/management/ayan saha.jpeg';
import joytiImg from '../assets/images/management/joyti.webp';
import noImg from '../assets/images/management/noImage.png';

const About = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const directors = [
    {
      name: "Adhir Kumar Saha",
      role: "Managing Director",
      phone: "+91 70441 89887",
      image: adhirImg,
      badge: "MD",
      description: "With decades of industry expertise, Adhir Kumar Saha leads Netai Stationery with vision and integrity."
    },
    {
      name: "Kamal Kumar Saha",
      role: "Director",
      phone: "+91 98307 70400",
      image: kamalImg,
      badge: "Director",
      description: "Kamal Kumar Saha brings extensive operational expertise with focus on quality control and production efficiency."
    },
    {
      name: "Kanan Bala Saha",
      role: "Director",
      phone: "+91 76058 18214",
      image: noImg,
      badge: "Director",
      description: "Kanan Bala Saha plays a pivotal role in financial planning and business development."
    },
    {
      name: "Antara Saha",
      role: "Director",
      phone: "+91 70448 11122",
      image: antaraImg,
      badge: "Director",
      description: "Antara Saha brings fresh perspectives with focus on consumer trends and market insights."
    }
  ];

  const managementTeam = [
    { name: "Chisenth Dey", role: "Manager", image: chiranjitImg, description: "Oversees daily operations and ensures seamless coordination." },
    { name: "Bappaditya Maity", role: "Senior Accountant", image: bappaImg, description: "Manages financial operations with accuracy and compliance." },
    { name: "Ayan Saha", role: "Accountant", image: ayanImg, description: "Handles day-to-day accounting and financial record maintenance." },
    { name: "Subhrojoti Saha", role: "Digital Support", image: joytiImg, description: "Manages digital presence and technical support." }
  ];

  const workers = [
    { name: "MD Parwez", role: "Production Supervisor" },
    { name: "MD Halim", role: "Senior Production Operator" },
    { name: "Raju Gazi", role: "Production Operator" },
    { name: "Safir Gazi", role: "Production Operator" }
  ];

  const stats = [
    { value: "15+", label: "Years Excellence" },
    { value: "500+", label: "Schools Served" },
    { value: "6+", label: "States Presence" },
    { value: "100%", label: "Eco-Friendly" }
  ];

  const values = [
    { icon: "⭐", title: "Quality", desc: "Highest quality products exceeding expectations." },
    { icon: "🤝", title: "Integrity", desc: "Honesty and transparency in all dealings." },
    { icon: "💡", title: "Innovation", desc: "Continuously improving products and services." },
    { icon: "🎯", title: "Customer Focus", desc: "Meeting unique needs of each business." }
  ];

  const journey = [
    { year: "2009", title: "Foundation", desc: "Established in Kolkata" },
    { year: "2013", title: "Expansion", desc: "Serving schools across West Bengal" },
    { year: "2017", title: "GST Registration", desc: "Formalized operations" },
    { year: "2020", title: "Production Unit", desc: "New facility in New Town" },
    { year: "Present", title: "Pan India", desc: "500+ schools nationwide" }
  ];

  const primaryContacts = directors.filter(d =>
    d.name === "Adhir Kumar Saha" || d.name === "Kamal Kumar Saha"
  );

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span style={{color: "#000000"}} className="hero-badge">Since 2009</span>
          <h1 style={{color: "#000000"}}>Crafting Quality Stationery</h1>
          <p style={{color: "#000000"}}>Premium notebooks and custom solutions for education and business</p>
          <div className="hero-stats">
            <span style={{color: "#000000"}}>15+ Years Excellence</span>
            <span className="dot">•</span>
            <span style={{color: "#000000"}}>500+ Schools Served</span>
            <span className="dot">•</span>
            <span style={{color: "#000000"}}>6+ States Presence</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Discover Our Story</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Do</span>
            <h2>Premium Stationery & Packaging Solutions</h2>
          </div>
          <div className="about-content">
            <p className="lead-text">
              Netai Stationery Works Private Limited, based in Kolkata, delivers premium-quality products across
              <strong style={{color: "#E09C27"}}> Education, Corporate, Retail, Hospitality, and Food & Beverages</strong>.
            </p>
            <p>With over 15 years of market presence across West Bengal, Odisha, Assam, Tripura, Bihar, and Jharkhand, we supply personalized notebooks to over 500 schools.</p>
            <p>We are deeply invested in sustainable production using eco-friendly materials to protect the planet for future generations.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section animate-on-scroll">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className='start-number-container'>
                  <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="about-section animate-on-scroll">
        <div className="container">
          <div className="details-grid">
            <div className="detail-card">
              <div className="card-header">
                <span className="card-icon">📋</span>
                <h3>GST Registration</h3>
              </div>
              <div className="gst-number">
                <span className="label">GSTIN</span>
                <span className="value">19AACCN1563G1ZI</span>
              </div>
              <div className="detail-item"><span className="label">Legal Name</span><span className="value">NETAI STATIONERY WORKS PRIVATE LIMITED</span></div>
              <div className="detail-item"><span className="label">Trade Name</span><span className="value">NETAI STATIONERY WORKS PVT. LTD.</span></div>
              <div className="detail-item"><span className="label">Constitution</span><span className="value">Private Limited Company</span></div>
              <div className="detail-item"><span className="label">Date of Liability</span><span className="value">01/07/2017</span></div>
              <div className="detail-item"><span className="label">Registration Type</span><span className="value">Regular</span></div>
              <div className="detail-item"><span className="label">Jurisdiction</span><span className="value">RANGE-VI, Kolkata</span></div>
            </div>
            <div className="detail-card">
              <div className="card-header">
                <span className="card-icon">🏭</span>
                <h3>Production Center</h3>
              </div>
              <div className="address-content">
                <p className="address-title">Principal Place of Business</p>
                <p><FaMapMarkerAlt className="inline-icon" /> 14 B, Patwar Bagan Lane, Sealdah, Kolkata - 700009</p>
                <div className="contact-info">
                  <p><FaEnvelope className="inline-icon" /> nswplsaha@yahoo.com</p>
                  <p><FaPhone className="inline-icon" /> +91 70441 89887 | +91 98307 70400</p>
                </div>
              </div>
              <div className="address-content" style={{ marginTop: '24px' }}>
                <p className="address-title">Additional Location</p>
                <p>Gr Floor, A-339, Hanapara Krishnapur, Thakdari Road, Kestopur, New Town - 700102</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section bg-light animate-on-scroll">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>We provide high-quality stationery and packaging solutions that help businesses enhance their operations and brand image.</p>
              <ul className="check-list">
                <li><FaCheckCircle /> Premium quality materials</li>
                <li><FaCheckCircle /> Sustainable production</li>
                <li><FaCheckCircle /> Customer-first approach</li>
              </ul>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To be the most trusted B2B stationery provider Pan India, known for quality, reliability, and customer-centric approach.</p>
              <ul className="check-list">
                <li><FaCheckCircle /> Pan India leadership</li>
                <li><FaCheckCircle /> Innovation driven</li>
                <li><FaCheckCircle /> Trusted partner</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="about-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Leadership</span>
            <h2>Meet the Directors</h2>
            <p>Experienced professionals guiding our company</p>
          </div>
          <div className="team-grid">
            {directors.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <span className="member-badge">{member.badge}</span>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-phone">{member.phone}</p>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="about-section bg-light animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Team</span>
            <h2>Management Team</h2>
            <p>Dedicated professionals ensuring excellence</p>
          </div>
          <div className="team-grid">
            {managementTeam.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="about-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2>Chart of Growth & Excellence</h2>
          </div>
          <div className="timeline">
            {journey.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section bg-light animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What Drives Us</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production */}
      <section className="about-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Production Unit</span>
            <h2>Our Skilled Workforce</h2>
          </div>
          <div className="workers-grid">
            {workers.map((worker, index) => (
              <div className="worker-card" key={index}>
                <div className="worker-icon">👷</div>
                <h5>{worker.name}</h5>
                <span className="worker-role">{worker.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section animate-on-scroll">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-header">
                <span className="contact-icon">📞</span>
                <h3>Primary Contact</h3>
              </div>
              <div className="contact-body">
                {primaryContacts.map((director, index) => (
                  <div className="contact-item" key={index}>
                    <span className="contact-label">{director.role}</span>
                    <span className="contact-name">{director.name}</span>
                    <a href={`tel:${director.phone.replace(/\s/g, '')}`} className="contact-value">{director.phone}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-header">
                <span className="contact-icon">✉️</span>
                <h3>Email & Hours</h3>
              </div>
              <div className="contact-body">
                <div className="contact-item highlight">
                  <span className="contact-label">Official Email</span>
                  <a href="mailto:nswplsaha@yahoo.com" className="contact-value">nswplsaha@yahoo.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Business Hours</span>
                  <span className="contact-value">Monday - Saturday</span>
                  <span className="contact-sub">9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-header">
                <span className="contact-icon">📍</span>
                <h3>Our Locations</h3>
              </div>
              <div className="contact-body">
                <div className="contact-item">
                  <span className="contact-label">Principal Office</span>
                  <span className="contact-value">14 B, Patwar Bagan Lane</span>
                  <span className="contact-sub">Sealdah, Kolkata - 700009</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Production Unit</span>
                  <span className="contact-value">A-339, Hanapara Krishnapur</span>
                  <span className="contact-sub">Thakdari Road, Kestopur, New Town - 700102</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-actions">
            <a href="tel:+919830770400" className="action-btn">
              <span className="btn-icon">📞</span>
              <span>Call Now</span>
            </a>
            <Link to="/contact" className="action-btn">
              <span className="btn-icon">✉️</span>
              <span>Contact Us</span>
            </Link>
            <a href="https://wa.me/919830770400?text=Hi%2C%20I%20would%20like%20to%20talk%20with%20you" target="_blank" rel="noopener noreferrer" className="action-btn whatsapp">
              <span className="btn-icon">💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;