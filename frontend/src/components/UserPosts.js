import React from "react";
import BlogCard from "./BlogCard";

export default class UserPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            posts: []
        }
    }

    getCurrentUserPosts = () => {
        fetch("http://localhost:8080/api/user/current", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ ...this.state, username: data.username, posts: data.posts})
        })
    }

    componentDidMount(){
        this.getCurrentUserPosts();
    }

    render() {
        return (
            <div>
                <h1>Your posts</h1>
                <div className="mt-2 row">
                    {this.state.posts.map((post,index) => {
                        return (
                            <BlogCard title={post.title} content={post.content} post_id={post.post_id} username={this.state.username} entry={index + 1} date={post.date.split("T", 1)} key={index}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}