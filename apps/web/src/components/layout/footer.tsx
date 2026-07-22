import Container from '@/components/ui/container';

const INFO_LINKS = [
  { label: 'Categories', href: '#categories' },
  { label: 'Trending', href: '#trending' },
  { label: 'How it works', href: '#how' },
  { label: 'Safety', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-diu-dark py-6 sm:py-10 bg-background text-diu-dark">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="font-display font-semibold text-xl">DIU Point</span>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-4 sm:gap-5 font-semibold text-[13px]">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-diu-dark transition-colors hover:text-diu-blue">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="text-[12.5px] opacity-70 font-normal">
            Made by DIU students, for DIU students.
          </span>
        </div>
      </Container>
    </footer>
  );
}
