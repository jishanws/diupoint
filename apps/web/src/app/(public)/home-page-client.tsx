'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/container';
import ListingCard from '@/components/ui/listing-card';
import { CATEGORIES, type Listing } from '@/data/mock-listings';
import { buildMixedLatestFeed } from '@/lib/api/home';
import { fetchListings } from '@/lib/api/listings';
import { APP_ROUTES } from '@/lib/routes';
import HowItWorks from '@/components/home/how-it-works';
import Testimonials from '@/components/home/testimonials';

// Map categories for filtering
const CATEGORY_LABEL_BY_ID = CATEGORIES.reduce<Record<string, string>>(
  (acc, category) => {
    acc[category.id] = category.label;
    return acc;
  },
  {}
);

interface HomePageClientProps {
  initialLatestListingsFeed: Listing[];
  initialFreshFromStores: Listing[];
}

export default function HomePageClient({
  initialLatestListingsFeed,
}: HomePageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [latestListingsFeed, setLatestListingsFeed] =
    useState<Listing[]>(initialLatestListingsFeed);

  useEffect(() => {
    let cancelled = false;
    async function loadListings() {
      try {
        const { listings } = await fetchListings();
        if (cancelled || listings.length === 0) return;
        setLatestListingsFeed(buildMixedLatestFeed(listings).slice(0, 18));
      } catch {
        // Keep server-provided data
      }
    }
    void loadListings();
    return () => { cancelled = true; };
  }, []);

  const latestListings = useMemo(() => {
    return latestListingsFeed.filter((listing) => {
      if (!activeCategory) return true;
      const label = CATEGORY_LABEL_BY_ID[activeCategory];
      return listing.category === label;
    });
  }, [activeCategory, latestListingsFeed]);

  function toggleCategory(cat: string) {
    setActiveCategory(prev => prev === cat ? null : cat);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="relative -rotate-[1deg] bg-diu-blue border-[3px] border-diu-dark rounded-[20px] p-6 sm:p-10 shadow-[6px_6px_0_rgba(26,26,46,0.85)]">
          <div className="absolute -top-3.5 right-6 sm:right-10 rotate-[5deg] bg-diu-yellow text-diu-dark font-bold text-[11px] sm:text-[13px] px-4 py-1.5 rounded-full border-2 border-diu-dark whitespace-nowrap z-10">
            only for DIU students
          </div>
          <div className="rotate-[1deg] w-full max-w-2xl sm:ml-2 lg:ml-4">
            <h1 className="font-display font-semibold text-[clamp(30px,7vw,52px)] leading-[1.1] mb-4 text-white">
              Buy it. Sell it.<br />Campus style.
            </h1>
            <p className="text-[clamp(14px,2vw,17px)] font-medium text-white/90 max-w-lg mb-8">
              Textbooks, gadgets, hostel gear, cycles & sublets — traded student to student, only on Daffodil International University campus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-2">
              <Link href={APP_ROUTES.postItem} className="flex-1 flex items-center justify-center text-center bg-diu-orange text-white border-[2px] border-diu-dark rounded-[12px] py-3.5 px-4 font-bold text-[15px] cursor-pointer shadow-[3px_3px_0_rgba(26,26,46,0.85)] transition-transform hover:-translate-y-0.5 active:translate-y-0">
                + Post an item
              </Link>
              <a href="#trending" className="flex-1 flex items-center justify-center text-center bg-white text-diu-dark border-[2px] border-diu-dark rounded-[12px] py-3.5 px-4 font-bold text-[15px] cursor-pointer transition-colors hover:shadow-[3px_3px_0_rgba(26,26,46,0.85)]">
                Browse marketplace
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* CATEGORIES */}
      <section id="categories">
        <Container className="py-6 sm:py-10">
          <h2 className="font-display font-semibold text-[clamp(22px,4vw,30px)] mb-5 text-diu-dark text-center sm:text-left">Shop by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <button onClick={() => toggleCategory('books')} className={`flex flex-col items-center justify-center text-center bg-white border-2 border-diu-dark rounded-xl p-5 transition-all hover:-translate-y-1 ${activeCategory === 'books' ? 'shadow-[3px_3px_0_rgba(255,110,74,0.85)] border-diu-orange bg-diu-orange/5' : 'shadow-[3px_3px_0_rgba(26,26,46,0.85)]'}`}>
              <div className="w-12 h-12 mb-3.5 rounded-full bg-diu-blue border-2 border-diu-dark flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M8 10 C8 8 10 8 12 8 L22 8 L22 38 L12 38 C10 38 8 38 8 36 Z"></path><path d="M40 10 C40 8 38 8 36 8 L26 8 L26 38 L36 38 C38 38 40 38 40 36 Z"></path><path d="M24 9 L24 38"></path></svg>
              </div>
              <span className="font-bold text-[14px] text-diu-dark">Books & notes</span>
            </button>
            <button onClick={() => toggleCategory('electronics')} className={`flex flex-col items-center justify-center text-center bg-white border-2 border-diu-dark rounded-xl p-5 transition-all hover:-translate-y-1 ${activeCategory === 'electronics' ? 'shadow-[3px_3px_0_rgba(255,110,74,0.85)] border-diu-orange bg-diu-orange/5' : 'shadow-[3px_3px_0_rgba(26,26,46,0.85)]'}`}>
              <div className="w-12 h-12 mb-3.5 rounded-full bg-diu-orange border-2 border-diu-dark flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="6" width="28" height="36" rx="6"></rect><line x1="18" y1="12" x2="30" y2="12"></line><circle cx="24" cy="34" r="2" fill="#fff" stroke="none"></circle></svg>
              </div>
              <span className="font-bold text-[14px] text-diu-dark">Electronics</span>
            </button>
            <button onClick={() => toggleCategory('room')} className={`flex flex-col items-center justify-center text-center bg-white border-2 border-diu-dark rounded-xl p-5 transition-all hover:-translate-y-1 ${activeCategory === 'room' ? 'shadow-[3px_3px_0_rgba(255,110,74,0.85)] border-diu-orange bg-diu-orange/5' : 'shadow-[3px_3px_0_rgba(26,26,46,0.85)]'}`}>
              <div className="w-12 h-12 mb-3.5 rounded-full bg-diu-green border-2 border-diu-dark flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="14" y1="8" x2="14" y2="28"></line><line x1="12" y1="8" x2="36" y2="8"></line><line x1="10" y1="28" x2="38" y2="28"></line><line x1="12" y1="28" x2="12" y2="40"></line><line x1="36" y1="28" x2="36" y2="40"></line></svg>
              </div>
              <span className="font-bold text-[14px] text-diu-dark">Room essentials</span>
            </button>
            <button onClick={() => toggleCategory('fashion')} className={`flex flex-col items-center justify-center text-center bg-white border-2 border-diu-dark rounded-xl p-5 transition-all hover:-translate-y-1 ${activeCategory === 'fashion' ? 'shadow-[3px_3px_0_rgba(255,110,74,0.85)] border-diu-orange bg-diu-orange/5' : 'shadow-[3px_3px_0_rgba(26,26,46,0.85)]'}`}>
              <div className="w-12 h-12 mb-3.5 rounded-full bg-diu-yellow border-2 border-diu-dark flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M24 10 a3.2 3.2 0 1 1 -0.1 0"></path><path d="M24 14 L8 27 L20 27 L24 22 L28 27 L40 27 Z"></path></svg>
              </div>
              <span className="font-bold text-[14px] text-diu-dark">Fashion & more</span>
            </button>
          </div>
          {activeCategory && (
            <div className="mt-6 flex sm:justify-start justify-center">
              <button onClick={() => setActiveCategory(null)} className="inline-flex items-center gap-2 bg-diu-dark text-white rounded-full px-5 py-2 font-semibold text-[13px] cursor-pointer hover:bg-gray-800 transition-colors">
                Showing: {CATEGORY_LABEL_BY_ID[activeCategory]} ✕
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* TRENDING LISTINGS */}
      <section id="trending">
      <Container className="py-10 sm:py-14">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-6">
          <h2 className="font-display font-semibold text-[clamp(22px,4vw,30px)] m-0 text-diu-dark">Trending on campus</h2>
          <span className="text-[13px] font-medium opacity-60 text-diu-dark">
            {latestListings.length} {latestListings.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        {latestListings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {latestListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="border-[3px] border-dashed border-diu-dark rounded-[16px] p-8 text-center font-semibold opacity-70 text-diu-dark">
            No items match this category yet — be the first to post one!
          </div>
        )}
      </Container>
      </section>

      <HowItWorks />
      <Testimonials />

    </main>
  );
}
