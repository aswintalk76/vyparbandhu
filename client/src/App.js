import './App.css';
import './components/pages/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import DocumentPage from './components/pages/DocumentPage';
import ServicePage from './components/pages/ServicePage';
import Login from './components/pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/pages/Profile';
import Blog from './components/pages/Blog';
import BlogDetails from './components/pages/BlogDetails';


// import AnnualFiling from './components/pages/AnnualFiling';
// import Header from './components/pages/Header';
// import PrivateLlimitedCompany from './components/pages/PrivateLlimitedCompany';

function App() {
  console.log(process.env.REACT_APP_PORT, 'REACT_ENV')
  return (
    <>
      <div className='App'>

        <BrowserRouter>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/documents" element={<DocumentPage />} />
            <Route path="/servicePage" element={<ServicePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogdetails" element={<BlogDetails />} />

          </Routes>
            <ToastContainer />
        </BrowserRouter>
      </div>


    </>

  );
}

export default App;
