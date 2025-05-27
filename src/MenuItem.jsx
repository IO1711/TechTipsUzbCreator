import {NavLink, Link} from "react-router-dom";

const MenuItem = (props) => {
    const appName = props.appName;
    return <>
        <NavLink className={({isActive}) => (isActive ? "menu-item-active" : "menu-item")} to={`/${appName}`}>
        <div>{appName}</div>
        </NavLink>
    </>
}

export default MenuItem;