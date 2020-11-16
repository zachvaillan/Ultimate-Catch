import React from 'react';
import { withRouter } from 'react-router-dom';
import PostIndexItem from './post_index_item';
import '../../assets/stylesheets/posts_index.css';

class UserPosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: this.props.userPosts
        }
    }

    componentWillMount() {
        console.log(this.props.fetchUserPosts(this.props.user.id));
    }

    render(){
        if (this.state.userPosts.length === 0) {
            return (<div>There are no Posts</div>)
          } else {
            return(
                // <div className="main-content">
                //     <div className="posts-idx-main-container">
                //         <div className="posts-idx-main" >
                //             <div className="posts-idx-container">
                //             {this.state.posts.map(post => (
                //                 <PostIndexItem key={post.id} user={this.props.user} onComment={this.onComment} userId={this.props.userId} post={post} onUnlike={this.onUnlike} onLike={this.onLike} fetchPost={this.props.fetchPost} heartPost={this.props.heartPost} />
                //             ))}
                //             </div>
                //         </div>
                //     </div>
                // </div>     
                <div>{console.log(this.props.userPosts)}</div>
            )
        }   
    }
}

export default withRouter(UserPosts);