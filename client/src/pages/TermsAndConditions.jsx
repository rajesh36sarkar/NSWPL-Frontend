// t&c.jsx
import React from 'react';

const TermsAndConditions = () => {
  // Set the last updated date dynamically or manually
  const lastUpdated = "May 15, 2026";

  return (
    <div className="min-h-screen bg-stone-50 font-serif">
      {/* Header with Stationery Vibe */}
      <header className="border-b border-amber-200 bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-light tracking-wider text-stone-800 sm:text-5xl">
            Terms & Conditions
          </h1>
          <div className="mx-auto mt-3 h-px w-24 bg-amber-300"></div>
          <p className="mt-4 font-sans text-sm uppercase tracking-widest text-stone-500">
            The Fine Print on Our Fine Paper
          </p>
          <p className="mt-2 font-sans text-xs text-stone-400">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-md md:p-12">
          
          {/* Introduction */}
          <section className="prose prose-stone max-w-none">
            <p className="lead text-lg font-light italic text-stone-600">
              Welcome to <span className="font-medium not-italic">Paper &amp; Quill</span> ("Company", "we", "our", "us").
              These Terms govern your use of our website and the purchase of our stationery goods. 
              By accessing this site, you agree to these terms. Please read them carefully with a cup of tea.
            </p>
          </section>

          <div className="my-8 border-t border-dashed border-stone-200"></div>

          {/* 1. Online Store Terms */}
          <Section title="1. Online Store Terms" icon="📜">
            <p>
              By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence. 
              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
            </p>
            <p>
              A breach or violation of any of the Terms will result in an immediate termination of your Services.
            </p>
          </Section>

          {/* 2. Products & Custom Orders */}
          <Section title="2. Products & Custom Orders" icon="✒️">
            <p>
              Certain products (such as custom monogrammed notebooks or bespoke wedding invitations) are made to order. 
              Due to the nature of custom stationery, we cannot accept returns or exchanges on personalized items unless they arrive damaged or defective.
            </p>
            <p className="font-medium text-amber-800">
              Color Disclaimer: We have made every effort to display as accurately as possible the colors and images of our paper goods. 
              We cannot guarantee that your computer monitor's display of any color will be accurate.
            </p>
            <p>
              We reserve the right to limit the sales of our products to any person, geographic region, or jurisdiction. 
              We may exercise this right on a case-by-case basis.
            </p>
          </Section>

          {/* 3. Accuracy of Billing and Account Information */}
          <Section title="3. Billing & Account Information" icon="📋">
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, 
              per household, or per order. In the event we make a change to or cancel an order, we will attempt to notify you via the email and/or billing address 
              provided at the time the order was made.
            </p>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
            </p>
          </Section>

          {/* 4. Shipping & Delivery */}
          <Section title="4. Shipping & Delivery" icon="📮">
            <p>
              Risk of loss and title for items purchased from Paper &amp; Quill pass to you upon delivery of the items to the carrier. 
              You are responsible for filing any claims with carriers for damaged and/or lost shipments.
            </p>
            <p>
              Delivery times provided are estimates only. We are not responsible for delays caused by weather, postal strikes, or 
              the general unpredictability of the mail system.
            </p>
          </Section>

          {/* 5. Returns, Refunds, and Exchanges */}
          <Section title="5. Returns & Exchanges" icon="🔄">
            <p>
              <strong>Standard Stationery:</strong> Unused, unopened items in original packaging may be returned within 30 days of delivery for store credit or a refund to the original payment method (less shipping costs).
            </p>
            <p>
              <strong>Sale Items:</strong> Only regular priced items may be refunded. Sale items are final sale.
            </p>
            <p>
              <strong>Damaged Goods:</strong> If you receive a damaged notebook or crushed pen box, please email us at hello@paperandquill.com within 48 hours of delivery with photo evidence. We will arrange a replacement.
            </p>
          </Section>

          {/* 6. Intellectual Property */}
          <Section title="6. Intellectual Property" icon="©️">
            <p>
              All content on this site, including illustrations, product photography, logos, and written descriptions, is the property of Paper &amp; Quill 
              and protected by international copyright laws. You may not reproduce, distribute, or create derivative works from our stationery designs 
              without express written permission.
            </p>
          </Section>

          {/* 7. Third-Party Links */}
          <Section title="7. Third-Party Links" icon="🔗">
            <p>
              Our site may include links to third-party websites (e.g., our calligrapher partners or paper mills). We are not responsible for examining or 
              evaluating the content or accuracy and we do not warrant and will not have any liability for any third-party materials or websites.
            </p>
          </Section>

          {/* 8. Limitation of Liability */}
          <Section title="8. Limitation of Liability" icon="⚖️">
            <p>
              In no case shall Paper &amp; Quill, our directors, officers, employees, or affiliates be liable for any injury, loss, claim, or any direct, 
              indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any of the service or any products procured 
              using the service.
            </p>
          </Section>

          {/* 9. Governing Law */}
          <Section title="9. Governing Law" icon="🏛️">
            <p>
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of 
              the State of Delaware, United States.
            </p>
          </Section>

          {/* 10. Contact Information */}
          <Section title="10. Contact Information" icon="✉️">
            <p>
              Questions about the Terms of Service should be sent to us at:
            </p>
            <address className="not-italic leading-relaxed">
              Paper &amp; Quill<br />
              123 Inkwell Lane<br />
              Stationery District, ST 19901<br />
              <a href="mailto:legal@paperandquill.com" className="text-amber-700 underline decoration-amber-300 hover:text-amber-900">
                legal@paperandquill.com
              </a>
            </address>
          </section>

          <div className="mt-12 text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400">
              — End of Terms —
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center">
        <p className="font-sans text-sm text-stone-500">
          &copy; {new Date().getFullYear()} Paper &amp; Quill. All rights reserved. 
          <span className="mx-2 text-amber-300">|</span> 
          <a href="#" className="hover:text-amber-700">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

// Reusable Section Component for cleaner code
const Section = ({ title, icon, children }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 flex items-center border-b border-stone-100 pb-2 font-sans text-xl font-medium uppercase tracking-wide text-stone-700">
        <span className="mr-3 text-2xl">{icon}</span>
        {title}
      </h2>
      <div className="space-y-3 pl-1 font-serif text-stone-700">
        {children}
      </div>
    </section>
  );
};

export default TermsAndConditions;