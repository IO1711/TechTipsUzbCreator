import clsx from "clsx";
import { useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
const TopicListItem = (props) => {

    const params = useParams();

    /*return <>
        <div className={classes}>
        <NavLink className={({isActive}) => {
                handleActiveItem(isActive); 
                return "sidebar-link";
            }} to={`/${params.appName}/${props.topicName}`}>
            This is TopicListItem
        </NavLink>
        </div>
    </>*/

    return <>
        
        <NavLink className={({isActive}) => (isActive ? "sidebar-item sidebar-item-active" : "sidebar-item")} to={`/${params.appName}/${props.topicName}`}>
            {props.topicName}
        </NavLink>
        
    </>
}

export default TopicListItem;