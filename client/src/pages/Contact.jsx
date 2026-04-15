import React, { useState } from "react";
import "../styles/contact.css";
import img1 from "../assets/images/img1.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully ✅");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send ❌");
      }
    } catch (error) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="contact-page">
      {/* BANNER */}
      <section
        className="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(20,20,20,0.7), rgba(20,20,20,0.7)), url(${img1})`,
        }}
      >
        <div className="banner-content">
          <h1>Contact us</h1>
          <p>
            Feel free to contact us with any questions or concerns. Reach us
            anytime for quick support.
          </p>
        </div>
      </section>
      {/* OFFICE + MAP */}{" "}
      <section className="office-section">
        {" "}
        <div className="office-left">
          {" "}
          <h2>Our office</h2>{" "}
          <p>
            {" "}
            Building No. 14 B, PATWAR BAGAN LANE,
            <br /> SEALDAH, Kolkata,
            <br /> West Bengal 700009{" "}
          </p>{" "}
          <h4>Hours</h4>{" "}
          <p>
            Monday - Friday
            <br />
            9am - 6pm
          </p>{" "}
          <h4>Contacts</h4>{" "}
          <p>
            +91 983 077 0400
            <br />
            nswplsaha@yahoo.com
          </p>{" "}
        </div>{" "}
        <div className="office-map">
          {" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4370.078943523779!2d88.37186729999999!3d22.5751359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770886ac645f%3A0xdb9dc4fb09fdfeb1!2s14%2Fb%2C%20Patwar%20Bagan%20Ln%2C%20Baithakkhana%2C%20Kolkata%2C%20West%20Bengal%20700009!5e1!3m2!1sen!2sin!4v1775720407409!5m2!1sen!2sin"
            loading="lazy"
            title="map"
          ></iframe>{" "}
        </div>{" "}
      </section>
      {/* FORM */}
      <section className="form-section">
        <h2>Get in touch</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
      {/* TESTIMONIAL */}{" "}
      <section className="testimonial">
        {" "}
        <h2>Here's what our customers say</h2>{" "}
        <div className="testimonial-grid">
          {" "}
          <div>
            {" "}
            <p>
              {" "}
              ”Every day, they strive to improve their service to the clients by
              developing the right blend of technology and creativity to make
              sure every job done is done as efficiently as possible.”{" "}
            </p>{" "}
            <span>- Clarice Turner</span>{" "}
          </div>{" "}
          <div>
            {" "}
            <p>
              {" "}
              ”Every day, they strive to improve their service to the clients by
              developing the right blend of technology and creativity to make
              sure every job done is done as efficiently as possible.”{" "}
            </p>{" "}
            <span>- Brian Moten</span>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </div>
  );
};

export default Contact;
