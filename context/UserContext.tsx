import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  favoriteTable?: number;
  dietaryPreferences: string[];
  allergyInfo: string[];
}

interface UserContextType {
  user: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isProfileComplete: () => boolean;
}

const defaultUser: UserProfile = {
  name: '',
  email: '',
  phone: '',
  dietaryPreferences: [],
  allergyInfo: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prevUser) => ({ ...prevUser, ...updates }));
  };

  const isProfileComplete = () => {
    return user.name !== '' && user.email !== '' && user.phone !== '';
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};