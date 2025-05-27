import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Layout from './Layout.jsx';
import Home from "./Home.jsx";
import Content from "./Content.jsx";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <div className='theme-graphite'>
        <Header/>
        <Menu/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/:appName/" element={<Layout/>}>
            <Route path=":topicName" element={<Content/>}></Route>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
