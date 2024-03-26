import ContactUs from "./ContactUs"
import Footer from "./Footer"
import Header from "./Header"
import Review from "./Review"
import WhyVyapar from "./WhyVyapar"
import coi from "../images/coi.png"
import tan from "../images/tan_company.png"
import check from "../images/check.png"
import AoA from "../images/AoA.png"
import step1 from "../images/step1.png";
import step2 from "../images/step2.png";
import step3 from "../images/step3.png";
import oneDirector from "../images/oneDirector.png";
import twoDirector from "../images/2director.png";
import uniqueBusinessName from "../images/uniqueBusinessName.png";
import registeredAddress from "../images/officeAddress.png"
import arrow from "../images/arrow.png"
import map from "../images/Section_8_company_statewise_fee_Section_8_company_statewise_fee.png"
import dsc from "../images/digital_signature_dsc-03.svg.tmp"
import MoA from "../images/moa.png"
import MasterData from "../images/Master-data.png"
import Din from "../images/DIN_Allotment.png"
import panCard from "../images/pan-card.png"
import { LuCheckCircle } from "react-icons/lu";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill, PiNumberCircleFiveFill } from "react-icons/pi";
import flower from "../images/flower.jpg"
import PU from "../images/PU-separator.svg"
import FastPro from "../images/Fast_Process.png"
import benefitPvtLtd from "../images/benefitPvtLtd1.png"
import documentRequired from "../images/document-required.png"
import { useEffect, useState } from "react"
import '../styles/servicePage.css'
import Section2 from "./servicePage/Section2"
import { useLocation } from "react-router-dom"
import DocumentData from "./servicePage/DocumentData"
import MultiImage from "./servicePage/MultiImage"
import TestiMonials from "./TestiMonials"
import { toast } from "react-toastify"
import uploadFile from "../upload/uploadFile"




