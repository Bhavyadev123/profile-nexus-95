import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit3, 
  Trash2, 
  Loader2, 
  AlertTriangle,
  UserPlus,
  Clock
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProfile, deleteProfile, clearError } from '@/store/profileSlice';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const ProfileDisplay = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, isLoading, error, isSubmitting } = useAppSelector((state) => state.profile);
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProfile()).unwrap();
      toast({
        title: "Profile Deleted",
        description: "Your profile has been successfully deleted",
      });
      setShowDeleteDialog(false);
      navigate('/');
    } catch (error) {
      // Error is handled by the error state in Redux
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <UserPlus className="h-16 w-16 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">No Profile Found</h2>
                <p className="text-muted-foreground text-lg">
                  You haven't created a profile yet. Create one to get started!
                </p>
              </div>
              
              <Button asChild variant="gradient" size="lg" className="text-base px-8">
                <Link to="/profile-form">
                  Create Profile
                  <UserPlus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Profile Details
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Your personal information
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-lg font-semibold text-foreground truncate">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-lg font-semibold text-foreground truncate">{profile.email}</p>
              </div>
            </div>

            {profile.age && (
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-lg font-semibold text-foreground">{profile.age} years old</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Profile Created</p>
                <p className="text-sm text-foreground">{formatDate(profile.createdAt)}</p>
                {profile.updatedAt !== profile.createdAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: {formatDate(profile.updatedAt)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button asChild variant="default" size="lg" className="flex-1">
              <Link to="/profile-form">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="px-8">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Delete Profile
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Are you sure you want to delete your profile? This action cannot be undone and 
                    all your profile data will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Profile'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};