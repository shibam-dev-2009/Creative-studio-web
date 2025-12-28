import React from 'react'
import '../Hero/Hero.css'
import assets from '../../assets/assets'
function Hero() {
  return (
    <div>
        <div className="hero">
            <h1>
            Design. Code. <br />
            Build Creative Experiences.
          </h1>

          <p>
            <span className='ball success '></span>
            Creative Studio is where ideas turn into modern designs,
            clean code, and practical learning resources.
          </p>

           <div className="hero-buttons">
            <button className="success-btn">View My Work</button>
            <button className="secondary-btn">Learn with Notes</button>
          </div>

          <div className="offer">
            <img src={assets.flame} alt="flame animation" />
            
            
              <p>Get the limited offer. Offer upto 50% off</p>
          </div>
        </div>
    </div>
  )
}

export default Hero