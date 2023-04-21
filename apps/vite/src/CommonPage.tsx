import Header from "./Header";

export default function CommonPage({ children }: any) {
  return (
    <div className="flex min-h-screen h-screen flex-col">
      <Header />
      <div className="grow">{children}</div>
    </div>
  );
}
