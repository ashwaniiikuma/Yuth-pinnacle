// "use client";
// import Link from "next/link";
// import { Search, User, Heart, ShoppingBag } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [mobile, setMobile] = useState('');

//   useEffect(() => {
//     // LocalStorage se exact values read karna
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     const savedMobile = localStorage.getItem("userMobile"); // Name match updated

//     if (loggedInStatus === "true" && savedMobile) {
//       setIsLoggedIn(true);
//       setMobile(savedMobile);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userMobile");
//     setIsLoggedIn(false);
//     window.location.reload();
//   };
//   return (
//     <nav className="bg-[#0f0f10] border-b border-[#332b1e] text-amber-50 sticky top-0 z-50 shadow-md">
//       <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 h-20">
        
//         {/* Left Section: Logo, Search & Categories */}
//         <div className="flex items-center gap-8 lg:gap-10 h-full">
//           {/* Logo */}
//           <Link href="/" className="flex items-center shrink-0">
//             <Image
//               src="/IMG-20260808-WA0003.jpg"
//               alt="Youth Pinnacle Logo"
//               width={180}
//               height={50}
//               className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
//               priority
//             />
//           </Link>

//           {/* Expandable Search Bar (Gold Luxury Style) */}
//           <div className="relative flex items-center group">
//             <div className="flex items-center bg-[#1a1917] rounded-2xl p-2.5 transition-all duration-300 ease-in-out w-9 group-hover:w-64 lg:group-hover:w-72 focus-within:w-64 lg:focus-within:w-72 focus-within:bg-[#1a1917] focus-within:ring-1 focus-within:ring-[#d4af37] overflow-hidden border border-[#332b1e]">
//               <Search size={18} className="text-[#d4af37] min-w-[18px] shrink-0 cursor-pointer" />
//               <input
//                 type="text"
//                 placeholder="Search luxury products..."
//                 className="bg-transparent border-none outline-none text-xs w-full text-amber-100 placeholder-amber-200/40 ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
//               />
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <ul className="hidden md:flex items-center gap-6 lg:gap-8 h-full font-semibold text-sm tracking-wider">
            
//             {/* MEN Category */}
//             <li className="group h-full flex items-center relative">
//               <Link
//                 href="/men"
//                 className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
//               >
//                 MEN
//               </Link>

//               {/* Mega Dropdown Panel (Dark Gold) */}
//               <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                    <div>
//   <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
//   <ul className="space-y-1.5 text-gray-400">
//     <li>
//       <Link href="/products?category=men&subcategory=t-shirts" className="hover:text-[#e0a96d] transition-colors">
//         T-Shirts
//       </Link>
//     </li>
//     <li>
//       <Link href="/products?category=men&subcategory=casual-shirts" className="hover:text-[#e0a96d] transition-colors">
//         Casual Shirts
//       </Link>
//     </li>
//     <li>
//       <Link href ="/products?category=men&subcategory=formal-shirts" className="hover:text-[#e0a96d] transition-colors">
//         Formal Shirts
//       </Link>
//     </li>
//     <li>
//       <Link href ="/products?category=men&subcategory=sweatshirts" className="hover:text-[#e0a96d] transition-colors">
//         Sweatshirts
//       </Link>
//     </li>
//     <li>
//       <Link href="/products?category=men&subcategory=jackets" className="hover:text-[#e0a96d] transition-colors">
//         Jackets
//       </Link>
//     </li>
//   </ul>
// </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>

//             {/* WOMEN Category */}
//            <li className="group h-full flex items-center relative">
//   <Link 
//     href="/women" 
//     className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
//   >
//     WOMEN
//   </Link>
  
//   <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//     <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
      
//       {/* 1. ETHNIC WEAR */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Indian & Ethnic</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/women/kurtas" className="hover:text-[#e0a96d] transition-colors">Kurtas & Suits</Link></li>
//             <li><Link href="/women/ethnic-sets" className="hover:text-[#e0a96d] transition-colors">Sarees & Lehengas</Link></li>
//             <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Dupattas & Shawls</Link></li>
//             <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Ethnic Bottoms</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 2. WESTERN WEAR */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Western Wear</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/women/dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Jumpsuits</Link></li>
//             <li><Link href="/women/tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
//             <li><Link href="/women/jeans" className="hover:text-[#e0a96d] transition-colors">Jeans & Trousers</Link></li>
//             <li><Link href="/women/jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Shrugs</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 3. FOOTWEAR */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/women/flats" className="hover:text-[#e0a96d] transition-colors">Flats & Sandals</Link></li>
//             <li><Link href="/women/heels" className="hover:text-[#e0a96d] transition-colors">Heels & Wedges</Link></li>
//             <li><Link href="/women/sneakers" className="hover:text-[#e0a96d] transition-colors">Casual Sneakers</Link></li>
//             <li><Link href="/women/ethnic-footwear" className="hover:text-[#e0a96d] transition-colors">Juttis & Mojaris</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 4. SLEEP & ACTIVE WEAR */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active & Sleepwear</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/women/activewear" className="hover:text-[#e0a96d] transition-colors">Sports Wear & Leggings</Link></li>
//             <li><Link href="/women/nightwear" className="hover:text-[#e0a96d] transition-colors">Nightwear & Loungewear</Link></li>
//             <li><Link href="/women/innerwear" className="hover:text-[#e0a96d] transition-colors">Innerwear & Lingerie</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 5. ACCESSORIES & BAGS */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bags & Beauty</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/women/handbags" className="hover:text-[#e0a96d] transition-colors">Handbags & Clutches</Link></li>
//             <li><Link href="/women/jewellery" className="hover:text-[#e0a96d] transition-colors">Fashion Jewellery</Link></li>
//             <li><Link href="/women/beauty" className="hover:text-[#e0a96d] transition-colors">Makeup & Perfumes</Link></li>
//           </ul>
//         </div>
//       </div>

