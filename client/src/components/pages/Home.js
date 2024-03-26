import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Header from "./Header";
import OurWorkflow from "./OurWorkflow";
import Review from "./Review";
import Services from "./Services";
import Slider from "./Slider";
import TestiMonials from "./TestiMonials";
import WhyVyapar from "./WhyVyapar";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };

    return (
        <>
            <div className="App">




                <Header closeModal={closeModal} modalActive={modalActive} setModalActive={setModalActive} />
                <Slider />
                <Services />
                <OurWorkflow />
                <AboutUs />
                <WhyVyapar />
                <Review />
                <TestiMonials />
                <ContactUs />
                <Footer />
                <ToastContainer />
            </div>
        </>
    );
};

export default Home;
