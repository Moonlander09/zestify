"use client";

import { useEffect } from "react";
import { useRecipe } from "./FoodContext";
import { IoPeople } from "react-icons/io5";
import { GoBookmark, GoBookmarkFill, GoStopwatch } from "react-icons/go";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";

function Main() {
  const { recipe, setRecipe, recipeId, setBookmark, bookmark } = useRecipe();

  useEffect(() => {
    async function fetchRecipe() {
      if (!recipeId) return;
      const res = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch the recipe.");
      }
      const { data } = await res.json();

      const recipe = {
        id: data.recipe.id,
        title: data.recipe.title,
        publisher: data.recipe.publisher,
        sourceUrl: data.recipe.image_url,
        servings: data.recipe.servings,
        cookingTime: data.recipe.cooking_time,
        ingredients: data.recipe.ingredients,
      };
      setRecipe(recipe);
    }

    fetchRecipe();
  }, [setRecipe, recipeId]);

  function handleBookmark() {
    setBookmark((prev) => {
      if (prev.includes(recipeId)) return prev; 
      return [...prev, recipeId];
    });
  }

  function handleDecreaseServings() {
    if (recipe.servings > 1) {
      const newServings = recipe.servings - 1;

      // Adjust ingredients quantities
      const updatedIngredients = recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: parseFloat(((ingredient.quantity * newServings) / recipe.servings).toFixed(2)),
      }));

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        servings: newServings,
        ingredients: updatedIngredients,
      }));
    }
  }

  function handleIncreaseServings() {
    const newServings = recipe.servings + 1;

    // Adjust ingredients quantities
    const updatedIngredients = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: parseFloat(((ingredient.quantity * newServings) / recipe.servings).toFixed(2)),
    }));

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      servings: newServings,
      ingredients: updatedIngredients,
    }));
  }

  if (!recipeId) {
    return (
      <div className="message">
        <div>
          <div>
            <FaRegSmileBeam />
          </div>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
    );
  }

  return (
    <div className="recipe">
      <figure className="recipe__fig">
        <img src={recipe.sourceUrl} alt="Tomato" className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <div className="recipe__info-icon">
            <GoStopwatch />
          </div>
          <span className="recipe__info-data recipe__info-data--minutes">
            {recipe.cookingTime}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <div className="recipe__info-icon">
            <IoPeople />
          </div>
          <span className="recipe__info-data recipe__info-data--people">
            {recipe.servings}
          </span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings" onClick={handleIncreaseServings}>
              <FiPlusCircle />
            </button>
            <button className="btn--tiny btn--increase-servings" onClick={handleDecreaseServings}>
              <FiMinusCircle />
            </button>
          </div>
        </div>

        <button className="btn--round" onClick={handleBookmark}>
          <span>
            {bookmark.includes(recipe.id) ? <GoBookmarkFill /> : <GoBookmark />}
          </span>
          <span>{`${
            bookmark.includes(recipe.id) ? "Bookmarked" : "Add to bookmark"
          }`}</span>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {recipe?.ingredients?.map((ing, i) => (
            <li key={`${ing.id}${i}`} className="recipe__ingredient">
              <span>
                <GiCheckMark />
              </span>
              <div className="recipe__quantity">{ing.quantity && ing.quantity.toFixed(2)}</div>
              <div className="recipe__description">
                <span className="recipe__unit">{ing.unit}</span>
                {ing.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__publisher"> {recipe.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
          target="_blank"
        >
          <span className="direction-text">Directions</span>
          <span className="search__icon">
            <FaArrowRightLong />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Main;