//     </div>
//   </div>
// </li>
//             <li className="h-full group flex items-center relative">
//   <Link 
//     href="/kid" 
//     className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
//   >
//     KIDS
//   </Link>

//   <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//     <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
      
//       {/* 1. BOYS CLOTHING */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Boys Clothing</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/kid/boys-tshirts" className="hover:text-[#e0a96d] transition-colors">T-Shirts & Shirts</Link></li>
//             <li><Link href="/kid/boys-shorts" className="hover:text-[#e0a96d] transition-colors">Shorts & Jeans</Link></li>
//             <li><Link href="/kid/boys-ethnic" className="hover:text-[#e0a96d] transition-colors">Ethnic Wear & Kurtas</Link></li>
//             <li><Link href="/kid/boys-jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Sweatshirts</Link></li>
//             <li><Link href="/kid/boys-trackpants" className="hover:text-[#e0a96d] transition-colors">Track Pants & Pyjamas</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 2. GIRLS CLOTHING */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Girls Clothing</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/kid/girls-dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Frocks</Link></li>
//             <li><Link href="/kid/girls-tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
//             <li><Link href="/kid/girls-lehengas" className="hover:text-[#e0a96d] transition-colors">Lehenga Choli & Ethnic</Link></li>
//             <li><Link href="/kid/girls-leggings" className="hover:text-[#e0a96d] transition-colors">Tights & Leggings</Link></li>
//             <li><Link href="/kid/girls-jumpsuits" className="hover:text-[#e0a96d] transition-colors">Jumpsuits & Dungarees</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 3. INFANTS & BABY CARE */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Infants & Babies</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/kid/onesies" className="hover:text-[#e0a96d] transition-colors">Rompers & Onesies</Link></li>
//             <li><Link href="/kid/baby-sets" className="hover:text-[#e0a96d] transition-colors">Clothing Sets</Link></li>
//             <li><Link href="/kid/baby-care" className="hover:text-[#e0a96d] transition-colors">Baby Care & Gifts</Link></li>
//             <li><Link href="/kid/sleepwear" className="hover:text-[#e0a96d] transition-colors">Sleepwear & Innerwear</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 4. KIDS FOOTWEAR */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Kids Footwear</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/kid/casual-shoes" className="hover:text-[#e0a96d] transition-colors">Casual Shoes & Sneakers</Link></li>
//             <li><Link href="/kid/flip-flops" className="hover:text-[#e0a96d] transition-colors">Flip-Flops & Sandals</Link></li>
//             <li><Link href="/kid/sports-shoes" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//             <li><Link href="/kid/school-shoes" className="hover:text-[#e0a96d] transition-colors">School Shoes</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* 5. TOYS & ESSENTIALS */}
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Toys & Essentials</h4>
//           <ul className="space-y-1.5 text-gray-400">
//             <li><Link href="/kid/bags" className="hover:text-[#e0a96d] transition-colors">School Bags & Backpacks</Link></li>
//             <li><Link href="/kid/masks" className="hover:text-[#e0a96d] transition-colors">Protective Masks & Caps</Link></li>
//             <li><Link href="/kid/toys" className="hover:text-[#e0a96d] transition-colors">Toys & Games</Link></li>
//             <li><Link href="/kid/accessories" className="hover:text-[#e0a96d] transition-colors">Hair Accessories & Clips</Link></li>
//           </ul>
//         </div>
//       </div>

//     </div>
//   </div>
// </li>

//             <li className="h-full group flex items-center">
//               <Link 
//                 href="/beauty" 
//                 className="h-full flex items-center  text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
//               >
//                 BEAUTY
//               </Link>
//                <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Formal Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sweatshirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jackets</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>

//           </ul>
//         </div>

//         {/* Right Section: Actions */}
//         <div className="flex items-center gap-3 sm:gap-4">
          
//           {/* Account */}
//  <div className="relative group py-2">
      
//       {/* ACCOUNT / PROFILE BUTTON */}
//       <Link 
//         href={isLoggedIn ? "/profile" : "/login"} 
//         className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#d4af37] rounded-lg text-[#d4af37] bg-[#161514]"
//       >
//         <User size={18} className="text-[#d4af37]" />
//         <span className="hidden sm:inline">
//           {isLoggedIn ? 'Profile' : 'Account'}
//         </span>
//       </Link>

//       {/* DROPDOWN MENU */}
//       <div className="hidden group-hover:block absolute right-0 top-full pt-2 w-64 z-50">
//         <div className="bg-[#121214] border border-[#2a2928] shadow-2xl rounded-xl p-5 text-xs font-normal text-gray-300 space-y-4">
          
//           {/* ================= CONDITION 1: NOT LOGGED IN ================= */}
//           {!isLoggedIn ? (
//             <div>
//               <h2 className="font-bold text-white text-base">Welcome</h2>
//               <p className="text-gray-400 text-[11px] mt-0.5 mb-3">
//                 To access account and manage orders
//               </p>
              
//               <Link 
//                 href="/login" 
//                 className="block text-center w-full py-2 bg-transparent border border-[#d4af37] text-[#d4af37] font-bold rounded uppercase hover:bg-[#d4af37] hover:text-black transition"
//               >
//                 LOGIN / SIGNUP
//               </Link>
//             </div>
//           ) : (
//             /* ================= CONDITION 2: LOGGED IN ================= */
//             <div>
//               <h2 className="font-bold text-white text-base">Hello User</h2>
//               <p className="text-[#d4af37] font-semibold text-xs mt-0.5">
//                 +91 {mobile}
//               </p>
//             </div>
//           )}

//           <div className="border-t border-[#2a2928]"></div>

//           {/* COMMON LINKS */}
//           <ul className="space-y-3 font-semibold text-gray-200">
//             <li><Link href="/orders" className="hover:text-[#d4af37] transition">Orders</Link></li>
//             <li><Link href="/wishlist" className="hover:text-[#d4af37] transition">Wishlist</Link></li>
//             <li><Link href="/gift-cards" className="hover:text-[#d4af37] transition">Gift Cards</Link></li>
//             <li><Link href="/contact" className="hover:text-[#d4af37] transition">Contact Us</Link></li>
//           </ul>

