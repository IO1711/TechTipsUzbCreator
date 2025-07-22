import { Outlet, useNavigate } from "react-router-dom";
import TopicList from "./TopicList";
import Content from "./Content";
import { useEffect } from "react";
import Menu from "./Menu";

const Layout = (props) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(props.authToken===null){
            navigate("/login");
    }},[]);

    if(props.authToken === null) return null;

    return <>
    {/*<Menu authToken={props.authToken}/>*/}
        <div className="layout">
            <TopicList authToken={props.authToken}/>
            <Outlet context={{authToken:props.authToken}}/>
        </div>
    </>
}

export default Layout;