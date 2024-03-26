

const MultiImage = ({ data }) => {
    return (
        <>
            {data?.heading &&

                <h1 className="text-center heading_main  mt-4">{data?.heading}</h1>
            }
            {
                data?.description &&

                <h4 className=' mt-3 text-center mb-3' >
                    <div style={{ fontSize: '20px' }}>
                        <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' }}>
                            {data.description}
                        </pre>
                    </div>
                    {/* <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' }}>
                        {data?.description}
                    </pre> */}


                </h4>
            }
            {
                data?.images.length !== 0 &&
                <>
                    <div className="row">

                        {
                            data?.images.map((image, index) => {
                                return (
                                    <>
                                        {
                                            data?.images.length === 1 && image.filename &&

                                            <div className="p-2 mb-2 "  >

                                                <img style={{ borderRadius: "20px" }} src={`${process.env.REACT_APP_PORT}/admin/service/file/${image.filename && image.filename}`} className="mb-1 w-100" alt="No Previous Image" />
                                            </div>
                                        }
                                        {
                                            data?.images.length > 1 && image.filename &&

                                            <div className="p-2 mb-2 col-md-6 "  >

                                                <img style={{ borderRadius: "20px" }} src={`${process.env.REACT_APP_PORT}/admin/service/file/${image.filename && image.filename}`} className="mb-1 w-100 h-75" alt="No Previous Image" />
                                            </div>

                                        }

                                    </>
                                )

                            })
                        }
                    </div>
                </>
            }
        </>
    )
}
export default MultiImage