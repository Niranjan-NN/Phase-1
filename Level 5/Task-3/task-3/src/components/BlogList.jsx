import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data";

const BlogList = () => {
  return (
    <div className="container">
      <h1 className="title">Simple Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-card">
          <h2>
            <Link to={`/post/${post.id}`} className="blog-title">
              {post.title}
            </Link>
          </h2>
          <p>{post.shortDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
