

const DocumentData = ({ data }) => {
    console.log(data, 'datatatat')
    return (
        <>
            <div className="container ">

                <h1 className='text-center heading_main  mt-4'>{data.heading}</h1>
                {
                    data?.description &&

                    <h4 className=' mt-3 text-center' > {data?.description}</h4>
                }
                {
                    data?.documentsData &&

                    <div className="row" >
                        <div className="col-lg-6 col-12 px-5 py-2 mx-auto">
                            {
                                data?.documentsData?.map((SubData, index) => {
                                    const className = index % 2 === 0 ? 'text_green' : 'text_orange';
                                    return (
                                        <>
                                            <div key={index} className={`card py-3 px-5 ${className} mb-3`}>
                                                <label className='text_workflow'><span className=''><img src={`${process.env.REACT_APP_PORT}/admin/service/file/${SubData && SubData.icon}`} width="60px" style={{ borderRadius: "5px" }} alt="" /></span><span className={`ps-3 ${className} `}>{SubData.document}</span></label>
                                            </div>

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
}

export default DocumentData