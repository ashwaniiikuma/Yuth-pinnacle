"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const popularSearches = [
    "Makeup", "Dresses For Girls", "T-Shirts", "Sandals", "Headphones", "Babydolls", 
    "Blazers For Men", "Handbags", "Sport Shoes", "Reebok Shoes", 
    "Puma Shoes", "Boxers", "Tops", "Earrings", "Kurtis", 
    "Nike", "Smart Watches", "Titan Watches", "Designer Blouse", "Gowns", "Rings", 
    "Forever 21", "Eye Makeup", "Photo Frames", "Punjabi Suits", "Bikini", 
    "Lipstick", "Saree", "Dresses", "Lehenga", "Goggles", "Bras", 
    "Suit", "Chinos", "Shoes", "Adidas Shoes", "Woodland Shoes", "Jewellery", "Designers Sarees"
  ];

  return (
    <footer className="bg-gradient-to-r from-[#0d0d0e] via-[#1a1815] to-[#0d0d0e] text-[#e0a96d] text-xs pt-10 pb-6 px-4 md:px-12 border-t border-[#332b1e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-8">
        
        {/* Column 1: Links */}
        <div>
          <h4 className="font-bold text-xs text-[#e0a96d] tracking-wider uppercase mb-3">Online Shopping</h4>
          <ul className="space-y-1.5 text-[#e0a96d]">
            <li><Link href="/men" className="hover:underline">Men</Link></li>
            <li><Link href="/women" className="hover:underline">Women</Link></li>
            <li><Link href="/kids" className="hover:underline">Kids</Link></li>
            <li><Link href="/beauty" className="hover:underline">Beauty</Link></li>
          </ul>

          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mt-6 mb-3">Useful Links</h4>
          <ul className="space-y-1.5 text-[#e0a96d]">
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/site-map" className="hover:underline">Site Map</Link></li>
            <li><Link href="/corporate" className="hover:underline">Corporate Information</Link></li>
          </ul>
        </div>

        {/* Column 2: Customer Policies */}
        <div>
          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-3">Customer Policies</h4>
          <ul className="space-y-1.5 text-[#e0a96d]">
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/tc" className="hover:underline">T&C</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms Of Use</Link></li>
            <li><Link href="/track" className="hover:underline">Track Orders</Link></li>
            <li><Link href="/shipping" className="hover:underline">Shipping</Link></li>
            <li><Link href="/cancellation" className="hover:underline">Cancellation</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Office Details */}
        <div>
          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-3">Contact Us</h4>
          <div className="space-y-1 text-[#e0a96d] text-[11px] mb-4">
            <p>
              Email:{" "}
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=owner@jslworks.in&tf=cm"
                className="hover:underline transition"
              >
                owner@jslworks.in
              </a>
            </p>
            <p><span className="font-semibold">Website:</span> <a href="https://www.jslworks.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">jslworks.in</a></p>
            <p><span className="font-semibold">Phone:</span> +91 98765 43210</p>
          </div>

          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-2">Office Details</h4>
          <div className="space-y-1 text-[11px]">
            <p className="font-semibold text-[#e0a96d]">JSL WORKS PVT LTD</p>
            <p className="text-[#e0a96d]">Saviour Green Isle, A71 602, Crossings Republik,</p>
            <p className="text-[#e0a96d]">Ghaziabad, Uttar Pradesh 201010</p>
            <p className="pt-1"><span className="font-semibold text-[#e0a96d]">CIN:</span> U62013UW2026PTC253299</p>
            <p><span className="font-semibold text-[#e0a96d]">GSTIN:</span> 09AAHCJ4226F1ZM</p>
          </div>
        </div>

        {/* Column 4: Social Icons & App Links */}
        <div>
          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-3">Keep In Touch</h4>
          <div className="flex gap-3 mb-6">
            {/* Facebook */}
            <a href="https://www.facebook.com/jslworks/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.816V8z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/jslworks/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 hover:scale-110 transition-transform">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Youtube */}
            <a href="https://www.youtube.com/@jslworksbharat" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600 hover:scale-110 transition-transform">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            {/* Linkedin */}
            <a href="https://www.linkedin.com/company/jslworks/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-700 hover:scale-110 transition-transform">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
          </div>

          <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-3">Experience Mobile App</h4>
          <div className="flex gap-2">
            <div className="bg-black text-white border border-[#e0a96d]/30 px-3 py-1.5 rounded text-[10px] font-semibold cursor-pointer hover:border-[#e0a96d]">
              Google Play
            </div>
            <div className="bg-black text-white border border-[#e0a96d]/30 px-3 py-1.5 rounded text-[10px] font-semibold cursor-pointer hover:border-[#e0a96d]">
              App Store
            </div>
          </div>
        </div>

        {/* Column 5: Badges */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="border border-[#e0a96d] rounded-full w-9 h-9 flex items-center justify-center text-[10px] font-bold text-[#e0a96d] shrink-0">
              100%
            </div>
            <p className="text-[11px] text-[#e0a96d]">
              <span className="font-bold text-[#e0a96d]">100% ORIGINAL</span> guarantee for all products
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-[#e0a96d] rounded-full w-9 h-9 flex items-center justify-center text-[10px] font-bold text-[#e0a96d] shrink-0">
              14
            </div>
            <p className="text-[11px] text-[#e0a96d]">
              <span className="font-bold text-[#e0a96d]">Return within 14 days</span> of receiving your order
            </p>
          </div>
        </div>

      </div>

      <hr className="border-[#e0a96d]/30 my-6" />

      {/* Popular Searches */}
      <div className="max-w-7xl mx-auto mb-6">
        <h4 className="font-bold text-[#e0a96d] text-xs tracking-wider uppercase mb-2">Popular Searches</h4>
        <p className="text-[11px] text-[#e0a96d]/80 leading-relaxed">
          {popularSearches.join(" | ")}
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-4 border-t border-[#e0a96d]/30 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#e0a96d] gap-4">
        <p>In case of any concern, <Link href="/contact" className="text-amber-400 font-semibold hover:underline">Contact Us</Link></p>
  <p className="flex items-center gap-1.5">
  Made with <span className="text-red-500 animate-pulse">❤️</span> in India <span className="animate-bounce inline-block">🇮🇳</span> 
</p>
   <span className='flex items-center'>DPIIT-Recognized Startup</span> 
        <p className="font-medium text-xs">© 2026 www.jslworks. All rights reserved.</p>
        
        {/* Fixed Image Link */}
        <a 
          href="https://www.jslworks.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="items-center flex gap-2 group cursor-pointer"
        >
          <Image
            src="/jsl.logo.jpg"
            alt="jslworks pvt ltd"
            width={24}
            height={24}
            className="h-6 w-6 object-contain rounded"
          />
          <span className="font-semibold text-xs text-[#e0a96d] group-hover:text-amber-300 transition-colors">
            A JSL Works Company
          </span>
        </a>
      </div>
    </footer>
  );
}