import React from "react";
import BlogCard from "./BlogCard";

export default class RenderBlogPosts extends React.Component {
  // This component will render the blog posts

  // constructor
  constructor(props) {
    super(props);
    // sets state to an empty array to hold the data for the blog posts
    this.state = {
      blogPosts: [],
    };
  }

  // method to retreive all blog posts from the database
  getBlogPosts = async () => {
    // fetch the server to retreive data from database
    const posts = await fetch("http://localhost:8080/api/blog/posts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), //JWT necessary to make calls to the server
      },
      method: "GET", //declare this as a get request
    })
      .then((res) => res.json()) // set the response to json
      .then((data) => {
        console.log(data);
        this.setState({ ...this.state, blogPosts: data }); // set the blog post state as the data retreived from the server
      });
    return posts;
  };

  // When the component is mounted
  componentDidMount() {
    console.log("Component Mounted");
    this.getBlogPosts(); // retreive the blog posts from the database
  }

  render() {
    return (
      <div className="mt-2 row">
        {this.state.blogPosts ? (
          this.state.blogPosts.reverse().map((post, index) => (
            <BlogCard title={post.title} content={post.content} key={index}/>
          ))
        ) : (
          <div>No Posts</div>
        )}
      </div>
    );
  }
}
