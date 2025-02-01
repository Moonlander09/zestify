"use client";

import { useEffect, useState } from "react";
import { useRecipe } from "./FoodContext";
import { FaTriangleExclamation } from "react-icons/fa6";

function SideBar() {
  const { recipes, setRecipeId, recipeId } = useRecipe();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const resultsPerPage = 10;

  // Calculate total pages
  const totalResults = recipes?.recipes?.length || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Get current page results
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = recipes?.recipes?.slice(startIndex, endIndex) || [];

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    if (recipes?.recipes !== undefined) {
      setSearchPerformed(true);
    }
  }, [recipes]);


  return (
    <div className="search-results">
      <ul className="results">
        {searchPerformed && totalResults === 0 ? (
          <div className="error">
            <div>
              <div>
                <FaTriangleExclamation/>
              </div>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>
        ) : (
          currentResults.map((rec) => (
            <li key={rec.id} className="preview">
              <button
                className={`preview__link ${
                  rec.id === recipeId ? "preview__link--active" : ""
                }`}
                onClick={() => setRecipeId(rec.id)}
              >
                <figure className="preview__fig">
                  <img src={rec.image_url} alt="Test" />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{rec.title}</h4>
                  <p className="preview__publisher">{rec.publisher}</p>
                </div>
              </button>
            </li>
          ))
        )}
      </ul>

      <div className={`${!recipes?.recipes ? "overflow" : "pagination"}`}>
        <button
          className={`btn--inline ${
            currentPage === 1 ? "pagination__btn--prev" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <span>Back</span>
        </button>
        <button
          className={`btn--inline ${
            currentPage === totalPages ? "pagination__btn--prev" : ""
          }`}
          onClick={handleNextPage}
        >
          <span>Next</span>
        </button>
      </div>

      <p className="copyright">
        Created by&nbsp;
        <a
          className="github-link"
          target="_blank"
          href="https://github.com/Moonlander09?tab=repositories"
        >
          Moonlander
        </a>
      </p>
    </div>
  );
}

export default SideBar;
