import Link from "next/link";
import { PortfolioProps } from "@/lib/types";

const ListCard = ({ article }: PortfolioProps) => {
  return (
    <li
      title={article.description}
      className="grid grid-cols-4 bg-white dark:bg-black border-t  shadow-lg relative transition border-gray-900 shadow-gray-900 hover:shadow-black bg-dark"
    >
      <div className="text-center aspect-square p-1 md:pt-4">
        <img src={article.thumbnail?.url} alt={article.title} />
      </div>
      <div className="text-base p-4 col-span-3 mb-auto">
        <Link href={`/portfolio/${article.slug}`} className="no-underline">
          <h3 className="text-lg mb-1 md:mb-2 text-current uppercase font-bold">
            {article.shortTitle || article.title}
          </h3>
          <p className="text-base font-mono text-light line-clamp-3">{article.keywords.join(", ")}</p>
        </Link>
      </div>
    </li>
  );
};

export default ListCard;
