
import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { blogCategories } from "@/data/blogCategories";
import BlogPostGrid from "@/components/BlogPostGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { BlogPost } from "@/components/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen">
      <div className="py-12 md:py-16 bg-telegram-light">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Telegram Insider Blog</h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
              <Input 
                type="text"
                placeholder="Search articles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {blogCategories.map((category) => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {filteredPosts.length > 0 ? (
          <>
            <BlogPostGrid posts={filteredPosts} />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-foreground/70 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
      
      <div className="container py-12">
        <NewsletterSubscribe className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
};

export default Blog;
