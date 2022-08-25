import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// made this a function based class so that I could use useParams()
const ViewSinglePost = ({loggedInUser}) => {
  console.log(loggedInUser)
  const { id, username, entry } = useParams(); // gets the id from the url parameter

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(id);

  const [stateUsername, setStateUsername] = useState(username);
  const [blogEntryNumber, setBlogEntryNumber] = useState(entry);

  const [loggedInUserState, setLoggedInUserState] =  useState(loggedInUser)
  const [isUserPost, setUserPost] = useState(false);

  const getSingleBlogPost = () => {
    fetch(`http://localhost:8080/api/blog/${postId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
  };

  useEffect(() => {
    getSingleBlogPost();
    if (loggedInUserState.toString() === username.toString()) {
      setUserPost(true);
    } else {
      setUserPost(false);
    }
  }, []);

  const editPost = () => {
    
  }

  return (
    <div className="container">
      {/* <button onClick={getSingleBlogPost}>Click</button> */}
      <div className="single-post">
        <div className="single-post-title">
          <h1>{title}</h1>
        </div>
        <p>{content}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          Blog entry #{blogEntryNumber} from {stateUsername}
        </div>
        <div>
          {isUserPost ? <button className="btn btn-danger" onClick={editPost}>Edit</button> : null}
        </div>
      </div>
    </div>
  );
};

export default ViewSinglePost;
