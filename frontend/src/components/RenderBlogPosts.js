import React from "react";

export default class RenderBlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
    };
  }

  getBlogPosts = async () => {
    const posts = await fetch("http://localhost:8080/api/blog/posts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ ...this.state, blogPosts: data });
      });
      return posts;
  };

  componentDidMount() {
    console.log("Component Mounted");
    this.getBlogPosts();
  }

  render() {
    return (
      <div>
        {this.state.blogPosts ? this.state.blogPosts.map((post, index) => (
          <div key={index}>{post.title}<br/><hr/>{post.content}</div>
        )) : <div>No Posts</div>}
      </div>
    );
  }
}
