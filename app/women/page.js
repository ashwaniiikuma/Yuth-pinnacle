"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  
  // High quality fashion images from Pexels - Inhe real stock photo se replace karein jab ho.


 const slides = [
     {
      id: 1,
      type: 'full', // Full Width Banner
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
      title: 'DRESSBERRY',
      subtitle: 'fwd',
      offer: 'UNDER ₹999',
      buttonText: 'SHOP NOW >',
      link: '/fwd'
    },
    // {
    //   id: 1,
    //   type: 'Full', // Full Width Banner
    //   image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    //   title: 'Dress',
    //   subtitle: 'fwd',
    //   offer: 'UNDER ₹999',
    //   buttonText: 'SHOP NOW >',
    //   link: '/fwd'
    // },
    {
      id: 2,
      type: 'Dresses', // Image + Text Banner
      image: 'https://media.istockphoto.com/id/1281612523/photo/diwali-selfie.jpg?s=612x612&w=0&k=20&c=LtS51I1eMKRC9DNXGDc9J632Snqq9gBut1nQ89ovMQw=',
      brandName: 'sarees',
      offer: 'Up To 50% Off',
      link: '/brand/us-polo'
    },
    {
      id: 3,
      type: 'split',
      image: 'https://media.istockphoto.com/id/915320148/photo/elegant-young-woman-is-looking-away-smiling-and-thinking.jpg?s=612x612&w=0&k=20&c=n2FD9mwA7bIU2ys8M3XM2L9Y_wlmVVOFcRtdF9RkUJc=',
      brandName: 'Dress',
      offer: 'Min. 60% Off',
      brandLogo: 'CAPRESE',
      link: '/category/handbags'
    },
    {
      id: 4,
      type: 'Split',
      image: 'https://media.istockphoto.com/id/2268425622/photo/woman-wearing-burgundy-t-shirt-on-pink-background-closeup-mockup-for-design.jpg?s=612x612&w=0&k=20&c=5StGnML_MATYJ7RJ7VilU-BxXQmOJRLwGZ0cugQnLJI=',
      brandName: 'Top&Seets',
      offer: '40-70% Off',
      subText: 'HRX | NIKE & More',
      link: '/category/activewear'
    },
     {
      id: 5,
      type: 'Split',
      image: 'https://media.istockphoto.com/id/1180991483/vector/shoes-realistic-man-and-woman-evening-elegant-classical-shoes-vector-illustrations-isolated.jpg?s=612x612&w=0&k=20&c=XxIu6erE1pCQsLJTPMyN8-l56lxKPaNBwtLOHxwIbbY=',
      brandName: 'FOOTWEAR',
      offer: '40-70% Off',
      subText: 'HRX | NIKE & More',
      link: '/category/activewear'
    },
     {
      id: 6,
      type: 'split',
      image: 'https://media.istockphoto.com/id/1307128496/photo/portrait-of-young-woman-sitting-on-floor-in-a-room-using-phone-stock-photo.jpg?s=612x612&w=0&k=20&c=QAK5pnn8SzGOLJNcpQUBRdmX9yeTfONmAplhjLQHR-Q=',
      brandName: 'LAUNGEWEAR',
      offer: '40-70% Off',
      subText: 'HRX | NIKE & More',
      link: '/category/activewear'
    },
     {
      id: 7,
      type: 'split',
      image: 'https://media.istockphoto.com/id/2235879129/photo/mother-and-daughter-decorating-with-diyas-and-flowers-during-diwali-festival.jpg?s=612x612&w=0&k=20&c=vNVIEYscf2wM-ekppUZTbrDQbXs9vbpNt86tNRFBJ4o=',
      brandName: 'ACTIVEWEAR',
      offer: '40-70% Off',
      subText: 'HRX | NIKE & More',
      link: '/category/activewear'
    },
     {
      id: 8,
      type: 'split',
      image: 'https://media.istockphoto.com/id/1393623964/photo/woman-sitting-with-feet-up-on-the-desk.jpg?s=612x612&w=0&k=20&c=sZvKDrfDaZxuAiyCpDW5vGxRD8MByk2o74nZvqScXZQ=',
      brandName: 'Casual sportshoes',
      offer: '40-70% Off',
      subText: 'HRX | NIKE & More',
      link: '/category/activewear'
    }
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide - Har 4 seconds me next slide par jump karega
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="bg-white text-black min-h-screen">
      
      {/* 1. TOP ANNOUNCEMENT BANNER - Simple Welcome Message */}
    <div className='relative bg-gradient-to-r from-[#0d0d0e] via-[#1a1815] to-[#0d0d0e] text-amber-100 py-2.5 px-6 text-center flex justify-center gap-3 border-b border-[#332b1e] overflow-hidden'>
    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent pointer'/>

    <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase font-medium">
    <span className="text-gray-400">Welcome to</span>
    
    {/* Highlighted Website Name with Gold Gradient & Glow */}
    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] tracking-wider">
      YOUTH PINNACLE
    </span>
  </div>
  {/* Divider Dot */}
  <span className="text-[#d4af37] text-xs hidden sm:inline">•</span>

  {/* Sub-badge / Tagline */}
  <span className="hidden sm:inline-block text-[11px] bg-[#d4af37]/10 text-[#e0a96d] border border-[#d4af37]/30 px-3 py-0.5 rounded-full font-medium tracking-wide">
    Your Style Destination
  </span>
    </div>

      {/* 2. HERO FEATURED SECTION - Simple & Aesthetic Clothing Image */}
  <section className="w-full max-w-full px-0 py-10 overflow-hidden relative border-b border-gray-100">      
  {/* Sliding Track Container */}
  <div 
    className="flex w-full transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {slides.map((slide) => (
      <div 
        key={slide.id} 
        className="w-full flex-shrink-0 h-[220px] sm:h-[300px] md:h-[480px] bg-white overflow-hidden"
      >
        {slide.type === 'full' ? (
          /* Full Width Banner Layout */
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-16 bg-amber-200/40">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl max-w-xs md:max-w-md shadow-md ml-auto">
              <span className="text-2xl md:text-5xl font-black italic tracking-tighter text-black block mb-1">
                {slide.subtitle}
              </span>
              <h3 className="text-base md:text-xl font-extrabold text-gray-900 uppercase tracking-wide">
                {slide.title}
              </h3>
              <p className="text-lg md:text-2xl font-black text-amber-600 my-1">
                {slide.offer}
              </p>
              <Link 
                href={slide.link} 
                className="inline-block mt-2 bg-black text-white text-[10px] md:text-xs font-bold px-4 py-2 rounded hover:bg-gray-800 transition-all"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ) : (
          /* Split Banner Layout (Image Left + Details Right) */
          <div className="grid grid-cols-12 h-full w-full">
            
            {/* Left Side Big Image */}
            <div className="col-span-8 lg:col-span-9 relative h-full w-full">
              {slide.brandLogo && (
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest text-gray-700 uppercase">
                  {slide.brandLogo}
                </div>
              )}
              <img 
                src={slide.image} 
                alt={slide.brandName} 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Side Content */}
            <div className="col-span-4 lg:col-span-3 h-full flex flex-col justify-center px-4 sm:px-8 md:px-10 py-4 bg-white border-l border-gray-100">
              {slide.subText && (
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  {slide.subText}
                </p>
              )}
              <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase font-serif">
                {slide.brandName}
              </h2>
              <p className="text-xs sm:text-base md:text-xl font-medium text-gray-600 mt-1 sm:mt-2">
                {slide.offer}
              </p>
              <div className="mt-4 sm:mt-8 border-t border-gray-100 pt-2 sm:pt-4">
                <Link 
                  href={slide.link} 
                  className="text-[10px] sm:text-xs font-semibold text-gray-400 hover:text-black transition-colors"
                >
                  + Explore
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    ))}
  </div>

  {/* Bottom Indicator Dots */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
    {slides.map((_, dotIndex) => (
      <button
        key={dotIndex}
        onClick={() => setCurrentIndex(dotIndex)}
        aria-label={`Go to slide ${dotIndex + 1}`}
        className={`h-2 rounded-full transition-all duration-300 ${
          dotIndex === currentIndex 
            ? 'w-5 bg-gray-900' 
            : 'w-2 bg-gray-300 hover:bg-gray-400'
        }`}
      />
    ))}
  </div>

</section>
      {/* 3. CATEGORY GRID (Men, Women, Kids, Beauty) */}
     {/* 3. FEATURED GARMENTS SECTION (Images + Titles + Prices) */}
<section className="max-w-[1500px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-4xl md:text-3xl text-left tracking-[0.2em] font-bold   bg-clip-text text-gray-500 uppercase">
      Biggest deal on top brand
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "U.S. POLO ASSN.",
    name: "Caps",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1417970847/photo/portrait-of-beautiful-woman-smiling.jpg?s=612x612&w=0&k=20&c=_89eR0g8RaNmCB03Mv3C8ejPka4DrH0z6ISj6QWsnDg=',
    href: '/men'
  },
  {
    id: 2,
    brand: "LEVI'S",
    name: "Ethnic Wear",
    offer: "50-80% OFF",
    image: 'https://media.istockphoto.com/id/144325192/photo/indian-embroidered-womens-apparel.jpg?s=612x612&w=0&k=20&c=Fiy5DTkO9-f7Hz5KWt8Gp7nmZBJB2NCRhQzMQnFUtFw=',
    href: '/products/women'
  },
  {
    id: 3,
    brand: "TOMMY HILFIGER",
    name: "Winter Wear",
    offer: "30-70% OFF",
    image: 'https://media.istockphoto.com/id/2172654441/photo/portrait-of-a-businesswoman-standing-in-the-office.jpg?s=612x612&w=0&k=20&c=x00T8m9YW-OwM6y_wBwS4jDKgh5B5zdgKVRBaEh9hgs=',
    href: '/men'
  },
  {
    id: 4,
    brand: "UNITED COLORS OF BENETTON",
    name: "Western Wear",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1200863054/photo/summer-dress.jpg?s=612x612&w=0&k=20&c=8Xyknk_rDuielm1PnOUIvLaKmsqYMnc1HMeqKh60zrk=',
    href: '/women'
  },
  {
    id: 5,
    brand: "NIKE",
    name: "Full Sleeve Tees",
    offer: "40-60% OFF",
    image: 'https://media.istockphoto.com/id/898031604/photo/smiling-beautiful-woman-in-red-dress-and-high-heels-is-walking.jpg?s=612x612&w=0&k=20&c=u5HxNXOjtMbTrtafPLsBLuAj95-wLeuy9F9VAtLnjiY=',
    href: '/men',
  }, 
   {
    id: 6,
    brand: "FOREVER 21",
    name: "Layered Shirts",
    offer: "30-60% OFF",
    image: 'https://media.istockphoto.com/id/2164305018/photo/laptop-with-modern-gadgets-and-accessories-for-work-and-study-in-backpack-on-white-background.jpg?s=612x612&w=0&k=20&c=EuHKe6ktintFhPqdOC6KkbzxWZbjjHel6yZ8XHlsq9U=',
    href: '/men',
  },
    {
    id: 7,
    brand: "LEVI'S",
    name: "Ethnic Wear",
    offer: "50-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDr0q8hGsC2QFv-DIXFEs831BI1_6oK2r-Dw83u2kqw&s=10',
    href: '/women'
  },
  {
    id: 8,
    brand: "PUMA",
    name: "Winter Wear",
    offer: "30-70% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT8xYoQwqAl14hzY_XH2N7rpJY8OsQFn8GVmeaS2ENxA&s=10',
    href: '/men'
  },
  {
    id: 9,
    brand: "NICK",
    name: "Western Wear",
    offer: "40-80% OFF",
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-DEs9WY4EIGp7KzYyQq-Bj0_QcE4Q7HOLqF2rd8gOg&s=10',
    href: '/women'
  },
      
    ].map((item) => (
       <Link 
      key={item.id} 
      href={item.href}
      className="group bg-gray-50/50 hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-none hover:shadow-lg"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* BRAND NAME */}
      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
        {item.brand}
      </span>

      {/* CATEGORY NAME (SUBTITLE) */}
      <span className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {item.name}
      </span>

      {/* OFFER TEXT */}
      <span className="text-sm font-extrabold text-gray-900">
        {item.offer}
      </span>
    </Link>
    ))}
  </div>
