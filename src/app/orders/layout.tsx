import SideBar from "./components/sidebar/sidebar";

export default function OrdersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen bg-gray-100 mt-36">
      <div className="flex flex-row h-[calc(100vh-100px)]">
        <SideBar />
        <div className="flex-1 overflow-y-auto p-7">{children}</div>
      </div>
    </div>
  );
}
