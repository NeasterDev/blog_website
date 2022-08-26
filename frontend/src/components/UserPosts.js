import React from "react";
import BlogCard from "./BlogCard";

export default class UserPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            id: -1,
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
            this.setState({ ...this.state, username: data.username, posts: data.posts, id: data.id})
        })
    }

    deleteCurrentUser = () => {
        fetch(`http://localhost:8080/api/user/${this.state.id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                console.log("Success: 200")
            }
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
                <div>
                    <button className="mt-4 btn btn-danger" onClick={this.deleteCurrentUser}>DELETE ACCOUNT</button>
                </div>
            </div>
        )
    }
}