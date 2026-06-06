export function HealthCheckBlobBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-20 -top-20 h-72 w-72 animate-float rounded-full bg-mint/50 blur-3xl" />
      <div
        className="absolute -right-16 top-32 h-56 w-56 animate-float rounded-full bg-skysoft/40 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-24 left-1/4 h-64 w-64 animate-float rounded-full bg-beige/70 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute right-1/4 top-1/2 h-32 w-32 animate-glow rounded-full bg-leaf/10 blur-2xl" />
    </div>
  );
}
