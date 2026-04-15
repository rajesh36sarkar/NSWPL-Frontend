import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  // Real questions tailored for Netai Stationery Works
  const [faqs, setFaqs] = useState([
    {
      question: "What products do you manufacture and supply?",
      answer: "We manufacture a wide range of stationery items including Nandita Gold exercise notebooks, practical notebooks, drawing books, and office registers. We also supply pens, files, and general office and school stationery.",
      open: false
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer: "Yes, as a manufacturer and B2B supplier, we specialize in bulk orders for schools, corporate offices, and retailers. Please contact our sales team directly for wholesale price lists.",
      open: false
    },
    {
      question: "Where is your factory located?",
      answer: "Our registered office and works are located at 14B, Patwar Bagan Lane, Kolkata - 700009, West Bengal. We also have a presence near the Jorakhana Stoppage in Prafulla Kanan.",
      open: false
    },
    {
      question: "Can I customize notebooks with my school or company logo?",
      answer: "Yes, we offer customization services for bulk orders. We can print your school or company logo on notebook covers. Minimum order quantities apply for custom print runs.",
      open: false
    },
    {
      question: "What are your delivery options?",
      answer: "We deliver across Kolkata and West Bengal. For larger bulk orders, we can arrange logistics for delivery pan-India. Standard delivery times vary based on order size and location.",
      open: false
    },
    {
      question: "What is your return policy?",
      answer: "Goods once sold are generally not returnable. However, if you receive items in damaged condition or with manufacturing defects, please report it within 48 hours of delivery for a replacement.",
      open: false
    }
  ]);

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false; // Close others to get that accordion effect
      }
      return faq;
    }));
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our stationery products and services.</p>
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            className={`faq-item ${faq.open ? 'open' : ''}`} 
            key={index} 
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">{faq.open ? '-' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;