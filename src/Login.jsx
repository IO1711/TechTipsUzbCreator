import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        postAuth("login", {
            username,
            password
        }).then(data => {
            
            props.handleAuth(data);
            navigate("/")
        });
    }

    return <>
        <div className="auth-container">
            <h2>Kirish</h2>
            <form className="auth-child" onSubmit={handleLoginSubmit}>
                <Input type="text" name="username" onChange={handleUsenameChange}/>
                <Input type="text" name="password" onChange={handlePasswordChange}/>
                <Button type="submit">Login</Button>
                <p>Tizimga birinchi marta kiryabsizmi? Unda ro'yxatdan o'ting</p>
                <Link to={"/register"}>Ro'yxatdan o'tish</Link>
            </form>
        </div>
    </>
}

export default Login;