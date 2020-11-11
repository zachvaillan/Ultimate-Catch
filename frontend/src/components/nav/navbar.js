import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="nav-links">
              <div><Link to={'/profile'}>Profile</Link></div>
              <div><Link to={'/posts/new'}>Write a Post</Link></div> 
              <button className="logoutBtn" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (          
              <div className="nav-links"> 
                <div><Link className="nav-links" to={'/signup'}>Signup</Link></div>
                <div className="last" ><Link className="nav-links" to={'/login'}>Login</Link></div>
              </div>     
        );
      }
  }

  logoLink() {
    if (this.props.loggedIn) {
      return (
        <Link to="/main">
          <img className="logo-img" src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/logo_size_invert.jpg"></img>
        </Link>
      )
    } else {
      return (
        <Link to="/">
          <img className="logo-img" src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/logo_size_invert.jpg"></img>
        </Link>
      )
    }
  }
  
  render() {
    return (
      <div className="NavBar">
        <div className="nav-header-components">{this.logoLink()}</div>    
          { this.getLinks() }
      </div>
    );
  } 
}

export default NavBar;