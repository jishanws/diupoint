import React from 'react';

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  department: string;
  batch: string;
  color: string;
  rotation: string;
  accentRotation: string;
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div 
      className="relative bg-white border-2 border-diu-dark rounded-xl p-5"
      style={{ transform: testimonial.rotation }}
    >
      <div 
        className="absolute -top-2 left-6 w-11 h-4 border border-diu-dark/30"
        style={{ 
          backgroundColor: testimonial.color, 
          transform: testimonial.accentRotation 
        }}
      />
      <p className="text-[14.5px] leading-relaxed mb-5 text-diu-dark font-medium">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="font-bold text-[13.5px] text-diu-dark">
        {testimonial.name}
      </div>
      <div className="text-[12px] opacity-60 text-diu-dark font-normal mt-0.5">
        {testimonial.department}, {testimonial.batch}
      </div>
    </div>
  );
}
