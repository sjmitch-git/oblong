import { AppConfig } from "@/lib/config";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <article className="flex flex-col items-center justify-center bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary from-20% to-primary-dark to-90% text-light space-y-8 px-4 min-h-[66vh]">
      <figure>
        <Logo />
        <figcaption className="text-xl text-center mt-4">{AppConfig.name}</figcaption>
      </figure>
      <p className="text-center">{AppConfig.description}</p>
    </article>
  );
}