const ServicePage = () => {
    const [activeSection1, setActiveSection1] = useState('Apply for Dsc'); // State to track active section
    const [activeSection2, setActiveSection2] = useState('Incorporation Certificate')
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveUpload, setModalActiveUpload] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [userData, setUserData] = useState();
    const [requiredData, setRequiredData] = useState([{ name: 'test' }, { name: 'test2' }, { name: 'test3' }, { name: 'test4' }]);
    const [allDoument, setAllDocumnet] = useState(0);
    const [file, setFile] = useState()
    const [disble, setDisble] = useState(false)
    const [selectDocument, setSelectDocument] = useState()
    const [documentList, setDocumentList] = useState();



    const handleSectionClick1 = (section) => {
        setActiveSection1(section);
    };
    const handleSectionClick2 = (section2) => {
        setActiveSection2(section2);
    };

    const [selectServicedata, setSelectServiceData] = useState()

    const location = useLocation();
    const stateId = location.state;

    function getVideoId(url) {
        // Regular expression to match YouTube URL patterns
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        // Try to extract video ID from the URL using regular expression
        const match = url.match(regExp);

        // If a match is found, return the video ID
        if (match && match[1]) {
            return match[1];
        } else {
            // If no match is found, return null or handle the error accordingly
            return null;
        }
    }



    const getById = async (id) => {
        try {
            let url = `${process.env.REACT_APP_PORT}/admin/service/getbyid`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataId: id })
            });
            const data = await response.json();
            if (response.status === 200) {
                setSelectServiceData(data)
                setRequiredData(data?.stepFiveData[0]?.documentsData)
            }


        } catch (e) {
            // toast.error(`! ${e}`)
            console.log(e, 'error')
        }

    }

    useEffect(() => {
        getById(stateId)
    }, [stateId])

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };
    const openUploadModal = () => {
        setModalActiveUpload(true)
    };

    const closeUploadModal = () => {
        setModalActiveUpload(false);
    };

    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/documentlist/list`);
            const data = await response.json();
            if (response.status === 200) {
                setDocumentList(data)
            }
            // console.log('Data received:', data);

        } catch (e) {
            console.log(e, 'error')
        }

    }

    const PayNow = () => {
        if (localStorage.getItem('email')) {

            setSidebar(true)

        } else {
            openModal()
        }
    }

    const getData = async (id) => {
        let url = `${process.env.REACT_APP_PORT}/admin/getuser`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id })
            });
            const data = await response.json();
            if (response.status === 200) {
                setUserData(data?.user?.documents)

            } else {
            }
        } catch (e) {
            toast.error(e)
        }
    }

    useEffect(() => {
        getData(localStorage.getItem('id'))
        getList()
    }, [])

    const callBack = () => {
        setDisble(false)
    }

    const AddDocument = async () => {
        let url = `${process.env.REACT_APP_PORT}/admin/addDocuments`

        if (file && selectDocument !== "0") {
            setDisble(true)
            const fileName = file.name + Date.now();
            await uploadFile(fileName, file, callBack)

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: fileName, name: selectDocument, id: localStorage.getItem('id') })
                });
                const data = await response.json();
                if (response.status === 200) {
                    setUserData(data?.user?.documents)
                    toast.success("Save Data Sucesfully!")
                    closeUploadModal()

                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                toast.error(e)

                console.log(e, 'error')
            }

        }
    }


    var allDocumentStatus;
    return (
        <>
            <Header closeModal={closeModal} modalActive={modalActive} setModalActive={setModalActive} />
            {
                selectServicedata &&

                <div>
                    <div className='container-fluid' style={{ background: `url(${process.env.REACT_APP_BUCKET_URL}/${selectServicedata && selectServicedata.images})`, backgroundSize: "cover" }}>
                        <div className='container'>
                            <div className='row py-5'>
                                <div className='col-sm-12 mt-2 d-flex ' style={{ flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                                    <h1 className='text-white'><b>{selectServicedata?.heading}</b></h1>
                                    {
                                        selectServicedata?.details &&
                                        <h3 className='fs-4 mt-3' style={{ color: "#00d332" }}><b> {selectServicedata?.details}</b></h3>
                                    }
                                    <div>
                                        <h4 className='fs-4 text-white mt-3'><b><span style={{ color: "#00d332" }}><LuCheckCircle /></span> No Hidden Charges</b></h4>
                                        <h4 className='fs-4 text-white'><b> <span style={{ color: "#00d332" }}><LuCheckCircle /></span> Lowest Price Guarantee</b></h4>
                                        <h4 className='fs-4 text-white'><b><span style={{ color: "#00d332" }}><LuCheckCircle /></span> Quick and Hassle-Free Process</b></h4>
                                        <h4 className='fs-4 text-white'><b><span style={{ color: "#00d332" }}><LuCheckCircle /></span> Fres Expert Assistance</b></h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='container' >
                        {
                            selectServicedata?.stepTwoData?.map((data, index) => {
                                return (
                                    <>
                                        <Section2 data={data} />

                                    </>
                                )

                            })

                        }
                        {
                            selectServicedata?.stepThreeData?.map((data, index) => {
                                return (
                                    <>


                                        <div className='row mt-3'>
                                            {
                                                data?.image ?
                                                    <>
                                                        <h1 className='text-center heading_main  mt-4'>{data.heading}</h1>


                                                        <div className='col-sm-5  pt-4 text-center'>
                                                            <img src={`${process.env.REACT_APP_BUCKET_URL}/${data.image}`} alt="condition" height="auto" width='100%' />
                                                        </div>
                                                        {
                                                            data?.questions?.length > 0 &&
                                                            <div className='col-sm-7 pt-5'>
                                                                {

                                                                    data.questions.map((question, index) => {
                                                                        return (
                                                                            <>
                                                                                <h3 style={{ color: 'rgb(254, 180, 68)' }}>{index + 1}. <span>{question.question}</span></h3>
                                                                                {/* <p>{question.description}</p> */}
                                                                                <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' }}>
                                                                                    {question.description}
                                                                                </pre>

                                                                            </>
                                                                        )

                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                    </>
                                                    :

                                                    <>
                                                        {
                                                            data?.questions[0]?.question &&
                                                            <>
                                                                <h1 className='text-center heading_main  mt-4'>{data.heading}</h1>

                                                                <div className='col-12 pt-4'>
                                                                    {

                                                                        data.questions.map((question, index) => {
                                                                            return (
                                                                                <>
                                                                                    <h3 style={{ color: 'rgb(254, 180, 68)' }}>{index + 1}. <span>{question.question}</span></h3>
                                                                                    <p>{question.description}</p>

                                                                                </>
                                                                            )

                                                                        })
                                                                    }
                                                                </div>
                                                            </>


                                                        }


                                                    </>

                                            }


                                        </div>
                                    </>
                                )

                            })
                        }
                        {
                            selectServicedata?.requirements?.map((data, index) => {
                                return (
                                    <>
                                        <div className="row">
                                            <h1 className="text-center heading_main  mt-4">{data?.heading}</h1>
                                            {
                                                data?.details[0]?.name &&

                                                <div className="row mt-2" >
                                                    <div className=" px-5 py-2 mx-auto" style={{ width: 'auto' }}>
                                                        {
                                                            data?.details?.map((SubData, index) => {
                                                                const className = index % 2 === 0 ? 'bg_color' : 'bg_orange';
                                                                return (
                                                                    <>
                                                                        {
                                                                            SubData.name &&

                                                                            <div key={index} className={`card py-3 px-5 ${className} mb-3`}>
                                                                                <label className='text_workflow'><span className={`ps-3 ${className} `}>{SubData.name}</span></label>
                                                                            </div>
                                                                        }

                                                                    </>
                                                                )
                                                            })
                                                        }



                                                    </div>


                                                </div>
                                            }

                                        </div>

                                    </>
                                )
                            })
                        }

                        {
                            selectServicedata?.stepFourData?.map((data, index) => {
                                return (
                                    <>
                                        <MultiImage data={data} />


                                    </>
                                )
                            })
                        }

                    </div>

                    {
                        selectServicedata?.stepFiveData?.map((data, index) => {

                            return (
                                <>
                                    {
                                        data.heading &&
                                        <DocumentData data={data} />
                                    }
                                </>
                            )
                        })

                    }
                    {
                        selectServicedata?.process?.map((data, index) => {
                            return (
                                <>

                                    <div className="container">

                                        <div className='row mt-3'>
                                            {
                                                data?.heading && data?.processData?.length > 0 && data?.processData[0]?.stepName &&
                                                <>
                                                    <h1 className='text-center heading_main  mt-4'>{data.heading}</h1>
                                                    {
                                                        data?.processData?.length > 1 && data?.processData[0]?.description &&
                                                        <div className='col-12 pt-5'>
                                                            {

                                                                data?.processData.map((question, index) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                question.stepName && question.description &&
                                                                                <>
                                                                                    <h3 style={{ color: 'rgb(254, 180, 68)' }}>{index + 1}. <span>{question.stepName}</span></h3>
                                                                                    <p>{question.description}</p>

                                                                                </>
                                                                            }

                                                                        </>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </>


                                            }


                                        </div>
                                    </div>
                                </>
                            )

                        })
                    }

                    {
                        selectServicedata?.incorporation?.map((data, index) => {
                            return (
                                <>
                                    <div className="container">

                                        <div className="row">
                                            <h1 className="text-center heading_main  mt-4">{data?.heading}</h1>
                                            {
                                                data?.details?.[0]?.name &&

                                                <div className="row mt-2" >
                                                    <div className=" px-5 py-2 mx-auto" style={{ width: 'auto' }}>
                                                        {
                                                            data?.details?.map((SubData, index) => {
                                                                const className = index % 2 === 0 ? 'text_green' : 'text_orange';
                                                                return (
                                                                    <>
                                                                        <div key={index} className={`card py-3 px-5 ${className} mb-3`}>
                                                                            <label className='text_workflow'><span className={`ps-3 ${className} `}>{index + 1}. {SubData.name}</span></label>
                                                                        </div>

                                                                    </>
                                                                )
                                                            })
                                                        }



                                                    </div>


                                                </div>
                                            }

                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }

                    {
                        selectServicedata?.youtubeLink.length > 0 &&
                        <div className="container">
                            <div className="text-center row">
                                {selectServicedata?.youtubeLink?.map((link) => {
                                    return (
                                        <div key={link._id}>
                                            {link.heading && <h1 className='d-flex justify-content-center heading_main mt-4'>{link.heading}</h1>}
                                            {link.link && (
                                                <div style={{ padding: "20px" }}>
                                                    <iframe
                                                        title="YouTube video player"
                                                        width="100%"
                                                        height="450"
                                                        src={`https://www.youtube.com/embed/${getVideoId(link.link)}`}
                                                        allowFullScreen
                                                        style={{ borderRadius: "20px" }}
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    }
                    {
                        selectServicedata?.faqData?.length > 0 && selectServicedata?.faqData[0].question &&
                        <div className="container">
                            <h1 className='text-center heading_main  mt-4 mb-5'>Frequently Asked Questions (FAQs)</h1>
                            <div class="accordion" id="accordionExample">
                                {selectServicedata?.faqData && selectServicedata?.faqData.map((item, index) => {
                                    const collapseId = `collapse-${index}`;
                                    const headingId = `heading-${index}`;
                                    return (
                                        <div class="accordion-item" key={index}>
                                            <h2 class="accordion-header" id={headingId}>
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                                                    <span style={{ fontSize: "18px", fontWeight: "500" }}>{item.question}</span>
                                                </button>
                                            </h2>
                                            <div id={collapseId} class="accordion-collapse collapse" aria-labelledby={headingId} data-bs-parent="#accordionExample">
                                                <div class="accordion-body">{item.answer}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {/* {
                         selectServicedata?.stepSixData[0].amount && selectServicedata?.stepSixData[0].package &&
                        <div className="container">
                            <h1 className=' d-flex  justify-content-center heading_main  mt-4'>Explore Our Company Incorporation Packages</h1>
                            <div className="d-flex row mt-3" style={{ justifyContent: 'space-around' }}>

                                {
                                    selectServicedata?.stepSixData?.map((data, index) => {
                                        let dataArray = data.description.split(',');
                                        const trimmedArray = dataArray.map(item => item.trim());
                                        return (
                                            <>
                                                <div className="col-lg-4 col-sm-6 p-4">

                                                    <div class="card " style={{ borderRadius: "15px" }} >
                                                        <div className="card-body text-center bg_orange text-white text_workflow" style={{ borderTopRightRadius: "15px", borderTopLeftRadius: "15px" }}>
                                                            <div>{data.package}</div>
                                                            <div>₹ {data.amount}</div>

                                                        </div>
                                                        <div class="card-body">
                                                            <ul>
                                                                {
                                                                    trimmedArray?.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <li class="card-text">{item}</li>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            <div className="text-center">

                                                                <button className="btn px-5 text-white  " style={{ background: "#198754" }} ><b>Pay Now</b></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    } */}
                    {
                        selectServicedata?.stepSixData?.length > 0 && selectServicedata?.stepSixData[0].package &&
                        <>
                            <div className="container">
                                <h1 className=' d-flex  justify-content-center heading_main  mt-4'>Explore Our Company Incorporation Packages</h1>
                                <div className="d-flex row mt-3" style={{ justifyContent: 'space-around' }}>

                                    {
                                        selectServicedata?.stepSixData?.map((data, index) => {
                                            let dataArray = data.description.split(',');
                                            const trimmedArray = dataArray.map(item => item.trim());
                                            return (
                                                <>
                                                    {
                                                        data?.package && data?.amount ?

                                                            <div className="col-lg-4 col-sm-6 p-4" style={{ display: "flex", alignItems: 'stretch' }}>

                                                                <div class="card " style={{ borderRadius: "15px" }} >
                                                                    <div className="card-body text-center bg_orange text-white text_workflow" style={{ borderTopRightRadius: "15px", borderTopLeftRadius: "15px" }}>
                                                                        <div>{data.package}</div>
                                                                        <div>₹ {data.amount}</div>

                                                                    </div>
                                                                    <div class="card-body">
                                                                        <ul>
                                                                            {
                                                                                trimmedArray?.map((item) => {
                                                                                    return (
                                                                                        <>
                                                                                            <li class="card-text">{item}</li>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                        <div className="text-center">

                                                                            <button className="btn px-5 text-white  " style={{ background: "#198754" }} onClick={() => { PayNow() }}><b>Pay Now</b></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            ""
                                                    }

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            }








            {/* 





                    {/* <div className='container-fluid bg-light'>
                        <div className='container py-3'>
                            <h2 className='text-center mb-5 heading_main  mt-4'>Pvt Ltd(Private Limited) Company Registration Processbin Delhi</h2>
                            <div className='row'>
                                <div className='col-sm-5 pb-5'>
                                    <div className='' onClick={() => handleSectionClick1('Apply for Dsc')}>
                                        <p className='border px-2 pvtleft pb-1'><span style={{ color: "#00d332", fontSize: "25px" }}><PiNumberCircleOneFill /></span><span className='px-2'>Apply For Dsc </span><img src={arrow} alt="arrow" className='float-end mt-2' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick1('Unique Name reservation')}>
                                        <p className='border px-2 pvtleft pb-1'> <span style={{ color: "#00d332", fontSize: "25px" }}><PiNumberCircleTwoFill /></span><span className='px-2'>Unique Name reservation</span><img src={arrow} alt="arrow" className='float-end mt-2' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick1('Filling of SPICe Form (INR-32)')}>
                                        <p className='border px-2 pvtleft pb-1'><span style={{ color: "#00d332", fontSize: "25px" }}><PiNumberCircleThreeFill /></span><span className='px-2'>Filling of SPICe Form (INR-32)</span><img src={arrow} alt="arrow" className='float-end mt-2' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick1('Filling of MoA and Aoa')}>
                                        <p className='border px-2 pvtleft pb-1'><span style={{ color: "#00d332", fontSize: "25px" }}><PiNumberCircleFourFill /></span><span className='px-2'>Filling of MoA and Aoa</span><img src={arrow} alt="arrow" className='float-end mt-2' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick1('Issuance of Certificate of Incorporation')}>
                                        <p className='border px-2 pvtleft pb-1'><span style={{ color: "#00d332", fontSize: "25px" }}><PiNumberCircleFiveFill /></span><span className='px-2'>Issuance of Certificate of Incorporation</span><img src={arrow} alt="arrow" className='float-end mt-2' /></p>
                                    </div>
                                </div>
                                <div className='col-sm-7'>
                                    {activeSection1 === 'Apply for Dsc' && (
                                        <div>
                                            <h4>Step 1: Apply for Digital Signature Certificate</h4>
                                            <p>As part of the company incorporation process, it is important to obtain a Digital Signature
                                                Certificate from the government for the online company registration Process. A DSC or a
                                                Digital Signature Certificate works as proof of identity of the director of the company and
                                                it is required to sign digital forms while registering for the company incorporation online.</p>
                                        </div>
                                    )}
                                    {
                                        activeSection1 === 'Unique Name reservation' && (
                                            <div>
                                                <h4>Step 2: Reserve a unique Business Name</h4>
                                                <p>The next step after getting DSC is to reserve a Unique name for your business and make
                                                    sure that the business name cannot be identical or same as any other registered business
                                                    as per the details mentioned in Rule 8 of the company Incorporation Rules.
                                                    You can use our Name Search tool to check for the availability of the unique name for your
                                                    private limited company.</p>
                                            </div>
                                        )
                                    }
                                    {
                                        activeSection1 === 'Filling of SPICe Form (INR-32)' && (
                                            <div>
                                                <h4>  Step 3: Filling of SPICe Form (INC-32)</h4>
                                                <p>After the name approval, the details of the company registration have to be drafted in the
                                                    SPICe+ form on the MCA portal. It is a detailed Proforma for registering a private limited
                                                    company online in Delhi. You are required to fill in all the details mentioned below. </p>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span>Fill in the Details of the company.</div>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span> Details of its Members and Subscribers.</div>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span>Apply for Director Identification Number(DIN)</div>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span> Apply for PAN and TAN</div>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span>Declaration by Directors and Subscribers</div>
                                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'></span>Declaration & Certification by professiona</div>

                                            </div>
                                        )
                                    }
                                    {
                                        activeSection1 === 'Filling of MoA and Aoa' && (
                                            <div>
                                                <h4>Step 4: Filing of MoA and AoA</h4>
                                                <p>
                                                    SPICe e-MoA (INC-33) and e-AoA (INC-34) are the forms which have to be drafted while
                                                    applying for online company registration in Delhi. MoA is defined under section 2(56)
                                                    which tells about the objectives and goals of the company and AoA is defined under
                                                    section 2(5) of the Companies Act, 2013, which defines the internal working and
                                                    management structure of the company.
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        activeSection1 === 'Issuance of Certificate of Incorporation' && (
                                            <div>
                                                <h4>Step 5: Issuance of PAN, TAN and Certificate of Incorporation</h4>
                                                <p>
                                                    Post approval of the aforementioned documents from the Ministry of Corporate Affairs,
                                                    the department will issue documents such as PAN, TAN, Certificate of Incorporation, etc.
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='text-center'>
                                <img src={PU} alt='pu-separator' className='img-fluid' />
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row mb-5'>
                            <h2 className='text-center heading_main  mt-4'>Register your Private Limited Company Online with Professional Utilities</h2>
                            <p>The process of registering your company as a Private Limited
                                Company is complicated and involves various compliances. Our
                                experts at Professional Utilities can simplify the whole
                                registration process for you. Register your company online in 3
                                easy steps: </p>
                            <div className='col-lg-4'>
                                <div className='text-center'>
                                    <img src={step1} />
                                    <p className='mt-3'><b>Step 1:</b></p>
                                    <p> Get in touch via <a href='#'>call</a> or <a href='#'>contact form</a></p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='text-center'>
                                    <img src={step2} />
                                    <p className='mt-3'><b>Step 2:</b></p>
                                    <p>Provide necessary documents</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='text-center'>
                                    <img src={step3} />
                                    <p className='mt-3'><b>Step 3:</b></p>
                                    <p>Get your incorporation registered in 10 -15 working days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row mt-5'>
                            <h2 className='text-center mb-4 heading_main  mt-4'>  Documents Required for registration of Private Limited Company</h2>
                            <div className='col-sm-7'>
                                <p>
                                    In order to register your private limited company in India, you need to provide proper
                                    identity and address proof. These documents are required for directors and shareholders
                                    of the company which will be submitted to the Ministry of Corporate Affairs (MCA) portal.
                                </p>
                                <h4> Identity and Address Proof of Directors & Shareholders</h4>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Passport size photographs of the directors</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of Aadhar Card</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of Driving License or Voter ID</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of PAN Card</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of bank statement or utility bill (not older than two months)</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of Passport (in case of foreign national or NRI)</span></div>
                                <h4>  Address Proof of Registered Office</h4>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Copy of electricity or any other utility bill (not older than two months)</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>Rent agreement (if rented)</span></div>
                                <div className='ps-5 textSize'><span style={{ color: "#003c6c", fontSize: "20px" }}><FaArrowAltCircleRight /></span><span className='ps-2'>No Objection Certificate (NOC) from the owner of the property</span></div>
                            </div>
                            <div className='col-sm-5'>
                                <div>
                                    <img src={documentRequired} />
                                </div>
                            </div>
                        </div>
                    </div> */}










            {/* <p>
                Documents Required for registration of Private Limited Company
                In order to register your private limited company in India, you need to provide proper
                identity and address proof. These documents are required for directors and shareholders
                of the company which will be submitted to the Ministry of Corporate Affairs (MCA) portal.
                Identity and Address Proof of Directors & Shareholders
                Passport size photographs of the directors
                Copy of Aadhar Card
                Copy of Driving License or Voter ID
                Copy of PAN Card
                Copy of bank statement or utility bill (not older than two months)
                Copy of Passport (in case of foreign national or NRI)
                Address Proof of Registered Office
                Copy of electricity or any other utility bill (not older than two months)
                Rent agreement (if rented)
                No Objection Certificate (NOC) from the owner of the property
                Note: It is not mandatory to own a commercial business premise for incorporation. One
                EA
                2
                A
                01
                03
                05
                Passport Size Photo
                Voter ID
                Aadhaar Card &
                PAN Card

                02
                Address Proof 04
                Passport (NRIs)
                Bank Statement 06
                &
                9
                Privacy - Terms
            </p> */}
            {/* <div className='container-fluid bg-light'>
                        <div className='container pb-5'>
                            <div className='row py-5'>
                                <h2 className='text-center heading_main  mt-4'>  Documents you will get after Online Company Registration in Delhi </h2>

                                <div className='col-sm-6 mt-5 bg-light pe-5'>

                                    <div className='mt-5' onClick={() => handleSectionClick2('Incorporation Certificate')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Incorporation Certificate</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Permanent Account Number (PAN) of the Company')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Permanent Account Number (PAN) of the Company</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Tax Deduction Account Number (TAN) of the company')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Tax Deduction Account Number (TAN) of the company</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Articles of Association (AoA)')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /> <span className='px-2'>Articles of Association (AoA)</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Memorandum of Association (MoA)')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Memorandum of Association (MoA)</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Direction Identification Number (DIN)')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Direction Identification Number (DIN)</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Digital Signature Certificate(DSC)')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Digital Signature Certificate(DSC)</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>
                                    <div onClick={() => handleSectionClick2('Compnay Master Data')}>
                                        <p className='border px-2 pvtleft'><img src={check} alt="check" height="30px" /><span className='px-2'>Compnay Master Data</span><img src={arrow} alt="arrow" className='float-end' /></p>
                                    </div>

                                </div>
                                <div className='col-sm-6 px-5'>
                                    <div className='px-4'>
                                        {activeSection2 === 'Incorporation Certificate' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>Certificate of Incorporation Sample</b></p>
                                                <img src={coi} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Permanent Account Number (PAN) of the Company' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>Pan Card Sample Documents</b></p>
                                                <img src={panCard} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Tax Deduction Account Number (TAN) of the company' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b >Tan Sample Documents</b></p>
                                                <img src={tan} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Articles of Association (AoA)' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>AoA Certificate Sample Documnets</b></p>
                                                <img src={AoA} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Memorandum of Association (MoA)' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>MoA Certificate Sample Documnets</b></p>
                                                <img src={MoA} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Direction Identification Number (DIN)' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>DIN Certificate Sample Documnets </b></p>
                                                <img src={Din} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Digital Signature Certificate(DSC)' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>DSC Sample Documnets</b></p>
                                                <img src={dsc} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                        {activeSection2 === 'Compnay Master Data' && (
                                            <div className=''>
                                                <p className='border border-top-0 p-1 text-center fs-4'><b>Master Data Sample Documnets</b></p>
                                                <img src={MasterData} alt='Certificate' height="500px" width="470px" className='mx-4' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <img src={PU} alt='pu-separator' className='img-fluid' />
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <h2 className='text-center heading_main  mt-4'>Private Limited Company Registration Fess</h2>
                        <div className='row'>
                            <div className='col-sm-5'>
                                <div>
                                    <img src={map} alt='' className='img-fluid' />
                                </div>
                            </div>
                            <div className='col-sm-7 mt-5'>
                                <p>The total cost of Private Limited Company registration in India, including government and
                                    professional fees, starts from ₹7,499 and takes around 7-10 working days.</p>
                                <table border={1} className='table  table-bordered border-dark mt-5 textSize mb-0'>
                                    <thead>
                                        <tr>
                                            <th> Steps</th>
                                            <th>Fees (Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> Digital Signature Certificate Fee</td>
                                            <td> ₹2,000</td>
                                        </tr>
                                        <tr>
                                            <td> Government Fee(Stamp Duty)</td>
                                            <td> ₹1,500</td>
                                        </tr>
                                        <tr>
                                            <td> Professional Fee</td>
                                            <td> ₹3,999</td>
                                        </tr>
                                        <tr>
                                            <td>  Total Cost</td>
                                            <td> ₹7,499*</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='rounded py-2 textSize px-2' style={{ background: "#f2f9f7" }}> Note: The aformentioned Fees is exclusive of GST </div>
                            </div>
                        </div>
                    </div>

                    <p>
                        Private Limited Company registration in India
                        • Pvt Ltd Company Registration in Chennai
                        • Pvt Ltd Company Registration in Kolkata
                        • Pvt Ltd Company Registration in Hyderabad
                        • Pvt Ltd Company Registration in Delhi
                        • Pvt Ltd Company Registration in Mumbai
                        • Pvt Ltd Company Registration in Bangalore
                        • PVT LTD Company Registration
                        • One Person Company Registration
                        • Sole Proprietorship Registration
                        PU
                        Other Company Registration by professional Utilities?
                        ●
                        Partnership Firm Registration
                        • Section 8 Company Registration
                        • Nidhi Company Registration
                        • Pvt Ltd Company Registration in kerala
                        • Pvt Ltd Company Registration in Coimbatore
                        • Pvt Ltd Company Registration in Uttar Pradesh
                        • Public Limited Company Registration
                        • Producer Company Registration
                        • NGO Registration
                    </p> */}

















            <WhyVyapar />
            <Review />
            <TestiMonials />
            <ContactUs />
            <Footer />

            {
                sidebar &&
                <div class="offcanvas offcanvas-end w-25 show" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false" style={{ boxShadow: "0 0.5rem 3rem 0 rgba(0, 0, 0, 0.1)", background: "#1d1919", color: "white" }}>
                    <div class="offcanvas-header">
                        <h4 class="offcanvas-title d-none d-sm-block" id="offcanvas">Document List</h4>
                        <button type="button" class=" " data-bs-dismiss="offcanvas" aria-label="Close" style={{ color: "white", border: "none", background: "transparent" }} onClick={() => { setSidebar(false) }}> <i class="bi bi-x-lg"></i></button>
                    </div>
                    <div class="offcanvas-body px-0">
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">

                            {
                                requiredData?.map((item) => {
                                     allDocumentStatus = requiredData.every(item => {
                                        const dataStatus = userData.filter(data => data.name === item.document);
                                        return dataStatus.length > 0;
                                    });
                                    const dataStatus = userData.filter((data) => data.name === item.document)


                                    return (
                                        <>

                                            <li class="nav-item">
                                                <a href="#" class="nav-link text-truncate" style={{ fontSize: "20px" }}>
                                                    {
                                                        dataStatus.length > 0 ?
                                                            <i class="bi bi-check2-circle" style={{ color: "#00e300" }}></i>
                                                            :

                                                            <i class="bi bi-exclamation-circle" style={{ color: "rgb(255 0 0)" }}></i>
                                                    }


                                                    <span class="ms-1 d-none d-sm-inline" >{item.document}</span>
                                                </a>
                                            </li>
                                        </>
                                    )
                                })
                            }

                        </ul>
                        <div style={{ padding: '1rem 1rem' }}>
                        {console.log(allDocumentStatus)}
                            {
                                allDocumentStatus ?
                                    <button type="button" class="btn btn-primary">Pay Now</button>
                                    :
                                    <button type="button" class="btn btn-primary" onClick={() => { openUploadModal() }}>Upload Document</button>

                            }

                        </div>
                    </div>
                </div>
            }


            {modalActiveUpload && (
                <>
                    <div className="modal-overlay" onClick={closeUploadModal}></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                        <section className="vh-100 container_body">
                            <div className="container py-5 h-100">
                                <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                    <div className="col-md-10 w-auto col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                                        {/* <div className="img-left d-none d-md-flex">
                                            <div>

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                                    alt="login form" class="img-fluid" style={{ height: "100%" }} />
                                            </div>
                                        </div> */}

                                        <div className="card-body">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeUploadModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>


                                            <h2 class="title text-center mt-4 modal_heading" >
                                                Add  Document
                                            </h2>
                                            <div class="form-box px-3">

                                                <div class="form-input">
                                                    <select class="form-select" aria-label="Default select example" style={{ borderRadius: "30px" }} onChange={(e) => { setSelectDocument(e.target.value) }}>
                                                        <option value='0'>Choose Document</option>

                                                        {
                                                            documentList?.map((item) => {
                                                                return (
                                                                    <>

                                                                        <option value={item.name}>{item.name}</option>

                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div class="mb-3 mt-3">
                                                    <input class="form-control" type="file" id="formFile" style={{ borderRadius: "30px" }} onChange={(e) => { setFile(e.target.files[0]) }} />
                                                </div>

                                                <div class="mb-3">

                                                    <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { AddDocument() }} disabled={disble}>
                                                        {disble ?
                                                            <div class="spinner-border text-warning" role="status">
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                            :

                                                            <span>Submit</span>
                                                        }

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



        </>
    )
}

export default ServicePage