import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import {Author, Startup} from "@/sanity/types";

export type StartupCard = Omit<Startup,"author"> & {author?: Author}

const StartupCard = ({ posts }: { posts: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = posts;

  return (
    <li className="startup-card group">
      {/* Top section with date and views */}
      <div className="flex-between">
        <p className="startup_card_date">{_createdAt}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      {/* Middle section with author + title + avatar */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={image || "https://placehold.co/600x400"}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Description + startup main image */}
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
      </Link>

      <img
        src={image || "https://placehold.co/600x400"}
        alt="startup"
        className="startup-card_img"
      />

      {/* Bottom section with category + details button */}
      <div className="flex-between gap-3 mt-5">
        <Link href={`/query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
