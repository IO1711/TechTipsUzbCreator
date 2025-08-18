const Text = (props) => {
    

    const handleTextChange = (event) => {
        //console.log("In text: " + event.target.value + "Order: " + props.orderNumber);
        props.onChange(props.orderNumber, {content : event.target.value});
    }

    
    

    return <>
        <textarea onChange={handleTextChange} className="content-text custom-input" placeholder="Enter text" value={props.content}></textarea>
    </>
}

export default Text;