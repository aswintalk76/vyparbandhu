import React, { useState } from 'react'
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import '../styles/Services.css'
import { toast } from 'react-toastify';
const ContactUs = () => {

    // firstname, lastname,email, number,   doubt

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()
    const [doubt, setDoubt] = useState()

    const SubmitData = async () => {
        if (firstname && lastname && email && number &&   doubt) {
            let url = `${process.env.REACT_APP_PORT}/admin/ConatctUsExpertCall`
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstname:firstname, lastname:lastname,email:email, number:number,   doubt:doubt })
                });
                if (response.status === 200) {
                    toast.success("Create Expert call  Sucesfully!")
                    setFirstname()
                    setLastname()
                    setEmail()
                    setNumber()
                    setDoubt()                   

                }
            }
            catch (e) {
                toast.error(e)


                console.log(e, 'error')
            }



        } else {
            toast.error('Fill Required details')
        }
    }

    return (
        <div className='container-fluid'>
            <div className="mt-5 pt-5 bg-light">
                <h1 className="text-center heading_main" >Contact Us</h1>
                <div className="row py-5 px-5 textSize" >
                    <div className="col-md-6 px-5 ">
                        <div className='row'>
                            <div className='col-md-6 '>
                                <div className='card mt-5 mx-3 py-3 text-center card2' style={{ height: "auto" }}>
                                    <h2><FaLocationDot /></h2>
                                    <h3>Our Address</h3>
                                    <p>1/25, Sector 2, Mannat Homes, Rajendra Nagar, Sahibabad, Ghaziabad, U.P. 201005</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card mt-5 mx-3 py-3 text-center card2' style={{ height: "auto" }}>
                                    <h2><FaClock /></h2>
                                    <h3>Working Hours</h3>
                                    <p>Monday-Saturday<br />
                                        10:00AM - 6:00PM</p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 mb-5'>
                                <div className='card mt-5 mx-3 py-3 text-center card2' style={{ height: "auto" }}>
                                    <h2><MdEmail /></h2>
                                    <h3>Email</h3>
                                    <p>info@vyaparbandhu.com</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card mt-5 mx-3 py-3 text-center card2' style={{ height: "auto" }}>
                                    <h2> <FaPhoneAlt /></h2>
                                    <h3>Call us</h3>
                                    <p>8077425868</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-5 ">

                        <div className="row mt-5 pe-5">
                            <h2>Get Expert Call</h2>
                            <div className="col-sm-6 mt-2">
                                <label>Fist Name</label>
                                <input type="text" placeholder="First Name" className="form-control mt-3" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                            </div>
                            <div className="col-sm-6 mt-2">
                                <label>Last Name</label>
                                <input type="text" placeholder="Last Name" className="form-control mt-3" value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                            </div>
                        </div>
                        <div className="row mt-3 pe-5">
                            <div className="col-sm-6">
                                <label>Mail</label>
                                <input type="email" placeholder="Mail" className="form-control mt-3" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="col-sm-6">
                                <label>Phone</label>
                                <input type="number" placeholder="Phone" className="form-control mt-3" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                            </div>
                        </div>
                        <div className="row mt-3 pe-5">
                            <div className="col-sm-12">
                                <label> Your Doubt</label>
                                <textarea placeholder="Write your Doubt in Details" className="form-control mt-3" rows="2" value={doubt} onChange={(e) => { setDoubt(e.target.value) }}></textarea>
                            </div>
                        </div>
                        <button className="btn btn-success px-3 my-4 float-end me-5" onClick={SubmitData}>Send Message</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
