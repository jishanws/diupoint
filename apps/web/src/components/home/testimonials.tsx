import Container from '@/components/ui/container';
import TestimonialCard, { type Testimonial } from './testimonial-card';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Sold my old calculator and Physics notes in two days. Met the buyer right outside the library — so easy.',
    name: 'Tanvir Ahmed',
    department: 'CSE',
    batch: 'Batch 52',
    color: 'rgba(59, 130, 246, 0.7)', // diu-blue with opacity
    rotation: 'rotate(-1.5deg)',
    accentRotation: 'rotate(-5deg)',
  },
  {
    id: '2',
    quote: 'Furnished my whole hostel room for under 5,000৳ buying secondhand from seniors. Wish I found this on day one.',
    name: 'Nusrat Jahan',
    department: 'Pharmacy',
    batch: 'Batch 49',
    color: 'rgba(255, 110, 74, 0.7)', // diu-orange with opacity
    rotation: 'rotate(1.2deg)',
    accentRotation: 'rotate(4deg)',
  },
  {
    id: '3',
    quote: 'Knowing everyone\'s a verified DIU student makes it feel safe. No random buyers from off-campus groups.',
    name: 'Rafiq Islam',
    department: 'EEE',
    batch: 'Batch 51',
    color: 'rgba(76, 175, 125, 0.7)', // diu-green with opacity
    rotation: 'rotate(-1deg)',
    accentRotation: 'rotate(-3deg)',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 sm:py-20">
      <Container>
        <h2 className="font-display font-semibold text-[clamp(22px,4vw,30px)] text-diu-dark mb-8 sm:mb-10">
          From the DIU feed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