</section>
    {/* //Explore Top brands */}
 <section className="max-w-[1300px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-4xl md:text-3xl text-left tracking-[0.2em] font-bold   bg-clip-text text-gray-500 uppercase">
      TRANDING AND WESTERN WEAR
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "Mose & Milang",
    name: "The color of this session",
    offer: "40-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjhYGk7I5YuePItHyH2gEkMZaaGIdoPd6fZiPO2TM7UQ&s=10',
    href: '/products/women'
  },
  {
    id: 2,
    brand: "Mode blocking",
    name: "your so-fa to fridg look",
    offer: "50-80% OFF",
    image: 'https://media.istockphoto.com/id/1204304124/photo/freestyle-diverse-girl-with-leg-prosthesis-standing-isolated-on-grey-full-body-shot-posing.jpg?s=612x612&w=0&k=20&c=9iPREJEQt-hAb-LKb6n7dTGOj0MwEGCOm_CKdt-XpQs=',
    href: '/products/women'
  },
  {
    id: 3,
    brand: "Red TopS & tees",
    name: "The unofficial symbol of thing bold",
    offer: "30-70% OFF",
    image: 'https://media.istockphoto.com/id/2212599525/photo/woman-listening-music-over-headphones-on-yellow-background.jpg?s=612x612&w=0&k=20&c=uicPv3NVi3CDbbgm3dwHRg9hi3CmgkN-L6RRse6V0Ow=',
    href: '/products/women'
  },
  {
    id: 4,
    brand: "Smart daily wear tees",
    name: "Something new for every day",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/658473364/photo/she-is-a-mystery-for-you.jpg?s=612x612&w=0&k=20&c=tRFka09QzvOfI63bcXSjpeAvikQtW7XmDBO1XFqn0w0=',
    href: '/products/women'
  },
   {
    id: 5,
    brand: "Eco-friendly dress",
    name: "When ethic meet esthetic",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1362588255/photo/beautiful-brunette-woman-walking-on-sunset-beach-in-fashionable-maxi-dress-relaxing-on-luxury.jpg?s=612x612&w=0&k=20&c=tmRTVoSbdgsPZOQKRMBOqT9xoOypiEXqMnzTRcFFMt8=',
    href: '/products/women'
  },
 
      
    ].map((item) => (
     <Link 
      key={item.id} 
      href={item.href}
      className="group bg-gray-50/50 hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-none hover:shadow-lg"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* BRAND NAME */}
      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
        {item.brand}
      </span>

      {/* CATEGORY NAME (SUBTITLE) */}
      <span className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {item.name}
      </span>

      {/* OFFER TEXT */}
      <span className="text-sm font-extrabold text-gray-900">
        {item.offer}
      </span>
    </Link>
    ))}
  </div>
