import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Mail, Calendar, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProfile, updateProfile, clearError } from '@/store/profileSlice';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  age?: number;
}

export const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, isSubmitting, error } = useAppSelector((state) => state.profile);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (profile) {
      setIsEditing(true);
      setValue('name', profile.name);
      setValue('email', profile.email);
      if (profile.age) setValue('age', profile.age);
    }
  }, [profile, setValue]);

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

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && profile) {
        await dispatch(updateProfile({ ...data, id: profile.id })).unwrap();
        toast({
          title: "Success!",
          description: "Profile updated successfully",
        });
      } else {
        await dispatch(createProfile(data)).unwrap();
        toast({
          title: "Success!",
          description: "Profile created successfully",
        });
      }
      navigate('/profile');
    } catch (error) {
      // Error is handled by the error state in Redux
    }
  };

  const handleCancel = () => {
    reset();
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {isEditing ? 'Edit Profile' : 'Create Profile'}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {isEditing 
              ? 'Update your profile information below' 
              : 'Fill in your details to create your profile'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="h-12 text-base"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters long'
                  }
                })}
              />
              {errors.name && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.name.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 text-base"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.email.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Age (Optional)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                className="h-12 text-base"
                {...register('age', {
                  min: {
                    value: 1,
                    message: 'Age must be a positive number'
                  },
                  max: {
                    value: 150,
                    message: 'Age must be realistic'
                  },
                  valueAsNumber: true
                })}
              />
              {errors.age && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.age.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 text-base"
                variant="gradient"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {isEditing ? 'Update Profile' : 'Create Profile'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="px-8 h-12"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};