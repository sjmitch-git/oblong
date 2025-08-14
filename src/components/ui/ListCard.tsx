import Link from "next/link";

type ListCardProps = {
  title: string;
  link: string;
  image?: string;
};

const ListCard = ({ title, link, image }: ListCardProps) => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: image ? `url(${image})` : "none",
      }}
    >
      <Link href={link} className="card-link absolute inset-0" title={title}>
        <span className="sr-only">Read more about {title}</span>
      </Link>
    </div>
  );
};

export default ListCard;
