const stats = [
  { num: '104', unit: 'km', label: 'From Accra' },
  { num: '90', unit: 'min', label: 'Drive Time' },
  { num: '3', unit: '', label: 'Residence Types' },
  { num: '∞', unit: '', label: 'Panoramic Views' },
];

export default function StatsSection() {
  return (
    <div className="bg-luxury-warm grid grid-cols-2 lg:grid-cols-4 gap-px">
      {stats.map((s) => (
        <div key={s.label} className="bg-luxury-stone py-12 px-6 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-7 bg-gold" />
          <span className="font-serif-luxury text-gold leading-none block" style={{ fontSize: '3.6rem', fontWeight: 300 }}>
            {s.num}
            {s.unit && <span className="text-2xl">{s.unit}</span>}
          </span>
          <span className="text-[0.6rem] tracking-[0.22em] uppercase text-luxury-mist mt-2 block">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
