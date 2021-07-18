import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blogToDelete.id}`, config);
};

const blogService = { getAll, setToken, createBlog, updateBlog, deleteBlog };

export default blogService;
