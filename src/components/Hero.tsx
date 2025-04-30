
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-telegram-light to-white py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-telegram-purple" />
              <span className="text-telegram-purple font-medium">Your Insider Source</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Unlock the Power of Telegram Stars
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
              Stay informed about the latest features, learn how to use Stars effectively, 
              and maximize your Telegram experience with expert insights.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/stars-guide">Learn About Stars</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">Read Latest Updates</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-telegram-purple to-telegram-blue rounded-full opacity-20 absolute -top-4 -right-4"></div>
            <div className="rounded-lg bg-card overflow-hidden shadow-lg border relative z-10">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
                  <h3 className="font-semibold text-lg">Featured Update</h3>
                </div>
                <h2 className="text-2xl font-bold mb-2">Telegram Introduces Stars: A New Way to Engage</h2>
                <p className="text-foreground/80">
                  Telegram has officially launched Stars, a new feature that allows users to show appreciation for messages in channels and groups...
                </p>
                <Button variant="link" asChild className="px-0 mt-4">
                  <Link to="/blog/telegram-introduces-stars">Read More</Link>
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
