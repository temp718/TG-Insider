
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden md:flex md:items-center md:gap-6">
            <nav className="flex items-center gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                }
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/stars-guide" 
                className={({ isActive }) => 
                  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                }
              >
                Stars Guide
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                }
              >
                Blog
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button asChild variant="default">
            <NavLink to="/subscribe">Subscribe</NavLink>
          </Button>
        </div>
        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 h-[calc(100vh-4rem)] w-full bg-background md:hidden animate-fade-in">
          <div className="container flex flex-col py-8">
            <nav className="flex flex-col gap-6">
              <NavLink 
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => 
                  isActive ? "text-primary text-2xl font-medium" : "text-xl hover:text-primary"
                }
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) => 
                  isActive ? "text-primary text-2xl font-medium" : "text-xl hover:text-primary"
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/stars-guide"
                onClick={closeMenu}
                className={({ isActive }) => 
                  isActive ? "text-primary text-2xl font-medium" : "text-xl hover:text-primary"
                }
              >
                Stars Guide
              </NavLink>
              <NavLink 
                to="/blog"
                onClick={closeMenu}
                className={({ isActive }) => 
                  isActive ? "text-primary text-2xl font-medium" : "text-xl hover:text-primary"
                }
              >
                Blog
              </NavLink>
              <NavLink 
                to="/subscribe"
                onClick={closeMenu}
                className="text-xl hover:text-primary mt-6"
              >
                Subscribe
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
