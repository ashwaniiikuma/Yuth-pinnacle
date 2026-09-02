"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Kid() {
  
 

 const slides = [
    {
      id: 1,
      type: 'full', // Full Width Banner
      image: 'https://media.istockphoto.com/id/506317910/photo/beautiful-little-girl-model-wearing-a-leopard-dress-and-sunglass.jpg?s=612x612&w=0&k=20&c=KrrWf0Leaw9Zvgb3vpMVks-zvbY86VgZRVMjUxzdwsY=',
      title: 'KIDWEAR',
      subtitle: 'fwd',
      offer: 'UNDER ₹999',
      buttonText: 'SHOP NOW >',
      link: '/fwd'
    },
    {
      id: 2,
      type: 'split', // Image + Text Banner
      image: 'https://media.istockphoto.com/id/172439451/photo/cheerful-little-indian-girls-and-a-boy-isolated-on-white.jpg?s=612x612&w=0&k=20&c=aEZY0iXIFssi0TJHk76TEJIfuKuk-4nYTiM81jkt_LU=',
      brandName: 'TOP BRANDS',
      offer: 'Up To 50% Off',
      link: '/brand/us-polo'
    },
    {
      id: 3,
      type: 'split',
      image: 'https://media.istockphoto.com/id/1293357713/photo/short-child-boy-in-red-t-shirt-and-tall-child-boy-in-white-t-shirt-standing-arms-crossed-and.jpg?s=612x612&w=0&k=20&c=AYVxOuZI0jXjh1lv8sNsMm5oEYpUGeI1zdC39Cy52GM=',
      brandName: 'KIDS TSHIRT&SHORTS',
      offer: 'Min. 60% Off',
      brandLogo: 'CAPRESE',
      link: '/category/handbags'
    },
    {
      id: 4,
      type: 'split',
      image: 'https://media.istockphoto.com/id/915681134/photo/cute-boy-in-the-underwear.jpg?s=612x612&w=0&k=20&c=R9dGDP7dLtWdUrGZI9Y0T7jOb0pbtfZDj-vsGKrK-tk=',
      brandName: 'INNERWEAR',
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
    <h2 className="text-xl md:text-3xl text-left md:tracking-[0.2em] tracking-wide font-bold   bg-clip-text text-gray-800 uppercase">
      Fession & Essiancial
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-10 gap-4">
    {[
     {
      id: 1,
      name: "PROTECTIVE MASK",
      image:'https://m.media-amazon.com/images/I/61tNVVkzt6L._AC_UF1000,1000_QL80_.jpg',
      href: '/products/women'
    },
    {
      id: 2,
      name: "BABY CARE",
      image: 'https://images-static.nykaa.com/media/catalog/product/5/f/5fec660MAJAB00000226_01.jpg',
      href: '/products/kid'
    },
    {
      id: 3,
      name: "SHORTS",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9RhgrL_RPRtNxmdoSbA14-PojjuDLBKacjzDDg0gwg&s=10',
      href: '/products/kid'
    },
    {
      id: 4,
      name: "VALUE PACKS & SETS",
      image: 'https://img.tatacliq.com/images/i19//437Wx649H/MP000000023415413_437Wx649H_202408241343211.jpeg',
      href: '/products/kid'
    },
    {
      id: 5,
      name: "SLEEPWEAR & INNERWEAR",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB80w9jwi16dPyn1sRMBzicpnUgaXPl3_aR1BYIbs6U2nP0cwKdC_xuR0&s=10',
      href: '/products/kid',
    }, 
    {
      id: 6,
      name: "ETHNIC WEAR",
      image: 'https://mokshaaworld.com/cdn/shop/files/BJK9436-2.jpg?v=1772998687&width=2981',
      href: '/products/kid',
    },
    {
      id: 7,
      name: "ONESIES",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXB8-Klkbhu54bhH8C6l1p0VxvPc0oQNv0fQXyimXoOJFRhrDCdyfQSM&s=10',
      href: '/products/kid',
    },
    {
      id: 8,
      name: "FLIP-FLOP & SANDLS",
      image: 'https://purpleunited.com/cdn/shop/files/TGSAFW000657-PINK-1.jpg?v=1775304545&width=450',
      href: '/products/kid',
    },
    {
      id: 9,
      name: "DRESSES",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrBOYwZdbSN89gY9RMgVh_uwAKp-t6xQvICf0j1iet9Jum9Ukq20qf1Y0&s=10',
      href: '/products/kid',
    },
    {
      id: 10,
      name: "T-SHIRT & TOPS",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbfHUjhbfpO3BKtpG9KAgwr2zW0tDcGLdPTPLFmGrPqw&s=10',
      href: '/products/kid',
    }
 
      
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
      <div className="mt-3 flex items-center justify-center gap-1">
              <span className="text-sm sm:text-base font-extrabold text-[#282c3f] tracking-wider uppercase group-hover:text-blue-600 transition-colors">
                + {item.name}
              </span>
            </div>

    </Link>
    ))}
  </div>
</section>
    {/* //Explore Top brands */}
 <section className="max-w-[1500px] mx-auto px-6 py-12">
  <div className="relative z-10  max-w-6xl mx-auto left-0 space-y-1">
    {/* Metallic Gold Gradient Text */}
    <h2 className="text-xl md:text-3xl text-left md:tracking-[0.2em] tracking-wide font-bold   bg-clip-text text-gray-500 uppercase">
      Eexplore more
    </h2>
    
  </div>


  {/* Garment Products Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-10 gap-4">
    {[
     
 {
    id: 1,
    
    name: "Caps",
  image:'https://giftingshop.in/wp-content/uploads/Images/KidsTshirt/baby-tshirt-cotton-material.jpg',
    href: '/products/kid'
  },
  {
    id: 2,
   
    name: "Ethnic Wear",
    image: 'https://essa.in/cdn/shop/files/b-3846_boys_down_shoulder_t_shirt_dusty_pink.jpg?v=1758349055',
    href: '/products/kid'
  },
  {
    id: 3,
    name: "Winter Wear",
    image:'https://fastcolors.in/cdn/shop/files/FastColors-Full_Sleeve-printed-kids_t_shirt_-_FastColors-4952393.jpg?v=1729849905&width=975',
    href: '/products/kid'
  },
  {
    id: 4,
    name: "Western Wear",
    image:'https://img01.ztat.net/article/spp-media-p1/4e73e81be19f4d9ab47e3a9e681ef70f/902d35e073bd447fbad77603d3169f98.jpg?imwidth=300',
    href: '/products/kid'
  },
    {
    id: 5,
    name: "Western Wear",
      image:'https://i.etsystatic.com/60086255/r/il/ef2830/6955541500/il_570xN.6955541500_t9t3.jpg',
    href: '/products/kid'
  },
    {
    id: 6,
    name: "Western Wear",
    image:'https://img.tatacliq.com/images/i30//437Wx649H/MP000000030368343_437Wx649H_202603071121131.jpeg',
    href: '/products/kid'
  },
   {
    id: 7,
    name: "Western Wear",
    image:'https://manyavar.scene7.com/is/image/manyavar/CHOSK719-311+(4)_07-05-2025-13-01:283x395?dpr=on,2.625',
    href: '/products/kid'
  },
   {
    id: 8,
    name: "Western Wear",
    image:'https://5.imimg.com/data5/GLADMIN/Default/2021/8/GF/BA/KC/76258/kids-formal-wear-250x250.jpg',
    href: '/products/kid'
  }

  
 
      
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
      
      {/* CATEGORY NAME (SUBTITLE) */}
      <span className="text-[11px] text-gray-500 line-clamp-1 mb-1">
        {item.name}
      </span>

      {/* OFFER TEXT */}
     
    </Link>
    ))}
  </div>
</section>


    </main>
  );
}