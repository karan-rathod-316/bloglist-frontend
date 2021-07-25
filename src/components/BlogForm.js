import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleBlogForm }) => {
  let [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });
  return (
    <>
      <h2 className="border-b-2 text-black inline-block text-center text-xl font-bold">
        Create a new micro story!
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleBlogForm(newBlog);
        }}
      >
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="URL"
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">Submit Blog</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleBlogForm: PropTypes.func.isRequired,
};

export default BlogForm;
