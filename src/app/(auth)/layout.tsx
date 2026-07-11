export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] overflow-hidden pt-20 pb-12 px-4 sm:px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#4eafc4] blur-[120px] opacity-15" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#2a4a73] blur-[100px] opacity-20" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(78,175,196,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(78,175,196,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
