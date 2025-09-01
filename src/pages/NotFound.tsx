import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-secondary p-4">
      <Card className="max-w-md w-full shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="text-center py-12 space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild variant="gradient" className="flex-1">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
