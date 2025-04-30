
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <Badge asChild variant="secondary" className="hover:bg-telegram-purple/20">
      <Link to={`/blog/category/${category.toLowerCase()}`}>{category}</Link>
    </Badge>
  );
};

export default CategoryBadge;
