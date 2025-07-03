// components/Card.tsx
export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#dfdfdf] mb-4 ${className}`}>
      {children}
    </div>
  );
}
