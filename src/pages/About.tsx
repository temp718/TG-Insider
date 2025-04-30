
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="py-12 md:py-16 bg-telegram-light">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center">About Telegram Insider</h1>
        </div>
      </div>
      
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              At Telegram Insider, we're dedicated to providing comprehensive, accurate, and timely information about Telegram's features, 
              with a special focus on the new Stars system and how it can benefit both content creators and regular users.
            </p>
            <p className="text-lg">
              We believe that understanding how to effectively use Telegram's innovative features can significantly enhance 
              communication, content sharing, and community building in the digital space.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Cover</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Detailed explanations of Telegram's Stars feature and its benefits</li>
              <li>Step-by-step guides on how to use and acquire Stars</li>
              <li>Latest updates and announcements from Telegram</li>
              <li>Tips and tricks for content creators</li>
              <li>Best practices for community management using Telegram's features</li>
              <li>Case studies of successful channel and group strategies</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg mb-4">
              Our team consists of Telegram enthusiasts, digital communication experts, and content creators 
              who have been using Telegram extensively for personal and professional purposes.
            </p>
            <p className="text-lg">
              We constantly research, test, and analyze Telegram's features to provide you with the most 
              accurate and helpful information possible.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-lg mb-6">
              Want to stay updated on the latest Telegram features and insights? Subscribe to our newsletter 
              and follow our Telegram channel for regular updates.
            </p>
            <NewsletterSubscribe />
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
