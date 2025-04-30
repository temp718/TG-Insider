
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, User, Star } from "lucide-react";
import CategoryBadge from "@/components/CategoryBadge";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Card } from "@/components/ui/card";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find((post) => post.slug === slug);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="py-12 md:py-16 bg-telegram-light">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <CategoryBadge category={post.category} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-foreground/70">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {post.imageUrl && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <div className="blog-content prose prose-lg max-w-none">
              {/* This would be your post content, for now let's use dummy text */}
              <p>
                Telegram has recently introduced an exciting new feature called "Stars" that's transforming how users interact with content on the platform. This innovative addition allows users to express appreciation for messages in channels and groups, similar to how likes or reactions work on other platforms.
              </p>
              <h2>What are Telegram Stars?</h2>
              <p>
                Stars are a new reaction feature that goes beyond simple emoji responses. When a user gives a message a Star, they're not just showing appreciation – they're contributing to a new ecosystem that benefits content creators and enhances the overall Telegram experience.
              </p>
              <p>
                The Stars feature is part of Telegram's broader initiative to help content creators monetize their efforts while maintaining the platform's user-friendly appeal.
              </p>
              <h2>How Telegram Stars Work</h2>
              <p>
                Users can purchase Stars through the Telegram app and then give them to messages they appreciate. When a message receives Stars, the channel owner receives a portion of the revenue, creating a direct monetization path between content creators and their audience.
              </p>
              <p>
                This system is particularly beneficial for:
              </p>
              <ul>
                <li>Channel owners who create valuable content regularly</li>
                <li>Community managers who foster engaging discussions</li>
                <li>Experts who share knowledge and insights</li>
                <li>Entertainers who produce enjoyable content</li>
              </ul>
              <h2>Benefits for Users and Creators</h2>
              <p>
                The Stars feature creates a win-win situation for both content consumers and creators:
              </p>
              <h3>For Creators:</h3>
              <ul>
                <li>Direct revenue stream based on content quality</li>
                <li>Immediate feedback on which content resonates with the audience</li>
                <li>Incentive to create more valuable and engaging content</li>
                <li>Opportunity to offer exclusive benefits to top supporters</li>
              </ul>
              <h3>For Users:</h3>
              <ul>
                <li>Ability to show appreciation beyond simple reactions</li>
                <li>Way to support favorite content creators directly</li>
                <li>Potential access to exclusive content or features</li>
                <li>More engaging and high-quality content as creators are incentivized</li>
              </ul>
              <h2>Future of Telegram Stars</h2>
              <p>
                As this feature continues to evolve, we can expect Telegram to expand its capabilities. Potential future developments might include:
              </p>
              <ul>
                <li>Enhanced analytics for creators to track Star performance</li>
                <li>More integration with other Telegram features</li>
                <li>Expanded options for how creators can reward Star-giving users</li>
                <li>Promotional events and Star bonuses for users</li>
              </ul>
              <p>
                Telegram Stars represent an important step in the evolution of the platform, moving beyond simple messaging to create a sustainable ecosystem for content creators while maintaining the user-focused experience that has made Telegram so popular.
              </p>
              <p>
                As more users and creators embrace this feature, we'll likely see innovative uses and best practices emerge. Stay tuned to Telegram Insider for the latest updates and guides on making the most of Stars and other Telegram features.
              </p>
            </div>
            
            <div className="border-t mt-8 pt-8">
              <Button asChild variant="outline">
                <Link to="/blog">
                  ← Back to All Articles
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-20">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                <p className="text-foreground/80 text-sm">
                  {post.author} is a Telegram expert who has been covering messaging platforms and digital communication for over 5 years.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts
                    .filter(relatedPost => relatedPost.category === post.category && relatedPost.id !== post.id)
                    .slice(0, 3)
                    .map(relatedPost => (
                      <div key={relatedPost.id} className="border-b pb-3 last:border-0">
                        <Link 
                          to={`/blog/${relatedPost.slug}`}
                          className="text-foreground hover:text-primary font-medium text-sm line-clamp-2"
                        >
                          {relatedPost.title}
                        </Link>
                        <div className="text-xs text-foreground/60 mt-1">{relatedPost.date}</div>
                      </div>
                    ))}
                </div>
              </Card>
              
              <NewsletterSubscribe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
