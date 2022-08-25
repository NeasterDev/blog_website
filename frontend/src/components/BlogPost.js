import React from "react";
import { Link } from "react-router-dom";
export default class BlogPost extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    // state declared for title and content of blog post
    this.state = {
      title: "",
      content: "",
      msg: "",
    };
  }
  // updates state of title when it changes
  onTitleChange = (e) => {
    this.setState({ ...this.state, title: e.target.value });
  };
  // updates state of content when it changes
  onContentChange = (e) => {
    this.setState({ ...this.state, content: e.target.value });
  };

  // saves a blog post to the database
  saveBlogPost = (e) => {
    // server call to save blog post
    this.setState({ ...this.state, msg: "Submitting..." });
    fetch(`http://localhost:8080/api/user/post`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"), // JWT token necessary to make server requests
      },
      method: "POST", // tells the server this is a post request
      body: JSON.stringify({
        title: this.state.title, // sends the title from state to the server
        content: this.state.content, // sends the content from state to the server
      }),
    })
      .then(res => {
        if (res.ok) {
          console.log("success: 200");
          this.setState({ ...this.state, msg: "Submitted!" });
        }
      })
  };

  render() {
    return (
      <div>
        <h2 className="h2 mt-2">
          <strong>Create new post</strong>
        </h2>
        <label htmlFor="name" className="form-label">
          Title:{" "}
        </label>
        <input
          className="form-control w-25 mx-auto"
          onChange={this.onTitleChange}
          type="text"
          name="title"
        />
        <br />

        <label htmlFor="content" className="form-label">
          Content:{" "}
        </label>
        <textarea
          className="form-control w-50 mx-auto"
          onChange={this.onContentChange}
          name="content"
        />
        <br />

        <button onClick={this.saveBlogPost}>Submit</button>
        <p style={{ color: "blue" }}>{this.state.msg}</p>
        <br />
        <hr />
        <Link to="/blogposts">View posts</Link>
      </div>
    );
  }
}
