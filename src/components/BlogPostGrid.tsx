
import BlogPostCard, { BlogPost } from "@/components/BlogPostCard";

interface BlogPostGridProps {
  posts: BlogPost[];
  featured?: boolean;
}

const BlogPostGrid = ({ posts, featured = false }: BlogPostGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} featured={featured} />
      ))}
    </div>
  );
};

export default BlogPostGrid;
