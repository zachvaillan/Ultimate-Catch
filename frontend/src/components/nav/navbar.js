import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/stylesheets/navbar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);

    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  submit() {
    this.props.userSearch(this.state.query)
  }

  update() {  
    return e => this.setState({ query: e.target.value}); 
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="nav-links">

            <form >

              {/* <input 
                className='user-search'
                placeholder='User Search'
                type='search' 
                onChange={this.update()}>                
              </input>
              
              <NavLink to={'/search'} >
                <button  onClick={this.submit}></button>   
              </NavLink> */}


              <div className="search-box">
                <input type="text" name="" onChange={this.update()} className="search-txt" placeholder="Search User..."/>
                <NavLink to={'/search'} >
                <button  onClick={this.submit} className="search-btn"></button>             
                </NavLink>
              </div>
            </form>

              <div><Link to={'/profile'}>Profile</Link></div>
              <div><Link to={'/posts/new'}>Write a Post</Link></div> 
              <div><Link to={'/about'}>Team</Link></div> 
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
          <img className="logo-img" src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/logo_size_invert.jpg" alt="pic"></img>
        </Link>
      )
    } else {
      return (
        <Link to="/">
          <img className="logo-img" src="https://ultimatecatch-seed.s3-us-west-1.amazonaws.com/logo_size_invert.jpg" alt="pifc"></img>
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