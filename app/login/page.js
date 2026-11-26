"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simple email validation check
    if(!email || !email.includes("@") || !agreed) {
        alert("Please enter a valid email and agree to terms.");
        return;
    }

    setLoading(true);
    try {
        const res = await fetch('/api/auth/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        console.log("API se kya data aaya:", data);
        console.log("User ka role kya hai:", data.role);

        if (data.success) {
            // LocalStorage mein login status, email, name aur sabse main 'role' save kar do
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userRole", data.role); // <-- Yeh role save ho gaya

            alert(`Successfully Logged In as ${data.email}`);

            // **Role Based Redirection:** Agar admin hai toh /admin par bhejo, warna home (/) par
            if (data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
            router.refresh();
        } else {
            alert(data.message || "Login failed");
        }

    } catch(err) {
        console.error("Login error:", err);
        alert("Something went wrong during login.");
    } finally {
        setLoading(false);
    }
};

    return(
      <div className="min-h-[85vh] flex items-center justify-center bg-[#0a0a0a] py-12 px-4">
          <div className="w-full max-w-sm bg-[#121214] border border-[#2a2928] rounded-xl shadow-2xl overflow-hidden transition-all">
              <div className="p-6">
                <div>
                  <h1 className="text-xl font-bold text-white mb-1">
                    Login <span className="text-sm font-normal text-gray-400">or</span> Signup
                  </h1>
                  <p className="text-xs text-gray-400 mb-6">Enter your email address to continue</p>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Input */}
                    <div className="flex items-center bg-[#18181b] border border-[#332b1e] rounded-lg focus-within:border-[#d4af37] px-3 py-2.5 text-sm transition">
                      <input
                        type="email"
                        placeholder="Email ID *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent outline-none text-white font-medium placeholder-gray-500"
                        required
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-2 text-xs text-gray-400">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 accent-[#d4af37] cursor-pointer"
                        required
                      />
                      <label htmlFor="terms" className="cursor-pointer text-[11px] leading-tight">
                        By continuing, I agree to the <span className="text-[#d4af37] font-semibold">Terms of Use</span> & <span className="text-[#d4af37] font-semibold">Privacy Policy</span>
                      </label>
                    </div>

                    {/* Continue Button */}
                    <button
                      type="submit"
                      disabled={!email || !agreed || loading}
                      className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                        email && agreed && !loading
                          ? 'bg-[#d4af37] hover:bg-[#e0a96d] text-black cursor-pointer font-semibold'
                          : 'bg-[#18181b] text-gray-500 border border-[#2a2928] cursor-not-allowed'
                      }`}
                    >
                      {loading ? "Logging in..." : "CONTINUE"}
                    </button>
                  </form>
                </div> 

                {/* Footer help */}
                <div className="mt-6 text-center border-t border-[#2a2929] pt-4">
                    <p className="text-xs text-gray-400">
                        Have trouble logging in?<Link href="#" className="text-[#d4af37] font-semibold hover:underline">Get help</Link>
                    </p>
                </div>
              </div>
          </div>
      </div>
    );
}