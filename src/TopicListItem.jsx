import useFetch from "./useFetch";
import { useParams, NavLink, useNavigate } from "react-router-dom";
const TopicListItem = (props) => {

    const params = useParams();
    const {deleteRequest} = useFetch("https://uztechtips.onrender.com/api/v1/");

    const navigate = useNavigate();

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
    const deleteTopic = () => {
        console.log("Topic will be deleted!" + params.topicName);
        deleteRequest("deleteTopic", {
            app : {
                appName : params.appName
            },
            topic : {
                topicName : params.topicName
            }
        }, props.authToken).then(data => console.log(data));
        navigate(`/${params.appName}`);
    }

    return <>
        
        <NavLink className={({isActive}) => (isActive ? "sidebar-item sidebar-item-active" : "sidebar-item")} to={`/${params.appName}/${props.topicName}`}>
            {props.topicName}
            {/*<div className="sidebar-delete" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteTopic();
            }}><img src="bin.png"/></div>*/}
        </NavLink>
        
    </>
}

export default TopicListItem;