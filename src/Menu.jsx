import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import useFetch from "./useFetch";
import Loader from "./Loader";



const Menu = (props) => {
    const [adding, setAdding] = useState(false);
    const [app, setApp] = useState({});
    const [allApps, setAllApps] = useState([]);
    const { post, get, loading } = useFetch("https://uztechtips.onrender.com/api/v1/");

    useEffect(() => {
        
        get("getApps", props.authToken).then(data => setAllApps(data));},[]);

    const handleAddButton = () => {
        setAdding(true);
    }

    const handleAppNameChange = (event) => {
        setApp({appName : event.target.value});
    }

    const handleSaveButton = () => {
        setAdding(false);
        //console.log(adding + " and new app name: " + JSON.stringify(app));
        post("addApp", app).then(response => {
            console.log(response);
            get("getApps").then(data => setAllApps(data));
        });

        
    }

    return <>
        <div className="menu-bar">
        {allApps && allApps.map(app => <MenuItem key={app.id} appName={app.appName} authToken={props.authToken}/>)}
        {adding && <div className="menu-item">
            <input type="text" onChange={handleAppNameChange} placeholder="Enter new app"/>
            <button type="button" onClick={handleSaveButton}>Save</button>
            </div>}
        <div onClick={handleAddButton} className="menu-item">+</div>
        {loading && <Loader/>}
        </div>
    </>
}

export default Menu;