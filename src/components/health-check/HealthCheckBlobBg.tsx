export function HealthCheckBlobBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-mint/60 blur-3xl" />
      <div className="absolute -right-16 top-32 h-48 w-48 rounded-full bg-skysoft/50 blur-3xl" />
      <div className="absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-beige/80 blur-3xl" />
    </div>
  );
}
