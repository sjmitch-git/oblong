import { AppConfig } from "@/lib/config";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <article className="flex flex-col items-center justify-center bg-dark text-light space-y-8 px-4 flex-grow">
      <figure>
        <Logo />
        <figcaption className="text-xl text-center mt-4">{AppConfig.name}</figcaption>
      </figure>
      <p className="text-center">{AppConfig.description}</p>
    </article>
  );
}
