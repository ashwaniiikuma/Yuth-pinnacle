"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() { 

 const slides = [
    {
      id: 1,
      type: 'full', // Full Width Banner
      image: 'https://media.istockphoto.com/id/1837382224/photo/young-black-man-at-shopping.jpg?s=2048x2048&w=is&k=20&c=w1UEUiJkO2JAnTrHfWugTRM-gEE5MYCHBsGMfWlJxMQ=',
      title: 'Gen-Z Fashion For All',
      subtitle: 'fwd',
      offer: 'UNDER ₹999',
      buttonText: 'SHOP NOW >',
      link: '/fwd'
    },
    {
      id: 2,
      type: 'split', // Image + Text Banner
      image: 'https://media.istockphoto.com/id/825083570/photo/latin-man-standing.jpg?s=2048x2048&w=is&k=20&c=pxNzet9482OBHRK0SQrkjHrgwpc5u-9dRedflA2PKNg=',
      brandName: 'Workwear.',
      offer: 'Up To 50% Off',
      link: '/brand/us-polo'
    },
    {
      id: 3,
      type: 'split',
      image: 'https://media.istockphoto.com/id/1402508955/photo/close-up-of-african-american-man-hands.jpg?s=2048x2048&w=is&k=20&c=ha43dfzpvixM9_mHDcFaFuxtc3vq0OW04eVZ2imQwvg=',
      brandName: 'Fessionwear',
      offer: 'Min. 60% Off',
      brandLogo: 'CAPRESE',
      link: '/category/handbags'
    },
    {
      id: 4,
      type: 'split',
      image: 'https://media.istockphoto.com/id/1176105363/photo/it-fits-great.jpg?s=2048x2048&w=is&k=20&c=4F76rx-1aGxWfDaA_9YKSN0PJagW_l-Rte9UsCrP5zY=',
      brandName: 'ACTIVEWEAR',
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
              <span className="text-2xl md:text-5xl font-serif font-black italic tracking-tighter text-black block mb-1">
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
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded object-contain text-[10px] font-bold tracking-widest text-gray-700 uppercase">
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
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "U.S. POLO ASSN.",
    name: "Caps",
    offer: "40-80% OFF",
    image: 'https://rukminim2.flixcart.com/image/316/420/xif0q/cap/m/y/x/free-587-55-illearion-original-imahgys5uhc3qext.jpeg?q=90&crop=false',
    href: '/products/men'
  },
  {
    id: 2,
    brand: "LEVI'S",
    name: "Ethnic Wear",
    offer: "50-80% OFF",
    image: 'https://media.istockphoto.com/id/615085330/photo/sneaker-close-up.jpg?s=612x612&w=is&k=20&c=DrENjRlXjqqnCgHr-mfpE63puWcIdTmevhQI22WpoW8=',
    href: '/products/men'
  },
  {
    id: 3,
    brand: "TOMMY HILFIGER",
    name: "Winter Wear",
    offer: "30-70% OFF",
    image: 'https://images.pexels.com/photos/5967666/pexels-photo-5967666.png',
    href: '/products/men'
  },
  {
    id: 4,
    brand: "UNITED COLORS OF BENETTON",
    name: "Western Wear",
    offer: "40-80% OFF",
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/products/men'
  },
  {
    id: 5,
    brand: "NIKE",
    name: "Full Sleeve Tees",
    offer: "40-60% OFF",
    image: 'https://images.pexels.com/photos/27381875/pexels-photo-27381875.jpeg',
    href: '/products/men',
  }, 
  {
    id: 6,
    brand: "PUMA",
    name: "Layered Shirts",
    offer: "30-60% OFF",
    image: 'https://images.pexels.com/photos/6776562/pexels-photo-6776562.jpeg',
    href: '/products/men',
  },
  {
    id: 7,
    brand: "SKECHERS",
    name: "Sportswear",
    offer: "30-80% OFF",
    image: 'https://images.pexels.com/photos/38914244/pexels-photo-38914244.jpeg',
    href: '/products/men',
  },
  {
    id: 8,
    brand: "CROCS",
    name: "High Neck Tops",
    offer: "UP TO 50% OFF",
    image: 'https://img.kwcdn.com/product/fancy/fa273d57-138b-4078-975c-b638fc94033a.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
    href: '/products/men',
  }
      
    ].map((item) => (
       <Link 
      key={item.id} 
      href={item.href}
      className="group bg-gray-50/50 hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-none hover:shadow-lg"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden object-contain bg-gray-100 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
 <section className="max-w-[1500px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-4xl md:text-3xl text-left tracking-[0.2em] font-bold   bg-clip-text text-gray-500 uppercase">
      Eexplore top brands
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    brand: "Nick",
    name: "Caps",
    offer: "40-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNkhPK2onPaG0W2jLhbNvZp-uwQ6WNSDx_To_TGUQH6Q&s=10',
    href: '/products/men'
  },
  {
    id: 2,
    brand: "LEVI'S",
    name: "Ethnic Wear",
    offer: "50-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDr0q8hGsC2QFv-DIXFEs831BI1_6oK2r-Dw83u2kqw&s=10',
    href: 'products/women'
  },
  {
    id: 3,
    brand: "The roadwadge life co.",
    name: "Winter Wear",
    offer: "30-70% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__KsMs5xczMy5ORvsVVGMlMz5zp6RUqmSGmB2FIZTqg&s=10',
    href: 'products/men'
  },
  {
    id: 4,
    brand: "UNITED COLORS OF BENETTON",
    name: "Western Wear",
    offer: "40-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFEGOGrWUMQe_jna8t6_8Y-cJ0SrHsZWqHyQMae0gQ9A&s=10',
    href: '/products/men'
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
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
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