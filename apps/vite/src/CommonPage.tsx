import Header from "./Header"

export default function CommonPage({ children }: any) {
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="grow">{children}</div>
        </div>
    );
}
