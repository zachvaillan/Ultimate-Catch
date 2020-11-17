import React from 'react';
import { withRouter } from 'react-router-dom';
import PostIndexItem from './post_index_item';
import '../../assets/stylesheets/posts_index.css';
import '../../assets/stylesheets/users_show.css';

class UserPosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: this.props.userPosts
        }
    }

    onComment = (id, commentData) => {

        this.props.leaveComment(id, commentData)
        setTimeout(() => {
            this.props.fetchUserPosts(this.props.user.id)  
        }, 300)
    }

    onLike = id => {
        const newLike = this.props.userId;

        this.props.heartPost(id, newLike)
        setTimeout(() => {
            this.props.fetchUserPosts(this.props.user.id)    
        }, 300)
    }

    onUnlike = id => {
        const removeLike = this.props.userId;

        this.props.unheartPost(id, removeLike)
        setTimeout(() => {
            this.props.fetchUserPosts(this.props.user.id)
        }, 300)
    }

    componentWillMount() {
        this.props.fetchUserPosts(this.props.user.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({posts: []});
        this.setState({ posts: newState.posts });
    }

    render(){
        if (this.state.userPosts.length === 0) {
            return (<div>There are no Posts</div>)
          } else {
            return(
                <div className="main-content">
                    <div className="user-info-container">
                        <p className="users-show-name">{this.state.userPosts[0].handle}</p>
                    </div>
                    <div className="posts-idx-main-container">
                        <div className="posts-idx-main" >
                            <div className="posts-idx-container">
                                {this.state.userPosts.map(post => (
                                    <PostIndexItem key={post.id} user={this.props.user} onComment={this.onComment} userId={this.props.userId} post={post} onUnlike={this.onUnlike} onLike={this.onLike} fetchPost={this.props.fetchPost} heartPost={this.props.heartPost} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>  
            )
        }   
    }
}

export default withRouter(UserPosts);