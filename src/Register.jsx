import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import Input from "./Input";
import Button from "./Button";

const Register = () => {
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

        postAuth("register", {
            username,
            password
        }).then(data => {
            console.log(data);
        });
    }

    return <>
        <div className="auth-container">
            <h2>Ro'yxatdan o'tish</h2>
            <div className="auth-child">
                <Input type="text" name="username" onChange={handleUsenameChange}/>
                <Input type="text" name="password" onChange={handlePasswordChange}/>
                <Button type="button" onClick={handleLoginSubmit}>Ro'yxatdan o'tish</Button>
                <p>Ro'yxatdan o'tganmisiz? Unda tizimga kiring</p>
                <Link to={"/login"}>Kirish</Link>
            </div>
        </div>
    </>
}

export default Register;