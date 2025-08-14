import { Heading } from "@/lib/fluid";

interface HeroProps {
  title: string;
  description?: React.ReactNode;
}

const Hero = ({ title, description }: HeroProps) => {
  return (
    <div className={`flex p-0 gap-4 md:gap-8 flex-row items-center mb-4 md:mb-8 lg:mb-12`}>
      <div className="flex flex-col gap-4">
        <Heading>{title}</Heading>
        {description && (
          <p className="text-xl max-w-prose line-clamp-4 dark:opacity-85 mb-0">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
