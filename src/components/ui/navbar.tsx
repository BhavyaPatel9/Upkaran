import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Heart, Bell, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginDialog } from "@/components/auth/login-dialog";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .single();
        if (!error && data?.full_name) setFullName(data.full_name);
        else setFullName(null);
      } else {
        setFullName(null);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Upkaran
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse-tools" className="ml-4 text-foreground hover:text-primary transition-colors">
              Browse Tools
            </Link>
            {/* <Link to="/list-tool" className="text-foreground hover:text-primary transition-colors">List Your Tool</Link> */}
            {user && (
              <>
                <Link to="/user-dashboard" className="text-foreground hover:text-primary transition-colors">My Bookings</Link>
                <Link to="/owner-dashboard" className="text-foreground hover:text-primary transition-colors">Owner Dashboard</Link>
              </>
            )}
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                {fullName && (
                  <span className="font-medium text-sm text-primary px-2">{fullName}</span>
                )}
              </>
            )}
            {user ? (
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <LoginDialog>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </LoginDialog>
            )}
            <Link to={user ? "/list-tool" : "/browse-tools"}>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                {user ? "List Your Tool" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link to="/browse-tools" className="block py-2 text-foreground hover:text-primary transition-colors">Browse Tools</Link>
              <Link to="/list-tool" className="block py-2 text-foreground hover:text-primary transition-colors">List Your Tool</Link>
              {user && (
                <>
                  <Link to="/user-dashboard" className="block py-2 text-foreground hover:text-primary transition-colors">My Rentals</Link>
                  <Link to="/owner-dashboard" className="block py-2 text-foreground hover:text-primary transition-colors">Owner Dashboard</Link>
                </>
              )}
              <a href="#how-it-works" className="block py-2 text-foreground hover:text-primary transition-colors">How It Works</a>
            </div>
            
            {/* Mobile Actions */}
            <div className="space-y-2 pt-4 border-t border-border">
              {user ? (
                <Button variant="outline" className="w-full justify-start" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <LoginDialog>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </LoginDialog>
              )}
              <Link to={user ? "/list-tool" : "/browse-tools"} className="block">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  {user ? "List Your Tool" : "Get Started"}
                </Button>
              </Link>
              {user && fullName && (
                <div className="text-primary font-medium text-center pt-2">{fullName}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};