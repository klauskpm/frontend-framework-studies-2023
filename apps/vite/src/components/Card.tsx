export default function Card({ children }: any) {
    return (
        <div className="card max-h-fit w-full max-w-sm bg-base-100 shadow-2xl border border-accent/40">
            {children}
        </div>
    )
}