import DemoNav from "@/components/demo/DemoNav";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoNav />
      <main className="pt-12 min-h-screen bg-gray-50">{children}</main>
    </>
  );
}
