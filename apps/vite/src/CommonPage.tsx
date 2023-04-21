import Header from "./Header";

export default function CommonPage({ children }: any) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow flex flex-col">{children}</div>
    </div>
  );
}
