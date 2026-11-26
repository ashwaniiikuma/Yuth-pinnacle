

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("add"); // 'add' or 'products'
  const [products, setProducts] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  const [bulkLoading, setBulkingLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({

  title: "",
  category: "",
  subcategory: "",
  brand: "",
  price: "",
  originalPrice: "",
  discount: "",
  rating: "",
  reviewsCount: "",
  image: "",
  });

  const [bulkImages, setBulkImages] = useState([]);
  const [imageUrlMap, setImageUrlMap] = useState({});
  const [imgUploading, setImgUploading] = useState(false);

  const handleBulkImagesUplaod= async()=>{
    if(!bulkImages.length) return;
    setImgUploading(true);

    try{
      const fd = new FormData();
      bulkImages.forEach((file) => fd.append("files", file));
      
      const res = await fetch("/api/upload", {method: "POST", body: fd});
      const data  = await res.json();

      if(!res.ok || !data.success) 
        throw new Error(data.error || "Images upload failed");

      const nextMap = {...imageUrlMap};
      (data.files || []).forEach((item) => {
        if(item.originalName && item.url){
        nextMap[item.originalName.toLowerCase()] = item.url;
        }
      });

      setImageUrlMap(nextMap);
      alert(`${data.files.length ?? bulkImages.length} images Cloudinary par upload ho gayin!`);
    }catch(error){
      alert(error.message);
    }finally{
      setImgUploading(false);
    }
  };


  const [editSaving, setEditSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleOpenEdit = (item) => {
    if(!item) return;
    const productId = item._id || item.id || ""; 
    const normalizedCategory = item.category
    ? String(item.category).trim().toLowerCase()
    : "";
    const normalizedSubCategory = item.subcategory ?String(item.subcategory).trim().toLowerCase() : "";

    const rawImages = Array.isArray(item.images)? item.images : typeof item.images === "string" ? item.images.split("|").map((s)=> s.trim())
    :[];
    const normalizedImages = [
      rawImages[0] || item.image || "",
      rawImages[1] || "",
      rawImages[2] || "",
      rawImages[3] || "",
    ];

  setEditingProduct(item);
  setEditingId(productId);
  setActiveTab("add");

  setEditForm({
    title: item.title || item.name || "",
    category: item.category ? String(item.category).toLowerCase(): "",
    subcategory: item.subcategory ? String(item.subcategory).toLowerCase(): "",
    brand: item.brand || "",
    price: item.price ?? "",
    originalPrice: item.originalPrice ?? "",
    discount: item.discount || "",
    rating: item.rating || "",
    reviewsCount: item.reviewsCount || "",
    image: item.image || "",
  });
  setFormData({
    title: item.title || item.name || "",
    category: item.category || "beauty",
    subcategory: item.subcategory || "lakme",
    brand: item.brand || "LAKME",
    price: item.price ?? "",
    originalPrice: item.originalPrice ?? "",
    discount: item.discount || "",
    rating: item.rating || "4.8",
    reviewsCount: item.reviewsCount || "480",
    image: item.image || "",
    images: 
    Array.isArray(item.images) && item.images.length > 0?
    [
      item.images[0] || '',
      item.images[1] || '',
      item.images[2] || '',
      item.images[3] || '',
    ]
    :["", "", "", ""],
  })
  window.scrollTo({top: 0, behavior:"smooth"});

};
 const handleUpdateProduct = async (e) => {
  e.preventDefault();
  const targetId = editingProduct?._id || editingProduct?.id;
  if (!editingProduct?._id) return;

  setEditSaving(true);
  try {
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingProduct._id,
        ...editForm,
      }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      setEditingProduct(null);
      await fetchProducts();
    } else {
      alert(data.error || "Product update nahi ho paaya");
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Update karte waqt error aaya");
  } finally {
    setEditSaving(false);
  }
};

  const handleDeleteProduct = async (productId)=>{
    const ok = window.confirm("You realy want to delete this product ?");
    if(!ok) return;

    setDeletingId(productId);
    try{
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({id: productId})
      })
      const data = await res.json();

      if(res.ok && data.success) {
        setProducts((prev) =>
          prev.filter((item) => (item._id || item.id) !== productId)
        );
      }else{
        alert(data.error || "Product data not found");
      }
    }catch (err){
      console.log("Delete error:", err);
      alert("Error product deleting time");
    }finally{
      setDeletingId(null);
    }
  };


  const handleBulkCsvUpload = async (e)=>{
    e.preventDefault();
    if(!csvFile){
      alert("Please select a .csv file first");
      return;
    }

    setBulkingLoading(true);
    setSuccessMsg("");

    try{
      const body = new FormData();
      body.append("file", csvFile);
              body.append("imageUrlMap", JSON.stringify(imageUrlMap || {})); 

      const res = await fetch("/api/admin/product-bulk", {
        method: "POST",
        body,
      });
        

      const data = await res.json();
      if(res.ok && data.success){
        setSuccessMsg(data.message || `${data.insertedCount} products imported!`);
        setCsvFile(null);
        fetchProducts();
      }else{
        alert(data.message || "Bulk CSV import failed");
      }
    }catch (error){
      console.error("Bulk CSV upload error:", error);
      alert("Something went wrong during CSV upload!");
    }finally{
      setBulkingLoading(false);
    }
  };



  const [formData, setFormData] = useState({
    title: "",
    category: "beauty",
    subcategory: "lakme",
    brand: "LAKME",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "4.8",
    reviewsCount: "480",
    image: "",
    images: ["", "", "", ""],
  });

  // Fetch all products for management view
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageArrayChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const isEditing = Boolean(editingId)
    try {
      const res = await fetch("/api/products", {
        method: isEditing? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? {id: editingId, ...formData} : formData
        ),
      });

      const data = await res.json();

      if(res.ok && data.success){
        setSuccessMsg(
          isEditing
          ? "Product successfully updated and live!"
          : "Product successfully added to your store!"
        );
   

        setEditingId(null);
        setEditingProduct(null);
        setFormData({
          title: "",
          category: "beauty",
          subcategory: "lakme",
          brand: "LAKME",
          price: "",
          originalPrice: "",
          discount: "",
          rating: "4.8",
          reviewsCount: "480",
          image: "",
          images: ["", "", "", ""],
        });
        await fetchProducts(); // Refresh product list
      } else {
        alert(
          data.message ||
          data.error ||
          (isEditing ? "Failed to update product" : "Failed to add product")
        );
           }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
             
              <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b38728]">
                YOUTH PINNACLE ADMIN
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">Manage catalog, inventory, and storefront additions seamlessly.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/dashboard" 
              className="bg-zinc-800/80 hover:bg-zinc-700 text-[#d4af37] px-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-700/60 transition shadow-md flex items-center gap-2"
            >
              📊 Analytics Dashboard
            </Link>
            <Link 
              href="/" 
              className="text-xs text-gray-400 hover:text-white px-3 py-2 border border-zinc-800 rounded-xl transition"
            >
              View Store ↗
            </Link>
          </div>
        
        
        </div>

        



        
        
                  {/* Tab Switcher Buttons */}
                <div className="flex flex-wrap gap-3 mb-6 border-b border-zinc-800/60 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "add"
                  ? "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black shadow-lg"
                  : "bg-zinc-900/80 text-gray-400 hover:text-white border border-zinc-800"
              }`}
            >
              + Add New Product
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "bulk"
                  ? "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black shadow-lg"
                  : "bg-zinc-900/80 text-gray-400 hover:text-white border border-zinc-800"
              }`}
            >
              Bulk Import (CSV)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black shadow-lg"
                  : "bg-zinc-900/80 text-gray-400 hover:text-white border border-zinc-800"
              }`}
            >
              Manage Existing Products ({products.length})
            </button>
          </div>

                {activeTab === "bulk" && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-4">
              <div className="text-sm font-bold text-[#fcf6ba]">
                BULK CSV PRODUCT IMPORT
              </div>

                  {/* Multiple Image upload to cloudinary */}
                  <div className="space-y-2 border-b border-zinc-800 pb-4">
                    <p className="text-xs text-gray-400">
                      select the product images (Generate Cloudinary URLs )
                    </p>
                    <div>
                      <input type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setBulkImages(Array.from(e.target.files || []))}
                      className="text-xs text-gray-300"
                      
                      />
                      <button 
                      type="button"
                      onClick={handleBulkImagesUplaod}
                      disabled={imgUploading || !bulkImages.length}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 border border-zinc-700 text-[#fcf6ba] disabled:opacity-50"
                      >
                        {imgUploading
                        ?"Uploading Images..."
                        : `Upload Images (${Object.keys(imageUrlMap).length} Ready)`}
                      </button>
                    </div>
                  </div>

              <div className="space-y-2">
              <p className="text-xs text-gray-400">
                Upload a .csv file containing title, category, subcategory, brand, price, originalPrice, discount, rating, reviewsCount, image, and images.
              </p>
              <form onSubmit={handleBulkCsvUpload} className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="text-xs text-gray-300 border py-2.5 px-4 rounded-2xl  border-amber-200"
                />
                <button
                  type="submit"
                  disabled={bulkLoading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r cursor-pointer from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black disabled:opacity-50"
                >
                  {bulkLoading ? "Importing CSV..." : "Upload & Import CSV"}
                </button>
              </form>
               </div>
            </div>
          )}

                
       
       
       
       
       
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-600/80 text-emerald-300 rounded-2xl text-xs font-medium flex items-center gap-3 shadow-xl">
            <span className="text-lg">✅</span> {successMsg}
          </div>
        )}

        {/* TAB 1: ADD PRODUCT FORM */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800/80 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl backdrop-blur-md">
            <h2 className="text-sm font-bold tracking-wider text-[#d4af37] uppercase border-b border-zinc-800 pb-3">
              Product Information Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Product Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="e.g. Absolute Explore Eye Shadow Palette"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({...prev, title: e.target.value } ))}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  name="brand" 
                  required 
                  placeholder="e.g. LAKME"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Store Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                >
                  <option value="men">Men Clothing</option>
                  <option value="women">Women Clothing</option>
                  <option value="kid">Kids Collection</option>
                  <option value="beauty">Beauty & Personal Care</option>
                  <option value="Ethnic-wear">EthnicWear</option>
                  <option value="footwear">Footwear</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Subcategory</label>
                <input 
                  type="text" 
                  name="subcategory" 
                  placeholder="e.g. lakme, topwear, bottomwear"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Selling Price (₹)</label>
                <input 
                  type="number" 
                  name="price" 
                  required 
                  placeholder="999"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) =>( {...prev, price: e.target.value}))}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">MRP / Original Price (₹)</label>
                <input 
                  type="number" 
                  name="originalPrice" 
                  placeholder="1350"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Discount Label</label>
                <input 
                  type="text" 
                  name="discount" 
                  placeholder="26% OFF"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Rating</label>
                <input 
                  type="text" 
                  name="rating" 
                  placeholder="4.8"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Reviews Count</label>
                <input 
                  type="text" 
                  name="reviewsCount" 
                  placeholder="480"
                  value={formData.reviewsCount}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Main Thumbnail Image URL</label>
              <input 
                type="text" 
                name="image" 
                required 
                placeholder="https://vader-prod.s3.amazonaws.com/..."
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Multi-Angle Gallery Image URLs (4 slots)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.images.map((imgUrl, index) => (
                  <input 
                    key={index}
                    type="text"
                    placeholder={`Gallery Image URL ${index + 1}`}
                    value={imgUrl}
                    onChange={(e) => handleImageArrayChange(index, e.target.value)}
                    className="bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] transition"
                  />
                ))}
              </div>
            </div>

                <h2>{editingId? "Updated Product" : "add new Product"}</h2>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black font-extrabold py-4 rounded-xl transition shadow-xl hover:opacity-90 cursor-pointer text-xs tracking-wider uppercase mt-4"
            >
              {loading ? editingId? "Update product..." : "Submitting..." 
              : editingId? "Update Product" : "Submit Product"}
            </button>
          </form>
        )}

        {/* TAB 2: EXISTING PRODUCTS LIST */}
        {activeTab === "products" && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-sm font-bold tracking-wider text-[#d4af37] uppercase mb-4">
              Store Catalog Overview
            </h2>
            
            {products.length === 0 ? (
              <p className="text-xs text-gray-500 py-10 text-center">No products found in the database yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-gray-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Category / Subcategory</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {products.map((item) => (
                      <tr key={item._id || item.id} className="hover:bg-zinc-800/30 transition">
                        <td className="p-3">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-10 h-12 object-cover rounded-lg border border-zinc-700" 
                          />
                        </td>
                        <td className="p-3 font-semibold text-white max-w-xs truncate">{item.title}</td>
                        <td className="p-3 text-zinc-400 uppercase">
                          {item.category} {item.subcategory ? `> ${item.subcategory}` : ""}
                        </td>
                        <td className="p-3 font-bold text-[#d4af37]">₹{item.price}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex item-center justify-end gap-2">
                         
                          <Link 
                            href={`/product/${item._id || item.id}`} 
                            target="_blank"
                            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg border border-zinc-700"
                          >
                            View
                          </Link>

                        <button type="button"
                        href="/admin"
                        onClick={()=> handleOpenEdit(item)}
                        className="text-xs bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/40"
                        >
                          Edit
                        </button>
                        <button
                        type="button"
                        disabled={deletingId ===  (item.id || item.id)}
                        onClick={() => handleDeleteProduct(item._id || item.id)}
                        className="text-xs bg-red-500/15 hover:bg-red-500/25 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/40 disabled:opacity-50"
                      >
                        {deletingId === (item._id || item.id) ? "Deleting..." : "Deleting"}
                      </button>
                       </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}