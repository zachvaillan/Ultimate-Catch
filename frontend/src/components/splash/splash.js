import React from "react";
import '../../../assets/stylesheets/splash.css'


class SplashPage extends React.Component {

  render() {
    return (
      <div className="splash-main">
        <div id="cover"><img className="main-pic" src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/CFE21396-99B2-A287-922D990B448989A2.jpeg" /></div>
          <h2 className="splash-title">Ultimate Catch</h2>
            <div className="splash-page-intro">
              <p>Your personal fishing guide.</p>
            </div>
      </div>

    );
  }
}


export default SplashPage;