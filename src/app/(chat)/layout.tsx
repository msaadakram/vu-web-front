export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-x-0 top-16 lg:top-[72px] bottom-0 flex flex-col bg-[#f8fafc]">
      {children}
    </div>
  );
}
