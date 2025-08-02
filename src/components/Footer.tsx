import Link from "next/link";
import { AppConfig } from "@/lib/config";
import Links from "@/data/links_footer.json";

export default function Footer() {
  return (
    <footer className="p-8 bg-gradient-to-t from-primary-dark from-30% to-primary to-90% sticky top-full text-light">
      <div className="container mx-auto flex flex-col justify-center items-center space-y-4">
        <ul className="flex gap-4 justify-center mb-8">
          {Links.map((link: { href: string; name: string; title?: string }, i: number) => (
            <li key={i}>
              <Link
                href={link.href}
                className="text-light underline"
                title={link.title || link.name}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
        </p>
        <p className="text-sm">
          Created by{" "}
          <a
            href={AppConfig.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-light"
          >
            {AppConfig.author}
          </a>
        </p>
        <div>
          Built with:{" "}
          <a
            href="https://fluid-ui.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-light"
          >
            Fluid UI
          </a>
        </div>
      </div>
    </footer>
  );
}
