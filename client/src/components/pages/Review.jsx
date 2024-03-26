import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Review = () => {
    const [modalActive, setModalActive] = useState(false);
    const [name, setName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [details, setDetails] = useState();

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        console.log('call')
        setModalActive(false);
    };

    const SubmitData = async()=>{
        if(name && phoneNumber && email){
            let url = `${process.env.REACT_APP_PORT}/admin/creatExpertCall`
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, name: name,number: phoneNumber,detail: details })
                    });
                    if (response.status === 200) {
                        toast.success("Create Expert call  Sucesfully!")
                        closeModal()
                        setEmail()
                        setName()
                        setPhoneNumber()
                        setDetails()

                    }
                }
                catch(e){
                    toast.error(e)
                  

                    console.log(e, 'error')
                }



        }else{
            toast.error('Fill Required details')
        }
    }
    return (
        <div>
            {modalActive && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                        <section className="vh-100 container_body">
                            <div className="container py-5 h-100">
                                <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                    <div className="col-md-10 w-auto col-lg-10 col-xl-9 card flex-row mx-auto px-0">


                                        <div className="card-body">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>


                                            <h2 class="title text-center mt-4 modal_heading" >
                                                Book Expert Call
                                            </h2>
                                            <div class="form-box px-3">
                                                <div class="form-input">
                                                    <span><i class="fa-solid fa-user"></i></span>
                                                    <input type="text" placeholder="Name" tabindex="10" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                                </div>
                                                <div class="form-input">
                                                    <span><i class="fa-solid fa-phone-volume"></i></span>
                                                    <input type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" required value={phoneNumber} onChange={(e) => {
                                                        const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                        setPhoneNumber(onlyNumbers);
                                                    }} />
                                                </div>
                                                <div class="form-input">
                                                    <span><i class="bi bi-envelope-fill"></i></span>
                                                    <input type="email" placeholder="Email Address" tabindex="10"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                                </div>
                                                <div class="form-input">
                                                    {/* <span><i class="bi bi-envelope-fill"></i></span> */}

                                                    <textarea value={details} onChange={(e)=>{setDetails(e.target.value)}} placeholder="Details" tabindex="10" style={{borderRadius:"20px" , padding:"10px" , width:"100%" , fontSize:"10px" , minHeight:"90px" }}/>
                                                </div>


                                                <div class="mb-3">

                                                    <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={SubmitData} >
                                                        

                                                            <span>Submit</span>
                                                        

                                                    </button>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </>
            )}


            <div className='container mt-5 rounded' style={{ background: "#198754" }}>
                <div className='row'>
                    <div className='col-lg-7 py-5 d-flex justify-content-center text-center'>
                        <div className='my-5'>
                            <h2 className='mt-5'>Get Free Video | Call Consultancy</h2>
                            <h1 className='text-white'>Schedule a virtual meeting <br />with an expert</h1>
                            <button className='btn px-3 mt-2 text-white' style={{ background: "#FEB444", fontSize: "20px" }} onClick={openModal}><b>Book Now</b></button>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className='card px-5 m-5' style={{ width: "auto" }}>
                            <div className="row my-3 ">
                                <h2>Get Expert Call</h2>

                                <div className="mb-3 row">
                                    {/* <label className='col-sm-2 col-form-label'>Name</label> */}
                                    <div className="col-sm-12">
                                        <input type="text" placeholder="Name" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row" >
                                    {/* <label classNameName='col-sm-2'> Mobile</label> */}
                                    <div className="col-sm-12">
                                        <input type="number" placeholder="Mobile" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    {/* <label classNameName='col-sm-2'>Email</label> */}
                                    <div className="col-sm-12">
                                        <input type="email" placeholder="Email" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    {/* <label classNameName='col-sm-2'>Query</label> */}
                                    <div className="col-sm-12">
                                        <textarea placeholder="Write your Query in Details" className="form-control" rows="2"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <button className="btn px-5 text-white float-end " style={{ background: "#198754" }} onClick={openModal}><b>Book</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Review
