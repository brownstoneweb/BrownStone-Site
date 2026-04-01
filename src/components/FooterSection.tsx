export default function FooterSection() {
  const links = [
    { label: 'Townhouses', href: 'https://www.brownstoneltd.com/celestia/townhouses' },
    { label: 'Chalets', href: 'https://www.brownstoneltd.com/celestia/chalets' },
    { label: 'Lakehouse', href: 'https://www.brownstoneltd.com/celestia/lakehouse' },
    { label: 'Portfolio', href: 'https://www.brownstoneltd.com/portfolio' },
    { label: 'Contact', href: 'https://www.brownstoneltd.com/contact' },
  ];

  return (
    <footer className="px-8 lg:px-14 py-12 bg-luxury-dark border-t border-gold/10">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row justify-between items-center flex-wrap gap-6">
        <div className="font-serif-luxury text-gold text-sm tracking-[0.18em] uppercase">BrownStone Construction Ltd</div>
        <div className="flex flex-wrap gap-6 justify-center">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="nofollow" className="text-luxury-mist text-[0.62rem] tracking-[0.12em] uppercase hover:text-gold transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto mt-6 pt-5 border-t border-white/5 text-center text-[0.6rem] text-luxury-mist/30">
        © 2026 Brownstone Construction Limited &nbsp;·&nbsp; 1 Airport Square, Accra, Ghana &nbsp;·&nbsp;
        +233 24 402 8485 &nbsp;·&nbsp; ghanaisthefuture@brownstoneltd.com
      </div>
    </footer>
  );
}
