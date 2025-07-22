const ImageDisplay = (props) => {
    return <>
        
            <img src={`https://uztechtips.onrender.com/api/images/getImage/${props.imageName}`}/>
        
    </>
}

export default ImageDisplay;