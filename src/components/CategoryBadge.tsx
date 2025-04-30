
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <Link to={`/blog/category/${category.toLowerCase()}`}>
      <Badge variant="secondary" className="hover:bg-telegram-purple/20">
        {category}
      </Badge>
    </Link>
  );
};

export default CategoryBadge;
