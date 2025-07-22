import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";


const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {postAuth} = useFetch("https://uztechtips.onrender.com/api/v1/");
    

    const handleUsenameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLoginSubmit = () => {

        postAuth("login", {
            username,
            password
        }).then(data => {
            
            props.handleAuth(data);
            navigate("/")
        });
    }

    return <>
        <input type="text" name="username" onChange={handleUsenameChange}/>
        <input type="text" name="password" onChange={handlePasswordChange}/>
        <button type="button" onClick={handleLoginSubmit}>Login</button>
    </>
}

export default Login;