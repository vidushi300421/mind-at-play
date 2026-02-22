export default function ContactSection() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-panel-right py-24">
      <div className="text-center">
        <h2 className="font-serif text-[64px] text-foreground">Contact.</h2>
        <p className="font-sans mt-4 opacity-60">Let's begin the work.</p>
        <button className="mt-8 px-8 py-3 bg-accent-red text-white font-sans text-[12px] uppercase tracking-widest rounded-full hover:scale-105 transition-transform cursor-pointer border-0">
          Book a Session
        </button>
      </div>
    </div>
  );
}