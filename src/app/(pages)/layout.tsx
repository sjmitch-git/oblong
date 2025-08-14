export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pt-8 lg:pt-12 pb-12 px-2 md:px-4 lg:px-0 max-w-4xl mx-auto">
      <article className="mx-auto">{children}</article>
    </main>
  );
}
