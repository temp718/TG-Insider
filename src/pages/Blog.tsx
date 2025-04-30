
import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { blogCategories } from "@/data/blogCategories";
import BlogPostGrid from "@/components/BlogPostGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
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
      <div className="py-16 md:py-20 bg-gradient-to-br from-telegram-purple/10 to-telegram-blue/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-10">Telegram Insider Blog</h1>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-3 top-3 text-foreground/50">
              <Search className="h-5 w-5" />
            </div>
            <Input 
              type="text"
              placeholder="Search articles..."
              className="pl-10 py-6 text-lg shadow-softer bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="container py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {blogCategories.map((category) => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer text-sm py-1.5 px-4 rounded-full ${
                selectedCategory === category 
                  ? 'bg-telegram-purple hover:bg-telegram-purple/90' 
                  : 'hover:bg-telegram-purple/10 hover:text-telegram-purple'
              }`}
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
          <div className="text-center py-20 bg-white rounded-2xl shadow-softer">
            <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="border-2 border-telegram-purple/30 hover:border-telegram-purple text-telegram-purple hover:bg-telegram-purple/5"
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
      
      <div className="container py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-telegram-purple/5 to-telegram-blue/5 p-8 rounded-2xl shadow-softer">
          <NewsletterSubscribe />
        </div>
      </div>
    </div>
  );
};

export default Blog;
