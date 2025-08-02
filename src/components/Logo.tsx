import { AppConfig } from "@/lib/config";

const Logo = () => {
  return (
    <picture>
      <source
        srcSet={`${process.env.NEXT_PUBLIC_BASE_URL}logo-lg.png`}
        media="(min-width: 1024px)"
        sizes="554px"
      />
      <source
        srcSet={`${process.env.NEXT_PUBLIC_BASE_URL}logo-md.png`}
        media="(min-width: 640px)"
        sizes="300px"
      />
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}logo-sm.png`}
        alt={`${AppConfig.shortName} Logo`}
        className="logo mx-auto mt-12"
        sizes="(min-width: 1024px) 554px, (min-width: 640px) 300px, 200px"
      />
    </picture>
  );
};

export default Logo;
