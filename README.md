

Youth pinnacle - Full-Stacj Garment E-Commerce Platform

A responsive full-stack apparel storefront built with **Next.js (App Router)**, **MongoDB**, **Tailwind CSS**, **Razorpay**, and **Cloudinary**, featuring role-based access, order/return workflows, an analytics dashboard, and bulk CSV product imports with dynamic image URL mapping.

## Key Features
* **Storefront & Shopping:** Multi-category browsing, responsive UI, product gallery & pincode delivery check, cart, wishlist, saved addresses, and profile management.
* **Payments & Orders:** Razorpay integration (cards/UPI/netbanking) + Cash on Delivery (COD), live order tracking, and return requests.
* **Auth & Security:** Role-based authentication and authorization separating customer and admin access, with environment-managed secrets.
* **Admin Dashboard:** Store analytics, add/edit/manage products, and **bulk CSV upload Products (`csv-parse`)** mapped automatically to **Cloudinary** image URLs.


## Tech Stack

### **Languages & Runtime**
* **JavaScript (ES6+):** Core application logic across UI components, API endpoints, CSV processing, and data normalization.
* **Node.js:** Open-source, cross-platform JavaScript runtime built on Chrome's V8 engine, enabling server-side execution outside the browser.
* **HTML5 & JSX:** Semantic markup and reusable component structure for React interfaces.
* **CSS3:** Responsive styling, layout structure, and visual hierarchy.

### **Frameworks & Libraries**
* **Next.js (App Router):** Full-stack React framework handling pages, routing, and server/API route handlers.
* **React:** Component-based UI rendering and interactive state management.
* **Tailwind CSS:** Utility-first CSS framework for responsive layouts, navigation, and structured footers.
* **Express.js *(where standalone Node routes/services are used)*:** Lightweight Node.js framework for structured routing, middleware pipelines, and HTTP request/response handling.
* **`csv-parse`:** Parses uploaded CSV files into structured rows for bulk product creation.

### **Frontend**
* **Responsive Storefront:** Multi-category browsing, product detail pages, multi-angle image gallery switching, and delivery pincode checks.
* **Customer Account & Checkout:** Profile management, saved addresses, cart, wishlist, order tracking, and return requests.
* **Admin Dashboard UI:** Store analytics overview, single/existing product management, and bulk CSV + image mapping workflow.

### **Backend & Integrations**
* **Server Route Handlers (Node.js):** API endpoints powering products, orders, user accounts, and bulk admin imports.
* **Authentication & Authorization:** Role-based access control separating customer and admin access.
* **Payments (Razorpay & COD):** Online payments via Razorpay (cards, UPI, net banking) alongside Cash on Delivery (COD).
* **Cloudinary:** Cloud image hosting and CDN delivery paired with filename-to-URL mapping during bulk imports.

### **Database**
* **MongoDB:** NoSQL document database storing products, users, orders, addresses, carts, and wishlists.

git clone <your-repository-url>
cd <your-project-folder>
npm install


Run the development server

npm run dev