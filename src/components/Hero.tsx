
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-hero-pattern py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 bg-white/70 backdrop-blur-sm py-2 px-4 rounded-full w-fit">
              <Star className="h-5 w-5 text-telegram-purple" />
              <span className="text-telegram-purple font-medium">Your Insider Source</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Unlock the Power of <span className="gradient-text">Telegram Stars</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
              Stay informed about the latest features, learn how to use Stars effectively, 
              and maximize your Telegram experience with expert insights.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full shadow-soft">
                <Link to="/stars-guide">Learn About Stars</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2">
                <Link to="/blog">Read Latest Updates</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full bg-gradient-to-br from-telegram-purple/20 to-telegram-blue/20 absolute -top-10 -right-10 w-64 h-64 blur-3xl"></div>
            <div className="rounded-2xl bg-white overflow-hidden shadow-soft relative z-10 border border-white/20 backdrop-blur-sm">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Star className="h-6 w-6 text-yellow-500" fill="currentColor" />
                  </div>
                  <h3 className="font-semibold text-lg">Featured Update</h3>
                </div>
                <h2 className="text-2xl font-bold mb-4">Telegram Introduces Stars: A New Way to Engage</h2>
                <p className="text-foreground/70 leading-relaxed">
                  Telegram has officially launched Stars, a new feature that allows users to show appreciation for messages in channels and groups...
                </p>
                <Button variant="link" asChild className="px-0 mt-6 text-telegram-purple">
                  <Link to="/blog/telegram-introduces-stars">Read Full Article →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
