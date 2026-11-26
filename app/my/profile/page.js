"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name:   "",
    mobile: "7451832023" ,
    email:  "",
    gender: "",
    dob: "",
    altMobile: "",
    hintName: "",
  });
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if(!isLoggedIn || !email){
      router.push("/login");
      return;
    }

    async function fetchUserData(){
      try{
        const res = await fetch(`/api/auth/user/profile?email=${email}`);
        const data = await res.json();
        if(data.success){
          setFormData({
            name: data.user.name || "",
            mobile: data.user.phone || data.user.mobile || "",
            email: data.user.email||"",
            gender: data.user.gender || "",
            dob: data.user.dob || "",
            altMobile: data.user.altMobile || "",
            hintName: data.user.hintName || "",
          });
        }
      }catch(err){
        console.error("Error loading profile:", err);
      }finally{
        setLoading(false);
      }
    }
    
    fetchUserData(); // Yeh line function ko execute karegi
  }, [router]);


  if(loading){
    return <div className="min-h-[85vh] bg-[#0a0a0a] text-white flex items-center justify-center">Loading profile...</div>
  }


  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            Account
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{formData.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="space-y-6 bg-[#141414] p-4 border border-gray-800 rounded-2xl h-fit text-xs">
            <div>
              <button onClick={() => router.push("/")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Overview
              </button>
            </div>
            <div>
              <button onClick={() => router.push("/my/orders")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Orders & Returns
              </button>
            </div>
            <div>
              <div className="space-y-1">
                <button className="block w-full text-left py-2 px-3 rounded-lg font-bold text-[#d4af37] bg-gray-900 transition">
                  Profile
                </button>
                <button 
              onClick={() => router.push("/my/address")}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition"
            >
              Address
            </button>
                
                <button onClick={() => { localStorage.clear(); router.push("/"); }} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-red-500 hover:bg-red-500/10 transition mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - View Mode */}
          <div className="md:col-span-3 bg-[#141414] border border-gray-800 rounded-2xl p-6 md:p-10">
            <h2 className="text-base font-bold text-white mb-6">Profile Details</h2>
            
            <div className="divide-y divide-gray-800/60 text-xs">
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Full Name</span><span className="text-white font-semibold w-2/3">{formData.name}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Mobile Number</span><span className="text-white font-semibold w-2/3">{formData.mobile}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Email ID</span><span className="text-gray-400 w-2/3">{formData.email}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Gender</span><span className="text-gray-400 w-2/3">{formData.gender}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Date of Birth</span><span className="text-gray-400 w-2/3">{formData.dob}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Alternate Mobile</span><span className="text-gray-400 w-2/3">{formData.altMobile}</span></div>
              <div className="py-4 flex justify-between"><span className="text-gray-400 font-medium w-1/3">Hint Name</span><span className="text-gray-400 w-2/3">{formData.hintName}</span></div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => router.push("/my/profile/edit")}
                className="w-full bg-[#ff3f6c] hover:bg-[#e0355d] text-white font-extrabold py-3.5 rounded-xl text-xs tracking-wider uppercase transition shadow-lg"
              >
                EDIT
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}