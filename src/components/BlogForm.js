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
    <div className="">
      <h2 className=" text-black inline-block text-center text-xl font-bold">
        Add a new blog!
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBlogForm(newBlog);
          setNewBlog({
            title: "",
            author: "",
            url: "",
            likes: 0,
          });
        }}
      >
        <div>
          <h2>Title</h2>
          <input
            type="text"
            className="component border bg-gray-100 px-4 py-2 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded"
            value={newBlog.title}
            name="Title"
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          <h2>Author</h2>
          <input
            type="text"
            className="component border bg-gray-100 px-4 py-2 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded"
            value={newBlog.author}
            name="Author"
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <h2>Url</h2>
          <input
            type="text"
            className="component border bg-gray-100 px-4 py-2 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded"
            value={newBlog.url}
            name="URL"
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button
          className="component border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-2 focus:outline-none focus:shadow-outline bg-blue-500 text-gray-100 hover:bg-blue-600 hover:text-gray-200"
          type="submit"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogForm: PropTypes.func.isRequired,
};

export default BlogForm;
