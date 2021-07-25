import React, { useState, useEffect } from "react";
import newId from "react-id-generator";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListAppUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginForm = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogListAppUser",
        JSON.stringify(user)
      );
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogListAppUser");
    setUser(null);
  };

  const handleBlogForm = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(blog));
      setSuccessMessage(`${blog.title} was successfuly added!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Cannot add the blog, please try again!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLikeButton = async (blog) => {
    const updatedBlog = { ...blog, likes: ++blog.likes };

    try {
      let response = await blogService.updateBlog(updatedBlog);
      if (response === "Post already liked") {
        return alert("Yes, you love this post, but you've already liked it!!!");
      } else {
        setBlogs(blogs.concat());
      }
    } catch (exception) {
      setErrorMessage("Cannot like the blog, please try again!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeleteButton = async (blog) => {
    const blogToDelete = blog;
    let confirmation = window.confirm(`Delete ${blog.title}?`);
    if (confirmation) {
      try {
        await blogService.deleteBlog(blogToDelete);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (exception) {
        setErrorMessage("Cannot delete the blog, please try again!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  if (user === null) {
    return (
      <LoginForm
        handleLoginForm={handleLoginForm}
        errorMessage={errorMessage}
      />
    );
  }
  return (
    <div>
      <div className="flex justify-around items-center border-b-4 p-4 border-gray-600">
        <img src="./images/logo.png" className="w-24 h-24" />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Micro Stories</h1>
        </div>
        <div>
          <p className="mt-4 text-center text-gray-600 font-bold hover:text-black">
            Welcome {user.name}!
          </p>
          <button
            className="mt-4 text-center text-indigo-500 border-indigo-200 hover:border-indigo-500 hover:text-indigo-600 justify-self-end"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {successMessage && <Notification message={successMessage} />}
      {errorMessage && <Notification message={errorMessage} />}

      <Toggleable viewLabel={"Create New Blog"} hideLabel={"Cancel"}>
        <BlogForm handleBlogForm={handleBlogForm} />
      </Toggleable>
      <div className="flex flex-wrap justify-center">
        {blogs.map((blog) => (
          <Blog
            key={newId()}
            blog={blog}
            handleLikeButton={handleLikeButton}
            handleDeleteButton={handleDeleteButton}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
