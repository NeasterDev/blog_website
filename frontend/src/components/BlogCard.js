import React from "react";

export default class BlogCard extends React.Component {
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
            <button className="btn btn-light">Read more</button>
          </div>
        </div>
    );
  }
}
