import React from 'react';
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, Link } from 'react-router-dom';

class PostIndexItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: ""
        }

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(field){
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }
    handleSubmit(e){

    }
    render(){
        let liked = false;
        this.props.post.likes.forEach(item => {
            if (String(item.user) === this.props.userId){
                liked = true;
            }
        });

        const heartIcon = liked ? 
            (<FontAwesomeIcon className="liked-heart" icon={faHeart} onClick={() => this.props.onUnlike(this.props.post._id)}/>)
            :
            (<FontAwesomeIcon className="heart" icon={faHeart} onClick={() => this.props.onLike(this.props.post._id)}/>);

        return(
            <div key={this.props.post_id} className="posts-idx-item">

                <div className="post-pic-and-likes">
                    <div className="post-pic-container">
                        <img className="post-pic" src={this.props.post.picture} />
                    </div>
                    <div className="likes-container">
                            <div className="like-heart">{heartIcon}</div>
                            <div className="like-count-container">
                                <h3 className="like-count">{this.props.post.likes.length} likes</h3>
                            </div>
                    </div>   
                </div>
              

                <div className="post-info">
                    <div className="post-header">

                        <div className="username"><Link to={{pathname: '/profile', state: {notCurrentUser: this.props.post.users}}}>{this.props.post.handle}</Link></div>
                        <img className="badge" src="https://toppng.com/uploads/preview/instagram-verified-logo-11549386033fpzr9vfugd.png"></img>
                    </div>

                    <div className="comments">

                        <div className="post-text-container">          
                            <h3 className="post-text">{this.props.post.text}</h3>
                        </div> 

                        <ul className="comments-list">
                            {this.props.post.comments.map(comment => {
                                return <li key={this.props.post._id + comment._id} className="user-comment" >
                                    <div>   

                                        <p className="comment-owner">{comment.handle}:</p>
                                    </div>
                                    <div className="comment-body">
                                        <p>{comment.text}</p>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="comment-container">
                        <textarea className="comment-input" placeholder="Leave a comment!" onChange={this.handleUpdate("text")} type="text" />
                        <FontAwesomeIcon className="comment-icon" icon={faComment} onClick={() => this.props.onComment(this.props.post._id, this.state)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PostIndexItem);