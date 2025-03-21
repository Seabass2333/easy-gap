'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faCalendarAlt, 
  faSignOutAlt,
  faEdit,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { getInitials } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container max-w-lg mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-xl">{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
          <p className="text-muted-foreground mb-4">{user?.email}</p>
          <Button size="sm" variant="outline" className="mb-2">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account</p>
                <p className="font-medium">Personal Information</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Communication</p>
                <p className="font-medium">Notification Settings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                <FontAwesomeIcon icon={faCog} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferences</p>
                <p className="font-medium">App Settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        variant="outline" 
        className="w-full border-destructive text-destructive hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Log Out
      </Button>
    </div>
  );
} 