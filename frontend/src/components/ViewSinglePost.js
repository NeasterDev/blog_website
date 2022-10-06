import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// made this a function based class so that I could use useParams()
const ViewSinglePost = ({ loggedInUser }) => {
  const { id, username, entry } = useParams(); // gets the id from the url parameter

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(id);

  const [stateUsername, setStateUsername] = useState(username);
  const [blogEntryNumber, setBlogEntryNumber] = useState(entry);

  const [loggedInUserState, setLoggedInUserState] = useState(loggedInUser);
  const [isUserPost, setUserPost] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [editMsg, setEditMsg] = useState("");

  // retreive blog post from the server/db
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

  //checks if the post they are viewing is the current users
  useEffect(() => {
    getSingleBlogPost();
    if (loggedInUserState.toString() === username.toString()) {
      setUserPost(true);
    } else {
      setUserPost(false);
    }
  }, []);

  // fetch route to edit post
  const editPost = () => {
    if (isEdit) {
      setIsEdit(false);
      fetch(`http://localhost:8080/api/user/updatepost/${postId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
      }).then((res) => {
        if (res.ok) {
          setEditMsg("Edit Success!");
        } else {
          setEditMsg("Something went wrong...");
        }
      });
    } else {
      setIsEdit(true);
      if (editMsg) {
        setEditMsg("");
      }
    }
  };

  const deletePost = () => {
    fetch(`http://localhost:8080/api/blog/${postId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setEditMsg("Deleted!");
      } else {
        setEditMsg("Something went wrong...");
      }
    });
  };

  return (
    <div className="container">
      {/* <button onClick={getSingleBlogPost}>Click</button> */}
      <div className="single-post">
        <div className="single-post-title">
          {isEdit ? (
            <input
              className="form-control"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
            />
          ) : (
            <h1>{title}</h1>
          )}
        </div>
        {isEdit ? (
          <textarea
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={content}
          />
        ) : (
          <div className="content">
            <p>{content}</p>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <div>
          Blog entry #{blogEntryNumber} from {stateUsername}
        </div>
        <div>
          {isUserPost ? (
            <div className="d-flex">
              <div className="mx-2">
                <button
                  className={isEdit ? "btn btn-success" : "btn btn-warning"}
                  onClick={editPost}
                >
                  {isEdit ? "Complete Edit" : "Edit"}
                </button>
              </div>
              <div className="mx-2">
                <button className="btn btn-danger" onClick={deletePost}>Delete</button>
              </div>
              <br />
              {editMsg}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewSinglePost;
