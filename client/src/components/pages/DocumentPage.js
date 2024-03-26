import React, { useEffect, useState } from "react";
import scanner from '../images/Screenshot 2024-02-05 170243.png'
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


const DocumentPage = () => {

    const [tabName, setTabName] = useState([{ id: "1", name: "Resume Templates" }, { id: "2", name: "Cover Letter Templates" }, { id: "3", name: "Cv Letter Templates" }])
    const [activeTab, setActiveTab] = useState("1")
    const [documentList, setDocumentList] = useState();



    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PORT}/admin/templates/list`);
                const result = await response.json();
                if (response.status === 200) {
                    console.log(result)
                    setDocumentList(result);
                } else {
                    console.log(`Error: ${response.status}`);
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

        getData();

    }, [])

    return (
        <>
            <Header />

            <div className="navbar-light bg-light h-80">
                <nav className="navbar navbar-expand-lg navbar-light bg-light container d-flex h-80">
                    <a className="navbar-brand" >Document</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                        <div className="form-inline">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="banner_bg">
                <div className="bg_text">
                    Company Documents <br /> & <br /> Free Documents to Download

                </div>
            </div>

            <div className="container text_second">
                <div className="f_30 f_600">On this page you will find a range of forms and documents available for instant download. All documents are supplied in Word format with instructions. Our company forms can be used by limited companies registered in England, Scotland and Wales. We have designed our forms to be suitable for most limited companies.</div>

            </div>

            <ul className="nav nav-pills nav-justified container">
                {
                    tabName && tabName.map((item, index) => {
                        return (
                            <>
                                <li className="nav-item">
                                    <a className={`nav-link  ${activeTab == item.id ? "active_tab text-white" : ""}`} aria-current="page" onClick={() => { setActiveTab(item.id) }}>{item.name}</a>
                                </li>
                            </>
                        )
                    })
                }

            </ul>

            <div className="container mt-5 mb-5">

                <div className="row">

                    {
                        documentList && documentList.map((item, index) => {
                            return (
                                <>

                                    {

                                        item.type === activeTab &&


                                        <div className="col-lg-4 col-sm-6 col-12">

                                            <div className="card">
                                                {item.premium === true &&
                                                    <span class=" active_tab badge badge-primary position-absolute ml-2 mt-2 fs-6" >Premium</span>
                                                }
                                                <img className="card-img-top" src={scanner} alt="Card image cap" />


                                                <div className="card-body">
                                                    <div className="d-flex justify-content-center fs-3 mb-2 ">

                                                        <span style={{ color: "rgba(0,0,0,.55)", fontWeight: "600" }}>{item.name}</span>
                                                    </div>
                                                    <div className="d-flex w-100 justify-content-center" >
                                                        {/* <div className="border_color text_green btn btn-outline-primary d-flex justify-content-center w_48" >
                                                            Preview
                                                        </div> */}
                                                        <div className="border_color text_green btn btn-outline-primary d-flex justify-content-center w_48 button_hover" onClick={() => {
                                                            if (item.premium === false) (

                                                                window.open(`${process.env.REACT_APP_PORT}/admin/templates/file/${item.fileName}`)
                                                            )
                                                            else {
                                                                alert('You need to pay for this')
                                                            }
                                                        }} >
                                                            Download
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>
                                    }

                                </>
                            )
                        })
                    }



                </div>

            </div>

            <Footer />

        </>
    );
};

export default DocumentPage;
