import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeButton, handleDeleteButton, isCreator }) => {
  return (
    <div className="blog m-4 p-4 flex w-full md:w-1/3 lg:w-1/4 flex-col text-center justify-center border-2 border-yellow-200 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-2xl">
      <h3 className="title text-black font-semibold underline">
        Title: {blog.title}
      </h3>
      <p className="author">Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <div className="w-full mt-4 justify-self-between flex justify-between">
        <AwesomeButton
          className="like-button"
          type="secondary"
          onPress={() => handleLikeButton(blog)}
        >
          Like!
        </AwesomeButton>
        {isCreator && (
          <button
            className="delete-botton w-15 text-center rounded font-semibold tracking-wide text-sm px-2 py-2 focus:outline-none focus:shadow-outline text-red-500 hover:bg-red-600 hover:text-red-200"
            onClick={() => {
              handleDeleteButton(blog);
            }}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeButton: PropTypes.func.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired,
};

export default Blog;
