export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main">
      <article className="article">{children}</article>
    </main>
  );
}
