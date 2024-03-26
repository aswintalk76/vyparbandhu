import React from 'react';
import profile from '../images/profile.png';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Carousel } from 'react-bootstrap';

const Testimonials = () => {
    return (
        <div className='container'>
            <h1 className='text-center heading_main  mt-5'>Testimonials</h1>
            <Carousel>
                <Carousel.Item>
                    <div className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-body m-3">
                                        <div className="row">
                                            <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                                <img src={profile} className="rounded-circle img-fluid shadow-1" alt="woman avatar" width="200" height="200" />
                                            </div>
                                            <div className="col-lg-8">
                                                <p className="text-muted  mb-4" style={{ fontSize: "18px", fontWeight: "500" }}>
                                                    <span><RiDoubleQuotesL style={{ marginTop: "-15px" }} /></span>  Bahut hi achhi service M apna MSTC ka registration kraya h scrap dealer ka or GST b kraya h or ab meri return b Vyapar bandhu se hi file ho rhi h. Bahut hi shi rate me or jldi kam krana h to Vyapar Bandhu se achha koi nhi best h ek dm <span><RiDoubleQuotesR style={{ marginTop: "-15px" }} /></span>
                                                </p>
                                                <p className="fw-bold lead mb-2">MOHD SAHID</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-body m-3">
                                        <div className="row">
                                            <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                                <img src={profile} className="rounded-circle img-fluid shadow-1" alt="woman avatar" width="200" height="200" />
                                            </div>
                                            <div className="col-lg-8">
                                                <p className="text-muted  mb-4" style={{ fontSize: "18px", fontWeight: "500" }}>
                                                    <span><RiDoubleQuotesL style={{ marginTop: "-15px" }} /></span> Prompt reply of my query and doubt on GST and then I got my GST registration from Vyapar Bandhu only with in 3 days, it was amazing for me. Earlier I give my details and documents to some one in my town Kandhla 9 months ago but he was not able to get my GST registration. <span><RiDoubleQuotesR style={{ marginTop: "-15px" }} /></span>
                                                </p>
                                                <p className="fw-bold lead mb-2">Tahir Enterprises</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                {/* Add more Carousel.Items for additional testimonials */}

            </Carousel>
        </div>
    );
};

export default Testimonials;
