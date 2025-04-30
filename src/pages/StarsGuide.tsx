
import { Star, StarHalf, StarOff } from "lucide-react";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const StarsGuide = () => {
  return (
    <div className="min-h-screen">
      <div className="py-12 md:py-16 bg-gradient-to-b from-telegram-light to-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-yellow-400" fill="currentColor" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Guide to Telegram Stars</h1>
            <p className="text-lg text-foreground/80">
              Everything you need to know about Telegram's Stars feature - what they are, how to use them, and how they can benefit you.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto blog-content">
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">What Are Telegram Stars?</h2>
            <p>
              Telegram Stars are a new feature that allows users to show appreciation for messages in channels and groups. 
              Similar to "likes" on other platforms, Stars provide a way for users to react to content they enjoy.
            </p>
            <p>
              However, Telegram Stars go beyond simple reactions – they create a complete ecosystem that rewards content 
              creators and enhances the overall experience for users.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Key Features of Telegram Stars</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 bg-telegram-light rounded-lg">
                <Star className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" fill="currentColor" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Showing Appreciation</h3>
                  <p>
                    Users can give Stars to messages they appreciate, providing feedback to content creators 
                    about which content resonates with their audience.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-telegram-light rounded-lg">
                <StarHalf className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" fill="currentColor" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Revenue for Creators</h3>
                  <p>
                    Channel owners receive a portion of the revenue generated from Stars given to their content, 
                    creating a new monetization avenue for content creators.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-telegram-light rounded-lg">
                <StarOff className="h-6 w-6 text-telegram-purple flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Premium Content</h3>
                  <p>
                    Channels can offer premium content or special benefits to users who have given a certain 
                    number of Stars, encouraging more engagement.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">How to Use Telegram Stars</h2>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">Giving Stars to Messages</h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Tap on a message in a channel or group that supports Stars.</li>
              <li>Select the Star icon from the reaction options.</li>
              <li>Choose how many Stars you want to give (usually between 1-5).</li>
              <li>Confirm your selection.</li>
            </ol>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">Receiving Stars as a Creator</h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Set up your channel to accept Stars through the channel settings.</li>
              <li>Link a payment method to receive your share of the Stars revenue.</li>
              <li>Create engaging content that encourages users to show appreciation.</li>
              <li>Monitor your Stars analytics to understand which content performs best.</li>
            </ol>
          </section>
          
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Benefits of Telegram Stars</h2>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">For Content Creators</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>New revenue stream directly from audience appreciation</li>
              <li>Valuable feedback on content performance</li>
              <li>Increased engagement with audience</li>
              <li>Ability to offer premium features to top supporters</li>
              <li>Enhanced analytics to understand audience preferences</li>
            </ul>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">For Users</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Way to directly support favorite content creators</li>
              <li>Access to exclusive content or features</li>
              <li>Enhanced interaction with channels and groups</li>
              <li>Better content quality as creators are incentivized</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">How to Acquire Telegram Stars</h2>
            <p>
              Users can purchase Stars directly within the Telegram app. The process is straightforward:
            </p>
            
            <ol className="list-decimal pl-6 space-y-3 mt-4">
              <li>Open Telegram and go to Settings.</li>
              <li>Select "Stars" or "Payments" (depending on your app version).</li>
              <li>Choose the Stars package you want to purchase.</li>
              <li>Complete the payment using your preferred method.</li>
              <li>Stars will be instantly added to your account for use.</li>
            </ol>
            
            <p className="mt-4">
              Telegram occasionally offers promotional Stars packages or bonus Stars during special events, 
              so keep an eye out for these opportunities to get more value.
            </p>
          </section>
          
          <div className="my-10 border-t border-b py-6">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated on Telegram Stars</h3>
            <p className="mb-6">
              Telegram is constantly evolving, and the Stars feature may receive updates and enhancements. 
              Subscribe to our newsletter to stay informed about the latest developments.
            </p>
            <NewsletterSubscribe />
          </div>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">How much do Telegram Stars cost?</h3>
                <p>
                  Star pricing varies by region and platform, but typically ranges from approximately $0.01 to $0.02 per Star.
                  They are often sold in packages (e.g., 100 Stars for $0.99).
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">How much do creators earn from Stars?</h3>
                <p>
                  Creators typically receive approximately 70% of the revenue from Stars given to their content, 
                  with Telegram taking a 30% platform fee.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Can any channel receive Stars?</h3>
                <p>
                  Currently, channels need to meet certain eligibility requirements to receive Stars, 
                  including minimum subscriber counts and content guidelines compliance.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Do Stars expire?</h3>
                <p>
                  Once purchased, Stars generally do not expire, but it's always good to check Telegram's 
                  current terms of service for any policy updates.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StarsGuide;
