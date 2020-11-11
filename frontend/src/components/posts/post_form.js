import React from 'react';

class PostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: "",
            picture: ""
        }
        this.updateField = this.updateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateField(field){
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.composePost(this.state)
            .then(() => this.props.history.push("/posts"))
    }

    render(){
        return(
            <div className="form-body">

                <div className="post-form-container">
                    <h2>Make a post</h2>
                    <form className="post-form" onSubmit={this.handleSubmit}>
                        
                        <input type="text" onChange={this.updateField("text")} placeholder="Check out this catch!"/>
                        <br></br>
                        <input type="text" onChange={this.updateField("picture")} placeholder="Picture URL"/>
                        <br></br>
                        <button className="create-bttn" type="submit">Create</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PostForm;