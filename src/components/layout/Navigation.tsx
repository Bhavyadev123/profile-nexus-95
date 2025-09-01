import { Link, useLocation } from 'react-router-dom';
import { User, UserPlus, Home } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();
  const { profile } = useAppSelector((state) => state.profile);
  
  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/profile-form', label: 'Profile Form', icon: UserPlus },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Profile Manager
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === to
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {profile && (
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">Welcome back,</div>
              <div className="font-medium text-primary">{profile.name}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};