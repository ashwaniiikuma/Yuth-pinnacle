"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Beauty() {
  
  // High quality fashion images from Pexels - Inhe real stock photo se replace karein jab ho.


 const slides = [
    {
      id: 1,
      type: 'full', // Full Width Banner
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Gen-Z Fashion For All',
      subtitle: 'fwd',
      offer: 'UNDER ₹999',
      buttonText: 'SHOP NOW >',
      link: '/fwd'
    },
    {
      id: 2,
      type: 'split', // Image + Text Banner
      image: 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1200',
      brandName: 'U.S. POLO ASSN.',
      offer: 'Up To 50% Off',
      link: '/brand/us-polo'
    },
    {
      id: 3,
      type: 'split',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
      brandName: 'HANDBAGS',
      offer: 'Min. 60% Off',
      brandLogo: 'CAPRESE',
      link: '/category/handbags'
    },
    {
      id: 4,
      type: 'split',
      image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
  <div className="relative z-10 text-center max-w-xl mx-auto space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-2xl md:text-3xl tracking-[0.2em] font-extrabold underline bg-clip-text text-[#e0a76d] uppercase">
      SHOP BY CATEGORY
    </h2>
    <p className="text-[#c99a66] text-xs md:text-sm font-medium tracking-wide">
      Handpicked apparel designed for comfort and modern style
    </p>
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-8 gap-4">
    {[
     
  {
    id: 1,
    name: "Casual Wear",
    offer: "40-80% OFF",
    image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/men'
  },
  {
    id: 2,
    name: "Ethnic Wear",
    offer: "50-80% OFF",
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/women'
  },
  {
    id: 3,
    name: "Winter Wear",
    offer: "30-70% OFF",
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/men'
  },
  {
    id: 4,
    name: "Western Wear",
    offer: "40-80% OFF",
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/women'
  },
  {
    id: 5,
    name: "Full Sleeve Tees",
    offer: "40-60% OFF",
    image: 'https://ttbazaar.com/cdn/shop/files/34_452f652d-56a8-4426-b976-f5ce432e1c6f.jpg?v=1760328571',
    href: '/men',
  }, 
  {
    id: 6,
    name: "Layered Shirts",
    offer: "30-60% OFF",
    image: 'https://www.twills.in/cdn/shop/files/E-20848-9393_2_2048x.jpg?v=1747652670',
    href: '/men',
  },
  {
    id: 7,
    name: "Sportswear",
    offer: "30-80% OFF",
    image: 'https://izzyapparel.com/wp-content/uploads/2024/01/Website-1-mob-min.jpg',
    href: '/men',
  },
  {
    id: 8,
    name: "High Neck Tops",
    offer: "UP TO 50% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTko5-kThqKd2e9ION8jd8vPByyqhM6_JcdUeZhlftR5XCNNvMp_hSAmFYe&s=10',
    href: '/men',
  },
  {
    id: 9,
    name: "Innerwear",
    offer: "UP TO 70% OFF",
    image: 'https://img.tatacliq.com/images/i30/437Wx649H/MP000000030018468_437Wx649H_202602081818291.jpeg',
    href: '/men',
  },
  {
    id: 10,
    name: "Polo Wear",
    offer: "40-70% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqqHGjjC0IuGjQ0IiknCfGl_2Il_SOb3Hmp0ckqLn2A&s=10',
    href: '/men',
  },
  {
    id: 11,
    name: "Kids Wear",
    offer: "30-70% OFF",
    image: 'https://t4.ftcdn.net/jpg/03/51/36/87/360_F_351368733_Fa4b4G0LmmR4jQmlcChzgVmnuGm0SLFY.jpg',
    href: '/kids',
  },
  {
    id: 12,
    name: "Inclusive Style",
    offer: "40-80% OFF",
    image: 'https://www.stitchfix.com/men/blog/wp-content/uploads/2021/08/21-03-30_M_OF_V15_0069_2x3-683x1024.jpeg',
    href: '/men',
  },
  {
    id: 13,
    name: "Work Wear",
    offer: "30-70% OFF",
    image: 'https://www.marksandspencer.in/on/demandware.static/-/Sites-mnsindia-Library/en_IN/dw58144f8c/mns-india-homepage/2022/easy-office-outfit-ideas-for-him-and-herImage1.jpg',
    href: '/men',
  },
  {
    id: 14,
    name: "Sleepwear",
    offer: "40-60% OFF",
    image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301079023ELDERBERRY_1_800x.jpg?v=1785924014&width=700&height=933&crop=center',
    href: '/women',
  },
  {
    id: 15,
    name: "Beauty & Makeup",
    offer: "UP TO 60% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGC7Dt5sRFn39MfypHGGlgSJ0VXdpUDdRi8bMgRCnu-A&s=10',
    href: '/beauty'
  },
  {
    id:16,
    name: "Size-inclusive Styles",
    offer:"UP to 30%-50%",
    image:'https://www.lindseybrown.com/cdn/shop/files/AquasilktiedyesilkkaftantowearonholidaybyLindseyBrownluxuryresortwear_c479d089-6443-499c-82a6-a171bfca6fd9.jpg?v=1758041571&width=2048',
    href:'women',
  }

      
      
    ].map((item) => (
      <Link 
  key={item.id} 
  href={item.href} 
  className="group bg-[#fff8f5] border-4 border-[#fbdbca] hover:border-[#e0a96d] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col max-w-[220px] mx-auto w-full text-center"
>
  {/* Image Box - Clean Fit without cutting */}
  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 p-1">
    <img 
      src={item.image} 
      alt={item.name} 
      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Product Details - Myntra Minimalist Offer Style */}
  <div className="p-2.5 bg-[#fff8f5] flex flex-col items-center justify-center space-y-0.5 border-t border-[#fce8de]">
    {/* Title / Category Name */}
    <h3 className="text-xs font-semibold text-gray-800 line-clamp-1">
      {item.name}
    </h3>

    {/* Main Highlighted Offer */}
    <div className="text-sm font-black text-black tracking-tight uppercase">
      {item.offer || '30-70% OFF'}
    </div>

    {/* Action Text */}
    <span className="text-[11px] font-bold text-gray-700 group-hover:text-[#f97316] group-hover:underline">
      Shop Now
    </span>
  </div>
</Link>
    ))}
  </div>
</section>

    </main>
  );
}