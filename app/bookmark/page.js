import Bookmark from "../_components/Bookmark"

function page() {
    return (
        <div className="bookmark-container">
        <h3 className="heading--2">Bookmark Recipes</h3>
           <div className="bookmark-results">
                <Bookmark/>
                </div> 
        </div>
    )
}

export default page
