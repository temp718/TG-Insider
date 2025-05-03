
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";

const NewsletterSubscribe = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Extract telegram_id from URL if present
  const params = new URLSearchParams(location.search);
  const telegramId = params.get('telegram_id');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get API URL from environment or use default
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      console.log(`Subscribing with API URL: ${apiUrl}`);
      
      // Format the request data
      const requestData = {
        email: email.trim(),
        name: name.trim() || undefined,
        telegramId: telegramId || undefined
      };
      
      console.log("Sending subscription request:", requestData);
      
      const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      console.log("Subscription response status:", response.status);
      const data = await response.json();
      console.log("Subscription response data:", data);
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail("");
        setName("");
        
        // If coming from Telegram, show additional message
        if (telegramId) {
          toast({
            title: "Telegram Connected",
            description: "You'll also receive updates in your Telegram app.",
          });
        }
      } else {
        throw new Error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-telegram-light rounded-lg p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-telegram-purple" />
        <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
      </div>
      <p className="text-foreground/80 mb-6">
        Get the latest Telegram updates, insider news, and feature explanations delivered directly to your inbox.
        {telegramId && <span className="block mt-2 font-medium text-telegram-purple">Your Telegram account will be linked for convenient updates!</span>}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
