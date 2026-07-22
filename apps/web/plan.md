# Implementation Plan

## 1. Global Styles & Fonts (`src/app/globals.css` & `src/app/layout.tsx`)
- Import `Fredoka` and `Poppins` fonts via `next/font/google` in `layout.tsx`.
- Update `globals.css` to use the prototype's color palette (`--background: #F7F4EC`, `--foreground: #1A1A2E`).
- Add the `wiggle` keyframe animation and the `::selection` highlight colors to `globals.css`.

## 2. Navigation Bar (`src/components/layout/navbar.tsx`)
- Refactor the DOM structure and styling to match the prototype's bold, border-heavy aesthetic (`border-b-[3px] border-[#1A1A2E]`).
- Style the "+ Post" button with the orange pill design.
- Keep all existing state and logic (Authentication, Cart count, Dark Mode toggle, Search) but reskin the dropdowns and buttons with flat colors and thick borders.
- Keep the `isVerified` check to conditionally show the "Verified students only ✓" badge.

## 3. Homepage (`src/app/(public)/home-page-client.tsx`)
- Replace the existing `CategoryFilter` and generic hero with the exact **Hero Section** from the prototype (slanted blue container, "Buy it. Sell it. Campus style.", and inline search bar).
- Build the **"Shop by category"** grid with the 4 slanted, colorful cards, wiring them up to the existing `activeCategory` state.
- Refactor the **"Latest Listings"** section to match the "Trending on campus" layout, retaining the `latestListingsFeed` data.
- Add the static **"How it works"** section with the dark `#1A1A2E` background.
- Add the static **"From the DIU feed"** testimonials section.
- Wire the search bar in the hero section to push to the search route (preserving functionality).

## 4. Listing Card (`src/components/ui/listing-card.tsx`)
- Update the card container to use `border-[3px] border-[#1A1A2E] rounded-[14px]` with a pseudo-random or static slight rotation to match the prototype's playful feel.
- Reskin the price to use the `Fredoka` font and `#FF6E4A` color.
- Retain the `FavoriteToggleButton` and `next/image` integration, ensuring it still functions perfectly with the backend.

## 5. Footer (`src/components/layout/footer.tsx`)
- Redesign the footer layout and typography, applying `border-t-[3px] border-[#1A1A2E]` and the prototype's link arrangement.

