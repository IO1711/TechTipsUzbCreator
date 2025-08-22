import {Link} from "react-router-dom";
import Input from "./Input";
import { search } from "./searchIndex";
import SearchResults from "./SearchResult";
import { useState } from "react";

const Header = (props) => {

    const [results, setResults] = useState([]);

    const handleSearchChange = (event) => {
      console.log(search(event.target.value));
      setResults(search(event.target.value));
    }

    return <>
    <div className="header">
      <div className="header-child"><Link to={"/"}><img src="./panda_E_white_transparent_trimmed.png"/></Link></div>
      <div className="header-big-child">
        <Input type="search" onChange={handleSearchChange} className="search-input"/>
        <SearchResults results={results}></SearchResults>
      </div>
      
      <div className="header-child">account</div>
    </div>
  </>
}

export default Header;

//<img src="./full_logo_white.png"/>