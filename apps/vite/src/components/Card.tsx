export default function Card({ children }: any) {
  return (
    <div className="card max-h-fit w-full bg-base-100 shadow-lg shadow-secondary/20">
      {children}
    </div>
  );
}
