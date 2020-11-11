import React from 'react';
import PostsIndexContainer from '../posts/posts_index_container';
// import MapContainer from '../map/map_container';
import { fetchPostsByRegion } from '../../actions/post_actions';
import '../../../assets/stylesheets/main.css';

class MainPage extends React.Component {


  render() {

    return (
      <div className="main">

        <PostsIndexContainer />
        <footer>
          Copyright &copy; 2020
        </footer>
      </div>
    );
  }
}

export default MainPage;