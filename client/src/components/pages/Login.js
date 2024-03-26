import { useEffect, useState } from 'react'
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {

    const [active, setActive] = useState('login')
    const [email, setEmail] = useState()
    const [password, setPasswod] = useState()
    const [createName, setCreateName] = useState()
    const [createEmail, setCreateEmail] = useState()
    const [createPassword, setCreatePassword] = useState()
    const [createNumber, setCreateNumber] = useState()
    const [createConPassword, setCreateConPassword] = useState()
    const location = useLocation();
    const stateId = location.state;
    useEffect(() => {
        setActive(stateId)
    }, [stateId])
    console.log(stateId, 'state')

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
                        setActive('login')

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
    const navigate = useNavigate();

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
                if (response.status === 200) {
                    console.log(data)
                    localStorage.setItem("email", data.email);
                    localStorage.setItem('name', data.name);
                    setCreateConPassword()
                    setEmail()
                    setPasswod()
                    setCreateEmail()
                    setCreateName()
                    setCreatePassword()
                    toast.success("Create Account Sucesfully!")
                    navigate("/");

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
                        setActive('login')

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

    return (
        <>
            <section class="vh-100 container_body">

                <div class="container py-5 h-100">
                    <div class="row px-3 d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-10 col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                            <div class="img-left d-none d-md-flex"></div>

                            <div class="card-body">
                                {
                                    active === "login" &&
                                    <>

                                        <h2 class="title text-center mt-4" style={{ color: 'rgb(25, 135, 84)' }}>
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
                                                <button type="submit" class="btn btn-block text-uppercase" onClick={() => { Login() }}>
                                                    Login
                                                </button>
                                            </div>

                                            <div class="text-right">
                                                <a class="forget-link" onClick={() => {
                                                    setEmail()
                                                    setPasswod()
                                                    setCreatePassword()
                                                    setCreateConPassword()
                                                    setActive('forgot')
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
                                                    <a onClick={() => { setCreateNumber(); setActive('OTP') }} class="w-auto btn btn-block btn-social btn-facebook">
                                                        login with Mobile Otp
                                                    </a>
                                                </div>


                                            </div>

                                            <hr class="my-4" />

                                            <div class="text-center mb-2">
                                                Don't have an account?
                                                <a class="register-link" onClick={() => { setActive('create') }} style={{ cursor: "pointer" }} >
                                                    Register here
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    active === "create" &&
                                    <>

                                        <h2 class="title text-center mt-4" style={{ color: 'rgb(25, 135, 84)' }}>
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
                                                <button type="submit" class="btn btn-block text-uppercase" onClick={() => { CreateAccount() }}>
                                                    Submit
                                                </button>
                                            </div>

                                        </div>
                                    </>
                                }
                                {
                                    active === "forgot" &&
                                    <>

                                        <h2 class="title text-center mt-4" style={{ color: 'rgb(25, 135, 84)' }}>
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
                                                <button type="submit" class="btn btn-block text-uppercase" onClick={() => { ForgotPassword() }}>
                                                    Submit
                                                </button>
                                            </div>


                                        </div>
                                    </>
                                }
                                {
                                    active === "OTP" &&
                                    <>

                                        <h2 class="title text-center mt-4" style={{ color: 'rgb(25, 135, 84)' }}>
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
                                                <button type="submit" class="btn btn-block text-uppercase" >
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




                {/* <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="img-fluid" alt="Phone image" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            {
                                active === "login" &&

                                <div>
                                    <div class="form-outline mb-4">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={email} onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">Email address</label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="password" id="form1Example23" class="form-control form-control-lg"
                                            value={password} onChange={(e) => { setPasswod(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example23">Password</label>
                                    </div>
                                    <div class="d-flex align-items-center mb-4" style={{ justifyContent: 'space-between' }}>
                                        <div class="form-check">
                                        </div>
                                        <a style={{ color: "black", cursor: "pointer" }} onClick={() => {
                                            setEmail()
                                            setCreatePassword()
                                            setCreateConPassword()
                                            setActive('forgot')
                                        }}>Forgot password?</a>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "rgb(25, 135, 84)", border: "none" }} onClick={() => { Login() }}>Sign in</button>

                                    <div class="divider d-flex align-items-center justify-content-center my-4">
                                        <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                    </div>

                                    <a class="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "rgb(254, 180, 68)", color: "white", border: "none" }} onClick={() => { setActive('create') }}
                                        role="button">
                                        <i class="fab fa-facebook-f me-2"></i>Create New Account
                                    </a>

                                </div>
                            }
                            {
                                active === "create" &&

                                <div>
                                    <h1 className='text-center mb-4' style={{ color: 'rgb(25, 135, 84)' }}> Create Account</h1>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg" value={createName}
                                            onChange={(e) => { setCreateName(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">Name</label>
                                    </div>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={createEmail} onChange={(e) => { setCreateEmail(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">Email address</label>
                                    </div>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }}

                                        />
                                        <label class="form-label" for="form1Example13">Password</label>
                                    </div>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">Confirm Password</label>
                                    </div>


                                    <button type="submit" class="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "rgb(25, 135, 84)", border: "none" }} onClick={() => { CreateAccount() }}>Submit</button>



                                </div>
                            }
                            {
                                active === "forgot" &&

                                <div>
                                    <h1 className='text-center mb-3' style={{ color: 'rgb(25, 135, 84)' }}> Forgot Password</h1>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg" value={createName}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">Email address</label>
                                    </div>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={createPassword} onChange={(e) => { setCreatePassword(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">New Password</label>
                                    </div>
                                    <div class="form-outline mb-2">
                                        <input type="email" id="form1Example13" class="form-control form-control-lg"
                                            value={createConPassword} onChange={(e) => { setCreateConPassword(e.target.value) }}
                                        />
                                        <label class="form-label" for="form1Example13">New Confirm Password</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg btn-block w-100" style={{ backgroundColor: "rgb(25, 135, 84)", border: "none" }} onClick={() => { ForgotPassword() }} >Submit</button>



                                </div>
                            }
                        </div>
                    </div>
                </div> */}
            </section>


            <ToastContainer />
        </>
    )
}

export default Login