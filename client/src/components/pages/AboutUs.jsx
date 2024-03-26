import React from 'react'
import dot from "../images/dot.png"
import aboutUs from "../images/about-img.jpg"
const AboutUs = () => {
    return (
        <div className='container-fluid'>
            <div className="my-5 px-5 mx-5">
                <h1 className="text-center heading_main">About Vyapar Bandhu</h1>
                <div className="row">
                    <div className="col-xl-7  col-12 mt-5 ">
                        <p className='f_20'>Vyapar Bandhu is an online business service solutions platform on PAN India basis for all entrepreneurs who have already been in any business or want to start a business. Our Mission is to help you at every step to start and grow your business so that you can do business in a simple way without any hesitation.
                        </p>
                        <p className='f_20'>
                            We provide online services like,
                        </p>
                        <div className='row'>

                            <div className=' col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" /> Company Incorporation
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" /> LLP Incorporation
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" /> GST Registration and Return
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  ISO Certification
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  PSARA License
                            </div>  
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Import Export Code
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  MSME/ UDYAM Registration
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Income Tax & TDS return and Consultancy
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Accounting
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Compliance
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  EPF & ESIC registration and return
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Environmental Clearance consultancy
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Factory License
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Legal & Metrology License
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  FSSAI
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Trademark
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Copyright
                            </div>
                            <div className='col-lg-6 col-12 f_18'>
                                <img src={dot} alt="dot" />  Patent and many more services
                            </div>

                        </div>
                        <div className="col-sm-12 d-flex justify-content-start mt-3 pl-sm-0">
                            <button className="btn px-5 text-white  " style={{ background: "#198754" }} ><b>Know more</b></button>
                        </div>


                    </div>
                    <div className="col-xl-5 col-12" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <div className='p-5 mx-5'> */}
                        <img src={aboutUs} alt="about " className="img-fluid mt-5" style={{ borderRadius: "20px" }} />
                        {/* </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutUs
