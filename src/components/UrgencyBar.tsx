export default function UrgencyBar() {
  return (
    <div
      className="text-luxury-dark py-3.5 px-6 text-center text-[0.72rem] tracking-[0.14em] uppercase font-bold"
      style={{ background: 'linear-gradient(90deg, #9B7A2F, #C9A84C, #9B7A2F)' }}
    >
      <i className="ri-fire-line mr-2" />
      Phase 1 — Limited Residences Available. Filling Fast.{' '}
      <a href="tel:+233244028485" className="underline hover:no-underline whitespace-nowrap">
        Call +233 24 402 8485
      </a>{' '}
      to Secure Yours Today.
    </div>
  );
}
