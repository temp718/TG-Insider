
import { Star, MessageCircle, Share, Bell } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Stars Feature",
    description: "Understand Telegram's Stars system and how it benefits content creators and users alike.",
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    icon: MessageCircle,
    title: "Insider Updates",
    description: "Get the latest news and updates about Telegram's features before they're widely released.",
    gradient: "from-telegram-purple to-telegram-blue"
  },
  {
    icon: Share,
    title: "Tips & Tricks",
    description: "Learn expert tips to make the most of Telegram's features for personal and business use.",
    gradient: "from-green-400 to-cyan-400"
  },
  {
    icon: Bell,
    title: "Newsletter",
    description: "Subscribe to our newsletter to receive timely updates directly in your inbox.",
    gradient: "from-telegram-blue to-blue-500"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to Know About Telegram</h2>
          <p className="text-lg text-foreground/70">
            Our platform provides comprehensive information about all Telegram features,
            with special focus on the new Stars system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl border bg-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`p-4 rounded-full mb-6 bg-gradient-to-br ${feature.gradient}`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
