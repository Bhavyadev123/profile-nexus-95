import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, User, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

const HomePage = () => {
  const { profile } = useAppSelector((state) => state.profile);

  const features = [
    {
      icon: UserPlus,
      title: "Easy Profile Creation",
      description: "Create your profile in minutes with our intuitive form"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your data is safely stored with local persistence"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Edit and update your profile information instantly"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Profile Manager
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Create, manage, and update your profile with ease. A modern, secure solution for personal data management.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          {!profile ? (
            <Button asChild variant="gradient" size="lg" className="text-lg px-8 py-6">
              <Link to="/profile-form">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="gradient" size="lg" className="text-lg px-8 py-6">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                  View Profile
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/profile-form">
                  Edit Profile
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      {!profile && (
        <Card className="shadow-lg border-0 bg-gradient-secondary">
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create your profile today and experience the convenience of modern profile management.
              </p>
              <Button asChild variant="gradient" size="lg" className="text-lg px-8 py-6">
                <Link to="/profile-form">
                  <UserPlus className="h-5 w-5" />
                  Create Your Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomePage;