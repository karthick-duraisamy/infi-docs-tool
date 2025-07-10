import React, { createContext, useContext, useEffect, useState } from 'react';

const RoleContext = createContext<{
  role: string | null;
  setRole: (role: string | null) => void;
}>({ role: null, setRole: () => {} });

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};
