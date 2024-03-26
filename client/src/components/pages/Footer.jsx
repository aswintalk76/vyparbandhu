import React from 'react'
import "../styles/Footer.css"
import { ImWhatsapp, ImFacebook2, ImLinkedin } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import Right from '../images/Untitled design (41).png'
import facbook from '../images/download-removebg-preview.png';
import instragram from '../images/download__1_-removebg-preview.png';
import youtube from '../images/download__2_-removebg-preview.png';
import twitter from '../images/download (1).png';
import visa from '../images/download (3).png'
import master from '../images/download (4).png'
import upi from '../images/download (5).png'

const Footer = () => {
    return (
        <div>
            <div className='container-fluid' style={{ background: "black" }}>
                <div className='container'>
                    <div className="row text-light ">
                        <div className="col-lg-3 col-sm-6 pt-4 text-lg-start text-center">
                            <p><a href='#' className='icon_hover'>About</a></p>
                            {/* <p><a href='#' className='icon_hover'>Carrers</a></p> */}
                            <p><a href='#' className='icon_hover'>Out Team</a></p>
                            <p><a href='#' className='icon_hover'>Contact Us</a></p>
                        </div>
                        <div className="col-lg-3 col-sm-6 pt-4 text-lg-start text-center">
                            <p><a href='#' className='icon_hover'>Knowledge Hub</a></p>
                            <p><a href='/blog' className='icon_hover'>Blogs</a></p>
                            {/* <p><a href='#' className='icon_hover'>Live Chat</a></p> */}
                            {/* <p><a href='#' className='icon_hover'>Video</a></p> */}
                            <p><a href='#' className='icon_hover'>Get Franchises</a></p>

                        </div>
                        <div className="col-lg-3 col-sm-6 pt-4 text-lg-start text-center">
                            <p><a href='#' className='icon_hover'>Term & Condition</a></p>
                            <p><a href='#' className='icon_hover' >Privacy Policy </a></p>
                            <p><a href='#' className='icon_hover'>Refund Policy</a></p>
                            <p><a href='#' className='icon_hover'>Confidentially Policy</a></p>

                        </div>
                        <div className="col-lg-3 col-sm-6 pt-4 text-lg-start text-center">
                            <p><a href='#' className='icon_hover'>Company Registraion</a></p>
                            <p><a href='#' className='icon_hover'>Trademark</a></p>
                            <p><a href='#' className='icon_hover'>ISC</a></p>
                            <p><a href='#' className='icon_hover'>ICAT</a></p>
                            <p><a href='#' className='icon_hover'>GST</a></p>
                            <p><a href='#' className='icon_hover'>FSSAI</a></p>
                            <p><a href='#' className='icon_hover'>PF & ESIC</a></p>
                        </div>


                    </div>

                    <hr style={{ background: "white" }} />
                    <div className='d-flex justify-content-start align-items-center' style={{ fontSize: "18px", fontWeight: "600" }}>
                        <span className='ps-3 text-white'>Social Presense </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={facbook} className='img-fluid' style={{ height: '35px' }} alt=''/>
                        </a>
                        </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={instragram} className='img-fluid' style={{ height: '35px' }} alt=''/>
                        </a>
                        </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={youtube} className='img-fluid' style={{ height: '35px' }} alt=''/>
                        </a>
                        </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={twitter} className='img-fluid' style={{ height: '35px', borderRadius: "5px" }} alt=''/>
                        </a>
                        </span>


                    </div>
                    <hr style={{ background: "white" }} />
                </div>

            </div>
            <div className='container-fluid' style={{ background: "white" }}>
                <div className='container mb-3'>
                    <div className='d-flex justify-content-center align-items-center' style={{ fontSize: "30px", fontWeight: "600" }}>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={visa} className='img-fluid' style={{ height: '35px', borderRadius: "5px" }} alt=''/>
                        </a>
                        </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={master} className='img-fluid' style={{ height: '35px', borderRadius: "5px" }} alt=''/>
                        </a>
                        </span>
                        <span className='ps-2'><a href='#' className='icon_hover'>
                            <img src={upi} className='img-fluid' style={{ height: '35px', borderRadius: "5px" }} alt=''/>
                        </a>
                        </span>



                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
