# Auction Browser - Frontend Challenge

This project is a responsive web application for browsing auction items, built with Next.js and the latest React features. It focuses on providing a rich user experience with advanced filtering, sorting, and a polished UI, while maintaining performance and web vitals.

---

## ✨ Core Features

This application is packed with features designed to provide a seamless and intuitive user experience.

- **Responsive Grid & List Views:** Users can toggle between a spacious grid view and a detailed list view to browse items according to their preference.
- **Advanced Filtering & Search:**

  - **Debounced Search:** A performant full-text search that updates results as you type.
  - **Category Filter:** A searchable combobox to easily filter by item category.
  - **Price Range Filter:** A flexible component with dual inputs for minimum and maximum values.

- **URL State Management:** All filters, sorting options, and pagination are synced with the URL search parameters, allowing users to share or bookmark their specific views. The application state also correctly updates when using the browser's back and forward buttons.
- **Advanced Sorting:** Users can sort items by price, title, or end date in both ascending and descending order.
- **Pagination:** The results are paginated to ensure fast initial load times and a smooth browsing experience.
- **Modern & Accessible UI:**

  - Built with **shadcn/ui**, ensuring a consistent, modern, and fully accessible component library.
  - All interactive elements are properly labeled for screen readers and keyboard navigation.

- **Optimized User Experience:**

  - **Tailwind Animations:** Subtle animations on cards (hover states, transitions) and a custom “breathe” animation for live-status badges, all implemented with Tailwind CSS.

- **Dynamic Badges:** Item cards feature dynamic badges for status (e.g., "live", "ended") and category, with colors assigned programmatically for visual consistency.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** React hooks with URL-synced query parameters
- **Animations:** Tailwind CSS built-in keyframes & utility classes

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🔮 Future Improvements & Considerations

While the current application is feature-rich, here are some improvements that could be made, especially if this were a production application with real data.

### If Real Data Was Involved:

1. **Server-Side Filtering & Pagination (Highest Priority):**

   - **Problem:** Currently, all items are fetched on the client, and filtering/sorting happens in the browser, which is not scalable.
   - **Solution:** Implement API endpoints that accept filter/sort/pagination parameters and return only the necessary slice of data, reducing payload size and client processing.

2. **Real-Time Bidding with WebSockets:**

   - **Problem:** The "live" status is static.
   - **Solution:** Use a WebSocket connection (e.g., Socket.IO) to push real-time updates for bids and countdown timers without page reloads.

3. **Robust Error Handling:**

   - **Problem:** Error handling is currently minimal.
   - **Solution:** Create dedicated error pages/components with retry options and friendly messaging.

### Feature Enhancements & Architectural Improvements:

1. **Hybrid Rendering Strategy:**

   - **List Page (`/items`):** Use **Incremental Static Regeneration (ISR)** for the first page, revalidating periodically.
   - **Detail Page (`/items/[id]`):** Use **Static Site Generation (SSG)** or **ISR** for fast loads and good SEO, with a small client component to fetch live data.

2. **Advanced Data Fetching:**

   - Replace custom fetch logic with **React Query** or **SWR** for caching, background revalidation, and retries.

3. **UI Virtualization:**

   - For very large catalogs (1,000+ items), integrate **react-window** or **TanStack Virtual** to render only visible items, improving performance.

4. **User Authentication & Favorites:**

   - Add auth to enable features like "Favorites" or "Watchlist", requiring a backend and database.

5. **Image Gallery / Lightbox:**

   - Add a zoomable/lightbox component on the detail page for high-resolution image browsing.

6. **Comprehensive Testing:**

   - **Unit Tests:** For utility functions and components using Jest & React Testing Library.
   - **E2E Tests:** With Cypress or Playwright to simulate full user flows.

7. **Internationalization (i18n):**

   - Integrate a library like **next-intl** for multi-language support and locale-based formatting.
