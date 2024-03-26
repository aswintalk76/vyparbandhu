import PU from "../../images/PU-separator.svg"
const Section2 = ({ data }) => {

    return (
        <>


            <h1 className="text-center heading_main  mt-4">{data.name}</h1>
            <div className='row'>
                {
                    data.description && data.icon ?
                        <>

                            <div className='col-lg-8 mt-5'>
                                <div style={{ fontSize: '20px', overflowY: 'auto', }}>
                                    <pre style={{ width: '100%', whiteSpace: 'pre-wrap' , textAlign:'justify' , fontFamily:'inherit' }}>
                                        {data.description}
                                    </pre>
                                </div>
                            </div>


                            <div className='col-lg-4' style={{display:'flex' , justifyContent:"center" , alignItems:'center'}}>

                                <img src={`${process.env.REACT_APP_BUCKET_URL}/${data.icon}`} alt="flower" style={{ width: "90%" }} />
                            </div>
                        </>
                        :
                        data.description ?
                            <div className='col-12 mt-5'>
                                <div >
                                    {data.description}</div>

                            </div>
                            :
                            <>
                                {
                                    data.icon &&
                                    <>
                                        <div className="col-sm-4"></div>
                                        <div className='col-sm-4'>  

                                            <img src={`${process.env.REACT_APP_PORT}/admin/service/file/${data.icon}`} alt="flower" style={{ width: "90%" }} />
                                        </div>
                                    </>
                                }
                            </>


                }
            </div>


        </>
    )
}

export default Section2