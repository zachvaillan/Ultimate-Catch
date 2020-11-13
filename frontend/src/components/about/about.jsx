import React from 'react';
import '../../assets/stylesheets/about.css'


function About () {



    return(
      <section className="about-container">
        <div className="team">
          <h1>Zach Vaillancourt</h1>
          <img src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/Zach_Vaillancourt.jpg" alt=""></img>
          <p>I have a passion for innovation and love turning ideas into reality. Whether its a new feature on an existing technology, or an entirely new technology, I am passionate about bringing it into existence. This passion extends beyond just technology, but to the business that I am working for. I love to see where we are, and where we could go, and develop a plan of action to make that happen. </p>

          <div className="about-links">
            <a href="https://github.com/zachvaillan">
              <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/gitlogo.jpg" alt=""/>
            </a>
            <a href="https://www.linkedin.com/in/zachary-vaillancourt-0b0342112/">
              <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/linkedin-logo-transparent.png" alt=""/>
            </a>

          </div>
        
        </div>

        <div className="team">
          <h1>Brian Bowen</h1>
          <img src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/brian.jpg" alt=""></img>
          <p>Hello! I'm Brian, a software developer with a restaurant and hospitality background, based out of the San Francisco/Bay Area. I value code readability and reusability, as well as object oriented design.</p>

          <div className="about-links">
            <a href="https://github.com/bbowen1036">
              <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/gitlogo.jpg" alt=""/>
            </a>
            <a href="https://www.linkedin.com/in/brian-bowen-36456a7/">
              <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/linkedin-logo-transparent.png" alt=""/>
            </a>

          </div>
        </div>

        <div className="team">
          <h1>Jonathan Jo</h1>
          <img src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/20170818-DSC_9936+(1).jpg" alt=""/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quo debitis eligendi numquam asperiores, voluptate deserunt, quibusdam commodi repellat harum in voluptatum temporibus delectus recusandae expedita! Eveniet quod magni voluptatem.</p>

          <div className="about-links">
            <a href="https://github.com/jonathanbgjo">
              <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/gitlogo.jpg" alt=""/>
            </a>
            <img className="about-git" src="https://oceanstar-seed.s3-us-west-1.amazonaws.com/linkedin-logo-transparent.png" alt=""/>
          </div>
        </div>
      </section>
    )
  
};

export default About;