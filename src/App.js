import './App.scss';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Home, Category, Cart} from "./pages/index";
// components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import {Provider} from 'react-redux';
import store from "./store/store";
import Swiper from 'swiper';
import SwiperCarousel from './components/SwiperJs/SwiperCarousel';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
        <ToastContainer/>
          <Navbar />
          <SwiperCarousel/>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/category/:id" element = {<Category />} />
            <Route path = "/cart" element = {<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
