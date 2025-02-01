import { GiKnifeFork } from "react-icons/gi";
import { GoBookmarkFill } from "react-icons/go";
import InputField from "./InputField";
import Link from "next/link";

 function Header() {
    
    return (
        <header className="header">
        <div className="logo">
          <span className="logo-icon">
            <GiKnifeFork />
          </span>
          <span className="logo-content">Zestify</span>
        </div>
        <InputField/>
        
        <nav className="nav">
          <Link href='/bookmark' className="bookmark-link">
          <button className="bookmark-btn">
            <span>
              <GoBookmarkFill />
              </span>
            <span className="bookmark">Bookmark</span>
          </button>
          </Link>
        </nav>
      </header>
    )
}

export default Header;
