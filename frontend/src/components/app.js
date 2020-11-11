import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import DemoFormContainer from './session/demo_form_container';
import MapContainer from './map/map_container';
import PostsIndexContainer from './posts/posts_index_container';
import PostFormContainer from './posts/post_form_container';
import SplashPage from './splash/splash';
import FooterContainer from './footer/footer_container'
import Profile from './profile/profile'

const App = () => (
  <div>
    <header>
      <NavBarContainer />
    </header>
    <Switch>

        <ProtectedRoute exact path="/main" component={MainPage} />
        <ProtectedRoute exact path="/posts" component={PostsIndexContainer} />
        <ProtectedRoute exact path="/posts/new" component={PostFormContainer} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path='/demo' component={DemoFormContainer} />
        <AuthRoute exact path="/" component={SplashPage} />
    </Switch>
    <footer>
      {/* <FooterContainer /> */}
    </footer>
  </div>
);

export default App;