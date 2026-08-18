
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"

export default function LoginPage(){
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);

    //OTP Timer Logic
    useEffect(()=>{
        let interval = null;
        if(step === 2 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }else{
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    //Mobile submit
    const handleSendOtp =(e) =>{
        e.preventDefault();
        if(mobile.length === 10 && agreed){
            setStep(2);
            setTimer(30);
        }
    };
    //OTP input handling
    const handleOtpChange = (element, index) =>{
        if(isNaN(element.value)) return false;

      let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

        if(element.value !== '' && element.nextSibling){
            element.nextSibling.focus();
        }
    };
        // OTP Submit 
    const handleVerifyOtp = (e) =>{
        e.preventDefault();
        const enteredOtp = otp.join('');
        if(enteredOtp.length === 4 ){
            //Localstorage store the users data
            localStorage.getItem("userMobile", "true");
            localStorage.setItem("isLoggedIn", "9876543210");

            alert(`Successfully Logged In with +91 ${mobile}`);
            window.location.href = "/";
        }
    };

    return(
  <div className="min-h-[85vh] flex items-center justify-center bg-[#0a0a0a] py-12 px-4">
      <div className="w-full max-w-sm bg-[#121214] border border-[#2a2928] rounded-xl shadow-2xl overflow-hidden transition-all">
    
              {/* FORM CONTAINER */}
        <div className="p-6">
          
          {/* ================= STEP 1: MOBILE NUMBER ================= */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-bold text-white mb-1">
                Login <span className="text-sm font-normal text-gray-400">or</span> Signup
              </h1>
              <p className="text-xs text-gray-400 mb-6">Enter your phone number to continue</p>

              <form onSubmit={handleSendOtp} className="space-y-5">
                {/* Mobile Input */}
                <div className="flex items-center bg-[#18181b] border border-[#332b1e] rounded-lg focus-within:border-[#d4af37] px-3 py-2.5 text-sm transition">
                  <span className="text-gray-400 font-medium mr-2">+91</span>
                  <span className="text-gray-600 mr-2">|</span>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Mobile Number *"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
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
                  disabled={mobile.length !== 10 || !agreed}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                    mobile.length === 10 && agreed
                      ? 'bg-[#d4af37] hover:bg-[#e0a96d] text-black cursor-pointer font-semibold'
                      : 'bg-[#18181b] text-gray-500 border border-[#2a2928] cursor-not-allowed'
                  }`}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          )};
                {/* STEP 2: OTP VARIFICATION  */}
             {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg font-bold text-white">Verify OTP</h1>
                <button 
                  onClick={() => setStep(1)} 
                  className="text-[11px] text-[#d4af37] hover:underline"
                >
                  Change No.
                </button>
              </div>
              
              <p className="text-xs text-gray-400 mb-6">
                Sent OTP to <span className="text-white font-semibold">+91 {mobile}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* 4-Digit OTP Boxes */}
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-12 h-12 text-center text-lg font-bold bg-[#18181b] border border-[#332b1e] text-white rounded-lg focus:border-[#d4af37] outline-none transition"
                    />
                  ))}
                </div>

                {/* Resend OTP Timer */}
                <div className="text-center text-xs text-gray-400">
                  {timer > 0 ? (
                    <p>Resend OTP in <span className="text-[#d4af37] font-semibold">{timer}s</span></p>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setTimer(30)} 
                      className="text-[#d4af37] font-semibold hover:underline"
                    >
                      RESEND OTP
                    </button>
                  )}
                </div>

                {/* Verify Button */}
              <button
                  type="submit"
                  disabled={otp.join('').length !== 4}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                    otp.join('').length === 4
                      ? 'bg-[#d4af37] hover:bg-[#e0a96d] text-black cursor-pointer font-semibold'
                      : 'bg-[#18181b] text-gray-500 border border-[#2a2928] cursor-not-allowed'
                  }`}
                >
                  VERIFY & LOGIN
                </button>
              </form>
            </div>
          )}
                {/* Footer help */}
                <div className="mt-6 text-center border-t border-[#2a2929] pt-4" >
                    <p className="text-xs text-gray-400">
                        Have trouble logging in?<Link href="#" className="text-[#d4af37] font-semibold hover:underline">Get help</Link>
                    </p>
                </div>
            </div>
        </div>
    
    </div>
    );
}

