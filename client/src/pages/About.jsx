import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>Netai Stationery Works Private Limited</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h2>Who We Are</h2>
            <p>
              Welcome to <strong>Netai Stationery Works Private Limited</strong>. 
              Since our inception, we have established ourselves as a vigorous key player in the 
              B2B stationery market. We specialize in delivering premium-quality products and 
              customized stationery solutions across key sectors such as Education, Corporate, 
              Retail, and Hospitality.
            </p>
            <p>
              With years of market presence, we have built a strong footprint across India. 
              We believe quality education and professional efficiency start with the right tools, 
              which is why we are deeply invested in sustainable production practices.
            </p>
          </div>
          <div className="intro-image">
            {/* Placeholder for an office or factory image */}
            <img 
              src="https://via.placeholder.com/500x350?text=Stationery+Production" 
              alt="Netai Stationery Factory" 
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>15+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Schools Served</p>
        </div>
        <div className="stat-item">
          <h3>100%</h3>
          <p>Eco-Friendly</p>
        </div>
        <div className="stat-item">
          <h3>PAN India</h3>
          <p>Presence</p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mv-section">
        <div className="mv-card">
          <h3>Our Mission</h3>
          <p>
            To provide high-quality stationery, packaging, and printing solutions that help 
            businesses enhance their operations and brand image. We are committed to excellence 
            in every aspect of our business, from manufacturing to customer service.
          </p>
        </div>
        <div className="mv-card">
          <h3>Our Vision</h3>
          <p>
            To be the most trusted and innovative B2B stationery and packaging solutions 
            provider in India, known for our quality, reliability, and customer-centric approach.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h4>Quality</h4>
            <p>We deliver products that meet or exceed customer expectations.</p>
          </div>
          <div className="value-item">
            <h4>Integrity</h4>
            <p>We conduct our business with honesty, transparency, and ethics.</p>
          </div>
          <div className="value-item">
            <h4>Innovation</h4>
            <p>We continuously seek new ways to improve our products.</p>
          </div>
          <div className="value-item">
            <h4>Customer Focus</h4>
            <p>We prioritize understanding the unique needs of every client.</p>
          </div>
        </div>
      </section>

      {/* Footer (Simple version for context) */}
      <footer className="simple-footer">
        <p>&copy; {new Date().getFullYear()} Netai Stationery Works Private Limited. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
