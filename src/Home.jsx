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
                <h1>Bilimingiz bilan bo'lishing</h1>
                <p style={{fontSize:"19px"}}>Yuqoridagi dasturlardan birini tanlang, yangi mavzu yarating va qo'llanma yaratishni boshlang.</p>
                <p>Sizga kerakli dastur ro'yxatda yo'qmi, bizga xabar yuboring. 5 daqiqa ichida javob oling.</p>
            </div>}
            
            <img src="homePagePicUz.png"></img>
        </div>
    </>
}

export default Home;