import { Outlet } from "react-router-dom";
import TopicList from "./TopicList";
import Content from "./Content";

const Layout = () => {
    return <>
        <div className="layout">
            <TopicList/>
            <Outlet/>
        </div>
    </>
}

export default Layout;