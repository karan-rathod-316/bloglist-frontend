import React, { useState, useEffect, useRef } from "react";
import newId from "react-id-generator";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import signupService from "./services/signup";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Togglable";

const App = () => {
  // state management
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState("Login");

  const blogFormRef = useRef();

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

  // login & signup form switcher
  const formSwitch = (e) => {
    e.preventDefault();
    form === "Login" ? setForm("Signup") : setForm("Login");
  };

  // form and interaction functions
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

  const handleSignupForm = async (username, name, password) => {
    try {
      await signupService.signup({
        username,
        name,
        password,
      });
      setSuccessMessage("Account successfuly created!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(
        "Couldn't create a new user. Ensure that the username and password are more than 4 characters long!"
      );
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
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(blog));
      setSuccessMessage(`${blog.title} was successfuly added!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage(
        "Cannot add the blog, please ensure all the details are entered correctly!"
      );
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
        return alert(
          "Yes, we get it, you really like this post! But you've already clicked on the like button!!!"
        );
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
  // display login form if user is null
  if (user === null) {
    return (
      <>
        {form === "Login" && (
          <LoginForm
            handleLoginForm={handleLoginForm}
            errorMessage={errorMessage}
          />
        )}
        {form === "Signup" && (
          <SignupForm
            handleSignupForm={handleSignupForm}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        )}
        <div className="text-center">
          <button
            className="mt-4 text-center text-blue-500 border-indigo-200 hover:border-blue-500 hover:text-blue-600"
            onClick={formSwitch}
          >
            {form === "Login" ? "Signup" : "Login"}
          </button>
        </div>
      </>
    );
  }
  return (
    // display blogs if user is logged in
    <div>
      <Header handleLogout={handleLogout} name={user.name} />

      <Toggleable
        viewLabel={"Create New Blog"}
        hideLabel={"Cancel"}
        ref={blogFormRef}
      >
        <BlogForm handleBlogForm={handleBlogForm} />
      </Toggleable>

      {successMessage && <Notification message={successMessage} />}
      {errorMessage && <Notification message={errorMessage} />}

      <div className="flex flex-wrap justify-center">
        {blogs.map((blog) => {
          const isCreator = blog.user.username === user.username;
          return (
            <Blog
              key={newId()}
              blog={blog}
              handleLikeButton={handleLikeButton}
              handleDeleteButton={handleDeleteButton}
              isCreator={isCreator}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
