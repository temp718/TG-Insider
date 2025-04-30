
import { Star, MessageCircle, Share, Bell } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Stars Feature",
    description: "Understand Telegram's Stars system and how it benefits content creators and users alike.",
  },
  {
    icon: MessageCircle,
    title: "Insider Updates",
    description: "Get the latest news and updates about Telegram's features before they're widely released.",
  },
  {
    icon: Share,
    title: "Tips & Tricks",
    description: "Learn expert tips to make the most of Telegram's features for personal and business use.",
  },
  {
    icon: Bell,
    title: "Newsletter",
    description: "Subscribe to our newsletter to receive timely updates directly in your inbox.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Know About Telegram</h2>
          <p className="text-lg text-foreground/80">
            Our platform provides comprehensive information about all Telegram features,
            with special focus on the new Stars system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-telegram-light rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-telegram-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
