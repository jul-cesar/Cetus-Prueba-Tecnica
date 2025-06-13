import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  onMenuButtonClick: () => void;
}

export function Header({ onMenuButtonClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuButtonClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex-1" />
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
      {/* <ModeToggle /> */}
    </header>
  );
}