</section>

  <section className="max-w-[1300px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-4xl md:text-3xl text-left tracking-[0.2em] font-bold   bg-clip-text text-gray-500 uppercase">
      TRANDING AND indian WEAR
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "Mose & Milang",
    name: "For the extra serving of drama",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1317633026/photo/beautiful-woman-in-long-dress-front-of-white-background.jpg?s=612x612&w=0&k=20&c=0Nw_siXnFozPKFI47X8jv1Miyy4d3Tea3nFXTT_I3G4=',
    href: '/products/women'
  },
  {
    id: 2,
    brand: "Rehgal musterd",
    name: "The color of classy",
    offer: "50-80% OFF",
    image: 'https://media.istockphoto.com/id/1284220002/photo/portrait-of-beautiful-young-woman-wearing-traditional-indian-dress.jpg?s=612x612&w=0&k=20&c=L5GXEy4O4NtVCwZNAv6aDelCUcW5uZUnT6ifQIaL_TM=',
    href: '/products/women'
  },
  {
    id: 3,
    brand: "Fusion dress from W",
    name: "For a look straight out of bollywood movie",
    offer: "30-70% OFF",
    image: 'https://media.istockphoto.com/id/1363589357/photo/portrait-of-a-woman-sitting-in-an-architectural-dome.jpg?s=612x612&w=0&k=20&c=OxlBtAp6kQIc1eIevTUfXrNJvK7y6GS4PbkqE7a6vu8=',
    href: '/products/women'
  },
  {
    id: 4,
    brand: "Kurta sets by BIBA ",
    name: "we've found the perfact match",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1501391353/photo/three-beautiful-indian-girls-or-friends-wearing-traditional-cloths-having-fun-together.jpg?s=612x612&w=0&k=20&c=lGhBFO1fsuWQsPCD1gfOl5RUPCPXL0PWjGsICpAVRYQ=',
    href: '/products/women'
  },
   {
    id: 5,
    brand: "Eco-friendly dress",
    name: "Breeze dress fit for virtual call",
    offer: "40-80% OFF",
    image: 'https://media.istockphoto.com/id/1362588255/photo/beautiful-brunette-woman-walking-on-sunset-beach-in-fashionable-maxi-dress-relaxing-on-luxury.jpg?s=612x612&w=0&k=20&c=tmRTVoSbdgsPZOQKRMBOqT9xoOypiEXqMnzTRcFFMt8=',
    href: '/products/women'
  },
 
      
    ].map((item) => (
     <Link 
      key={item.id} 
      href={item.href}
      className="group bg-gray-50/50 hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-none hover:shadow-lg"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* BRAND NAME */}
      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
        {item.brand}
      </span>

      {/* CATEGORY NAME (SUBTITLE) */}
      <span className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {item.name}
      </span>

      {/* OFFER TEXT */}
      <span className="text-sm font-extrabold text-gray-900">
        {item.offer}
      </span>
    </Link>
    ))}
  </div>
