import React from 'react'
import Group from "../images/Group.png"
import freeExpert from "../images/free-expert.png"
import dedicatedSupport from "../images/dedicated-support.png";
import easyRegistretion from "../images/easy-registration.png";
import googleVarified from "../images/google-varified.png";
import moneyBack from "../images/money-back.png";
import oneStop from "../images/one-stop.png"
import whyVyapar from "../images/why-vyapar.png";
const WhyVyapar = () => {
    return (
        <div className='container-fluid'>
            <h1 className="text-center mt-5 heading_main">Why Vyapar Bandhu</h1>

            <div>
                <div className="row text-center mt-2" style={{ padding: "0px 60px" }}>
                    <div className="col-sm-12 col-md-6 px-5">
                        <img src={whyVyapar} alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 py-3">
                        <div className='row my-5'>
                            <div className='col-md-6 pt-2'>
                                <div className='d-flex  align-items-center text-left'>
                                    <img src={oneStop} alt="dedicatedSupport" height="80px" />
                                    <h4 className='ml-1'>One Stop Corporate Solution</h4>
                                </div>
                            </div>
                            <div className='col-md-6 pt-2'>
                                <div className='d-flex  align-items-center  text-left'>
                                    <img src={easyRegistretion} alt="easyRegistretion" height="80px" />
                                    <h4 className='ml-1'>Easy Registration Process</h4>
                                </div>
                            </div>
                            <div className='col-md-6 mt-5 pt-2'>
                                <div className='d-flex  align-items-center  text-left'>
                                    <img src={freeExpert} alt="dedicatedSupport" height="80px" />
                                    <h4 className=' ml-1'>Free Expert <br /> Assistance</h4>
                                </div>
                            </div>
                            <div className='col-md-6 mt-5 pt-2'>
                                <div className='d-flex  align-items-center  text-left'>
                                    <img src={googleVarified} alt="dedicatedSupport" height="80px" />
                                    <h4 className='ml-1'>Google Verified Business</h4>
                                </div>
                            </div>
                            <div className='col-md-6 mt-5 pt-2'>
                                <div className='d-flex  align-items-center  text-left'>
                                    <img src={dedicatedSupport} alt="dedicatedSupport" height="80px" />
                                    <h4 className='ml-1'>Dedicated Support Staff</h4>
                                </div>
                            </div>
                            <div className='col-md-6 mt-5 pt-2'>
                                <div className='d-flex justify-content-center align-items-center  text-left'>
                                    <img src={moneyBack} alt="dedicatedSupport" height="80px" />
                                    <h4 className='ml-1'>Money-Back Guarantee</h4>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                {/* <div class="row text-center mt-5" style={{padding: "0px 60px"}}>
                        <div class="col-sm-12 col-md-4 px-5 py-3 card1">
                        <img src={Group} alt =""/>
                            <h3>Lorem ipsum dolor sit.</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni impedit temporibus,
                                velit atque consequatur
                            </p>
                        </div>
                        <div class="col-sm-12 col-md-4 px-5 py-3 card1">
                        <img src={Group} alt =""/>
                            <h3>Lorem ipsum dolor sit.</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni impedit temporibus,
                                velit atque consequatur</p>
                        </div>
                        <div class="col-sm-12 col-md-4 px-5 py-3 card1">
                        <img src={Group} alt =""/>
                            <h3 class="mt-2">Lorem ipsum dolor sit.</h3>
                            <p class="mt-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni
                                impedit temporibus,
                                velit atque consequatur</p>
                        </div>
                    </div> */}

            </div>
        </div>

    )
}

export default WhyVyapar
