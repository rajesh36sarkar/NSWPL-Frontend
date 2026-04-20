import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaCheckCircle, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { makeCall, PHONE_NUMBERS } from "../utils/call";
import { openWhatsApp, WHATSAPP_NUMBERS, DEFAULT_MESSAGE } from "../utils/whatsapp";
import { openEmailClient, EMAIL_ADDRESSES, generalInquiry } from "../utils/email";
import "../styles/contact.css";

// Import Director Images
import AdhirSaha from '../assets/images/management/adhir saha.jpg.jpeg';
import KamalSaha from '../assets/images/management/kamal saha.jpeg';
import AntaraSaha from '../assets/images/management/antara saha.jpeg';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  const directors = [
    { 
      name: "Adhir Kumar Saha", 
      role: "Managing Director", 
      phone: "7044189887", 
      image: AdhirSaha, 
      rawPhone: "917044189887" 
    },
    { 
      name: "Kamal Kumar Saha", 
      role: "Director", 
      phone: "9830770400", 
      image: KamalSaha, 
      rawPhone: "919830770400" 
    },
    { 
      name: "Kanan Bala Saha", 
      role: "Director", 
      phone: "7605818214", 
      image: null, // No image available - will show initials
      rawPhone: "917605818214" 
    },
    { 
      name: "Antara Saha", 
      role: "Director", 
      phone: "7044811122", 
      image: AntaraSaha, 
      rawPhone: "917044811122" 
    },
  ];

  // Helper function to get initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const contactInfo = [
    { 
      icon: <FaPhone />, 
      title: "Call Us", 
      content: "+91 983 077 0400", 
      sub: "Monday - Friday, 9am - 6pm",
      action: () => makeCall(PHONE_NUMBERS.primary),
      linkType: "call"
    },
    { 
      icon: <FaEnvelope />, 
      title: "Email Us", 
      content: "nswplsaha@yahoo.com", 
      sub: "We'll respond within 24 hours",
      action: () => generalInquiry(),
      linkType: "email"
    },
    { 
      icon: <FaWhatsapp />, 
      title: "WhatsApp", 
      content: "+91 983 077 0400", 
      sub: "Quick chat support",
      action: () => openWhatsApp(WHATSAPP_NUMBERS.primary, DEFAULT_MESSAGE),
      linkType: "whatsapp"
    },
    { 
      icon: <FaClock />, 
      title: "Business Hours", 
      content: "Mon - Fri: 9:00 AM - 6:00 PM", 
      sub: "Sat: 10:00 AM - 4:00 PM",
      action: null,
      linkType: null
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      setLoading(true);

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          firstName: "", lastName: "", email: "", phone: "", subject: "", message: "",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleContactAction = (info) => {
    if (info.action) {
      info.action();
    }
  };

  const handleDirectorCall = (e, director) => {
    e.preventDefault();
    makeCall(director.rawPhone);
  };

  const handleDirectorWhatsApp = (e, director) => {
    e.preventDefault();
    openWhatsApp(director.rawPhone, `Hi ${director.name}, I would like to talk with you.`);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Get In Touch</span>
          <h1>Let's Create Something Amazing Together</h1>
          <p>Have questions about our stationery products or services? We're here to help you bring your ideas to life.</p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section" id="contact-info">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className={`info-card ${info.linkType ? 'clickable' : ''}`}
                onClick={() => handleContactAction(info)}
              >
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="info-main">{info.content}</p>
                <p className="info-sub">{info.sub}</p>
                {info.linkType && (
                  <span className="info-action">
                    {info.linkType === 'call' && '📞 Tap to call'}
                    {info.linkType === 'email' && '✉️ Tap to email'}
                    {info.linkType === 'whatsapp' && '💬 Tap to chat'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="directors-section" id="directors" ref={el => sectionRefs.current[0] = el}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Leadership</span>
            <h2>Meet Our Directors</h2>
            <p>Experienced professionals dedicated to delivering excellence</p>
          </div>

          <div className={`directors-grid ${visibleSections.directors ? 'visible' : ''}`}>
            {directors.map((director, index) => (
              <div key={index} className="director-card" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Director Avatar - Shows Image or Initials */}
                {director.image ? (
                  <div className="director-avatar-image">
                    <img src={director.image} alt={director.name} />
                  </div>
                ) : (
                  <div className="director-avatar">
                    {getInitials(director.name)}
                  </div>
                )}
                
                <h3>{director.name}</h3>
                <p className="director-role">{director.role}</p>
                
                <div className="director-actions">
                  <a 
                    href={`tel:+91${director.phone}`}
                    onClick={(e) => handleDirectorCall(e, director)}
                    className="director-phone"
                  >
                    <FaPhone /> +91 {director.phone}
                  </a>
                  
                  <button 
                    onClick={(e) => handleDirectorWhatsApp(e, director)}
                    className="director-whatsapp"
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Address Section */}
      <section className="map-section" id="map">
        <div className="container">
          <div className="map-wrapper">
            <div className="map-content">
              <span className="section-badge">Our Location</span>
              <h2>Principal Place of Business</h2>
              <div className="address-details">
                <div className="address-line">
                  <FaMapMarkerAlt />
                  <span>14 B, Patwar Bagan Lane, Sealdah</span>
                </div>
                <div className="address-line">
                  <span className="indent">Kolkata, West Bengal - 700009</span>
                </div>
                <div className="address-line">
                  <FaEnvelope />
                  <a 
                    href={`mailto:${EMAIL_ADDRESSES.primary}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openEmailClient(EMAIL_ADDRESSES.primary);
                    }}
                  >
                    {EMAIL_ADDRESSES.primary}
                  </a>
                </div>
              </div>
              <div className="additional-location">
                <h4>Additional Location</h4>
                <p>Gr Floor, A-339, Hanapara Krishnapur, Thakdari Road, Kestopur, New Town, Kolkata - 700102</p>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4370.078943523779!2d88.37186729999999!3d22.5751359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770886ac645f%3A0xdb9dc4fb09fdfeb1!2s14%2Fb%2C%20Patwar%20Bagan%20Ln%2C%20Baithakkhana%2C%20Kolkata%2C%20West%20Bengal%20700009!5e1!3m2!1sen!2sin!4v1775720407409!5m2!1sen!2sin"
                loading="lazy"
                title="NSWPL Location"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section" id="contact-form" ref={el => sectionRefs.current[1] = el}>
        <div className="container">
          <div className="form-wrapper">
            <div className="form-content">
              <span className="section-badge">Send Message</span>
              <h2>Get In Touch With Us</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <form className="premium-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                  {loading ? (
                    <span className="loading-text">Sending...</span>
                  ) : (
                    <>
                      Send Message <FaArrowRight />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="form-success">
                    <FaCheckCircle /> Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="form-error">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>

            <div className="form-decoration">
              <div className="decoration-card">
                <FaUser className="deco-icon" />
                <h4>Personalized Service</h4>
                <p>Every inquiry is handled personally by our team to ensure you get the best solution.</p>
              </div>
              <div className="decoration-card">
                <FaClock className="deco-icon" />
                <h4>Quick Response</h4>
                <p>We typically respond to all inquiries within 24 hours during business days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;