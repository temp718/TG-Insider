
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => {
  const { title, excerpt, date, author, imageUrl, slug } = post;
  
  return (
    <Card className={`overflow-hidden h-full card-hover ${featured ? 'border-telegram-purple/50' : ''}`}>
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span>{author}</span>
        </div>
        <Link to={`/blog/${slug}`} className="hover:text-telegram-purple transition-colors">
          <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-foreground/70 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" asChild className="text-telegram-purple hover:text-telegram-purple/80 hover:bg-telegram-purple/10 px-0">
          <Link to={`/blog/${slug}`}>Read More →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
