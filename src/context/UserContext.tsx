import { createContext, useContext, ReactNode, useState } from 'react';

interface User {
  // Define the user properties here
  id: string;
  email: string;
}

interface UserContextProps {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children, user }: { children: ReactNode; user: User | undefined }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(user);

  return (
    <UserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};