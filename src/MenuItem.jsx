import {NavLink, Link} from "react-router-dom";
import useFetch from "./useFetch";

const MenuItem = (props) => {
    const appName = props.appName;
    const {deleteRequest} = useFetch("https://uztechtips.onrender.com/api/v1/");

    const deleteApp = () => {
        deleteRequest("deleteApp",
            {"appName":appName}, props.authToken).then(data=> console.log(data));
    }

    return <>
        <NavLink className={({isActive}) => (isActive ? "menu-item-active" : "menu-item")} to={`/${appName}`}>
        <div>{appName}</div>
        {/*<div className="sidebar-delete" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteApp();
            }}><img src="bin.png"/></div>*/}
        </NavLink>
    </>
}

export default MenuItem;