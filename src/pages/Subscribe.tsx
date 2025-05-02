
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract telegram_id from URL if present
  const params = new URLSearchParams(location.search);
  const telegramId = params.get('telegram_id');

  useEffect(() => {
    if (telegramId) {
      setIsTelegramConnected(true);
      toast({
        title: "Telegram Connected",
        description: "Your subscription will be linked to your Telegram account.",
      });
    }
  }, [telegramId, toast]);

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
      
      const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          telegramId: telegramId || undefined,
          frequency
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Subscription Successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
        
        // If coming from Telegram, show additional message
        if (telegramId) {
          toast({
            title: "Telegram Connected",
            description: "You'll also receive updates in your Telegram app.",
          });
        }
        
        setEmail("");
        setName("");
        
        // Redirect to homepage after successful subscription
        setTimeout(() => {
          navigate('/');
        }, 3000);
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

  const benefits = [
    "Early access to Telegram feature updates",
    "Exclusive guides and tutorials",
    "Expert tips for maximizing Telegram Stars",
    "Community insights and best practices",
    "Special offers and promotions"
  ];

  return (
    <div className="min-h-screen">
      <div className="py-12 md:py-16 bg-telegram-light">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-telegram-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscribe to Telegram Insider</h1>
            <p className="text-lg text-foreground/80">
              Get the latest updates, guides, and insights about Telegram features delivered directly to your inbox.
            </p>
            {isTelegramConnected && (
              <div className="mt-4 inline-flex items-center gap-2 bg-telegram-purple/10 px-4 py-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-telegram-purple" />
                <span className="font-medium text-telegram-purple">Connected via Telegram</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              Subscribe to Our Newsletter
              {isTelegramConnected && (
                <span className="block text-sm font-normal text-telegram-purple mt-2">
                  Your Telegram account will be linked
                </span>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label>Email Frequency</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly Digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly Roundup</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>
              
              <p className="text-xs text-center text-foreground/60 mt-4">
                By subscribing, you agree to our Privacy Policy and Terms of Service. 
                You can unsubscribe at any time.
              </p>
            </form>
          </Card>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-6">Subscriber Benefits</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-telegram-purple flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Separator className="my-8" />
            
            <div className="bg-telegram-light rounded-lg p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                Telegram Bot Integration
              </h3>
              <p className="mb-4">
                For an enhanced experience, subscribe through our Telegram bot and receive updates directly in your Telegram app.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://t.me/telegram_insider_bot" target="_blank" rel="noopener noreferrer">
                  Open in Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
