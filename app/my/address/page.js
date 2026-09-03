"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Ashwani Kumar",
      addressLine: "New shiv Mandir, Dhandhera, roorkee",
      city: "Roorkee",
      state: "Uttarakhand",
      pincode: "247666",
      mobile: "7451832023",
      tag: "HOME",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "Ashwani Kumar",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "7451832023",
    tag: "HOME",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userAddresses"));
    if (saved) setAddresses(saved);
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updated);
    localStorage.setItem("userAddresses", JSON.stringify(updated));
    setShowAddModal(false);
    setNewAddress({
      name: "Ashwani Kumar",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "7451832023",
      tag: "HOME",
    });
  };

  const handleRemove = (id) => {
    const updated = addresses.filter((item) => item.id !== id);
    setAddresses(updated);
    localStorage.setItem("userAddresses", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#d4af37]">
            Account
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Ashwani Kumar</p>
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
              <p className="text-[10px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Orders</p>
              <button onClick={() => router.push("/my/orders")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                Orders & Returns
              </button>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase px-3 pb-1 tracking-wider">Account</p>
              <div className="space-y-1">
                <button onClick={() => router.push("/my/profile")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-gray-400 hover:text-white transition">
                  Profile
                </button>
                <button onClick={() => router.push("/my/address")} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-[#d4af37] bg-gray-900 transition">
                  Addresses
                </button>
                <button onClick={() => { localStorage.clear(); router.push("/"); }} className="block w-full text-left py-2 px-3 rounded-lg font-bold text-red-500 hover:bg-red-500/10 transition mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-3 space-y-6">
            
            <div className="flex justify-between items-center bg-[#141414] border border-gray-800 p-6 rounded-2xl">
              <h2 className="text-base font-bold text-white">Saved Addresses</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="border border-gray-700 hover:border-pink-500 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase transition"
              >
                + ADD NEW ADDRESS
              </button>
            </div>

            {/* Default Address Section Label */}
            {addresses.length > 0 && (
              <p className="text-[10px] font-extrabold text-gray-500 tracking-wider uppercase">Default Address</p>
            )}

            {/* Address Cards List */}
            <div className="space-y-4">
              {addresses.length === 0 ? (
                <div className="bg-[#141414] border border-gray-800 rounded-2xl p-10 text-center text-gray-400 text-xs">
                  No saved addresses found. Click on "+ Add New Address" to add one.
                </div>
              ) : (
                addresses.map((addr) => (
                  <div key={addr.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-6 text-xs relative">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-sm text-white">{addr.name}</span>
                      <span className="bg-gray-800 text-gray-300 text-[10px] font-extrabold px-2.5 py-1 rounded">
                        {addr.tag}
                      </span>
                    </div>

                    <div className="text-gray-400 space-y-1 mb-6">
                      <p>{addr.addressLine}</p>
                      <p>{addr.city} - {addr.pincode}</p>
                      <p>{addr.state}</p>
                      <p className="pt-2 text-gray-300">Mobile: <span className="font-bold text-white">{addr.mobile}</span></p>
                    </div>

                    <div className="border-t border-gray-800 pt-4 flex gap-6 font-extrabold tracking-wider text-[11px]">
                      <button onClick={() => alert("Edit feature coming soon!")} className="text-pink-500 hover:text-pink-400 transition">
                        EDIT
                      </button>
                      <button onClick={() => handleRemove(addr.id)} className="text-gray-400 hover:text-white transition">
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Add New Address Modal / Form Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-lg w-full text-xs">
            <h3 className="text-sm font-bold text-white mb-4 border-b border-gray-800 pb-3">Add New Address</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={newAddress.name} 
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Street Address / Area</label>
                <input 
                  type="text" 
                  placeholder="e.g. Near Shiv Mandir, Dhandhera"
                  value={newAddress.addressLine} 
                  onChange={(e) => setNewAddress({...newAddress, addressLine: e.target.value})}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label>
                  <input 
                    type="text" 
                    value={newAddress.city} 
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Pincode</label>
                  <input 
                    type="text" 
                    value={newAddress.pincode} 
                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">State</label>
                <input 
                  type="text" 
                  value={newAddress.state} 
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white font-bold outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="w-1/2 bg-[#ff3f6c] hover:bg-[#e0355d] text-white font-extrabold py-3.5 rounded-xl uppercase transition shadow-lg"
                >
                  SAVE ADDRESS
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 border border-gray-700 text-gray-300 font-bold py-3.5 rounded-xl uppercase hover:bg-gray-800 transition"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}