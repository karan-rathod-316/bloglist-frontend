import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Blog = ({ blog, handleLikeButton, handleDeleteButton, user }) => {
  let isCreator = blog.user.username === user.username;
  return (
    <div className="m-4 p-4 flex w-1/4 flex-col text-center justify-center border-2 border-yellow-200 rounded-lg shadow-lg">
      <h3 className="text-black font-semibold underline">
        Title: {blog.title}
      </h3>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <div className="w-full mt-4 justify-self-between flex justify-between">
        <AwesomeButton type="secondary" onPress={() => handleLikeButton(blog)}>
          Like!
        </AwesomeButton>
        {isCreator && (
          <button
            className="w-15 text-center   rounded font-semibold tracking-wide text-sm px-2 py-2 focus:outline-none focus:shadow-outline text-red-500 hover:bg-red-600 hover:text-red-200"
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

export default Blog;
