import React, { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [lockScroll, setLockScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = lockScroll ? "hidden" : "unset";
  }, [lockScroll]);

  return (
    <UIContext.Provider value={{ lockScroll, setLockScroll }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
