import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Text from "./contentTypes/Text";
import Image from "./contentTypes/Image";
import Table from "./contentTypes/Table";
import List from "./contentTypes/List";
import useFetch from "./useFetch";
import Loader from "./Loader";
import TextDisplay from "./contentDisplay/TextDisplay";
import ImageDisplay from "./contentDisplay/ImageDisplay";
import Button from "./Button";


/*post getTopicContent  {app : {appName : name}, topic : {topicName : name}}*/


const Content = () => {
    const [elements, setElements] = useState([]);
    const [displayElements, setDisplayElements] = useState([]);
    const [orderNum, setOrderNum] = useState(0);
    const { postString, post, putString } = useFetch("https://uztechtips.onrender.com/api/v1/");
    const {authToken} = useOutletContext();
    const [showSlidePage, setShowSlidePage] = useState(false);
    
    const [sending, setSending] = useState(false);
    
    const params = useParams();

    

    const contentTypeMap = {
        TEXT : (orderNumber, authToken) => <Text authToken={authToken} orderNumber={orderNumber} onChange={handleEditContent}/>,
        TABLE : (orderNumber) => <Table/>,
        IMAGE : (orderNumber, authToken) => <Image authToken={authToken} orderNumber={orderNumber} onChange={handleEditContent}/>,
        LIST : () => <List/>
    }

    const contentEditMap = {
        TEXT : (orderNumber, authToken, content) => {return <>
                <Text authToken={authToken} orderNumber={orderNumber} onChange={handleEditContent} content={content}/>
                <Button onClick={() => handleDeleteElement(orderNumber)}>Delete</Button>
                <Button onClick={() => handleAddElement(orderNumber, "TEXT")}>Add text</Button>
                <Button onClick={() => handleAddElement(orderNumber, "IMAGE")}>Add image</Button>
        </>},
        IMAGE : (orderNumber, authToken, content) => {
            return <>
                {content==="" && <Image authToken={authToken} orderNumber={orderNumber} onChange={handleEditContent}/>}
                
                {content !== "" && <ImageDisplay authToken={authToken} imageName={content}/>}
                
                <Button onClick={() => handleDeleteElement(orderNumber)}>Delete image</Button>
                <Button onClick={() => handleAddElement(orderNumber, "TEXT")}>Add text</Button>
                <Button onClick={() => handleAddElement(orderNumber, "IMAGE")}>Add image</Button>

            </>
        }
    }

    const displayMap = {
        TEXT : (content, authToken) => <TextDisplay authToken={authToken} content={content}/>,
        IMAGE : (imageName, authToken) => <ImageDisplay authToken={authToken} imageName={imageName}/>
    }

    useEffect(() => {
        
        setShowSlidePage(false);
        setElements([]); 
        setOrderNum(0);
        post("getTopicContent", {
            app : {
                appName : params.appName
            },
            topic : {
                topicName : params.topicName
            }
        }, authToken).then(data => {
            console.log("First fetch displayElements: " + JSON.stringify(data));
            setDisplayElements(data);
        })
    }, [params]);

    useEffect(()=> {
        console.log("Changed elements: " + JSON.stringify(elements));
    },[elements]);
    
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

    const handleContentSave = () => {
        
        setSending(true);
        if(displayElements.length===0)
            postString("addData", elements, authToken).then(data => {console.log("Saved: " + data); setSending(false)});
        if(displayElements.length>0){
            console.log("I will send: " + JSON.stringify(elements));
            console.log("Display content: " + JSON.stringify(displayElements));
            putString("editTopicData", elements, authToken).then(data => {console.log("Edited: " + data); setSending(false)});}
    }

    const handleEditPanelOpen = () => {
        console.log("Display length: " + displayElements.length);
        
        setElements(displayElements.map(element => {
            return {
                appName : params.appName,
                topicName : params.topicName,
                dataType : element.dataType,
                orderNumber : element.orderNumber,
                data : { content : element.data.content}
            }
        }));
        setOrderNum(displayElements.length);
        setShowSlidePage(true);
    }

    const handleDeleteElement = (orderNumber) => {
        console.log("I will delete this from elements: " + JSON.stringify(elements.filter(element => element.orderNumber === orderNumber)));
        setElements(elements.filter(element => {
            return orderNumber!==element.orderNumber;
        }).map(element => orderNumber<element.orderNumber ?  {...element, orderNumber: element.orderNumber-1} : element));
    }

    const handleAddElement = (orderNumber, dataType) => {
        console.log("Getting in edit: " + orderNumber + " ; " + dataType);
        setElements(prev => {
            
            const shiftedOrderNumber = prev.map(element => orderNumber<element.orderNumber ? {...element, orderNumber: element.orderNumber+1} : element);
        
            const newElement = {
                appName : params.appName,
                topicName : params.topicName,
                dataType : dataType,
                orderNumber : orderNumber+1,
                data : { content : ""}
            };

            return [...shiftedOrderNumber, newElement].sort((a,b) => a.orderNumber-b.orderNumber);
            
        });
        
        setOrderNum(prev => prev+1);
    }

    const handleClosePanel = () => {
        setElements([]); 
        setOrderNum(0);
        post("getTopicContent", {
            app : {
                appName : params.appName
            },
            topic : {
                topicName : params.topicName
            }
        }, authToken).then(data => {
            
            setDisplayElements(data);
        });
        setShowSlidePage(false);
        console.log("After close elements: " + JSON.stringify(elements));
        console.log("After close displayElements: " + JSON.stringify(displayElements));
    }



    

    return <>
        <div className="content">
            <Button onClick={handleEditPanelOpen}>Open panel</Button>
            
            
            
            
            
            
            
            {displayElements && displayElements.map(element => {
                return (<div className="display-content" key={element.orderNumber}>{displayMap[element.dataType]?.(element.data.content, authToken)}</div>);
            })}

            <div className={`slide-page ${showSlidePage ? "show" : ""}`}>
                <Button onClick={handleClosePanel}>Close</Button>
                <h2>This is the edit page</h2>
                
                <div className="content-buttons">
                    <div className="content-button-item" onClick={() => handleContentAdd("TEXT")}>+text</div>
                    <div className="content-button-item" /*onClick={() => handleContentAdd("TABLE")}*/>+table</div>
                    <div className="content-button-item" onClick={() => handleContentAdd("IMAGE")}>+image</div>
                    <div className="content-button-item" /*onClick={() => handleContentAdd("LIST")}*/>+list</div>
                    <div className="content-button-item" onClick={() => {setElements([]); setOrderNum(0);}}>Clean</div>
                </div>
                {displayElements.length===0 && elements.map(element => {
                    return (<div key={element.orderNumber}>{contentTypeMap[element.dataType]?.(element.orderNumber, authToken) || <div>Wrong dataType</div>}</div>);
                })}
                {displayElements.length>0 && elements.map(element => {
                    return (<div key={element.orderNumber}>{contentEditMap[element.dataType]?.(element.orderNumber, authToken, element.data.content)}</div>)
                })}
                <Button type="button" onClick={handleContentSave} disabled={sending}>Saqlash</Button>
                {sending && <p>Sending...</p>}
            </div>
        </div>
    </>
}

export default Content;