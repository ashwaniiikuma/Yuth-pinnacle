"use client";
import React from 'react';

export default function TermsOfUse() {
  return (
    <main className="bg-black text-gray-300 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] uppercase tracking-wider">
            Terms of Use
          </h1>
          <p className="text-xs text-gray-500 mt-2">Last updated: September 2026</p>
        </div>

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            Welcome to <strong className="text-[#d4af37]">Youth Pinnacle</strong>. By accessing or using our website, you agree to be bound by these Terms of Use. Please read them carefully before making any purchases or using our services. If you do not agree with any part of these terms, you must not use our website.
          </p>
        </section>

        {/* User Accounts */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. User Accounts & Registration</h2>
          <p className="text-sm leading-relaxed">
            To make purchases or access certain features (like wishlists or order tracking), you may need to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
          </p>
        </section>

        {/* Products & Pricing */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Products, Pricing & Accuracy</h2>
          <p className="text-sm leading-relaxed">
            We offer a wide range of fashion wear, sarees, and personal care/beauty products. We try our best to display accurate colors, descriptions, and prices. However, prices and stock availability are subject to change without prior notice. We reserve the right to modify or discontinue any product at any time.
          </p>
        </section>

        {/* Orders & Payments */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Orders and Payments</h2>
          <p className="text-sm leading-relaxed">
            When you place an order on Youth Pinnacle, you are offering to purchase a product. We reserve the right to accept or decline your order for reasons such as product unavailability, payment authentication issues, or pricing errors. All payments must be completed securely through our approved payment gateways.
          </p>
        </section>

        {/* Shipping & Delivery */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Shipping & Delivery</h2>
          <p className="text-sm leading-relaxed">
            We ship products to various locations across the country. Delivery times are estimates and may vary depending on courier partners, location, and unforeseen circumstances. Youth Pinnacle is not liable for delays caused by third-party logistics.
          </p>
        </section>

    

        {/* Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Intellectual Property</h2>
          <p className="text-sm leading-relaxed">
            All content on this website—including text, graphics, logos, images, code, and layout—is the property of Youth Pinnacle and is protected by copyright and intellectual property laws. Unauthorized use of our content is strictly prohibited.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed">
            Youth Pinnacle shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or the purchase of products, exceeding the total amount paid by you for the specific product in question.
          </p>
        </section>

        {/* Contact Us */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <h2 className="text-xl font-bold text-white">8. Contact Information</h2>
          <p className="text-sm leading-relaxed">
            If you have any questions or concerns regarding these Terms of Use, you can reach out to our support team through our website or via email at <div className="space-y-1 text-[#e0a96d] text-[15px] mb-4">
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
          </p>
        </section>

      </div>
    </main>
  );
}