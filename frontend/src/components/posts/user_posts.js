import React from 'react';
import { withRouter } from 'react-router-dom';
import PostIndexItem from './post_index_item';
import '../../assets/stylesheets/posts_index.css';
import '../../assets/stylesheets/users_show.css';

class UserPosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: [],
            notCurrentUser: this.props.location.state,
            userPage: null,
            following: false
        }
    }

    userFetch(){
        if (this.state.notCurrentUser){
            this.props.fetchUserPosts(Object.values(this.state.notCurrentUser));
            this.props.fetchUser(Object.values(this.state.notCurrentUser));
            this.isFollowing();
        } else{
            this.props.fetchUserPosts(this.props.user.id);
        }
    }

    onComment = (id, commentData) => {
        this.props.leaveComment(id, commentData)
        setTimeout(() => {
            this.userFetch(); 
        }, 300)
    }

    onLike = id => {
        const newLike = this.props.userId;

        this.props.heartPost(id, newLike)
        setTimeout(() => {
            this.userFetch();   
        }, 300)
    }

    onUnlike = id => {
        const removeLike = this.props.userId;

        this.props.unheartPost(id, removeLike)
        setTimeout(() => {
            this.userFetch();
        }, 300)
    }

    onFollow(){
        this.props.follow(Object.values(this.state.notCurrentUser), this.props.userId)
        setTimeout(() => {
            this.userFetch();
        }, 300);
        console.log(this.state.userPage)
    }

    onUnfollow(){
        this.props.unfollow(Object.values(this.state.notCurrentUser), this.props.userId)
        setTimeout(() => {
            this.userFetch();
        }, 300);
        // this.setState({ following: false })
    }

    componentDidMount() {
        this.userFetch();
        // console.log(this.props.fetchUser(Object.values(this.state.notCurrentUser)))
    }

    componentWillReceiveProps(newState) {
        this.setState({userPosts: []});
        this.setState({ userPosts: newState.userPosts, userPage: newState.userPage });
        this.isFollowing();
    }

    isFollowing(){
        if (this.state.userPage){
            this.state.userPage.followers.forEach(follower => {
                if (follower.user === this.props.userId){
                    console.log("TRUE")
                    this.setState({ following: true });
                }
            })
        }
    }

    render(){
        let userInfo = null;

        if (this.state.notCurrentUser){
            if (this.state.userPage){
                if (this.state.following === true){
                    userInfo = (
                        <div className="user-info-switch">
                            <button className="follow-btn" onClick={() => this.onUnfollow()}>Unfollow</button>
                            <p className="follower-count">{this.state.userPage.followers.length} followers</p>
                        </div>
                    );
                } else {
                    userInfo = (
                        <div className="user-info-switch">
                            <button className="follow-btn" onClick={() => this.onFollow()}>Follow</button>
                            <p className="follower-count">{this.state.userPage.followers.length} followers</p>
                        </div>
                    );
                }                    
            }
        }                    

        if (this.state.userPosts.length === 0) {
            return (<div>There are no Posts</div>)
          } else {
            return(
                <div className="main-content">
                    <div className="user-info-container">
                        <div className="user-info-flex">
                            <p className="users-show-name">{this.state.userPosts[0].handle}</p>
                            {userInfo}
                        </div>
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