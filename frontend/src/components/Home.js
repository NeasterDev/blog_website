import React from "react";
import RenderBlogPosts from "./RenderBlogPosts";

export default class Home extends React.Component {


    render() {
        return (
            <div className="">
                <h1 className="mt-4">Most recent posts...</h1>
                <RenderBlogPosts />
            </div>
        );
    }
}