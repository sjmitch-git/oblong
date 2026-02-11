import Link from "next/link";
import { AppConfig } from "@/lib/config";
import Links from "@/data/links_footer.json";

export default function Footer() {
  return (
    <footer className="py-8 px-2 bg-gradient-to-t from-danger-dark to-dark sticky top-full text-light">
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
        <p className="text-sm mx-auto flex items-center justify-center gap-4">
          Built with{" "}
          <a
            href="https://breezeui.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark dark:text-primary-light nocontent"
            title="Visit Breeze demo website"
            aria-label="Visit Breeze demo website"
          >
            <img src="/breeze.png" alt="Breeze UI Logo" width={134} height={43} />
          </a>
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

        <p className="text-sm text-center" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {AppConfig.name}.
        </p>
      </div>
    </footer>
  );
}
