"use client";
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-black text-gray-300 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] uppercase tracking-wider">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 mt-2">Last updated: September 2026</p>
        </div>

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            Welcome to <strong className="text-[#d4af37]">Youth Pinnacle</strong>. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this privacy policy carefully.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          <p className="text-sm leading-relaxed">
            We may collect information about you in a variety of ways, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong className="text-white">Personal Data:</strong> Name, shipping address, email address, phone number, and billing details provided when you register an account, place an order, or contact support.</li>
            <li><strong className="text-white">Derivative Data:</strong> IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.</li>
            <li><strong className="text-white">Transaction Data:</strong> Details about payments to and from you, and other details of products you have purchased from us.</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
          <p className="text-sm leading-relaxed">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Create and manage your account and process your orders.</li>
            <li>Deliver products, manage shipments, and handle returns or exchanges.</li>
            <li>Send you administrative information, such as order confirmations, invoices, and updates.</li>
            <li>Respond to customer service inquiries and support requests.</li>
            <li>Improve website functionality, marketing strategies, and user experience.</li>
          </ul>
        </section>

        {/* Disclosure of Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Disclosure of Your Information</h2>
          <p className="text-sm leading-relaxed">
            We do not sell, trade, or rent your personal identification information to others. We may share information we have collected about you in certain situations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong className="text-white">Third-Party Service Providers:</strong> We share data with trusted partners who assist us in operating our website, conducting our business, processing payments, or delivering shipments (e.g., logistics and courier partners).</li>
            <li><strong className="text-white">Legal Obligations:</strong> We may disclose your information where required by law, court order, or government regulations to protect our rights, property, or safety.</li>
          </ul>
        </section>

        {/* Security of Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Security of Your Information</h2>
          <p className="text-sm leading-relaxed">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal data you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        {/* Cookies and Tracking */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Cookies & Tracking Technologies</h2>
          <p className="text-sm leading-relaxed">
            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the site and improve your experience. When you visit our website, your personal information is not collected through the use of tracking technology unless you explicitly provide it.
          </p>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Changes to This Privacy Policy</h2>
          <p className="text-sm leading-relaxed">
            We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last updated" date of this privacy policy.
          </p>
        </section>

        {/* Contact Us */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <h2 className="text-xl font-bold text-white">8. Contact Us</h2>
          <p className="text-sm leading-relaxed">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <div className="space-y-1 text-[#e0a96d] text-[15px] mb-4">
            <p>
              Email:{" "}
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=owner@jslworks.in&tf=cm"
                className="hover:underline transition"
              >
                owner@jslworks.in
              </a>
            </p>
           
          </div>
        </section>

      </div>
    </main>
  );
}