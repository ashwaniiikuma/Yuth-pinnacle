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
    image: 'https://as1.ftcdn.net/v2/jpg/08/94/53/18/1000_F_894531857_IOrY15wTvOR9MPd36exueZZcXK2B5EUi.jpg',
    title: 'LUXURY SKINCARE & GLOW',
    subtitle: 'BEAUTY EDIT',
    offer: 'UNDER ₹999',
    buttonText: 'SHOP NOW >',
    link: '/products/beauty'
  },
  {
    id: 2,
    type: 'split', // Image + Text Banner
    image: 'https://as2.ftcdn.net/v2/jpg/03/72/21/29/1000_F_372212921_l0wtrUbGY168QTCIRHp1W02ug8CVuWSV.jpg',
    brandName: 'MAYBELLINE & MORE',
    offer: 'Up To 50% Off',
    link: '/products/beauty'
  },
  {
    id: 3,
    type: 'split',
    image: 'https://as2.ftcdn.net/v2/jpg/09/12/42/25/1000_F_912422517_FpN9POkRRAiQ4s5J9s1JmPRyb8OOOUJy.jpg',
    brandName: 'PREMIUM PERFUMES',
    offer: 'Min. 60% Off',
    brandLogo: 'FRAGRANCE',
    link: '/products/beauty'
  },
  {
    id: 4,
    type: 'split',
    image: 'https://as2.ftcdn.net/v2/jpg/07/11/01/35/1000_F_711013584_RHmRinXNS7d2NLHvw3Qe0LXwQrQia4h6.jpg',
    brandName: 'HAIR & FACE SERUMS',
    offer: '40-70% Off',
    subText: 'Vitamin C | Retinol & More',
    link: '/products/beauty'
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
          <div className="relative w-full h-full flex object-cover items-center justify-between px-6 md:px-16 bg-amber-200/40">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-contain z-0"
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
  <div className="relative z-10 max-w-6xl mx-auto left-0 space-y-1 mb-8">
    {/* Heading */}
    <h2 className="text-xl md:text-3xl text-left md:tracking-[0.2em] tracking-wide font-bold text-gray-800 hover:text-gray-700 uppercase">
      Top 10 beauty buy
    </h2>
  </div>

  {/* Beauty Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-4 gap-4 max-w-6xl mx-auto">
    {[
      {
        id: 1,
        name: "Body Lotion",
        offer: "40-80% OFF",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8v8iHPldBjZJecfrmW_DsGDZAMWH-QT6_pRMDE0WEz46zUlGwzbs7oGE&s=10',
        href: '/products/beauty'
      },
      {
        id: 2,
        name: "Ani Hairfall Shampoo",
        offer: "50-80% OFF",
        image: 'https://thevaanabeauty.com/wp-content/uploads/2025/04/RosemaryAnti-HairfallShampoo_1080X1080__0008_3-PRODUCTIMAGE1-600x600.jpg',
        href: '/products/beauty'
      },
      {
        id: 3,
        name: "Maybelline foundation",
        offer: "30-70% OFF",
        image: 'https://m.media-amazon.com/images/I/711t9wxyobL._AC_UF1000,1000_QL80_.jpg',
        href: '/product/beauty'
      },
      {
        id: 4,
        name: "Face serum",
        offer: "40-80% OFF",
        image: 'https://7daysnatural.in/cdn/shop/files/Vitamin_C_Serum_for_Pigmentation.jpg?v=1786006774&width=1780',
        href: '/product/beauty'
      },
      {
        id: 5,
        name: "COCO Perfume",
        offer: "40-60% OFF",
        image: 'https://vader-prod.s3.amazonaws.com/1763745682-2055112.png',
        href: '/product/beauty',
      }, 
      {
        id: 6,
        name: "Hair serum",
        offer: "30-60% OFF",
        image: 'https://images-static.nykaa.com/media/catalog/product/7/f/7f508aaL_8901088062398_1.jpg?tr=w-500',
        href: '/product/beauty',
      },
      {
        id: 7,
        name: "talc",
        offer: "30-80% OFF",
        image: 'https://m.media-amazon.com/images/I/41Y7FvcxRBL._SR559,533_.jpg',
        href: '/product/beauty',
      },
      {
        id: 8,
        name: "DENVER DEODORANT",
        offer: "UP TO 50% OFF",
        image: 'https://assets.myntassets.com/assets/images/2025/SEPTEMBER/26/4QlAC7pr_5031b57ac1c043b9bb0cb9a1b192a6c8.jpg',
        href: '/product/beauty',
      },
    ].map((item) => (
      <Link 
        key={item.id} 
        href={item.href} 
        className="group relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-[#332b1e] hover:border-[#d4af37] transition-all duration-300 block"
      >
        {/* Background Image with Zoom effect */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay at the bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Text Content Overlayed on Image */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-center text-center z-10">
          <span className="text-[10px] text-gray-300 font-medium tracking-wide line-clamp-1 mb-0.5">
            {item.name}
          </span>
          <span className="text-sm md:text-base font-extrabold text-white tracking-wider uppercase drop-shadow-md">
            {item.offer || '30-70% OFF'}
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>

<section className="max-w-[1500px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-xl md:text-3xl text-left md:tracking-[0.2em] tracking-wide font-bold   bg-clip-text text-gray-700 uppercase">
      Tranding brands
    </h2>
    
  </div>

  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-4 gap-4 max-w-6xl mx-auto">

    {[
     
  {
    id: 1,
    name: "cetaphil",
    offer: "40-80% OFF",
    image: 'https://www.skinhealthandyou.com/cdn/shop/files/GRC100gFoP.jpg?v=1774081204&width=1946',
    href: '/products/beauty'
  },
  {
    id: 2,
    name: "HYPHEN",
    offer: "50-80% OFF",
    image: 'https://letshyphen.com/cdn/shop/files/0.5___retinal_serum_copy.jpg?v=1737977589&width=533',
    href: '/products/beauty'
  },
  {
    id: 3,
    name: "SWISS BEAUTY",
    offer: "30-70% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfe_YIAxV7MRREYUq1d7ThkkrZ3DpXVj7xWiPIDKQ1G_U28vVbn7Txw&s=10',
    href: '/product/beauty'
  },
  {
    id: 4,
    name: "EZE PERFUME",
    offer: "40-80% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZzTPEUJw3z7c8iblmHgOSqMceiGcpROXtCAMPpDLASa9BS5HlBsM9nvGT&s=10',
    href: '/product/beauty'
  },
  {
    id: 5,
    name: "ARABIAN AROMA",
    offer: "40-60% OFF",
    image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/x/0/0/-original-imahdpwfbhzzhn6w.jpeg?q=90',
    href: '/product/beauty',
  }, 
  {
    id: 6,
    name: "REBOOK",
    offer: "30-60% OFF",
    image: 'https://m.media-amazon.com/images/I/41IXwEgaOKL._SL1000_.jpg',
    href: '/product/beauty',
  },
  
 
      
    ].map((item) => (
     <Link 
        key={item.id} 
        href={item.href} 
        className="group relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-[#332b1e] hover:border-[#d4af37] transition-all duration-300 block"
      >
        {/* Background Image with Zoom effect */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay at the bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Text Content Overlayed on Image */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-center text-center z-10">
          <span className="text-[10px] text-gray-300 font-medium tracking-wide line-clamp-1 mb-0.5">
            {item.name}
          </span>
          <span className="text-sm md:text-base font-extrabold text-white tracking-wider uppercase drop-shadow-md">
            {item.offer || '30-70% OFF'}
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>

 <section className="max-w-[1500px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-xl md:text-3xl text-left md:tracking-[0.2em] tracking-wide font-bold   bg-clip-text text-gray-600 uppercase">
      Premium picks
    </h2>
    
  </div>

  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-8 gap-4 max-w-6xl mx-auto">
    {[
     
  {
    id: 1,
    name: "THE BODYSOAP",
    offer: "40-80% OFF",
    image: 'https://media.thebodyshop.in/media/catalog/product/l/o/lotus_1_1_4kbjprcoxy9mlyo8.jpg',
    href: '/products/beauty'
  },
  {
    id: 2,
    name: "L'OREAL",
    offer: "50-80% OFF",
    image: 'https://images.apollo247.in/pub/media//catalog/product/l/o/lor0527_1_.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w',
    href: '/products/beauty'
  },
  {
    id: 3,
    name: "NAUTICA",
    offer: "30-70% OFF",
    image: 'https://belvish.com/cdn/shop/products/Nautica-_E2_80_93-Blue-EDT-1.jpg?v=1705610939',
    href: '/product/beauty'
  },
  {
    id: 4,
    name: "The FACE SHOP",
    offer: "40-80% OFF",
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/rc-upload-1784884680302-855.png',
    href: '/product/beauty'
  },
  {
    id: 5,
    name: "TIRTIR",
    offer: "40-60% OFF",
    image: 'https://m.media-amazon.com/images/I/71SEwHpsRbL._AC_UF894,1000_QL80_.jpg',
    href: '/product/beauty',
  }, 
  {
    id: 6,
    name: "D'ALBA",
    offer: "30-60% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcWhCxZFbBqVoya23M5TC9lhWD0xvLhrMFb-fWY6rseg&s',
    href: '/product/beauty',
  },
  {
    id: 7,
    name: "MATRIX",
    offer: "30-80% OFF",
    image: 'https://pinkbliss.in/wp-content/uploads/2023/05/Matrix-Mega-Smooth-Shampoo-200ml-Conditioner-98g-and-Serum-100ml.webp',
    href: '/product/beauty',
  },
  {
    id: 8,
    name: "BEAUTY OF JOSEAN",
    offer: "UP TO 50% OFF",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxfo5T9MBPscsD4CSkjtJhp3BJ-PaN5dfpMdgs3sjCRqE4Cwx0Zn6K4g&s=10',
    href: '/product/beauty',
  },
 


      
      
    ].map((item) => (
     <Link 
        key={item.id} 
        href={item.href} 
        className="group relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-[#332b1e] hover:border-[#d4af37] transition-all duration-300 block"
      >
        {/* Background Image with Zoom effect */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay at the bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Text Content Overlayed on Image */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-center text-center z-10">
          <span className="text-[10px] text-gray-300 font-medium tracking-wide line-clamp-1 mb-0.5">
            {item.name}
          </span>
          <span className="text-sm md:text-base font-extrabold text-white tracking-wider uppercase drop-shadow-md">
            {item.offer || '30-70% OFF'}
          </span>
        </div>
      </Link>
    ))}
  </div>
</section>

    </main>
  );
}