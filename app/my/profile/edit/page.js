"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Ashwani Kumar",
    mobile: "7451832023",
    email: "",
    gender: "Male",
    dob: "",
    altMobile: "",
    hintName: "",
  });

  const [isChangingMobile, setIsChangingMobile] = useState(false);
  const [newMobileInput, setNewMobileInput] = useState("");

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setFormData(savedProfile);
      setNewMobileInput(savedProfile.mobile || "7451832023");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMobileSave = () => {
    if (newMobileInput.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const updated = { ...formData, mobile: newMobileInput };
    setFormData(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
    setIsChangingMobile(false);
    alert("Mobile number updated successfully!");
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData));
    alert("Profile details updated successfully!");
    router.push("/my/profile");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            Account
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{formData.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="space-y-6 bg-[#141414] p-4 border border-gray-800 rounded-xl h-fit text-xs">
            <div>
              <button onClick={() => router.push("/")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Overview
              </button>
            </div>
            <div>
              <p className="text-[7px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Orders</p>
              <button onClick={() => router.push("/my/order")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Orders & Returns
              </button>
            </div>
            <div>
              <p className="text-[7px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Account</p>
              <div className="space-y-1">
                <button onClick={() => router.push("/my/profile")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-[#d4af37] bg-gray-900 transition">
                  Profile
                </button>
                <button onClick={() => router.push("/my/address")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                  Addresses
                </button>
                <button onClick={() => { localStorage.clear(); router.push("/"); }} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-red-500 hover:bg-red-500/10 transition mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Edit Form */}
          <div className="md:col-span-3 bg-[#141414] border border-gray-800 rounded-2xl p-6 md:p-10">
            <h2 className="text-base font-bold text-white mb-6">Edit Profile Details</h2>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              
              {/* Mobile Number Box with Change capability */}
              <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40 flex justify-between items-center">
                <div className="w-full">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">Mobile Number</span>
                  {!isChangingMobile ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-white">{formData.mobile}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="text" 
                        value={newMobileInput}
                        onChange={(e) => setNewMobileInput(e.target.value)}
                        className="bg-transparent text-sm font-bold text-white outline-none border-b border-pink-500 w-full"
                        maxLength={10}
                      />
                      <button 
                        type="button" 
                        onClick={handleMobileSave}
                        className="bg-pink-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold"
                      >
                        SAVE
                      </button>
                    </div>
                  )}
                </div>

                {!isChangingMobile && (
                  <button 
                    type="button" 
                    onClick={() => setIsChangingMobile(true)}
                    className="text-pink-500 font-extrabold tracking-wider text-xs px-4 py-2 hover:bg-pink-500/10 rounded-lg transition whitespace-nowrap"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {/* Email Box */}
              <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40 flex justify-between items-center">
                <div className="w-full">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">Email</span>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="Add email address"
                    className="bg-transparent text-sm font-bold text-white outline-none w-full mt-1"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40">
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Full Name</span>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  className="bg-transparent text-sm font-bold text-white outline-none w-full mt-1"
                />
              </div>

              {/* Gender Selection */}
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Gender</span>
                <div className="grid grid-cols-2 gap-4">
                  {["Male", "Female"].map((gen) => (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: gen })}
                      className={`py-3 rounded-xl text-xs font-bold border transition ${formData.gender === gen ? "border-pink-500 bg-pink-500/10 text-pink-500" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Birthday */}
              <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40">
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Birthday (dd/mm/yyyy)</span>
                <input 
                  type="text" 
                  name="dob"
                  placeholder="DD/MM/YYYY"
                  value={formData.dob} 
                  onChange={handleChange}
                  className="bg-transparent text-sm font-bold text-white outline-none w-full mt-1"
                />
              </div>

              {/* Alternate mobile details */}
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Alternate mobile details</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40 flex items-center">
                    <span className="text-gray-400 font-bold text-sm">+91</span>
                  </div>
                  <div className="col-span-2 border border-gray-700 rounded-xl p-3 bg-gray-900/40">
                    <input 
                      type="text" 
                      name="altMobile"
                      placeholder="Mobile Number"
                      value={formData.altMobile} 
                      onChange={handleChange}
                      className="bg-transparent text-sm font-bold text-white outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Hint Name */}
              <div className="border border-gray-700 rounded-xl p-3 bg-gray-900/40">
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Hint Name</span>
                <input 
                  type="text" 
                  name="hintName"
                  placeholder="Hint name"
                  value={formData.hintName} 
                  onChange={handleChange}
                  className="bg-transparent text-sm font-bold text-white outline-none w-full mt-1"
                />
              </div>

              {/* Save Button */}
              <button 
                type="submit"
                className="w-full bg-[#9f2089] hover:bg-[#851972] text-white font-extrabold py-4 rounded-xl text-xs tracking-wider uppercase transition shadow-lg mt-6"
              >
                SAVE DETAILS
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}