'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteToggleButton from '@/components/listing/favorite-toggle-button';
import { getListingSlug, type Listing } from '@/data/mock-listings';
import { createListingHref } from '@/lib/routes';

function getFallbackGradient(seed: string): string {
  const colors = ['#3B82F6', '#FF6E4A', '#4CAF7D', '#FFC93C'];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const color = colors[Math.abs(hash) % colors.length];
  return `repeating-linear-gradient(45deg, ${color}2e, ${color}2e 9px, ${color}14 9px, ${color}14 18px)`;
}

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const listingHref = createListingHref(getListingSlug(listing));
  const imageSrc = listing.imageUrl?.trim() ?? '';
  const hasImage = imageSrc.length > 0;
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
  const showImage = hasImage && failedImageSrc !== imageSrc;
  const fallbackBackground = getFallbackGradient(listing.id);

  return (
    <article 
      className="group relative flex flex-col h-full bg-white border border-diu-dark/80 rounded-[12px] overflow-hidden transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(26,26,46,0.85)] shadow-[2px_2px_0_rgba(26,26,46,0.85)]"
    >
      {/* Image / Pattern */}
      <div 
        className="w-full aspect-[4/3] border-b border-diu-dark/80 relative overflow-hidden bg-white shrink-0"
        style={showImage ? undefined : { background: fallbackBackground }}
      >
        {showImage ? (
          <Link href={listingHref} aria-label={`View details for ${listing.title}`} className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={listing.title}
              fill
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              onError={() => setFailedImageSrc(imageSrc)}
            />
          </Link>
        ) : (
          <Link href={listingHref} aria-label={`View details for ${listing.title}`} className="absolute inset-0" />
        )}
        
        <div className="absolute right-2.5 top-2.5 z-20">
          <FavoriteToggleButton
            listingId={listing.id}
            className="flex items-center justify-center w-[32px] h-[32px] rounded-full border border-diu-dark/80 bg-white shadow-[1px_1px_0_rgba(26,26,46,0.85)] text-diu-dark transition-all hover:bg-diu-orange/10 hover:text-diu-orange cursor-pointer active:translate-y-px active:shadow-none"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow p-3.5 sm:p-4">
        {/* Title area (fixed min-height ensures alignment across cards) */}
        <h3 className="font-bold text-[15px] leading-[1.3] text-diu-dark line-clamp-2 min-h-[2.6em] mb-2.5">
          <Link href={listingHref} className="hover:underline">
            {listing.title}
          </Link>
        </h3>
        
        {/* Price Area */}
        <div className="mt-auto mb-3">
          <div className="font-display font-bold text-xl text-diu-orange leading-none">
            ৳{listing.price.toLocaleString()}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between gap-2 text-[12px] font-normal opacity-75 text-diu-dark mt-auto pt-2 border-t border-diu-dark/10">
          <span className="truncate min-w-0 flex-1">{listing.seller}</span>
          <span className="truncate min-w-0 flex-none max-w-[50%] text-right">{listing.location}</span>
        </div>
      </div>
    </article>
  );
}
