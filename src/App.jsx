import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import './App.css';
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Layout from './Layout.jsx';
import Home from "./Home.jsx";
import Content from "./Content.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useEffect, useState } from "react";


function App() {

  const [authToken, setAuthToken] = useState(null);
  
  
  

  return (
    <>
      <BrowserRouter>
      <div className='theme-graphite'>
        <Header/>
        {authToken!==null && <Menu authToken={authToken}/>}
        <Routes>
          <Route path="/" element={<Home authToken={authToken}/>}></Route>
          <Route path="/:appName/" element={<Layout authToken={authToken} />}>
            <Route path=":topicName" element={<Content/>}></Route>
          </Route>
          <Route path="/login" element={<Login handleAuth={setAuthToken}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App

/*<Route path="/login" element={<Login handleAuth={setAuthToken}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>*/
