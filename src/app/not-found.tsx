import Link from "next/link";

export default function NotFound() {
  return (
    <article className="flex flex-col items-center justify-center min-h-50 p-6 text-danger space-y-8">
      <h1 className="text-3xl font-bold">Not Found!</h1>
      <p className="text-lg mb-2">Could not find requested page.</p>
      <Link href="/">Return Home</Link>
    </article>
  );
}