//           {/* LOGOUT BUTTON */}
//           {isLoggedIn && (
//             <>
//               <div className="border-t border-[#2a2928]"></div>
//               <div>
//                 <button 
//                   onClick={handleLogout}
//                   className="text-red-400 hover:text-red-300 transition font-semibold w-full text-left cursor-pointer"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}

//         </div>
//       </div>

//     </div>
//           {/* Wishlist */}
//           <Link 
//             href="/wishlist" 
//             className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#332b1e] rounded-lg hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-gray-300 bg-[#161514]"
//           >
//             <Heart size={18} className="text-[#e0a96d]" />
//             <span className="hidden sm:inline">Wishlist</span>
//           </Link>

//           {/* Cart Button with Gold Metallic Gradient */}
//           <Link 
//             href="/cart" 
//             className="flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-md shadow-[#d4af37]/10 active:scale-95"
//           >
//             <ShoppingBag size={18} />
//             <span>Cart</span>
//             <span className="bg-black text-[#d4af37] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//               0
//             </span>
//           </Link>
          
//         </div>

//       </div>
//     </nav>
//   );
// }

// "use client";
// import Link from "next/link";
// import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [mobile, setMobile] = useState('');
  
//   // Mobile drawer and submenu states
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeMobileCategory, setActiveMobileCategory] = useState(null);

//   useEffect(() => {
//     // LocalStorage se exact values read karna
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     const savedMobile = localStorage.getItem("userMobile"); // Name match updated

//     if (loggedInStatus === "true" && savedMobile) {
//       setIsLoggedIn(true);
//       setMobile(savedMobile);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userMobile");
//     setIsLoggedIn(false);
//     window.location.reload();
//   };

//   const toggleMobileSubmenu = (category) => {
//     setActiveMobileCategory(activeMobileCategory === category ? null : category);
//   };

//   return (
//     <nav className="bg-[#0f0f10] border-b border-[#332b1e] text-amber-50 sticky top-0 z-50 shadow-md">
//       <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 h-20">
        
//         {/* Left Section: Mobile Menu Icon, Logo, Search & Categories */}
//         <div className="flex items-center gap-4 lg:gap-10 h-full">
          
//           {/* Mobile Hamburger Toggle */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-[#d4af37] focus:outline-none p-1"
//           >
//             {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>

//           {/* Logo */}
//           <Link href="/" className="flex items-center shrink-0">
//             <Image
//               src="/IMG-20260808-WA0003.jpg"
//               alt="Youth Pinnacle Logo"
//               width={180}
//               height={50}
//               className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
//               priority
//             />
//           </Link>

//           {/* Expandable Search Bar (Gold Luxury Style) */}
//           <div className="relative flex items-center group">
//             <div className="flex items-center bg-[#1a1917] rounded-2xl p-2.5 transition-all duration-300 ease-in-out w-9 group-hover:w-64 lg:group-hover:w-72 focus-within:w-64 lg:focus-within:w-72 focus-within:bg-[#1a1917] focus-within:ring-1 focus-within:ring-[#d4af37] overflow-hidden border border-[#332b1e]">
//               <Search size={18} className="text-[#d4af37] min-w-[18px] shrink-0 cursor-pointer" />
//               <input
//                 type="text"
//                 placeholder="Search luxury products..."
//                 className="bg-transparent border-none outline-none text-xs w-full text-amber-100 placeholder-amber-200/40 ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
//               />
//             </div>
//           </div>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden md:flex items-center gap-6 lg:gap-8 h-full font-semibold text-sm tracking-wider">
            
//             {/* MEN Category */}
//             <li className="group h-full flex items-center relative">
//               <Link
//                 href="/men"
//                 className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
//               >
//                 MEN
//               </Link>

