import { createContext, useState } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    food,
    setFood,
    loading,
    setLoading
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  )
};
