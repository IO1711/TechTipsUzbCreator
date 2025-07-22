import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {post} = useFetch("https://uztechtips.onrender.com/api/v1/");


    const handleUsenameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLoginSubmit = () => {

        post("register", {
            username,
            password
        }).then(data => {
            console.log(data);
        });
    }

    return <>
        <input type="text" name="username" onChange={handleUsenameChange}/>
        <input type="text" name="password" onChange={handlePasswordChange}/>
        <button type="button" onClick={handleLoginSubmit}>Login</button>
    </>
}

export default Register;