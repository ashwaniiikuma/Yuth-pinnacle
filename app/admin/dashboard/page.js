
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RealtimeAdminDashboard() {
  const [stats, setStats] = useState({
    totalGrossRevenue: 0,
    totalEstimatedProfit: 0,
    totalOrders: 0,
    orders: []
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  // Component ke andar jahan doosri states hain (jaise stats aur loading), wahan ye add karein:
  const [categoryStats, setCategoryStats] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
      
  

  // Live Clock & Auto-refresh simulation
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const fetchDashboardData = async () => {
      try {
        // Products ki jagah ab hum real Orders stats fetch karenge
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (data.success) {
          setStats({
            totalGrossRevenue: data.totalGrossRevenue || 0,
            totalEstimatedProfit: data.totalEstimatedProfit || 0,
            totalOrders: data.totalOrders || 0,
            orders: data.orders || []
          });
          setPendingRequests(data.pendingRequestsList || []);
          setCategoryStats(data.categoryStats || {});
        }
      } catch (error) {
        console.error("Error fetching real-time data:", error);
      } finally {
        setLoading(false);
      }
      
    };
    

    fetchDashboardData();
    // Poll data every 30 seconds for real-time updates
    const dataInterval = setInterval(fetchDashboardData, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(dataInterval);
    };
  }, []);

  

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-5 md:p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-400" />
              </span>
              <h1 className="text-base md:text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b38728] leading-tight">
                ENTERPRISE REAL-TIME COMMAND CENTER
              </h1>
            </div>
            <p className="text-[11px] text-zinc-500 pl-5">
              Live metrics, revenue tracking, and store performance telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-xl text-[11px] text-[#d4af37] font-mono font-bold whitespace-nowrap">
              LIVE 🟢 {currentTime}
            </div>
            <Link
              href="/admin"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold border border-zinc-700 transition whitespace-nowrap"
            >
              ← Admin Panel
            </Link>
          </div>
        </div>

        {/* ── Metric Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">

          {/* Total Gross Revenue */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-4 md:p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
            <span className="absolute right-3 top-3 text-xl opacity-15">💰</span>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 font-bold leading-tight">
              Gross Revenue
            </p>
            <h3 className="text-xl md:text-3xl font-extrabold text-white mt-2 leading-none">
              {loading ? (
                <span className="inline-block w-24 h-7 bg-zinc-800 animate-pulse rounded-lg" />
              ) : (
                `₹${stats.totalGrossRevenue.toLocaleString()}`
              )}
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold mt-2 inline-block">
              ↑ Real-time synced
            </span>
          </div>

          {/* Estimated Net Profit */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-4 md:p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
            <span className="absolute right-3 top-3 text-xl opacity-15">📈</span>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 font-bold leading-tight">
              Est. Net Profit
            </p>
            <h3 className="text-xl md:text-3xl font-extrabold text-[#d4af37] mt-2 leading-none">
              {loading ? (
                <span className="inline-block w-24 h-7 bg-zinc-800 animate-pulse rounded-lg" />
              ) : (
                `₹${stats.totalEstimatedProfit.toLocaleString()}`
              )}
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold mt-2 inline-block">
              {stats.profitMarginPercent ?? 35}% avg margin
            </span>
          </div>

          {/* Total Orders */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-4 md:p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
            <span className="absolute right-3 top-3 text-xl opacity-15">📦</span>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 font-bold leading-tight">
              Total Orders
            </p>
            <h3 className="text-xl md:text-3xl font-extrabold text-white mt-2 leading-none">
              {loading ? (
                <span className="inline-block w-16 h-7 bg-zinc-800 animate-pulse rounded-lg" />
              ) : (
                stats.totalOrders
              )}
            </h3>
            <span className="text-[10px] text-blue-400 font-semibold mt-2 inline-block">
              ⚡ Live sync active
            </span>
          </div>

          {/* Total Items Sold */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-4 md:p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
            <span className="absolute right-3 top-3 text-xl opacity-15">🏷️</span>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 font-bold leading-tight">
              Items Sold
            </p>
            <h3 className="text-xl md:text-3xl font-extrabold text-white mt-2 leading-none">
              {loading ? (
                <span className="inline-block w-16 h-7 bg-zinc-800 animate-pulse rounded-lg" />
              ) : (
                stats.orders.reduce((acc, o) => acc + (Number(o.qty) || 1), 0)
              )}
            </h3>
            <span className="text-[10px] text-purple-400 font-semibold mt-2 inline-block">
              From orders database
            </span>
          </div>

        </div>

        {/* ── Analytics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Category Breakdown */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 md:p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-4">
              Category Distribution
            </h2>

            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-zinc-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : Object.keys(categoryStats).length === 0 ? (
              <p className="text-xs text-zinc-600 py-8 text-center">
                No category data from orders yet.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(categoryStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => {
                    const total = Object.values(categoryStats).reduce((s, v) => s + v, 0);
                    const pct   = total ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[12px] font-semibold text-zinc-300 capitalize truncate max-w-[70%]">
                            {cat}
                          </span>
                          <span className="text-[11px] font-bold text-[#d4af37] shrink-0">
                            {count} · {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#b38728] to-[#fcf6ba] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Live Order Stream */}
          <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 p-5 md:p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-4">
              Live Order Activity Stream
            </h2>

            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : stats.orders.length === 0 ? (
              <p className="text-xs text-zinc-600 py-10 text-center">
                No orders placed yet. Orders will appear here in real-time.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
                {stats.orders.slice(0, 10).map((item, index) => {
                  const product = item.cartItems?.[0] ?? {};
                  const totalQty = item.cartItems?.reduce((s, ci) => s + (Number(ci.quantity) || 1), 0) ?? 1;

                  return (
                    <div
                      key={item._id ?? item.orderId ?? index}
                      className="flex items-center gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/60 hover:bg-zinc-800/20 transition"
                    >
                      {/* Product image */}
                      <img
                        src={product.image || "https://placehold.co/80x80/18181b/71717a?text=No+Img"}
                        alt={product.name ?? "Product"}
                        className="w-10 h-10 md:w-11 md:h-11 object-cover rounded-lg border border-zinc-800 bg-zinc-800 shrink-0"
                        onError={(e) => { e.currentTarget.src = "https://placehold.co/80x80/18181b/71717a?text=?"; }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] md:text-xs font-semibold text-white truncate">
                          {product.name ?? "Product Item"}
                        </p>
                        <p className="text-[10px] text-zinc-500 truncate">
                          Order #{item.orderId ?? item._id?.slice(-6) ?? index + 1}
                          {totalQty > 1 && ` · ${totalQty} items`}
                        </p>
                      </div>

                      {/* Price + Status */}
                      <div className="text-right shrink-0">
                        <p className="text-[12px] md:text-xs font-bold text-[#d4af37]">
                          ₹{(Number(product.price ?? item.amount) || 0).toLocaleString()}
                        </p>
                        <span
                          className={`text-[9px] font-semibold font-mono ${
                            item.status === "Delivered"
                              ? "text-emerald-400"
                              : item.status === "Cancelled"
                              ? "text-red-400"
                              : "text-blue-400"
                          }`}
                        >
                          {item.status ?? "Processing"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );

}