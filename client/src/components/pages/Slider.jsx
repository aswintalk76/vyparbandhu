import React from 'react'
import one from "../images/1.png"
import two from "../images/2.png"
const Slider = () => {
  return (
    <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={one} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={two} className="d-block w-100" alt="..." />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Slider
