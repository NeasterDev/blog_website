import React from "react";
import { Link } from "react-router-dom";

export default class BlogCard extends React.Component {
  // When I click the read more button:
  // It should direct me to a page to view a single blog entry
  // It should place the post_id in the url
  // The viewSinglePost page should make a request for the blog post to the server
  // and also display it

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      entry: this.props.entry,
      date: this.props.date,
    }
  }


  render() {
    return (
      <div className="col-4 mb-2 card-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <strong>{this.props.title}</strong>
            </h5>
            <p className="card-text">{this.props.content}</p>
          </div>
                {/* /currentpath/username/postId/entryNumber                         */}
          <Link to={`/blogposts/${this.state.username}/${this.props.post_id}/${this.props.entry}`}>
            <button className="btn btn-light w-100">Read more</button>
          </Link>

        </div>
        <div className="date">
          <span>Entry #{this.state.entry} from {this.state.username} created on </span><span>{this.state.date}</span>
        </div>

      </div>
    );
  }
}
