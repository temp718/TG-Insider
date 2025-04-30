
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="py-16 md:py-20 bg-gradient-to-br from-telegram-purple/10 to-telegram-blue/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text">About Telegram Insider</h1>
        </div>
      </div>
      
      <div className="container py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-softer">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
            <p className="text-lg mb-6 leading-relaxed text-foreground/80">
              At Telegram Insider, we're dedicated to providing comprehensive, accurate, and timely information about Telegram's features, 
              with a special focus on the new Stars system and how it can benefit both content creators and regular users.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              We believe that understanding how to effectively use Telegram's innovative features can significantly enhance 
              communication, content sharing, and community building in the digital space.
            </p>
          </section>
          
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-softer">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">What We Cover</h2>
            <ul className="space-y-4 text-lg">
              {[
                "Detailed explanations of Telegram's Stars feature and its benefits",
                "Step-by-step guides on how to use and acquire Stars",
                "Latest updates and announcements from Telegram",
                "Tips and tricks for content creators",
                "Best practices for community management using Telegram's features",
                "Case studies of successful channel and group strategies"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground/80">
                  <div className="mt-1.5 p-1 rounded-full bg-telegram-purple/10">
                    <div className="w-2 h-2 rounded-full bg-telegram-purple"></div>
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-softer">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">Our Team</h2>
            <p className="text-lg mb-6 leading-relaxed text-foreground/80">
              Our team consists of Telegram enthusiasts, digital communication experts, and content creators 
              who have been using Telegram extensively for personal and professional purposes.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              We constantly research, test, and analyze Telegram's features to provide you with the most 
              accurate and helpful information possible.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-8 shadow-softer">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">Stay Connected</h2>
            <p className="text-lg mb-8 leading-relaxed text-foreground/80">
              Want to stay updated on the latest Telegram features and insights? Subscribe to our newsletter 
              and follow our Telegram channel for regular updates.
            </p>
            <NewsletterSubscribe className="bg-gradient-to-br from-telegram-purple/5 to-telegram-blue/5 p-6 rounded-xl" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
