export default function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`label label-slash ${className}`}>{children}</p>;
}
