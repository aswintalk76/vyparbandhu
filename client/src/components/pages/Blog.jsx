import { useEffect, useState } from 'react'
import '../styles/blog.css'
import blog from '../images/blog.png'
import popular from '../images/blog-popular.png'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'


const Blog = () => {
    const [blogdata, setBlogData] = useState()
    const [popularBlog, setPopularBlog] = useState([
        { img: popular, heading: "Apple Introduces Search Ads Basic", date: "jun 22, 2018" },
        { img: popular, heading: "new rules, more cars, more races", date: "jun 8, 2018" },
    ])


    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/blog/list`);
            const data = await response.json();
            if (response.status === 200) {
                setBlogData(data)
            }
            console.log('Data received:', data);

        } catch (e) {
            console.log(e, 'error')
        }

    }
    useEffect(() => {

        getList();

    }, [])


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

    return (
        <>
            <Header />
            <div id="main-content" class="blog-page mt-5 mb-5">
                <div class="container">
                    <div class="row clearfix">
                        <div class="col-lg-8 col-md-12 left-box">
                            {
                                blogdata?.length ? blogdata?.map((item) => {
                                    return (
                                        <>
                                            <div class="card single_post">
                                                <div class="body">
                                                    <div class="img-post">
                                                        <img class="d-block img-fluid" src={`${process.env.REACT_APP_BUCKET_URL}/${item.image && item.image}`} alt="First slide" />
                                                    </div>
                                                    <h3><a href="blog-details.html">{item.heading}</a></h3>
                                                    {/* {
                                                        item.link && 

                                                    <div style={{ padding: "20px" }}>
                                                        <iframe
                                                            title="YouTube video player"
                                                            width="100%"
                                                            height="400"
                                                            src={`https://www.youtube.com/embed/${getVideoId(item.link)}`}
                                                            allowFullScreen
                                                            style={{ borderRadius: "20px" }}
                                                        ></iframe>
                                                    </div>
                                                    } */}
                                                    <p>{item.details}</p>
                                                </div>
                                                <div class="footer">
                                                    <div class="actions">
                                                        <Link to="/blogdetails" state={item._id} class="btn btn-outline-secondary" >Continue Reading</Link>
                                                    </div>
                                                    <ul class="stats">
                                                        <li><a href="javascript:void(0);">General</a></li>
                                                        <li><a href="javascript:void(0);" class="fa fa-heart">28</a></li>
                                                        <li><a href="javascript:void(0);" class="fa fa-comment">128</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                                    :
                                    <>
                                        <div class="card single_post">
                                            <div class="body text-center">
                                               
                                                <h3 className='text-center'>No Blogs</h3>
                                               
                                            </div>
                                           
                                        </div>

                                    </>

                            }



                            {/* <ul class="pagination pagination-primary">
                                <li class="page-item"><a class="page-link" href="javascript:void(0);">Previous</a></li>
                                <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
                                <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                                <li class="page-item"><a class="page-link" href="javascript:void(0);">Next</a></li>
                            </ul> */}
                        </div>
                        <div class="col-lg-4 col-md-12 right-box">
                            <div class="card">
                                <div class="body search">
                                    <div class="input-group m-b-0">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <h2>Categories</h2>
                                </div>
                                <div class="body widget">
                                    <ul class="list-unstyled categories-clouds  list_data m-b-0">
                                        <li><a href="" style={{ color: "blue" }}>eCommerce</a></li>
                                        <li><a href="" style={{ color: "blue" }}>food</a></li>
                                        <li><a href="" style={{ color: "blue" }}>shopping</a></li>
                                        <li><a href="" style={{ color: "blue" }}>eCommerce</a></li>
                                        <li><a href="" style={{ color: "blue" }}>eCommerce</a></li>
                                        <li><a href="" style={{ color: "blue" }}>other</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <h2>Popular Posts</h2>
                                </div>
                                <div class="body widget popular-post">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            {
                                                popularBlog?.map((item) => {
                                                    return (
                                                        <>

                                                            <div class="single_post">
                                                                <p class="m-b-0">{item.heading}</p>
                                                                <span>{item.date}</span>
                                                                <div class="img-post">
                                                                    <img src={item.img} alt="Awesome Image" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            {/* <div class="single_post">
                                                <p class="m-b-0">new rules, more cars, more races</p>
                                                <span>jun 8, 2018</span>
                                                <div class="img-post">
                                                    <img src="https://www.bootdey.com/image/280x280/FFB6C1/000000" alt="Awesome Image" />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="card">
                                <div class="header">
                                    <h2>Instagram Post</h2>
                                </div>
                                <div class="body widget">
                                    <ul class="list-unstyled instagram-plugin m-b-0">
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                        <li><a href="javascript:void(0);"><img src="https://www.bootdey.com/image/80x80/FFB6C1/000000" alt="image description" /></a></li>
                                    </ul>
                                </div>
                            </div> */}
                            {/* <div class="card">
                                <div class="header">
                                    <h2>Email Newsletter <small>Get our products/news earlier than others, let’s get in touch.</small></h2>
                                </div>
                                <div class="body widget newsletter">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Enter Email" />
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="icon-paper-plane"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog