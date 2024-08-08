import React, { useState, createContext, useContext } from 'react';

// Context 1
const AdminLogin = createContext();

// Context 2
const AlmanacLogin = createContext();

// Context 3
const BusinessLogin = createContext();

// Context Providers (can be separate components or integrated into existing components)
const ContextProviders = ({ children }) => {
  // Define state or values for each context
  const [adminLogin, setadminLogin] = useState(false);
  const [almanacLogin, setalmanacLogin] = useState(false);
  const [businessLogin, setbusinessLogin] = useState(false);

  return (
    <AdminLogin.Provider value={{ adminLogin, setadminLogin }}>
      <AlmanacLogin.Provider value={{ almanacLogin, setalmanacLogin}}>
        <BusinessLogin.Provider value={{ businessLogin, setbusinessLogin }}>
          {children}
        </BusinessLogin.Provider>
      </AlmanacLogin.Provider>
    </AdminLogin.Provider>
  );
};

export { AdminLogin, AlmanacLogin, BusinessLogin, ContextProviders };
