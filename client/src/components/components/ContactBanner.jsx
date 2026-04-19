import img1 from "../../assets/images/img1.jpg";

const ContactBanner = () => {
  return (
    <section
      className="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(20,20,20,0.7), rgba(20,20,20,0.7)), url(${img1})`,
      }}
    >
      <div className="banner-content">
        <h1>Contact Us</h1>
        <p>
          Feel free to contact us with any questions or concerns.
          We’re here to help you anytime.
        </p>
      </div>
    </section>
  );
};

export default ContactBanner;