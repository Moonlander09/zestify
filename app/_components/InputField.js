"use client";
import { GoSearch } from "react-icons/go";
import { useRecipe } from "./FoodContext";
import { useEffect } from "react";

function InputField() {
  const { value, setValue, setRecipes, recipes } = useRecipe();

  function handleSubmit(e) {
    e.preventDefault();
    async function getRecipe() {
      const res = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes?search=${value}`
      );
      const data = await res.json();
      setRecipes(data.data);
      
    }
    getRecipe();
  }
  useEffect(() => {
    if (recipes) {
        setValue('')
    }
  }, [recipes,setValue]);
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        required
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn search__btn">
        <span className="search-icon">
          <GoSearch />
        </span>
        <span className="search-content">Search</span>
      </button>
    </form>
  );
}

export default InputField;
