'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Featured Main Image */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-[#303030] shadow-xs">
        <Image
          src={images[activeImageIndex] || images[0]}
          alt={`${alt} — Photo ${activeImageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white">
          Photo {activeImageIndex + 1} of {images.length}
        </div>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-slate-900 dark:border-[#10B981] ring-2 ring-slate-900/20 dark:ring-[#10B981]/20'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

