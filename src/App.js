import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import  { useEffect } from 'react';
// pages
import {Home, Category, Cart} from "./pages/index";
// components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import {isAuthenticated} from './store/userSlice';
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(isAuthenticated());
  }, [])
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/signup" element = {<Signup/>} />
            <Route path = "/category/:id" element = {<Category />} />
            <Route path = "/cart" element = {<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
