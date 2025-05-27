import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Text from "./contentTypes/Text";
import Image from "./contentTypes/Image";
import Table from "./contentTypes/Table";
import List from "./contentTypes/List";
import useFetch from "./useFetch";
import Loader from "./Loader";
import TextDisplay from "./contentDisplay/TextDisplay";
import ImageDisplay from "./contentDisplay/ImageDisplay";

/*post getTopicContent  {app : {appName : name}, topic : {topicName : name}}*/


const Content = () => {
    const [elements, setElements] = useState([]);
    const [displayElements, setDisplayElements] = useState([]);
    const [orderNum, setOrderNum] = useState(0);
    const { postString, post } = useFetch("https://uztechtips.onrender.com/api/v1/");
    const [showImage, setShowImage] = useState(false);
    
    const params = useParams();

    

    const contentTypeMap = {
        TEXT : (orderNumber) => <Text orderNumber={orderNumber} onChange={handleEditContent}/>,
        TABLE : (orderNumber) => <Table/>,
        IMAGE : (orderNumber) => <Image orderNumber={orderNumber} onChange={handleEditContent}/>,
        LIST : () => <List/>
    }

    const displayMap = {
        TEXT : (content) => <TextDisplay content={content}/>,
        IMAGE : (imageName) => <ImageDisplay imageName={imageName}/>
    }

    useEffect(() => {
        setShowImage(false);
        setElements([]); 
        setOrderNum(0);
        post("getTopicContent", {
            app : {
                appName : params.appName
            },
            topic : {
                topicName : params.topicName
            }
        }).then(data => {
            console.log(data);
            setDisplayElements(data);
        })
    }, [params]);
    
    const handleContentAdd = (contentType) => {
        const newElement = {
            appName : params.appName,
            topicName : params.topicName,
            dataType : contentType,
            orderNumber : orderNum + 1,
            data : { content : ""}
        }
        setElements(prev => {
            return [...prev, newElement];
        });
        
        setOrderNum(prev => prev+1);
    }

    function handleEditContent(orderNumber, newContent){
        //contentEditMap[dataType]?.(orderNumber, newContent);
        setElements(elements.map(element => {
                    if(element.orderNumber === orderNumber)
                        element.data = newContent;
                    return element;
                }
            ));
    }

    const handleShowImage = () => {
        setShowImage(!showImage);
    }

    const handleContentSave = () => {
        postString("addData", elements).then(data => console.log(data));
    }



    

    return <>
        <div className="content">
            <div className="content-buttons">
                <div className="content-button-item" onClick={() => handleContentAdd("TEXT")}>+text</div>
                <div className="content-button-item" /*onClick={() => handleContentAdd("TABLE")}*/>+table</div>
                <div className="content-button-item" onClick={() => handleContentAdd("IMAGE")}>+image</div>
                <div className="content-button-item" /*onClick={() => handleContentAdd("LIST")}*/>+list</div>
                <div className="content-button-item" onClick={handleShowImage}>Show image</div>
                <div className="content-button-item" onClick={() => {setShowImage(false);setElements([]); setOrderNum(0);}}>Clean</div>
            </div>
            {elements && elements.map(element => {
                return (<div key={element.orderNumber}>{contentTypeMap[element.dataType]?.(element.orderNumber) || <div>Wrong dataType</div>}</div>);
            })}
            {showImage && <img src={`https://uztechtips.onrender.com/api/images/${elements[0].data.content}`}/>}
            <button type="button" onClick={handleContentSave}>Save</button>
            {displayElements && displayElements.map(element => {
                return (<div className="display-content" key={element.orderNumber}>{displayMap[element.dataType]?.(element.content.content)}</div>);
            })}
        </div>
    </>
}

export default Content;