</section>

  <section className="max-w-[1300px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-4xl md:text-3xl text-left tracking-[0.2em] font-bold   bg-clip-text text-gray-500 uppercase">
      TRANDING AND SPORTS WEAR
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "Skechars Go walk range",
    name: "For the extra serving of drama",
    offer: "40-80% OFF",
    image:"https://media.istockphoto.com/id/695474472/photo/overhead-shot-of-white-sneakers-on-pink-background.jpg?s=612x612&w=0&k=20&c=GzsXYIfYMrZ2ZHXvM_rImCnBJkjZhgTJOxdMPLOJ22s=",
    href: '/products/women'
  },
  {
    id: 2,
    brand: "Under Armour style",
    name: "The color of classy",
    offer: "50-80% OFF",
    image: 'https://cdn.media.amplience.net/i/frasersdev/33646403_o?fmt=auto&upscale=false&w=767&h=767&v=20260202110308&sm=scaleFit&$h-ttl$',
    href: '/products/women'
  },
  {
    id: 3,
    brand: "jagger Under Armour style",
    name: "For a look straight out of bollywood movie",
    offer: "30-70% OFF",
    image: 'https://kaleidoscope.scene7.com/is/image/OttoUK/300w/Under-Armour-Heat-Gear-Leggings~10G014FRSP.jpg',
    href: '/products/women'
  },
  {
    id: 4,
    brand: "Athlesure Apperal ",
    name: "we've found the perfact match",
    offer: "40-80% OFF",
    image: 'https://www.changeituptraining.com/static/uploads/images/activewear-wftokvghgomd.jpg',
    href: '/products/women'
  },
   {
    id: 5,
    brand: "Running Shoes",
    name: "Breeze dress fit for virtual call",
    offer: "40-80% OFF",
    image: 'https://i.pinimg.com/736x/be/c3/6b/bec36bf46b716a45c41724b6d59270d2.jpg',
    href: '/products/women'
  },
 
      
    ].map((item) => (
     <Link 
      key={item.id} 
      href={item.href}
      className="group bg-gray-50/50 hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-none hover:shadow-lg"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* BRAND NAME */}
      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
        {item.brand}
      </span>

      {/* CATEGORY NAME (SUBTITLE) */}
      <span className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {item.name}
      </span>

      {/* OFFER TEXT */}
      <span className="text-sm font-extrabold text-gray-900">
        {item.offer}
      </span>
    </Link>
    ))}
  </div>
</section>


    </main>
  );
}