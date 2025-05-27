import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicListItem from "./TopicListItem";
import useFetch from "./useFetch";
import Loader from "./Loader";

const TopicList = () => {
    const [adding, setAdding] = useState(false);
    const params = useParams();
    const [topic, setTopic] = useState({});
    const [allTopics, setAllTopics] = useState([]);
    const { postString, post, loading } = useFetch("https://uztechtips.onrender.com/api/v1/");

    useEffect(() => {
        post("getAppTopics", {appName : params.appName}).then(data => setAllTopics(data));
    }, [params]);
    
    useEffect(() => {
        post("getAppTopics", {appName : params.appName}).then(data => setAllTopics(data));
        //console.log("New topic: " + JSON.stringify(topic));
    },[topic]);
    
    const handleNameChange = (event) => {
        
        setTopic({
            app : {
                appName : params.appName
            },
            topic : {
                topicName : event.target.value
            }
        });
    }

    const handleAddButton = () => {
        setAdding(true);
    }

    const handleSaveButton = () => {
        postString("addTopic", topic).then(data => {
            console.log(data);
            post("getAppTopics", {appName : params.appName}).then(data => setAllTopics(data));
        });
        setAdding(false);
    }

    

    return <>
        <div className="sidebar">
        {allTopics && allTopics.map(topics => {
            return <TopicListItem key={topics.id} topicName={topics.topicName}/>
        })}
        {adding && <div className="sidebar-item">
            <input type="text" onChange={handleNameChange} placeholder="Add new topic" />
            <button type="button" onClick={handleSaveButton}>Save</button>
        </div>}
        <div className="sidebar-item" onClick={handleAddButton}>+</div>
        {loading && <div className="sidebar-item"><Loader/></div>}
        </div>
    </>
}

export default TopicList;