export default function Card({ children }: any) {
    return (
        <div className="card max-h-fit w-full bg-base-100 border-4 border-accent">
            {children}
        </div>
    )
}