import Link from "next/link";
import { PortfolioProps } from "@/lib/types";

const ListCard = (article: PortfolioProps) => {
  return (
    <li
      title={article.description}
      className="relative transition border border-gray-700 hover:border-accent focus-within:border-accent bg-white dark:bg-black"
      style={{ perspective: "1000px" }}
    >
      <Link href={`/portfolio/${article.slug}`} className="card-link group">
        <div className="relative w-full h-48 transition-transform duration-500 [transform-style:preserve-3d] group-focus-within:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)]">
          {/* Front Face */}
          <div className="absolute inset-0 [backface-visibility:hidden] grid grid-cols-4 bg-white dark:bg-black">
            <div className="text-center aspect-square p-1">
              <img
                src={article.thumbnail?.url}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-base p-2 col-span-3 mb-auto">
              <h3 className="text-lg mb-1 md:mb-2 uppercase font-bold">
                {article.shortTitle || article.title}
              </h3>
              <p className="text-base font-mono text-light line-clamp-3">
                {article.keywords.join(", ")}
              </p>
            </div>
          </div>
          {/* Back Face */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center bg-black dark:bg-white text-light dark:text-dark p-4">
            <p className="text-left text-sm line-clamp-4">{article.description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListCard;
