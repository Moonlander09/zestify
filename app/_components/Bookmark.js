"use client";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useRecipe } from "./FoodContext";
import { useEffect, useState } from "react";
import Link from "next/link";

function Bookmark() {
  const { bookmark ,setRecipeId,setBookmark} = useRecipe();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  useEffect(() => {
    if (bookmark.length === 0) return;

    async function fetchBookmarkedRecipes() {
      const recipes = await Promise.all(
        bookmark.map(async (id) => {
          const res = await fetch(
            `https://forkify-api.jonas.io/api/v2/recipes/${id}`
          );
          const { data } = await res.json();
          return data.recipe;
        })
      );
      setBookmarkedRecipes(recipes);
    }

    fetchBookmarkedRecipes();
  }, [bookmark]);

  function handleDelete(id){
    setBookmark((prev)=>prev.filter(el=>el!==id))
  }

  return (
    <ul className="results">
      {bookmark.length===0 ? (
        <div className="error">
          <div>
            <div>
              <FaTriangleExclamation />
            </div>
          </div>
          <p>No recipe to show, you need to bookmark your recipes.</p>
        </div>
      ) : (
        bookmarkedRecipes.map((rec) => (
          <li key={rec.id} className="preview-1">
            <Link href="/" className="bookmark-link-1">
              <button
                className="preview__link-1"
                onClick={() => setRecipeId(rec.id)}
              >
                <figure className="preview__fig-1">
                  <img src={rec.image_url} alt="Test" />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{rec.title}</h4>
                  <p className="preview__publisher">{rec.publisher}</p>
                </div>
              </button>
            </Link>
            <div>
            <button className="btn--inline" onClick={()=>handleDelete(rec.id)}>Delete</button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default Bookmark;
