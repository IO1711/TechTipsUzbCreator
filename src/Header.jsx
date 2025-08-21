import {Link} from "react-router-dom";

const Header = () => {
    return <>
    <div className="header">
      <Link to={"/"}><img src="./panda_E_white_transparent_trimmed.png"/></Link>
    </div>
  </>
}

export default Header;

//<img src="./full_logo_white.png"/>