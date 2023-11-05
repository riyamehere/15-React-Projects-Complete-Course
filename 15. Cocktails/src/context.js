import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
//getting the API url
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
//creating the context
const AppContext = React.createContext();

//Provider
//passing the children
const AppProvider = ({ children }) => {
  //creating states for loading, searchbox and cocktails
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  //fetch drinks
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      //searchTerm is the changing parameter here for sorting according to the alphabet
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      console.log(data);
      const { drinks } = data;
      if (drinks) {
        //if drinks is true , mapping over the items, iterating over the list
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        //if drinks is null set the array empty
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  //called whenever something changes about the search term
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {/* rendering the children */}
      {children}
    </AppContext.Provider>
  );
};
// make sure use
//In order to use the Context in a child component, we need to access it using the useContext Hook.
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
