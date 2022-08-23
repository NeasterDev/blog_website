import React from "react";
import { Link } from "react-router-dom";
export default class BlogPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        }
    }

    onTitleChange = (e) => {
        this.setState({ ...this.state, title: e.target.value });
    }

    onContentChange = (e) => {
        this.setState({ ...this.state, content: e.target.value});
    }

    saveBlogPost = () => {
        console.log("saving blog post");
        fetch(`http://localhost:8080/api/user/post`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content
            })
        })
        .then(res => {
            if (res.ok) {
                return (<div>Created Post</div>)
            }
        });
    }

    render() {
        return (
            <div>
                <label htmlFor="name">Title: </label>
                <input onChange={this.onTitleChange} type="text" name="title" /><br/>

                <label htmlFor="content">Content: </label>
                <textarea onChange={this.onContentChange} name="content"/><br/>

                <button onClick={this.saveBlogPost} >Submit</button>  <br/><hr/>
                <Link to="/blogposts">View posts</Link>      
            </div>
        )
    }
}