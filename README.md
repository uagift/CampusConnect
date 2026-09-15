# 🎓 CampusConnect

> **Discover. Connect. Belong.**

CampusConnect is a responsive student-focused web application that helps students discover campus events, activities, and community opportunities in one place.

## ✨ Features

- 🔎 Search and explore events
- 🏷️ Filter opportunities by category
- 📄 View detailed event information
- 🎫 Join and ❤️ save activities
- 🌐 Discover events through the Ticketmaster API
- 👥 Create, edit, and delete community opportunities
- ⏳ Loading, error, retry, and empty states
- 💾 Persistent saved and joined activities with localStorage
- 📱 Responsive design

## 🛠️ Built With

- React
- Vite
- React Router
- Context API
- JavaScript
- CSS
- REST API
- Ticketmaster Discovery API

## 📌 Project Evolution

### CampusConnect 1.0 — Task 1

Built as a React Single Page Application using local event data, routing, filtering, and student activity management.

### CampusConnect 2.0 — Task 2

Extended the application with REST API integration, Ticketmaster events, API-powered search, and community-created opportunities with CRUD functionality.

### ⚡ CampusConnect 3.0 — Performance Optimization

As part of **CodVeda Level 3 — Task 2**, CampusConnect was audited and optimized using **Google Lighthouse**.

#### Performance Improvements

- 🖼️ Optimized local event images and significantly reduced image file sizes.
- 💤 Added lazy loading and asynchronous image decoding for secondary event images.
- 📦 Implemented route-level code splitting to defer non-home page JavaScript.
- 🔤 Improved Google Fonts loading by removing CSS `@import` and using direct stylesheet loading with preconnects.
- 🚀 Prioritized the above-the-fold hero image for improved resource scheduling.
- ⚡ Reduced unnecessary resources loaded during the initial page load.

#### Lighthouse Results

| Category | Before | After |
| --- | ---: | ---: |
| 🚀 Performance | 72 | **90** |
| ♿ Accessibility | 95 | **100** |
| 🛡️ Best Practices | 100 | **100** |
| 🔎 SEO | 83 | **100** |

**Result:** CampusConnect reached a **90+ Lighthouse score across all four categories**, with perfect scores in Accessibility, Best Practices, and SEO.

#### Performance Validation

The optimization was validated using Lighthouse against the production build/preview under mobile conditions and network throttling.

The optimization process followed:

**Audit → Identify bottlenecks → Optimize → Production Build → Lighthouse → Measure**

## 🚀 Getting Started

```bash
git clone https://github.com/uagift/CampusConnect.git

cd CampusConnect/frontend

npm install

npm run dev