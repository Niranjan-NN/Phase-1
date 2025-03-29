import React from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../data";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return <h2 className="not-found">404 - Blog Post Not Found</h2>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
