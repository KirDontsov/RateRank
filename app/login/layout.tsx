export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="relative flex flex-cols justify-center items-center h-screen">{children}</section>
}