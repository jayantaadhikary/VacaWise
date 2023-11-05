import { createContext, useState } from "react";

export const UserDataContext = createContext({});

const UserDataProvider = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
  });

  const value = {
    userDetails,
    setUserDetails,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
