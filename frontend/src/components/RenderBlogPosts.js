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
    const posts = await fetch("http://localhost:8080/api/user/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), //JWT necessary to make calls to the server
      },
      method: "GET", //declare this as a get request
    })
      .then((res) => res.json()) // set the response to json
      .then((data) => {
        //console.log(data);
        let blogPosts = [];
        data.forEach(user => {
          const username = user.username;
          user.posts.forEach((post, index) => {
            blogPosts.push({
              title: post.title,
              content: post.content,
              entry: index + 1,
              username: username,
              post_id: post.post_id,
              date: post.date
            })
          });
        });
        // blogPosts = blogPosts[0];
        // console.log(blogPosts);
        blogPosts.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        });
        // blogPosts.forEach(post => {
        //   let date = post.date.split("T");
        //   console.log(date);
        // })
        this.setState({ ...this.state, blogPosts: blogPosts }); // set the blog post state as the data retreived from the server
      });
    return posts;
  };

  // When the component is mounted
  componentDidMount() {
    this.getBlogPosts(); // retreive the blog posts from the database
  }

  render() {
    return (
      <div className="mt-2 row">
        {this.state.blogPosts ? (
          this.state.blogPosts.map((post, index) => {
            return (
            <BlogCard title={post.title} content={post.content} post_id={post.post_id} username={post.username} entry={post.entry} date={post.date.split("T", 1)} key={index}/>
          )})
        ) : (
          <div>No Posts</div>
        )}
      </div>
    );
  }
}
