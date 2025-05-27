const ImageDisplay = (props) => {
    return <>
        
            <img src={`https://uztechtips.onrender.com/api/images/${props.imageName}`}/>
        
    </>
}

export default ImageDisplay;