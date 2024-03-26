import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

import logo1 from '../images/logo3-removebg-preview.png'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = ({ closeModal , modalActive ,setModalActive}) => {

    const [active, setActive] = useState("Start Business");
    const [serviceList, setServiceList] = useState()
    const [startBusiness, setStartBusiness] = useState()
    const [license, setLicense] = useState()
    const [ipr, setIpr] = useState()
    const [taxation, setTaxation] = useState()
    const [iso, setIso] = useState()
    const [compliance, setCompliance] = useState()
    const [other, setOther] = useState()
    // const [modalActive, setModalActive] = useState(false);

    const [activeData, setActiveData] = useState('login')
    const [email, setEmail] = useState()
    const [password, setPasswod] = useState()
    const [createName, setCreateName] = useState()
    const [createEmail, setCreateEmail] = useState()
    const [createPassword, setCreatePassword] = useState()
    const [createNumber, setCreateNumber] = useState()
    const [createConPassword, setCreateConPassword] = useState()
    const [login, setLogin] = useState()
    const [loginStatus, setLoginStatus] = useState(false)

    // const openModal = () => {
    //     setModalActive(true);
    // };
    useEffect(() => {
        setLogin(localStorage.getItem('email'))
    }, [loginStatus])
    // const closeModal = () => {
    //     setModalActive(false);
    // };

    const CreateAccount = async () => {
        if (createName && createEmail && createPassword && createConPassword) {
            if (createConPassword === createPassword) {
                let url = `${process.env.REACT_APP_PORT}/admin/createAccount`
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: createEmail, name: createName, password: createPassword, number: createNumber })
                    });
                    if (response.status === 200) {
                        setCreateConPassword()
                        setEmail()
                        setPasswod()
                        setCreateEmail()
                        setCreateName()
                        setCreatePassword()
                        setCreateNumber()
                        toast.success("Create Account Sucesfully!")
                        setActiveData('login')

                    } else {
                        const data = await response.json();
                        toast.error(data.error)
                    }
                } catch (e) {
                    toast.error(e)

                    console.log(e, 'error')
                }
            } else {
                toast.error("password and confirmPassword not same!")
            }
        } else {

            toast.error("please fille all filled!")
        }


    }
    // const navigate = useNavigate();

    const Login = async () => {
        if (email && password) {

            let url = `${process.env.REACT_APP_PORT}/admin/login`
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, password: password })
                });
                const data = await response.json();
                console.log(data)
                if (response.status === 200) {
                    console.log(data)
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("id", data._id);
                    data.name && localStorage.setItem('number', data.number);
                    localStorage.setItem('name', data.name);
                    setLoginStatus(true)
                    // setLogin(data.email)
                    setCreateConPassword()
                    setEmail()
                    setPasswod()
                    setCreateEmail()
                    setCreateName()
                    setCreatePassword()
                    toast.success("Login Account Sucesfully!")
                    setModalActive(false)



                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                toast.error(e)

                console.log(e, 'error')
            }
        } else {
            toast.error("please fille all filled!")

        }

    }

    const ForgotPassword = async () => {
        if (email && createPassword && createConPassword) {
            if (createConPassword === createPassword) {
                let url = `${process.env.REACT_APP_PORT}/admin/ForgotPassword`
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: createPassword })
                    });
                    if (response.status === 200) {
                        setEmail()
                        setCreateConPassword()
                        setPasswod()
                        setCreateEmail()
                        setCreateName()
                        setCreatePassword()
                        toast.success("Password Update Sucesfully!")
                        setActiveData('login')

                    } else {
                        const data = await response.json();
                        toast.error(data.error)
                    }
                } catch (e) {
                    toast.error(e)

                    console.log(e, 'error')
                }
            } else {
                toast.error("password and confirmPassword not same!")
            }
        } else {

            toast.error("please fille all filled!")
        }


    }



    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/service/list`);
            const data = await response.json();
            if (response.status === 200) {
                setServiceList(data)
            }
            const responseData = await fetch(`${process.env.REACT_APP_PORT}/admin/category/alldata`);
            const data2 = await responseData.json();
            if (responseData.status === 200) {
                data2?.map((data, index) => {
                    if (data.name === "Start Business") {
                        setStartBusiness(data.subcategories)
                    }
                    if (data.name === "License/Registration") {
                        setLicense(data.subcategories)
                    }
                    if (data.name === "IPR") {
                        setIpr(data.subcategories)
                    }
                    if (data.name === "Taxation") {
                        setTaxation(data.subcategories)
                    }
                    if (data.name === "Compliance") {
                        setCompliance(data.subcategories)
                    }
                    if (data.name === "ISO/ISI") {
                        setIso(data.subcategories)
                    }
                    if (data.name === "Other Services") {
                        setOther(data.subcategories)
                    }

                })

            }
        } catch (e) {
            console.log(e, 'error')
        }

    }

    useEffect(() => {
        getList()
    }, [])







    return (
        <>

            <div>
                <div style={{ background: "#198754" }}>
                    <div className="container text-white">
                        <div className='textSize py-2 d-md-flex  justify-content-center' style={{alignItems:"center"}}>

                            <span className='cursor_p mr_20 '> <Link to="/documents" style={{ color: "white", textDecoration: "none" }}>Document Formats</Link> </span>


                            <span className='mr_20'>|</span>

                            <span className='cursor_p mr_20'> Franchise </span>
                            <span className='mr_20'>|</span>

                            <span className='cursor_p mr_20'> Knowledge Hub</span>

                            <span className='mr_20'>|</span>

                            <span style={{ display: "flex", alignItems: "center" }} className='cursor_p mr_20'><IoCallOutline /><FaWhatsapp /><span style={{display:'flex' , flexDirection:"column"}}><span>+91-8077425868</span><span>+91-9716970019</span></span></span>

                            <span className='mr_20'>|</span>

                            <span className='cursor_p mr_20'>Call Back</span>
                            <span className='mr_20'>|</span>
                            {
                                login ?

                                    <Link to='/Profile' style={{ color: "white", textDecoration: "none" }}>
                                        <span className='cursor_p mr_20'>Profile</span>

                                    </Link>
                                    :
                                    <>


                                        <Link onClick={() => { setActiveData('login'); setModalActive(true) }} className='text-black' > <span className='cursor_p mr_20'><button type="button" class="btn btn-warning btn-sm" style={{ width: '82px' }}>Log-in</button></span></Link>


                                        <Link onClick={() => { setActiveData('create'); setModalActive(true) }} className='text-black' > <span className='cursor_p mr_20'><button type="button" class="btn btn-warning btn-sm" style={{ width: '82px' }}>Sign-Up</button></span></Link>

                                    </>

                            }


                        </div>
                    </div>
                </div>
                <div className='bg-light'>
                    <div className='container'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                            <div className="container-fluid textSize">
                                <a className="navbar-brand" href="/" style={{ width: "70px" }}><img src={logo1} className='img-fluid' /></a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "Start Business" && "header_active"} `} onClick={() => { setActive("Start Business") }}><b>Start Business</b></a>

                                            {startBusiness?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        startBusiness?.map((mainData, index) => {

                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        {/* console.log(data , mainData.name) */ }

                                                                                        return (
                                                                                            <>{
                                                                                                mainData.name === data.subCategoryName &&

                                                                                                <div className="dropdownList">{mainData.name}</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }
                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "Licence | Registration" && "header_active"} `} onClick={() => { setActive("Licence | Registration") }}><b>Licence | Registration</b></a>
                                            {license?.length !== 0
                                                &&

                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        license?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>
                                                                                                {
                                                                                                    mainData.name === data.subCategoryName ?

                                                                                                        <div className="dropdownList">{mainData.name}</div>
                                                                                                        :
                                                                                                        ""
                                                                                                }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }
                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "IPR" && "header_active"} `} onClick={() => { setActive("IPR") }}><b>IPR</b></a>


                                            {ipr?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        ipr?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>           {
                                                                                                mainData.name === data.subCategoryName ?

                                                                                                    <div className="dropdownList">{mainData.name}</div>
                                                                                                    :
                                                                                                    <div className='text-center'>No data</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }

                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }

                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "Taxation" && "header_active"} `} onClick={() => { setActive("Taxation") }}><b>Taxation</b></a>

                                            {taxation?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        taxation?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>           {
                                                                                                mainData.name === data.subCategoryName ?

                                                                                                    <div className="dropdownList">{mainData.name}</div>
                                                                                                    :
                                                                                                    <div className='text-center'>No data</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }
                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "ISO | ISI" && "header_active"} `} onClick={() => { setActive("ISO | ISI") }}><b>ISO | ISI</b></a>

                                            {iso?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        iso?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>           {
                                                                                                mainData.name === data.subCategoryName ?

                                                                                                    <div className="dropdownList">{mainData.name}</div>
                                                                                                    :
                                                                                                    <div className='text-center'>No data</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }
                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "Compliance" && "header_active"} `} onClick={() => { setActive("Compliance") }}><b>Compliance</b></a>

                                            {compliance?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        compliance?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>           {
                                                                                                mainData.name === data.subCategoryName ?

                                                                                                    <div className="dropdownList">{mainData.name}</div>
                                                                                                    :
                                                                                                    <div className='text-center'>No data</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }
                                        </li>
                                        <li className="nav-item ps-4 pe-3 dropdown">
                                            <a className={`nav-link  ${active === "Other Services" && "header_active"} `} onClick={() => { setActive("Other Services") }}><b>Other Services</b></a>
                                            {compliance?.length !== 0
                                                &&
                                                <div class="dropdown-content" style={{ padding: "10px" }} >
                                                    {
                                                        other?.map((mainData, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        mainData.innerCategories.length !== 0 ?
                                                                            <>
                                                                                {
                                                                                    serviceList?.map((data, index) => {
                                                                                        return (
                                                                                            <>           {
                                                                                                mainData.name === data.subCategoryName ?

                                                                                                    <div className="dropdownList">{mainData.name}</div>
                                                                                                    :
                                                                                                    <div className='text-center'>No data</div>
                                                                                            }
                                                                                                {
                                                                                                    data.subCategoryName === mainData.name &&

                                                                                                    <Link to="/servicePage" state={data._id}

                                                                                                    >{data.innerCategoryName}</Link>
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </>
                                                                            : <>
                                                                                NO Data
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            }

                                        </li>





                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>





            {modalActive && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                        <section className="vh-100 container_body">
                            <div className="container py-5 h-100">
                                <div className="row px-3 d-flex align-items-center justify-content-center h-100 login">
                                    <div className="col-md-10 col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                                        <div className="img-left d-none d-md-flex"></div>

                                        <div className="card-body">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            {
                                                activeData === "login" &&
                                                <>

                                                    <h2 class="title text-center mt-4 modal_heading" >
                                                        Login  account
                                                    </h2>
                                                    <div class="form-box px-3">
                                                        <div class="form-input">
                                                            <span><i class="bi bi-envelope-fill"></i></span>
                                                            <input type="email" placeholder="Email Address" tabindex="10" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa fa-key"></i></span>
                                                            <input type="password" name="" placeholder="Password" required value={password} onChange={(e) => { setPasswod(e.target.value) }} />
                                                        </div>

                                                        <div class="mb-3">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="cb1" name="" />
                                                                <label class="custom-control-label" for="cb1">Remember me</label>
                                                            </div>
                                                        </div>

                                                        <div class="mb-3">
                                                            <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { Login() }}>
                                                                Login
                                                            </button>
                                                        </div>

                                                        <div class="text-right">
                                                            <a class="forget-link" onClick={() => {
                                                                setEmail()
                                                                setPasswod()
                                                                setCreatePassword()
                                                                setCreateConPassword()
                                                                setActiveData('forgot')
                                                            }} style={{ cursor: "pointer" }}>
                                                                Forget Password?
                                                            </a>
                                                        </div>

                                                        <div class="text-center ">
                                                            <h4 class="title text-center mb-2" style={{ color: 'rgb(25, 135, 84)' }}>
                                                                OR
                                                            </h4>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <div class="col-12 text-center">
                                                                <a onClick={() => { setCreateNumber(); setActiveData('OTP') }} class="w-auto btn btn-block btn-social btn-facebook modal_button_bg">
                                                                    login with Mobile Otp
                                                                </a>
                                                            </div>


                                                        </div>

                                                        <hr class="my-4" />

                                                        <div class="text-center mb-2">
                                                            Don't have an account?
                                                            <a class="register-link" onClick={() => { setActiveData('create') }} style={{ cursor: "pointer" }} >
                                                                Register here
                                                            </a>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {
                                                activeData === "create" &&
                                                <>

                                                    <h2 class="title text-center mt-4 modal_heading" >
                                                        Create Account
                                                    </h2>
                                                    <div class="form-box px-3">
                                                        <div class="form-input">
                                                            <span><i class="fa-solid fa-user"></i></span>
                                                            <input type="text" placeholder="Name" tabindex="10" required value={createName} onChange={(e) => { setCreateName(e.target.value) }} />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="bi bi-envelope-fill"></i></span>
                                                            <input type="email" placeholder="Email Address" tabindex="10" required value={createEmail} onChange={(e) => { setCreateEmail(e.target.value) }} />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa-solid fa-phone-volume"></i></span>
                                                            <input type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" tabindex="10" required
                                                                value={createNumber} onChange={(e) => {
                                                                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                                    setCreateNumber(onlyNumbers);
                                                                }}

                                                            />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa fa-key"></i></span>
                                                            <input type="password" name="" placeholder="Password" required value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }} />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa-regular fa-circle-check"></i></span>
                                                            <input type="password" name="" placeholder="Confirm Password" required value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }} />
                                                        </div>



                                                        <div class="mb-3">
                                                            <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { CreateAccount() }}>
                                                                Submit
                                                            </button>
                                                        </div>

                                                    </div>
                                                </>
                                            }
                                            {
                                                activeData === "forgot" &&
                                                <>

                                                    <h2 class="title text-center mt-4 modal_heading" >
                                                        Forgot Password
                                                    </h2>
                                                    <div class="form-box px-3">
                                                        <div class="form-input">
                                                            <span><i class="fa-regular fa-envelope"></i></span>
                                                            <input type="text" placeholder="Email Address" tabindex="10" required value={email}
                                                                onChange={(e) => { setEmail(e.target.value) }}
                                                            />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa fa-key"></i></span>
                                                            <input type="password" name="" placeholder=" New Password" required value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }} />
                                                        </div>
                                                        <div class="form-input">
                                                            <span><i class="fa-regular fa-circle-check"></i></span>
                                                            <input type="password" name="" placeholder="Confirm Password" required value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }} />
                                                        </div>



                                                        <div class="mb-3">
                                                            <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { ForgotPassword() }}>
                                                                Submit
                                                            </button>
                                                        </div>


                                                    </div>
                                                </>
                                            }
                                            {
                                                activeData === "OTP" &&
                                                <>

                                                    <h2 class="title text-center mt-4 modal_heading" >
                                                        Login With Otp
                                                    </h2>
                                                    <div class="form-box px-3">
                                                        <div class="form-input">
                                                            <span><i class="fa-solid fa-phone-volume"></i></span>
                                                            <input type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" required value={createNumber} onChange={(e) => {
                                                                const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                                setCreateNumber(onlyNumbers);
                                                            }} />
                                                        </div>




                                                        <div class="mb-3">
                                                            <button type="submit" class="btn btn-block text-uppercase modal_button_bg" >
                                                                Send otp
                                                            </button>
                                                        </div>


                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </>
            )}
        </>






    )
}

export default Header
