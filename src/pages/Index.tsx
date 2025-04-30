
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import BlogPostGrid from "@/components/BlogPostGrid";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  // Get only the latest 3 blog posts
  const latestPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <FeaturesSection />
      
      <section className="py-16 bg-telegram-light">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <a href="/blog" className="text-telegram-purple hover:underline mt-2 md:mt-0">
              View All Articles →
            </a>
          </div>
          <BlogPostGrid posts={latestPosts} />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <NewsletterSubscribe className="max-w-3xl mx-auto" />
        </div>
      </section>
    </div>
  );
};

export default Index;
