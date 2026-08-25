

"use client";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsData } from "@/app/data/products";

export default function Navbar() {
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSuggestions = searchQuery.trim() === ""
      ? []
      :productsData.filter((item)=>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase)||
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase)
      );

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
            <Menu size={15} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/IMG-20260808-WA0003.jpg"
              alt="Youth Pinnacle Logo"
              width={160}
              height={40}
              className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
              priority
            />
          </Link>

          {/* Expandable Search Bar (Gold Luxury Style) */}
         
          <div className="relative flex items-center group">
            <div className="hidden sm:flex items-center bg-[#1a1917] rounded-2xl p-2.5 transition-all duration-300 ease-in-out w-9 group-hover:w-64 lg:group-hover:w-72 focus-within:w-64 lg:focus-within:w-72 focus-within:bg-[#1a1917] focus-within:ring-1 focus-within:ring-[#d4af37] overflow-hidden border border-[#332b1e]">
              <Search size={15} className="text-[#d4af37] min-w-[10px] shrink-0 cursor-pointer" />
              <input
                type="text"
                placeholder="Search luxury products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && searchQuery.trim()){
                    router.push(`/productss?search=${searchQuery}`);
                  }
                }}
                className="bg-transparent border-none outline-none text-xs w-full text-amber-100 placeholder-amber-200/40 ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
              />
            </div>
            <button
            type="button"
            onClick={()=> setIsSearchOpen(true)}
              className="sm:hidden flex items-center justify-center p-2 rounded-xl bg-[#1a1917] border border-[#332b1e] text-[#d4af37]"
              >
                <Search size={15}/>
            </button>
            {/* MOBILE FLIPKART-STYLE SEARCH OVERLAY */}
      {isSearchOpen && (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col sm:hidden">
        
        {/* Top Input Header Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#332b1e] bg-[#1a1917]">
          <button 
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="text-[#d4af37]"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search luxury products..."
              className="w-full bg-black text-amber-100 placeholder-amber-200/40 text-xs pl-3 pr-8 py-2 rounded-xl border border-[#332b1e] focus:outline-none focus:border-[#d4af37]"
              autoFocus
            />

            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 text-amber-200/50"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Live Auto Suggestion Results List */}
        <div className="flex-1 overflow-y-auto bg-black p-4">
          {searchQuery && filteredSuggestions.length > 0 ? (
            <div className="divide-y divide-[#332b1e]">
              {searchQuery && filteredSuggestions.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSearchQuery(item.title);
                    setIsSearchOpen(false);
                    //redirect to products page
                router.push(`/productss?search=${searchQuery}`);
                  }}
                  className="flex items-center gap-3 py-3 text-xs text-amber-100 hover:text-[#d4af37] cursor-pointer"
                >
                  <Search size={14} className="text-[#d4af37]" />
                  <div>
                    <span className="font-semibold block">{item.title}</span>
                    <span className="text-[10px] text-amber-200/50">in {item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-amber-200/40 text-xs text-center mt-4">No matching products found</p>
          ) : (
            <div>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-wider font-bold">Trending Searches</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Winter Wear",
                  "T-Shirts",
                  "Men Activewear",
                  "Ethnic Wear",
                  "Kids Wear",
                  "Footwear"].map((tag, idx) => (
                   <button 
                    key={idx}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="bg-[#1a1917] border border-[#332b1e] text-amber-100 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </button>    
                   ))}
              </div>
            </div>
          )}
        </div>

      </div>
    )}
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
                          <Link href="/productss?category=men&subcategory=t-shirts" className="hover:text-[#e0a96d] transition-colors">
                            T-Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/productss?category=men&subcategory=casual-shirts" className="hover:text-[#e0a96d] transition-colors">
                            Casual Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/productss?category=men&subcategory=formal-shirts" className="hover:text-[#e0a96d] transition-colors">
                            Formal Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/productss?category=men&subcategory=sweatshirts" className="hover:text-[#e0a96d] transition-colors">
                            Sweatshirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/productss?category=men&subcategory=jackets" className="hover:text-[#e0a96d] transition-colors">
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
                        <li><Link href="/productss?category=men&subcategory=jeans" className="hover:text-[#e0a96d] transition-colors">Jeans</Link></li>
                        <li><Link href="/productss?category=men&subcategory=casual-trousers" className="hover:text-[#e0a96d] transition-colors">Casual Trousers</Link></li>
                        <li><Link href="/productss?category=men&subcategory=track-pants" className="hover:text-[#e0a96d] transition-colors">Track Pants</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=casual-shoes" className="hover:text-[#e0a96d] transition-colors">Casual Shoes</Link></li>
                        <li><Link href="/productss?category=men&subcategory=sports-shoes" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
                        <li><Link href="/productss?category=men&subcategory=sneakers" className="hover:text-[#e0a96d] transition-colors">Sneakers</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active Wear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=active-t-shirts" className="hover:text-[#e0a96d] transition-colors">Active T-Shirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=tracksuits" className="hover:text-[#e0a96d] transition-colors">Tracksuits</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Accessories</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=wallets-belts" className="hover:text-[#e0a96d] transition-colors">Wallets & Belts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=prefumes" className="hover:text-[#e0a96d] transition-colors">Perfumes</Link></li>
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
            <li><Link href="/productss?category=women&subcategory=kurtas-suits" className="hover:text-[#e0a96d] transition-colors">Kurtas & Suits</Link></li>
            <li><Link href="/productss?category=women&subcategory=sarees-lehengas" className="hover:text-[#e0a96d] transition-colors">Sarees & Lehengas</Link></li>
            <li><Link href="/productss?category=women&subcategory=dupattas-shawls" className="hover:text-[#e0a96d] transition-colors">Dupattas & Shawls</Link></li>
            <li><Link href="/productss?category=women&subcategory=ethnic-bottoms" className="hover:text-[#e0a96d] transition-colors">Ethnic Bottoms</Link></li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Western Wear</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li><Link href="/productss?category=women&subcategory=dresses-jumpsuits" className="hover:text-[#e0a96d] transition-colors">Dresses & Jumpsuits</Link></li>
            <li><Link href="/productss?category=women&subcategory=tops-t-shirts" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
            <li><Link href="/productss?category=women&subcategory=jeans-trousers" className="hover:text-[#e0a96d] transition-colors">Jeans & Trousers</Link></li>
            <li><Link href="/productss?category=women&subcategory=jackets-shrugs" className="hover:text-[#e0a96d] transition-colors">Jackets & Shrugs</Link></li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Footwear</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li><Link href="/productss?category=women&subcategory=flats-sandals" className="hover:text-[#e0a96d] transition-colors">Flats & Sandals</Link></li>
            <li><Link href="/productss?category=women&subcategory=heels-wedges" className="hover:text-[#e0a96d] transition-colors">Heels & Wedges</Link></li>
            <li><Link href="/productss?category=women&subcategory=casual-sneakers" className="hover:text-[#e0a96d] transition-colors">Casual Sneakers</Link></li>
            <li><Link href="/productss?category=women&subcategory=juttis-mojaris" className="hover:text-[#e0a96d] transition-colors">Juttis & Mojaris</Link></li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Active & Sleepwear</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li><Link href="/productss?category=women&subcategory=sports-wear-leggings" className="hover:text-[#e0a96d] transition-colors">Sports Wear & Leggings</Link></li>
            <li><Link href="/productss?category=women&subcategory=nightwear-loungewear" className="hover:text-[#e0a96d] transition-colors">Nightwear & Loungewear</Link></li>
            <li><Link href="/productss?category=women&subcategory=innerwear-lingerie" className="hover:text-[#e0a96d] transition-colors">Innerwear & Lingerie</Link></li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Bags & Beauty</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li><Link href="/productss?category=women&subcategory=handbags-clutches" className="hover:text-[#e0a96d] transition-colors">Handbags & Clutches</Link></li>
            <li><Link href="/productss?category=women&subcategory=makeup-perfumes" className="hover:text-[#e0a96d] transition-colors">Makeup & Perfumes</Link></li>
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
                        <li><Link href="/productss?category=kid&subcategory=t-shirts-shirts" className="hover:text-[#e0a96d] transition-colors">T-Shirts & Shirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=shorts-jeans " className="hover:text-[#e0a96d] transition-colors">Shorts & Jeans</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=ethnic-wear-kurtas" className="hover:text-[#e0a96d] transition-colors">Ethnic Wear & Kurtas</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=jackets-sweatshirts" className="hover:text-[#e0a96d] transition-colors">Jackets & Sweatshirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=track-pants-pyjamas" className="hover:text-[#e0a96d] transition-colors">Track Pants & Pyjamas</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Girls Clothing</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=dresses-frocks" className="hover:text-[#e0a96d] transition-colors">Dresses & Frocks</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=tops-t-shirts" className="hover:text-[#e0a96d] transition-colors">Tops & T-Shirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=lehenga-choli-ethnic" className="hover:text-[#e0a96d] transition-colors">Lehenga Choli & Ethnic</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=tights-leggings" className="hover:text-[#e0a96d] transition-colors">Tights & Leggings</Link></li>
                        <li><Link  href="/productss?category=kid&subcategory=jumpsuits-dungarees" className="hover:text-[#e0a96d] transition-colors">Jumpsuits & Dungarees</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Infants & Babies</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link  href="/productss?category=kid&subcategory=rompers-onesies"   className="hover:text-[#e0a96d] transition-colors">Rompers & Onesies</Link></li>
                        <li><Link  href="/productss?category=kid&subcategory=clothing-sets"  className="hover:text-[#e0a96d] transition-colors">Clothing Sets</Link></li>
                        <li><Link  href="/productss?category=kid&subcategory=baby-care-gifts"  className="hover:text-[#e0a96d] transition-colors">Baby Care & Gifts</Link></li>
                        <li><Link  href="/productss?category=kid&subcategory=sleepwear-innerwear"  className="hover:text-[#e0a96d] transition-colors">Sleepwear & Innerwear</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Kids Footwear</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=casual-shoes-sneakers" className="hover:text-[#e0a96d] transition-colors">Casual Shoes & Sneakers</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=flip-flops-sandals" className="hover:text-[#e0a96d] transition-colors">Flip-Flops & Sandals</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=sports-shoes" className="hover:text-[#e0a96d] transition-colors">Sports Shoes</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Toys & Essentials</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link  href="/productss?category=kid&subcategory=protective-masks-caps" className="hover:text-[#e0a96d] transition-colors">Protective Masks & Caps</Link></li>
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
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">MAKEUP</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=lipstick" className="hover:text-[#e0a96d] transition-colors">Lipstick</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=lip-gloss" className="hover:text-[#e0a96d] transition-colors">Lip Gloss</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=lip-liner" className="hover:text-[#e0a96d] transition-colors">Lip Liner</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=eyeliner" className="hover:text-[#e0a96d] transition-colors">Eyeliner</Link></li>

                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Skincare & Body</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link  href="/productss?category=beauty&subcategory=face-moisturiser" className="hover:text-[#e0a96d] transition-colors">Face Moisturiser</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=cleanser" className="hover:text-[#e0a96d] transition-colors">cleanser</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=masks-peel" className="hover:text-[#e0a96d] transition-colors">Masks & Peel</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=sunscreen" className="hover:text-[#e0a96d] transition-colors">Sunscreen</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=serum" className="hover:text-[#e0a96d] transition-colors">Serum</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=face-wash" className="hover:text-[#e0a96d] transition-colors">Face Wash</Link></li>


                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Haircare</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=shampoo" className="hover:text-[#e0a96d] transition-colors">Shampoo</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=conditioner" className="hover:text-[#e0a96d] transition-colors">Conditioner</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=hair-cream" className="hover:text-[#e0a96d] transition-colors">Hair Cream</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=hair-oil" className="hover:text-[#e0a96d] transition-colors">Hair Oil</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=hair-serum" className="hover:text-[#e0a96d] transition-colors">Hair Serum</Link></li>

                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Fragnance</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=perfume" className="hover:text-[#e0a96d] transition-colors">Perfume</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=deotorent" className="hover:text-[#e0a96d] transition-colors">Deotorent</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wider">Top Brand</h4>
                      <ul className="space-y-1.5 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=maybelline" className="hover:text-[#e0a96d] transition-colors">Maybelline</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=loreal" className="hover:text-[#e0a96d] transition-colors">LOreal</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=lakme" className="hover:text-[#e0a96d] transition-colors">Lakme</Link></li>
                      

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center md:gap-3 sm:gap-3">
          
          {/* Account */}
          <div className="relative group py-2">
            <Link 
              href={isLoggedIn ? "/profile" : "/login"} 
              className="flex items-center md:gap-2 text-xs font-semibold md:px-3 md:py-2 md:border md:border-[#d4af37] rounded-lg text-[#d4af37] bg-[#161514]"
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
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2  md:border md:border-[#332b1e] rounded-lg md:hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-gray-300 md:bg-[#161514]"
          >
            <Heart size={13} className="text-[#e0a96d]" />
            <span className="hidden sm:inline text-xs">Wishlist</span>
          </Link>

          {/* Cart Button with Gold Metallic Gradient */}
        <Link 
  href="/cart" 
  className="flex items-center gap-1 text-[8px] md:text-[11px] font-bold bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black p-1.5 sm:px-3 sm:py-1.5 rounded-md hover:opacity-90 transition-all shadow-sm active:scale-95 shrink-0 relative"
>
  {/* Shopping Bag Icon */}
  <ShoppingBag size={12} />

  {/* Mobile View Floating Badge */}
  <span className="sm:hidden absolute -top-1 -right-1 bg-black text-[#d4af37] text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-extrabold border border-[#d4af37]">
    0
  </span>

  {/* Desktop View Text & Badge */}
  <span className="hidden sm:inline text-xs">Cart</span>
  <span className="hidden sm:flex bg-black text-[#d4af37] text-[8px] w-3.5 h-3.5 rounded-full items-center justify-center font-bold">
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
            <div className="p-5 space-y-4 text-xs font-normal ">
              
              {/* 1. MEN */}
              <div className="border-b border-[#2a2928] pb-3 ">
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
                  <div className="pl-3 py-2 space-y-4  text-gray-300 ">
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Topwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=t-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">T-Shirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=casual-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=formal-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Formal Shirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=sweatshirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sweatshirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=jackets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bottomwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=jeans" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jeans</Link></li>
                        <li><Link href="/productss?category=men&subcategory=casual-trouser" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Trousers</Link></li>
                        <li><Link href="/productss?category=men&subcategory=track-pants" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Track Pants</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=casual-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shoes</Link></li>
                        <li><Link href="/productss?category=men&subcategory=sports-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Shoes</Link></li>
                        <li><Link href="/productss?category=men&subcategory=sneakers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sneakers</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=active-t-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Active T-Shirts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=tracksuits" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tracksuits</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Accessories</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=men&subcategory=wallets-belts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Wallets & Belts</Link></li>
                        <li><Link href="/productss?category=men&subcategory=perfumes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Perfumes</Link></li>
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
                        <li><Link href="/productss?category=women&subcategory=kurtas-suits" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Kurtas & Suits</Link></li>
                        <li><Link href="/productss?category=women&subcategory=sarees-lehengas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sarees & Lehengas</Link></li>
                        <li><Link href="/productss?category=women&subcategory=dupattas-shawls" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dupattas & Shawls</Link></li>
                        <li><Link href="/productss?category=women&subcategory=ethnic-bottom" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Ethnic Bottoms</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Western Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=women&subcategory=dresses-jumpsuits" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dresses & Jumpsuits</Link></li>
                        <li><Link href="/productss?category=women&subcategory=tops-t-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tops & T-Shirts</Link></li>
                        <li><Link href="/productss?category=women&subcategory=jeans-trousers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jeans & Trousers</Link></li>
                        <li><Link href="/productss?category=women&subcategory=jackets-shrugs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets & Shrugs</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=women&subcategory=flats-sandals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Flats & Sandals</Link></li>
                        <li><Link href="/productss?category=women&subcategory=heels-wedges" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Heels & Wedges</Link></li>
                        <li><Link href="/productss?category=women&subcategory=casual-sneakers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Sneakers</Link></li>
                        <li><Link href="/productss?category=women&subcategory=juttis-majaris" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Juttis & Mojaris</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active & Sleepwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=women&subcategory=sports-wear-leggings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Wear & Leggings</Link></li>
                        <li><Link href="/productss?category=women&subcategory=nightwear-loungewear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Nightwear & Loungewear</Link></li>
                        <li><Link href="/productss?category=women&subcategory=innerwear-lingerie" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Innerwear & Lingerie</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bags & Beauty</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=women&subcategory=handbags-clutches" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Handbags & Clutches</Link></li>
                        <li><Link href="/productss?category=women&subcategory=makeup-perfumes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Makeup & Perfumes</Link></li>
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
                        <li><Link href="/productss?category=kid&subcategory=t-shirts-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">T-Shirts & Shirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=shorts-jeans" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Shorts & Jeans</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=ethnic-wear-kurtas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Ethnic Wear & Kurtas</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=jackets-sweatshirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jackets & Sweatshirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=track-pants-pyjamas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Track Pants & Pyjamas</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Girls Clothing</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=dresses-frocks" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Dresses & Frocks</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=tops-t-shirts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tops & T-Shirts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=lehenga-choli-ethnic" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Lehenga Choli & Ethnic</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=tights-leggings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Tights & Leggings</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=jumpsuits-dungarees" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Jumpsuits & Dungarees</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Infants & Babies</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=rompers-onesies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Rompers & Onesies</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=clothing-sets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Clothing Sets</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=baby-care-gifts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Baby Care & Gifts</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=sleepwear-innerwear" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sleepwear & Innerwear</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Kids Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=casual-shoes-sneakers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Casual Shoes & Sneakers</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=flip-flop-sandals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Flip-Flops & Sandals</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=sports-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Sports Shoes</Link></li>
                        <li><Link href="/productss?category=kid&subcategory=school-shoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">School Shoes</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Toys & Essentials</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=kid&subcategory=protective-masks-caps" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d]">Protective Masks & Caps</Link></li>
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
                         <li><Link href="/productss?category=beauty&subcategory=lipstick" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Lipstick</Link></li>
                         <li><Link href="/productss?category=beauty&subcategory=lip-gloss" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Lip Gloss</Link></li>
                         <li><Link href="/productss?category=beauty&subcategory=lip-liner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Lip Liner</Link></li>
                         <li><Link href="/productss?category=beauty&subcategory=eyeliner"  onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Eyeliner</Link></li>

                        </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Bottomwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link  href="/productss?category=beauty&subcategory=face-moisturiser" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Face Moisturiser</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=cleanser" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">cleanser</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=masks-peel" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Masks & Peel</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=sunscreen" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Sunscreen</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=serum" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Serum</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=face-wash" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Face Wash</Link></li>

                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Footwear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=shampoo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Shampoo</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=conditioner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Conditioner</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=hair-cream" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Hair Cream</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=hair-oil" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Hair Oil</Link></li>
                        <li><Link  href="/productss?category=beauty&subcategory=hair-serum" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0a96d] transition-colors">Hair Serum</Link></li>

                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Active Wear</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                        <li><Link href="/productss?category=beauty&subcategory=perfume" onClick={() => setIsMobileMenuOpen(false)}  className="hover:text-[#e0a96d] transition-colors">Perfume</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=deotorent" onClick={() => setIsMobileMenuOpen(false)}  className="hover:text-[#e0a96d] transition-colors">Deotorent</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">Accessories</p>
                      <ul className="space-y-1.5 pl-2 text-gray-400">
                       <li><Link href="/productss?category=beauty&subcategory=maybelline" onClick={() => setIsMobileMenuOpen(false)}  className="hover:text-[#e0a96d] transition-colors">Maybelline</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=loreal" onClick={() => setIsMobileMenuOpen(false)}  className="hover:text-[#e0a96d] transition-colors">LOreal</Link></li>
                        <li><Link href="/productss?category=beauty&subcategory=lakme" onClick={() => setIsMobileMenuOpen(false)}  className="hover:text-[#e0a96d] transition-colors">Lakme</Link></li>
                      
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