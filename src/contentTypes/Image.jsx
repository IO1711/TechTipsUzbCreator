import Loader from "../Loader";
import useFetch from "../useFetch";
import { useState } from "react";


const Image = (props) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const { postImage } = useFetch("https://uztechtips.onrender.com/api/images/");
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSending(true);

        const form = event.target;
        const formData = new FormData(form);

        const file = formData.get("file");

        postImage("upload", formData).then(data => {
            props.onChange(props.orderNumber, {content : data}); 
            setSending(false); 
            setSent(true);
        });
        
        //add file upload logic later

        


    }

    return <><div className="image-container">
        <form onSubmit={handleFormSubmit}>
            <input type="file" name="file"/>
            <button type="submit" disabled={sent}>Save</button>
        </form>
        {sending && <Loader/>}
    </div>
    </>
}

export default Image;