//               {/* Mega Dropdown Panel (Dark Gold) */}
//               <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li>
//                           <Link href="/products?category=men&subcategory=t-shirts" className="hover:text-[#e0a96d] transition-colors">
//                             T-Shirts
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/products?category=men&subcategory=casual-shirts" className="hover:text-[#e0a96d] transition-colors">
//                             Casual Shirts
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/products?category=men&subcategory=formal-shirts" className="hover:text-[#e0a96d] transition-colors">
//                             Formal Shirts
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/products?category=men&subcategory=sweatshirts" className="hover:text-[#e0a96d] transition-colors">
//                             Sweatshirts
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/products?category=men&subcategory=jackets" className="hover:text-[#e0a96d] transition-colors">
//                             Jackets
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>

//             {/* WOMEN Category */}
//             <li className="group h-full flex items-center relative">
//               <Link 
//                 href="/women" 
//                 className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
//               >
//                 WOMEN
//               </Link>
              
//               <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Indian & Ethnic</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/women/kurtas" className="hover:text-[#e0a96d] transition-colors">Kurtas & Suits</Link></li>
//                         <li><Link href="/women/ethnic-sets" className="hover:text-[#e0a96d] transition-colors">Sarees & Lehengas</Link></li>
//                         <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Dupattas & Shawls</Link></li>
//                         <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Ethnic Bottoms</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Western Wear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/women/dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Jumpsuits</Link></li>
//                         <li><Link href="/women/tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
//                         <li><Link href="/women/jeans" className="hover:text-[#e0a96d] transition-colors">Jeans & Trousers</Link></li>
//                         <li><Link href="/women/jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Shrugs</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/women/flats" className="hover:text-[#e0a96d] transition-colors">Flats & Sandals</Link></li>
//                         <li><Link href="/women/heels" className="hover:text-[#e0a96d] transition-colors">Heels & Wedges</Link></li>
//                         <li><Link href="/women/sneakers" className="hover:text-[#e0a96d] transition-colors">Casual Sneakers</Link></li>
//                         <li><Link href="/women/ethnic-footwear" className="hover:text-[#e0a96d] transition-colors">Juttis & Mojaris</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active & Sleepwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/women/activewear" className="hover:text-[#e0a96d] transition-colors">Sports Wear & Leggings</Link></li>
//                         <li><Link href="/women/nightwear" className="hover:text-[#e0a96d] transition-colors">Nightwear & Loungewear</Link></li>
//                         <li><Link href="/women/innerwear" className="hover:text-[#e0a96d] transition-colors">Innerwear & Lingerie</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bags & Beauty</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/women/handbags" className="hover:text-[#e0a96d] transition-colors">Handbags & Clutches</Link></li>
//                         <li><Link href="/women/jewellery" className="hover:text-[#e0a96d] transition-colors">Fashion Jewellery</Link></li>
//                         <li><Link href="/women/beauty" className="hover:text-[#e0a96d] transition-colors">Makeup & Perfumes</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </li>

//             {/* KIDS Category */}
//             <li className="h-full group flex items-center relative">
//               <Link 
//                 href="/kid" 
//                 className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
//               >
//                 KIDS
//               </Link>

//               <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Boys Clothing</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/kid/boys-tshirts" className="hover:text-[#e0a96d] transition-colors">T-Shirts & Shirts</Link></li>
//                         <li><Link href="/kid/boys-shorts" className="hover:text-[#e0a96d] transition-colors">Shorts & Jeans</Link></li>
//                         <li><Link href="/kid/boys-ethnic" className="hover:text-[#e0a96d] transition-colors">Ethnic Wear & Kurtas</Link></li>
//                         <li><Link href="/kid/boys-jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Sweatshirts</Link></li>
//                         <li><Link href="/kid/boys-trackpants" className="hover:text-[#e0a96d] transition-colors">Track Pants & Pyjamas</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Girls Clothing</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/kid/girls-dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Frocks</Link></li>
//                         <li><Link href="/kid/girls-tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
//                         <li><Link href="/kid/girls-lehengas" className="hover:text-[#e0a96d] transition-colors">Lehenga Choli & Ethnic</Link></li>
//                         <li><Link href="/kid/girls-leggings" className="hover:text-[#e0a96d] transition-colors">Tights & Leggings</Link></li>
//                         <li><Link href="/kid/girls-jumpsuits" className="hover:text-[#e0a96d] transition-colors">Jumpsuits & Dungarees</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Infants & Babies</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/kid/onesies" className="hover:text-[#e0a96d] transition-colors">Rompers & Onesies</Link></li>
//                         <li><Link href="/kid/baby-sets" className="hover:text-[#e0a96d] transition-colors">Clothing Sets</Link></li>
//                         <li><Link href="/kid/baby-care" className="hover:text-[#e0a96d] transition-colors">Baby Care & Gifts</Link></li>
//                         <li><Link href="/kid/sleepwear" className="hover:text-[#e0a96d] transition-colors">Sleepwear & Innerwear</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Kids Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/kid/casual-shoes" className="hover:text-[#e0a96d] transition-colors">Casual Shoes & Sneakers</Link></li>
//                         <li><Link href="/kid/flip-flops" className="hover:text-[#e0a96d] transition-colors">Flip-Flops & Sandals</Link></li>
//                         <li><Link href="/kid/sports-shoes" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//                         <li><Link href="/kid/school-shoes" className="hover:text-[#e0a96d] transition-colors">School Shoes</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Toys & Essentials</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="/kid/bags" className="hover:text-[#e0a96d] transition-colors">School Bags & Backpacks</Link></li>
//                         <li><Link href="/kid/masks" className="hover:text-[#e0a96d] transition-colors">Protective Masks & Caps</Link></li>
//                         <li><Link href="/kid/toys" className="hover:text-[#e0a96d] transition-colors">Toys & Games</Link></li>
//                         <li><Link href="/kid/accessories" className="hover:text-[#e0a96d] transition-colors">Hair Accessories & Clips</Link></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>

//             {/* BEAUTY Category */}
//             <li className="h-full group flex items-center">
//               <Link 
//                 href="/beauty" 
//                 className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
//               >
//                 BEAUTY
//               </Link>
//               <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Formal Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sweatshirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jackets</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
//                       <ul className="space-y-1.5 text-gray-400">
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
//                         <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>

//           </ul>
//         </div>

//         {/* Right Section: Actions */}
//         <div className="flex items-center gap-3 sm:gap-4">
          
//           {/* Account */}
//           <div className="relative group py-2">
//             <Link 
//               href={isLoggedIn ? "/profile" : "/login"} 
//               className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#d4af37] rounded-lg text-[#d4af37] bg-[#161514]"
//             >
//               <User size={18} className="text-[#d4af37]" />
//               <span className="hidden sm:inline">
//                 {isLoggedIn ? 'Profile' : 'Account'}
//               </span>
//             </Link>

//             {/* DROPDOWN MENU */}
//             <div className="hidden group-hover:block absolute right-0 top-full pt-2 w-64 z-50">
//               <div className="bg-[#121214] border border-[#2a2928] shadow-2xl rounded-xl p-5 text-xs font-normal text-gray-300 space-y-4">
//                 {!isLoggedIn ? (
//                   <div>
//                     <h2 className="font-bold text-white text-base">Welcome</h2>
//                     <p className="text-gray-400 text-[11px] mt-0.5 mb-3">
//                       To access account and manage orders
//                     </p>
//                     <Link 
//                       href="/login" 
//                       className="block text-center w-full py-2 bg-transparent border border-[#d4af37] text-[#d4af37] font-bold rounded uppercase hover:bg-[#d4af37] hover:text-black transition"
//                     >
//                       LOGIN / SIGNUP
//                     </Link>
//                   </div>
//                 ) : (
//                   <div>
//                     <h2 className="font-bold text-white text-base">Hello User</h2>
//                     <p className="text-[#d4af37] font-semibold text-xs mt-0.5">
//                       +91 {mobile}
//                     </p>
//                   </div>
//                 )}

//                 <div className="border-t border-[#2a2928]"></div>

//                 <ul className="space-y-3 font-semibold text-gray-200">
//                   <li><Link href="/orders" className="hover:text-[#d4af37] transition">Orders</Link></li>
//                   <li><Link href="/wishlist" className="hover:text-[#d4af37] transition">Wishlist</Link></li>
//                   <li><Link href="/gift-cards" className="hover:text-[#d4af37] transition">Gift Cards</Link></li>
//                   <li><Link href="/contact" className="hover:text-[#d4af37] transition">Contact Us</Link></li>
//                 </ul>

//                 {isLoggedIn && (
//                   <>
//                     <div className="border-t border-[#2a2928]"></div>
//                     <div>
//                       <button 
//                         onClick={handleLogout}
//                         className="text-red-400 hover:text-red-300 transition font-semibold w-full text-left cursor-pointer"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Wishlist */}
//           <Link 
//             href="/wishlist" 
//             className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#332b1e] rounded-lg hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-gray-300 bg-[#161514]"
//           >
//             <Heart size={18} className="text-[#e0a96d]" />
//             <span className="hidden sm:inline">Wishlist</span>
//           </Link>

//           {/* Cart Button with Gold Metallic Gradient */}
//           <Link 
//             href="/cart" 
//             className="flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-md shadow-[#d4af37]/10 active:scale-95"
//           >
//             <ShoppingBag size={18} />
//             <span>Cart</span>
//             <span className="bg-black text-[#d4af37] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//               0
//             </span>
//           </Link>

//         </div>

//       </div>

//       {/* ================= MOBILE NAVIGATION DRAWER ================= */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-[#121214] border-b border-[#332b1e] px-6 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          
//           {/* MEN */}
//           <div>
//             <div className="flex justify-between items-center py-2 border-b border-[#2a2928]">
//               <Link href="/men" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-[#d4af37]">
//                 MEN
//               </Link>
//               <button onClick={() => toggleMobileSubmenu('men')} className="text-gray-400">
//                 <ChevronDown size={18} className={`transition-transform ${activeMobileCategory === 'men' ? 'rotate-180' : ''}`} />
//               </button>
//             </div>
//             {activeMobileCategory === 'men' && (
//               <div className="pl-4 py-2 space-y-3 text-xs text-gray-300">
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Topwear</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="/products?category=men&subcategory=t-shirts" onClick={() => setIsMobileMenuOpen(false)}>T-Shirts</Link></li>
//                     <li><Link href="/products?category=men&subcategory=casual-shirts" onClick={() => setIsMobileMenuOpen(false)}>Casual Shirts</Link></li>
//                     <li><Link href="/products?category=men&subcategory=formal-shirts" onClick={() => setIsMobileMenuOpen(false)}>Formal Shirts</Link></li>
//                     <li><Link href="/products?category=men&subcategory=sweatshirts" onClick={() => setIsMobileMenuOpen(false)}>Sweatshirts</Link></li>
//                     <li><Link href="/products?category=men&subcategory=jackets" onClick={() => setIsMobileMenuOpen(false)}>Jackets</Link></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Bottomwear</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Jeans</Link></li>
//                     <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Casual Trousers</Link></li>
//                     <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Track Pants</Link></li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* WOMEN */}
//           <div>
//             <div className="flex justify-between items-center py-2 border-b border-[#2a2928]">
//               <Link href="/women" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-[#d4af37]">
//                 WOMEN
//               </Link>
//               <button onClick={() => toggleMobileSubmenu('women')} className="text-gray-400">
//                 <ChevronDown size={18} className={`transition-transform ${activeMobileCategory === 'women' ? 'rotate-180' : ''}`} />
//               </button>
//             </div>
//             {activeMobileCategory === 'women' && (
//               <div className="pl-4 py-2 space-y-3 text-xs text-gray-300">
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Indian & Ethnic</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="/women/kurtas" onClick={() => setIsMobileMenuOpen(false)}>Kurtas & Suits</Link></li>
//                     <li><Link href="/women/ethnic-sets" onClick={() => setIsMobileMenuOpen(false)}>Sarees & Lehengas</Link></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Western Wear</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="/women/dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses & Jumpsuits</Link></li>
//                     <li><Link href="/women/tops" onClick={() => setIsMobileMenuOpen(false)}>Tops & T-Shirts</Link></li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* KIDS */}
//           <div>
//             <div className="flex justify-between items-center py-2 border-b border-[#2a2928]">
//               <Link href="/kid" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-[#d4af37]">
//                 KIDS
//               </Link>
//               <button onClick={() => toggleMobileSubmenu('kid')} className="text-gray-400">
//                 <ChevronDown size={18} className={`transition-transform ${activeMobileCategory === 'kid' ? 'rotate-180' : ''}`} />
//               </button>
//             </div>
//             {activeMobileCategory === 'kid' && (
//               <div className="pl-4 py-2 space-y-3 text-xs text-gray-300">
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Boys Clothing</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="/kid/boys-tshirts" onClick={() => setIsMobileMenuOpen(false)}>T-Shirts & Shirts</Link></li>
//                     <li><Link href="/kid/boys-shorts" onClick={() => setIsMobileMenuOpen(false)}>Shorts & Jeans</Link></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-[#e0a96d] mb-1">Girls Clothing</p>
//                   <ul className="space-y-1 pl-2 text-gray-400">
//                     <li><Link href="/kid/girls-dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses & Frocks</Link></li>
//                     <li><Link href="/kid/girls-tops" onClick={() => setIsMobileMenuOpen(false)}>Tops & T-Shirts</Link></li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BEAUTY */}
//           <div>
//             <div className="flex justify-between items-center py-2 border-b border-[#2a2928]">
//               <Link href="/beauty" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-[#d4af37]">
//                 BEAUTY
//               </Link>
//             </div>
//           </div>

//         </div>
//       )}
//     </nav>
//   );
// }


"use client";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  
  // Mobile drawer and submenu states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);

  useEffect(() => {
    // LocalStorage se exact values read karna
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const savedMobile = localStorage.getItem("userMobile");

    if (loggedInStatus === "true" && savedMobile) {
      setIsLoggedIn(true);
      setMobile(savedMobile);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userMobile");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMobileSubmenu = (category) => {
    setActiveMobileCategory(activeMobileCategory === category ? null : category);
  };

  return (
    <nav className="bg-[#0f0f10] border-b border-[#332b1e] text-amber-50 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 h-20">
        
        {/* Left Section: Mobile Menu Icon, Logo, Search & Categories */}
        <div className="flex items-center gap-4 lg:gap-10 h-full">
          
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-[#d4af37] focus:outline-none p-1"
          >
            <Menu size={26} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/IMG-20260808-WA0003.jpg"
              alt="Youth Pinnacle Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
              priority
            />
          </Link>

          {/* Expandable Search Bar (Gold Luxury Style) */}
          <div className="relative flex items-center group">
            <div className="flex items-center bg-[#1a1917] rounded-2xl p-2.5 transition-all duration-300 ease-in-out w-9 group-hover:w-64 lg:group-hover:w-72 focus-within:w-64 lg:focus-within:w-72 focus-within:bg-[#1a1917] focus-within:ring-1 focus-within:ring-[#d4af37] overflow-hidden border border-[#332b1e]">
              <Search size={18} className="text-[#d4af37] min-w-[18px] shrink-0 cursor-pointer" />
              <input
                type="text"
                placeholder="Search luxury products..."
                className="bg-transparent border-none outline-none text-xs w-full text-amber-100 placeholder-amber-200/40 ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 h-full font-semibold text-sm tracking-wider">
            
            {/* MEN Category */}
            <li className="group h-full flex items-center relative">
              <Link
                href="/men"
                className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
              >
                MEN
              </Link>

              {/* Mega Dropdown Panel (Dark Gold) */}
              <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li>
                          <Link href="/products?category=men&subcategory=t-shirts" className="hover:text-[#e0a96d] transition-colors">
                            T-Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/products?category=men&subcategory=casual-shirts" className="hover:text-[#e0a96d] transition-colors">
                            Casual Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/products?category=men&subcategory=formal-shirts" className="hover:text-[#e0a96d] transition-colors">
                            Formal Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/products?category=men&subcategory=sweatshirts" className="hover:text-[#e0a96d] transition-colors">
                            Sweatshirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/products?category=men&subcategory=jackets" className="hover:text-[#e0a96d] transition-colors">
                            Jackets
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* WOMEN Category */}
            <li className="group h-full flex items-center relative">
              <Link 
                href="/women" 
                className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent group-hover:border-[#d4af37] transition-all duration-200"
              >
                WOMEN
              </Link>
              
              <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Indian & Ethnic</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/women/kurtas" className="hover:text-[#e0a96d] transition-colors">Kurtas & Suits</Link></li>
                        <li><Link href="/women/ethnic-sets" className="hover:text-[#e0a96d] transition-colors">Sarees & Lehengas</Link></li>
                        <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Dupattas & Shawls</Link></li>
                        <li><Link href="/women/ethnic-wear" className="hover:text-[#e0a96d] transition-colors">Ethnic Bottoms</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Western Wear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/women/dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Jumpsuits</Link></li>
                        <li><Link href="/women/tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
                        <li><Link href="/women/jeans" className="hover:text-[#e0a96d] transition-colors">Jeans & Trousers</Link></li>
                        <li><Link href="/women/jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Shrugs</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/women/flats" className="hover:text-[#e0a96d] transition-colors">Flats & Sandals</Link></li>
                        <li><Link href="/women/heels" className="hover:text-[#e0a96d] transition-colors">Heels & Wedges</Link></li>
                        <li><Link href="/women/sneakers" className="hover:text-[#e0a96d] transition-colors">Casual Sneakers</Link></li>
                        <li><Link href="/women/ethnic-footwear" className="hover:text-[#e0a96d] transition-colors">Juttis & Mojaris</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active & Sleepwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/women/activewear" className="hover:text-[#e0a96d] transition-colors">Sports Wear & Leggings</Link></li>
                        <li><Link href="/women/nightwear" className="hover:text-[#e0a96d] transition-colors">Nightwear & Loungewear</Link></li>
                        <li><Link href="/women/innerwear" className="hover:text-[#e0a96d] transition-colors">Innerwear & Lingerie</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bags & Beauty</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/women/handbags" className="hover:text-[#e0a96d] transition-colors">Handbags & Clutches</Link></li>
                        <li><Link href="/women/jewellery" className="hover:text-[#e0a96d] transition-colors">Fashion Jewellery</Link></li>
                        <li><Link href="/women/beauty" className="hover:text-[#e0a96d] transition-colors">Makeup & Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </li>

            {/* KIDS Category */}
            <li className="h-full group flex items-center relative">
              <Link 
                href="/kid" 
                className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
              >
                KIDS
              </Link>

              <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Boys Clothing</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/kid/boys-tshirts" className="hover:text-[#e0a96d] transition-colors">T-Shirts & Shirts</Link></li>
                        <li><Link href="/kid/boys-shorts" className="hover:text-[#e0a96d] transition-colors">Shorts & Jeans</Link></li>
                        <li><Link href="/kid/boys-ethnic" className="hover:text-[#e0a96d] transition-colors">Ethnic Wear & Kurtas</Link></li>
                        <li><Link href="/kid/boys-jackets" className="hover:text-[#e0a96d] transition-colors">Jackets & Sweatshirts</Link></li>
                        <li><Link href="/kid/boys-trackpants" className="hover:text-[#e0a96d] transition-colors">Track Pants & Pyjamas</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Girls Clothing</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/kid/girls-dresses" className="hover:text-[#e0a96d] transition-colors">Dresses & Frocks</Link></li>
                        <li><Link href="/kid/girls-tops" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
                        <li><Link href="/kid/girls-lehengas" className="hover:text-[#e0a96d] transition-colors">Lehenga Choli & Ethnic</Link></li>
                        <li><Link href="/kid/girls-leggings" className="hover:text-[#e0a96d] transition-colors">Tights & Leggings</Link></li>
                        <li><Link href="/kid/girls-jumpsuits" className="hover:text-[#e0a96d] transition-colors">Jumpsuits & Dungarees</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Infants & Babies</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/kid/onesies" className="hover:text-[#e0a96d] transition-colors">Rompers & Onesies</Link></li>
                        <li><Link href="/kid/baby-sets" className="hover:text-[#e0a96d] transition-colors">Clothing Sets</Link></li>
                        <li><Link href="/kid/baby-care" className="hover:text-[#e0a96d] transition-colors">Baby Care & Gifts</Link></li>
                        <li><Link href="/kid/sleepwear" className="hover:text-[#e0a96d] transition-colors">Sleepwear & Innerwear</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Kids Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/kid/casual-shoes" className="hover:text-[#e0a96d] transition-colors">Casual Shoes & Sneakers</Link></li>
                        <li><Link href="/kid/flip-flops" className="hover:text-[#e0a96d] transition-colors">Flip-Flops & Sandals</Link></li>
                        <li><Link href="/kid/sports-shoes" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
                        <li><Link href="/kid/school-shoes" className="hover:text-[#e0a96d] transition-colors">School Shoes</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Toys & Essentials</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/kid/bags" className="hover:text-[#e0a96d] transition-colors">School Bags & Backpacks</Link></li>
                        <li><Link href="/kid/masks" className="hover:text-[#e0a96d] transition-colors">Protective Masks & Caps</Link></li>
                        <li><Link href="/kid/toys" className="hover:text-[#e0a96d] transition-colors">Toys & Games</Link></li>
                        <li><Link href="/kid/accessories" className="hover:text-[#e0a96d] transition-colors">Hair Accessories & Clips</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* BEAUTY Category */}
            <li className="h-full group flex items-center">
              <Link 
                href="/beauty" 
                className="h-full flex items-center text-gray-300 hover:text-[#e0a96d] border-b-2 border-transparent hover:border-[#d4af37] transition-all duration-200"
              >
                BEAUTY
              </Link>
              <div className="hidden group-hover:block fixed top-20 left-0 w-full bg-[#121214] border-t border-[#332b1e] shadow-2xl z-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-5 gap-6 p-8 text-xs font-normal">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Topwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">T-Shirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Formal Shirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sweatshirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jackets</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bottomwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
                        <li><Link href="#" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Account */}
          <div className="relative group py-2">
            <Link 
              href={isLoggedIn ? "/profile" : "/login"} 
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#d4af37] rounded-lg text-[#d4af37] bg-[#161514]"
            >
              <User size={18} className="text-[#d4af37]" />
              <span className="hidden sm:inline">
                {isLoggedIn ? 'Profile' : 'Account'}
              </span>
            </Link>

            {/* DROPDOWN MENU */}
            <div className="hidden group-hover:block absolute right-0 top-full pt-2 w-64 z-50">
              <div className="bg-[#121214] border border-[#2a2928] shadow-2xl rounded-xl p-5 text-xs font-normal text-gray-300 space-y-4">
                {!isLoggedIn ? (
                  <div>
                    <h2 className="font-bold text-white text-base">Welcome</h2>
                    <p className="text-gray-400 text-[11px] mt-0.5 mb-3">
                      To access account and manage orders
                    </p>
                    <Link 
                      href="/login" 
                      className="block text-center w-full py-2 bg-transparent border border-[#d4af37] text-[#d4af37] font-bold rounded uppercase hover:bg-[#d4af37] hover:text-black transition"
                    >
                      LOGIN / SIGNUP
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-bold text-white text-base">Hello User</h2>
                    <p className="text-[#d4af37] font-semibold text-xs mt-0.5">
                      +91 {mobile}
                    </p>
                  </div>
                )}

                <div className="border-t border-[#2a2928]"></div>

                <ul className="space-y-3 font-semibold text-gray-200">
                  <li><Link href="/orders" className="hover:text-[#d4af37] transition">Orders</Link></li>
                  <li><Link href="/wishlist" className="hover:text-[#d4af37] transition">Wishlist</Link></li>
                  <li><Link href="/gift-cards" className="hover:text-[#d4af37] transition">Gift Cards</Link></li>
                  <li><Link href="/contact" className="hover:text-[#d4af37] transition">Contact Us</Link></li>
                </ul>

                {isLoggedIn && (
                  <>
                    <div className="border-t border-[#2a2928]"></div>
                    <div>
                      <button 
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 transition font-semibold w-full text-left cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <Link 
            href="/wishlist" 
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 border border-[#332b1e] rounded-lg hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-gray-300 bg-[#161514]"
          >
            <Heart size={18} className="text-[#e0a96d]" />
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          {/* Cart Button with Gold Metallic Gradient */}
          <Link 
            href="/cart" 
            className="flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-md shadow-[#d4af37]/10 active:scale-95"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="bg-black text-[#d4af37] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </Link>

        </div>

      </div>

      {/* ================= LEFT SIDE MOBILE SLIDE-IN DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Left Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-[#121214] border-r border-[#332b1e] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#2a2928] sticky top-0 bg-[#121214] z-10">
              <span className="text-sm font-bold text-[#d4af37] tracking-wider uppercase">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-[#d4af37] transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Options */}
            <div className="p-5 space-y-4 text-xs font-normal">
              
              {/* 1. MEN */}
              <div className="border-b border-[#2a2928] pb-3">
                <div 
                  onClick={() => toggleMobileSubmenu('men')}
                  className="flex justify-between items-center py-2 cursor-pointer"
                >
                  <Link href="/men" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-sm text-white hover:text-[#d4af37]">
                    MEN
                  </Link>
                  <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeMobileCategory === 'men' ? 'rotate-180' : ''}`} />
                </div>
                
                {activeMobileCategory === 'men' && (
                  <div className="pl-3 py-2 space-y-4 text-gray-300">
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Topwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/products?category=men&subcategory=t-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">T-Shirts</Link></li>
                        <li><Link href="/products?category=men&subcategory=casual-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shirts</Link></li>
                        <li><Link href="/products?category=men&subcategory=formal-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Formal Shirts</Link></li>
                        <li><Link href="/products?category=men&subcategory=sweatshirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sweatshirts</Link></li>
                        <li><Link href="/products?category=men&subcategory=jackets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bottomwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jeans</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Trousers</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Track Pants</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shoes</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Shoes</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sneakers</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Active T-Shirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tracksuits</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Accessories</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Wallets & Belts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. WOMEN */}
              <div className="border-b border-[#2a2928] pb-3">
                <div 
                  onClick={() => toggleMobileSubmenu('women')}
                  className="flex justify-between items-center py-2 cursor-pointer"
                >
                  <Link href="/women" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-sm text-white hover:text-[#d4af37]">
                    WOMEN
                  </Link>
                  <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeMobileCategory === 'women' ? 'rotate-180' : ''}`} />
                </div>

                {activeMobileCategory === 'women' && (
                  <div className="pl-3 py-2 space-y-4 text-gray-300">
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Indian & Ethnic</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/women/kurtas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Kurtas & Suits</Link></li>
                        <li><Link href="/women/ethnic-sets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sarees & Lehengas</Link></li>
                        <li><Link href="/women/ethnic-wear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dupattas & Shawls</Link></li>
                        <li><Link href="/women/ethnic-wear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Ethnic Bottoms</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Western Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/women/dresses" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dresses & Jumpsuits</Link></li>
                        <li><Link href="/women/tops" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tops & T-Shirts</Link></li>
                        <li><Link href="/women/jeans" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jeans & Trousers</Link></li>
                        <li><Link href="/women/jackets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets & Shrugs</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/women/flats" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Flats & Sandals</Link></li>
                        <li><Link href="/women/heels" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Heels & Wedges</Link></li>
                        <li><Link href="/women/sneakers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Sneakers</Link></li>
                        <li><Link href="/women/ethnic-footwear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Juttis & Mojaris</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active & Sleepwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/women/activewear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Wear & Leggings</Link></li>
                        <li><Link href="/women/nightwear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Nightwear & Loungewear</Link></li>
                        <li><Link href="/women/innerwear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Innerwear & Lingerie</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bags & Beauty</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/women/handbags" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Handbags & Clutches</Link></li>
                        <li><Link href="/women/jewellery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Fashion Jewellery</Link></li>
                        <li><Link href="/women/beauty" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Makeup & Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. KIDS */}
              <div className="border-b border-[#2a2928] pb-3">
                <div 
                  onClick={() => toggleMobileSubmenu('kid')}
                  className="flex justify-between items-center py-2 cursor-pointer"
                >
                  <Link href="/kid" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-sm text-white hover:text-[#d4af37]">
                    KIDS
                  </Link>
                  <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeMobileCategory === 'kid' ? 'rotate-180' : ''}`} />
                </div>

                {activeMobileCategory === 'kid' && (
                  <div className="pl-3 py-2 space-y-4 text-gray-300">
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Boys Clothing</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/kid/boys-tshirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">T-Shirts & Shirts</Link></li>
                        <li><Link href="/kid/boys-shorts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Shorts & Jeans</Link></li>
                        <li><Link href="/kid/boys-ethnic" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Ethnic Wear & Kurtas</Link></li>
                        <li><Link href="/kid/boys-jackets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets & Sweatshirts</Link></li>
                        <li><Link href="/kid/boys-trackpants" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Track Pants & Pyjamas</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Girls Clothing</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/kid/girls-dresses" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dresses & Frocks</Link></li>
                        <li><Link href="/kid/girls-tops" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tops & T-Shirts</Link></li>
                        <li><Link href="/kid/girls-lehengas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Lehenga Choli & Ethnic</Link></li>
                        <li><Link href="/kid/girls-leggings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tights & Leggings</Link></li>
                        <li><Link href="/kid/girls-jumpsuits" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jumpsuits & Dungarees</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Infants & Babies</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/kid/onesies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Rompers & Onesies</Link></li>
                        <li><Link href="/kid/baby-sets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Clothing Sets</Link></li>
                        <li><Link href="/kid/baby-care" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Baby Care & Gifts</Link></li>
                        <li><Link href="/kid/sleepwear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sleepwear & Innerwear</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Kids Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/kid/casual-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shoes & Sneakers</Link></li>
                        <li><Link href="/kid/flip-flops" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Flip-Flops & Sandals</Link></li>
                        <li><Link href="/kid/sports-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Shoes</Link></li>
                        <li><Link href="/kid/school-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">School Shoes</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Toys & Essentials</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/kid/bags" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">School Bags & Backpacks</Link></li>
                        <li><Link href="/kid/masks" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Protective Masks & Caps</Link></li>
                        <li><Link href="/kid/toys" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Toys & Games</Link></li>
                        <li><Link href="/kid/accessories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Hair Accessories & Clips</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. BEAUTY */}
              <div className="border-b border-[#2a2928] pb-3">
                <div 
                  onClick={() => toggleMobileSubmenu('beauty')}
                  className="flex justify-between items-center py-2 cursor-pointer"
                >
                  <Link href="/beauty" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-sm text-white hover:text-[#d4af37]">
                    BEAUTY
                  </Link>
                  <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeMobileCategory === 'beauty' ? 'rotate-180' : ''}`} />
                </div>

                {activeMobileCategory === 'beauty' && (
                  <div className="pl-3 py-2 space-y-4 text-gray-300">
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Topwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">T-Shirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Formal Shirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sweatshirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bottomwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jeans</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Trousers</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Track Pants</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shoes</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Shoes</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sneakers</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Active T-Shirts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tracksuits</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Accessories</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Wallets & Belts</Link></li>
                        <li><Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Perfumes</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}