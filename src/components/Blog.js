import React from "react";
import Toggleable from "./Togglable";

const Blog = ({ blog, handleLikeButton, handleDeleteButton }) => {
  return (
    <div>
      <h3>title: {blog.title}</h3>
      <Toggleable viewLabel={"View"} hideLabel={"Hide"}>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
      </Toggleable>
      <p>
        likes: {blog.likes}
        <button onClick={() => handleLikeButton(blog)}>like</button>
      </p>

      <button onClick={() => handleDeleteButton(blog)}>remove</button>
    </div>
  );
};

export default Blog;
