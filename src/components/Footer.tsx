
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-telegram-light">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Star className="h-6 w-6 text-telegram-purple" />
              <span className="font-bold text-lg">Telegram Insider</span>
            </Link>
            <p className="text-sm text-foreground/80 mb-4">
              Your inside source for the latest Telegram features, updates and Stars.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-primary">About</Link>
              </li>
              <li>
                <Link to="/stars-guide" className="text-foreground/80 hover:text-primary">Stars Guide</Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/80 hover:text-primary">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/subscribe" className="text-foreground/80 hover:text-primary">Subscribe</Link>
              </li>
              <li>
                <a href="https://t.me/telegram" className="text-foreground/80 hover:text-primary" target="_blank" rel="noopener noreferrer">Official Telegram</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-foreground/80 hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/80 hover:text-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-sm text-foreground/60 text-center">
            © {currentYear} Telegram Insider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
