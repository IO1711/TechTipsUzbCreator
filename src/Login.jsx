import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Input from "./Input";
import Button from "./Button";


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
        <Input type="text" name="username" onChange={handleUsenameChange}/>
        <Input type="text" name="password" onChange={handlePasswordChange}/>
        <Button type="button" onClick={handleLoginSubmit}>Login</Button>
    </>
}

export default Login;