export default function Card({ children }: any) {
  return (
    <div className="card max-h-fit w-full border-4 border-accent bg-base-100">
      {children}
    </div>
  );
}
