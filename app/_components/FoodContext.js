"use client";

import { createContext, useContext, useState } from "react";

const RecipeContext = createContext();



function RecipeProvider({ children }) {
  const [value, setValue] = useState('');
  const [recipes,setRecipes] = useState([]);
  const [recipe,setRecipe] = useState({})
  const [recipeId,setRecipeId] = useState('');
  const [bookmark,setBookmark] = useState([])
  
  return (
    <RecipeContext.Provider value={{ value, setValue ,recipes,setRecipes,setRecipe,recipe,recipeId,setRecipeId,bookmark,setBookmark}}>
      {children}
    </RecipeContext.Provider>
  );
}

function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { RecipeProvider, useRecipe };