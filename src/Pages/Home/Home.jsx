import React from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import assets from "../../assets/assets";
import Projects from "../../Components/Projects/Projects";
function Home() {
  return (
    <div>
      <Hero />

      <h1>What We Do</h1>
      <div className="whatwedo">

        <div className="brandidentity">
          <img src={assets.palette} alt="Brand identity" />
          <h1>Brand Identity</h1>
          <p>We complete your brand</p>
          <button className="secondary-btn">Learn more</button>
        </div>
      

      <div className="brandidentity">
        <img src={assets.compassdrafting} alt="Brand identity" />
        <h1>UI/UX</h1>
        <p>Complete user expirience design and the buiding of user interface</p>
        <button className="secondary-btn">Learn more</button>
      </div>

      <div className="brandidentity">
        <img src={assets.palette} alt="Brand identity" />
        <h1>Website Development</h1>
        <p>We complete your brand</p>
        <button className="secondary-btn">Learn more</button>
      </div>

      <div className="brandidentity">
        <img src={assets.palette} alt="Brand identity" />
        <h1>Growth & Optimization</h1>
        <p>We complete your brand</p>
        <button className="secondary-btn">Learn more</button>
      </div>
      </div>

      <Projects/>
    </div>
  );
}

export default Home;
