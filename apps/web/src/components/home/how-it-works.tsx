import Container from '@/components/ui/container';

export default function HowItWorks() {
  return (
    <section id="how" className="bg-diu-dark py-14 sm:py-20">
      <Container>
        <h2 className="font-display font-semibold text-[clamp(22px,4vw,30px)] text-background mb-8 sm:mb-10">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-diu-yellow border-2 border-diu-dark flex items-center justify-center font-display font-semibold text-[18px] text-diu-dark">
              1
            </div>
            <div className="font-bold text-[16px] text-background">
              Post your item
            </div>
            <div className="text-[13.5px] text-background/70 leading-relaxed max-w-sm">
              Snap a photo, set your price, done in under a minute.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-diu-blue border-2 border-diu-dark flex items-center justify-center font-display font-semibold text-[18px] text-white">
              2
            </div>
            <div className="font-bold text-[16px] text-background">
              Chat with a verified student
            </div>
            <div className="text-[13.5px] text-background/70 leading-relaxed max-w-sm">
              Every account is verified using a DIU student email. Only verified students can communicate.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-diu-green border-2 border-diu-dark flex items-center justify-center font-display font-semibold text-[18px] text-white">
              3
            </div>
            <div className="font-bold text-[16px] text-background">
              Meet on campus & swap
            </div>
            <div className="text-[13.5px] text-background/70 leading-relaxed max-w-sm">
              Meet safely on campus and complete the exchange.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
