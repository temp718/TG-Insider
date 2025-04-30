
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-soft">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-telegram-purple rounded-full">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">Telegram Insider</span>
            </Link>
            <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
              Your inside source for the latest Telegram features, updates and Stars.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/stars-guide" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Stars Guide</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/subscribe" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Subscribe</span>
                </Link>
              </li>
              <li>
                <a href="https://t.me/telegram" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Official Telegram</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-telegram-purple transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-telegram-purple/60"></span>
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t">
          <p className="text-sm text-foreground/60 text-center">
            © {currentYear} Telegram Insider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
