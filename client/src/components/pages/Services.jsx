import React from 'react'
import "../styles/Services.css"
import Registration from "../images/registrationblack.png";
import Trademark from "../images/trademarks.png";
import licensing from "../images/licensing.png"
const Services = () => {
    return (
        <div className='container-fluid' >
            <div className="py-5 px-5">
                <div className='d-flex justify-content-center'>
                    <h1 className="text-center heading_main">Our Most Popular Services</h1>
                </div>
                <div className="row py-5" >
                    <div className="col-sm-3 text-center py-3 border rounded mx-auto card2">
                        <img src={Trademark} alt="" height="50px" width="50px" />
                        <h3 className="mt-2">Trademark Registration</h3>
                        <p className="mt-2">Protect your businees Name/ Brand/ Logo etc.</p>
                    </div>
                    <div className="col-sm-3 text-center py-3 border rounded mx-auto card2 ">
                        <img src={Registration} alt="" height="50px" width="50px" />
                        <h3>GST Registration</h3>
                        <p>Necessity of every business is GSTIN GST Registration, Returns, Refund etc.</p>
                    </div>
                    <div className="col-sm-3 text-center py-3 border rounded mx-auto card2 ">
                        <img src={licensing} alt="" height="50px" width="50px" />
                        <h3>PF & ESIC</h3>
                        <p> PF & ESIC - social; security for your workers PF & ESIC consultancy with Registration and returns..</p>
                    </div>
                </div>
                <div className="row pb-5 " >
                    <div className="col-sm-3 text-center py-3 border rounded mx-auto card2">
                        <img src={Trademark} alt="" height="50px" width="50px" />
                        <h3 className="mt-2">ISO Certification</h3>
                        <p className="mt-2">Get International Recognized ISO certificate for your business ISO Certification, CE Mark, GMP, USFDA etc.</p>
                    </div>
                        <div className="col-sm-3 text-center py-3 border rounded mx-auto card2 ">
                        <img src={Registration} alt="" height="50px" width="50px" />
                        <h3>FSSAI</h3>
                        <p>Start your food business with the Fssai Registration or License FSSAI/ Food Registration or License.</p>
                    </div>
                    <div className="col-sm-3 text-center py-3 border rounded mx-auto card2">
                        <img src={licensing} alt="" height="50px" width="50px" />
                        <h3> ICAT/ ARAI/WMI</h3>
                        <p>For vehicle manufacturing, parts and accessories etc. ICAT/ ARAI/WMI approval or certification.</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Services
