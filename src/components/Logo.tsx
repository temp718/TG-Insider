
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Star className="h-6 w-6 text-telegram-purple" />
      <span className="font-bold text-lg">Telegram Insider</span>
    </Link>
  );
}
