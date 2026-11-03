export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      áurea<span className="logo__accent">fisio</span>
    </span>
  )
}
