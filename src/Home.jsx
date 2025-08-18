import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

const Home = (props) => {
    const navigate = useNavigate();

    const handleHomeLogin = () => {
        navigate("/login");
    }

    return <>
        <div className="home-container">
            {props.authToken===null && <div className="home-text">
                
                <h1>Nimanidir o'rgatmoqchimisiz?</h1>
                <p style={{fontSize:"19px"}}>O‘quvchilaringiz, hamkasblaringiz yoki boshqalar uchun tez va qulay qo‘llanmalarni yuklang. Vizual, sodda va samarali.</p>
                <p>Boshlash uchun tizimga kiring!</p>
                <Button onClick={handleHomeLogin}>Kirish</Button>
                
            </div>}
            {props.authToken!==null && <div className="home-text">
                    
            </div>}
            
            <img src="homePagePicUz.png"></img>
        </div>
    </>
}

export default Home;