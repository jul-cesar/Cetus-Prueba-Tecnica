import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  LayoutDashboard,
  Package2,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const location = useLocation();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Productos",
      href: "/products",
      icon: <Package2 className="h-5 w-5" />,
    },
    {
      title: "Proveedores",
      href: "/providers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Recepciones",
      href: "/receptions",
      icon: <ClipboardList className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <nav className="hidden border-r bg-card/40 lg:block w-64">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="text-lg">PharmaCeltus                  </span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-2">
            <div className="px-2 py-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                    location.pathname === route.href &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  {route.icon}
                  {route.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </nav>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold"
                onClick={() => onOpenChange(false)}
              >
                <Package2 className="h-6 w-6 text-primary" />
                <span className="text-lg">PharmaSys</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 py-2">
              <div className="px-2 py-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    to={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                      location.pathname === route.href &&
                        "bg-accent text-accent-foreground"
                    )}
                    onClick={() => onOpenChange(false)}
                  >
                    {route.icon}
                    {route.title}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
