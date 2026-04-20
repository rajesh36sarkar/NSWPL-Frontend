import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight, FaStar, FaQuoteLeft, FaBuilding, FaUsers, FaAward, FaTruck } from "react-icons/fa";
import { MdDesignServices, MdInventory, MdPrint, MdFactory, MdLocalShipping, MdVerified } from "react-icons/md";
import "../styles/services.css";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  const services = [
    {
      icon: <MdDesignServices />,
      title: "Custom Stationery Design",
      description: "Tailored stationery solutions that reflect your brand identity and meet your specific requirements",
      features: [
        "Corporate notebooks and diaries",
        "Customized office supplies",
        "Branded stationery kits",
        "Premium writing instruments",
        "Customized filing solutions"
      ],
      color: "#E09C27"
    },
    {
      icon: <MdInventory />,
      title: "Packaging Solutions",
      description: "Innovative and eco-friendly packaging designs that enhance product presentation and protection",
      features: [
        "Custom product packaging",
        "Eco-friendly packaging materials",
        "Gift and promotional packaging",
        "Retail display solutions",
        "Shipping and logistics packaging"
      ],
      color: "#E5CD2F"
    },
    {
      icon: <MdPrint />,
      title: "Commercial Printing",
      description: "High-quality printing services for marketing materials, publications, and corporate documents",
      features: [
        "Marketing collateral (brochures, flyers)",
        "Business cards and letterheads",
        "Posters and banners",
        "Corporate reports and publications",
        "Customized calendars and planners"
      ],
      color: "#E09C27"
    },
    {
      icon: <MdFactory />,
      title: "Bulk Manufacturing",
      description: "Large-scale production capabilities to meet high-volume requirements with consistent quality",
      features: [
        "Mass production of notebooks",
        "Bulk order processing",
        "Consistent quality control",
        "Competitive pricing",
        "Timely delivery assurance"
      ],
      color: "#E5CD2F"
    },
    {
      icon: <MdLocalShipping />,
      title: "Supply Chain Management",
      description: "Efficient inventory management and distribution solutions to streamline your operations",
      features: [
        "Inventory optimization",
        "Warehousing solutions",
        "Distribution network",
        "Order fulfillment",
        "Logistics coordination"
      ],
      color: "#E09C27"
    },
    {
      icon: <MdVerified />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes to ensure every product meets our high standards",
      features: [
        "Multi-stage inspection",
        "Material quality checks",
        "Production monitoring",
        "Final product testing",
        "Quality certification"
      ],
      color: "#E5CD2F"
    }
  ];

  const processSteps = [
    { icon: "💬", title: "Consultation", description: "We begin by understanding your requirements, objectives, and brand guidelines." },
    { icon: "🎨", title: "Design & Planning", description: "Our team creates designs and develops a detailed plan for production." },
    { icon: "🏭", title: "Production", description: "We manufacture your products with rigorous quality control at every stage." },
    { icon: "🚚", title: "Delivery", description: "We ensure timely delivery and follow up to ensure your complete satisfaction." }
  ];

  const testimonials = [
    { name: "Rajesh Sharma", company: "Kolkata Publishers", text: "NSWPL has been our trusted partner for over 5 years. Their quality and service are unmatched.", rating: 5 },
    { name: "Priya Banerjee", company: "Creative Minds", text: "The custom notebooks they designed for our corporate gifting were absolutely stunning. Highly recommended!", rating: 5 },
    { name: "Amit Mukherjee", company: "Eastern Enterprises", text: "Professional service, timely delivery, and excellent product quality. They truly understand customer needs.", rating: 5 }
  ];

  const stats = [
    { icon: <FaBuilding />, value: "25+", label: "Years Experience" },
    { icon: <FaUsers />, value: "500+", label: "Happy Clients" },
    { icon: <FaAward />, value: "1000+", label: "Products Delivered" },
    { icon: <FaTruck />, value: "50+", label: "Cities Served" }
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

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span style={{color:"#1a1a2e"}} className="hero-badge">Our Services</span>
          <h1>What We Offer</h1>
          <p style={{color: "#16213e"}} >From custom design to bulk manufacturing, we provide end-to-end solutions for all your stationery and packaging needs.</p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Do</span>
            <h2>Comprehensive Stationery Solutions</h2>
            <p>From design to delivery, we handle every aspect of stationery manufacturing</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                style={{ '--accent-color': service.color }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i}><FaCheckCircle /> {feature}</li>
                  ))}
                </ul>
                <button className="service-link">
                  Learn More <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Packaging Section */}
      <section className="luxury-section" id="luxury">
        <div className="container">
          <div className="luxury-wrapper">
            <div className="luxury-content">
              <span className="section-badge">Premium</span>
              <h2>Custom Packaging for Luxury Brands</h2>
              <p>We specialize in custom packaging solutions tailored for luxury brands, combining elegance, durability, and functionality.</p>
              <ul className="luxury-features">
                <li><FaCheckCircle /> Premium box and bag designs</li>
                <li><FaCheckCircle /> Sustainable & eco-friendly packaging options</li>
                <li><FaCheckCircle /> Customized inserts for product protection</li>
                <li><FaCheckCircle /> Branded ribbons, seals, and tags</li>
                <li><FaCheckCircle /> Unique shapes and structural designs</li>
              </ul>
              <Link to="/contact" className="luxury-cta">
                Get a Quote <FaArrowRight />
              </Link>
            </div>
            <div className="luxury-image">
              <div className="image-grid">
                <div className="grid-item large">
                </div>
                <div className="grid-item small"></div>
                <div className="grid-item medium"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" id="process">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How We Work</span>
            <h2>Our Process</h2>
            <p>We follow a structured approach to ensure that every project is completed to the highest standards</p>
          </div>

          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">0{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < processSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST & Company Details Section */}
      <section className="company-section" id="company">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Company Information</span>
            <h2>Registered & Verified Business</h2>
            <p>Fully compliant with Government of India regulations</p>
          </div>

          <div className="company-grid">
            <div className="company-card gst-card">
              <div className="card-header">
                <span className="card-icon">📄</span>
                <h3>GST Registration</h3>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">GSTIN:</span>
                  <span className="value highlight">19AACCN1563G1ZI</span>
                </div>
                <div className="info-row">
                  <span className="label">Legal Name:</span>
                  <span className="value">NETAI STATIONERY WORKS PRIVATE LIMITED</span>
                </div>
                <div className="info-row">
                  <span className="label">Trade Name:</span>
                  <span className="value">NETAI STATIONERY WORKS PVT. LTD.</span>
                </div>
                <div className="info-row">
                  <span className="label">Constitution:</span>
                  <span className="value">Private Limited Company</span>
                </div>
                <div className="info-row">
                  <span className="label">Date of Liability:</span>
                  <span className="value">01/07/2017</span>
                </div>
                <div className="info-row">
                  <span className="label">Validity:</span>
                  <span className="value">From 01/07/2017 to Not Applicable</span>
                </div>
              </div>
            </div>

            <div className="company-card address-card">
              <div className="card-header">
                <span className="card-icon">📍</span>
                <h3>Principal Place of Business</h3>
              </div>
              <div className="card-body">
                <p className="address">
                  14 B, PATWAR BAGAN LANE<br />
                  SEALDAH, Kolkata<br />
                  West Bengal - 700009
                </p>
                <div className="info-row">
                  <span className="label">Additional Location:</span>
                  <span className="value">Gr floor, A-339, HANAPARA KRISHNAPUR, Thakdari Road, Kestopur, New Town, Kolkata - 700102</span>
                </div>
              </div>
            </div>

            <div className="company-card directors-card">
              <div className="card-header">
                <span className="card-icon">👨‍💼</span>
                <h3>Directors</h3>
              </div>
              <div className="card-body">
                <div className="director-item">
                  <div className="director-avatar">AS</div>
                  <div className="director-info">
                    <h4>ADHIR KUMAR SAHA</h4>
                    <p>Director</p>
                  </div>
                </div>
                <div className="director-item">
                  <div className="director-avatar">KS</div>
                  <div className="director-info">
                    <h4>KAMAL KUMAR SAHA</h4>
                    <p>Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="company-card authority-card">
              <div className="card-header">
                <span className="card-icon">✍️</span>
                <h3>Authority Details</h3>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">Mridul Kanti Roy</span>
                </div>
                <div className="info-row">
                  <span className="label">Designation:</span>
                  <span className="value">Superintendent</span>
                </div>
                <div className="info-row">
                  <span className="label">Jurisdiction:</span>
                  <span className="value">RANGE-VI</span>
                </div>
                <div className="info-row">
                  <span className="label">Certificate Issue:</span>
                  <span className="value">03/12/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Hear from businesses who trust us with their stationery needs</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < testimonial.rating ? "filled" : ""} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-wrapper">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss your stationery requirements and create something exceptional together.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-primary">
                Contact Us <FaArrowRight />
              </Link>
              <Link to="/products" className="cta-secondary">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;