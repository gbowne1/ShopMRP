import API from "../api";
import authHeader from "./auth.header";

const register = (username, email, password) => {
  return API.post(
    "/signup",
    {
      username,
      email,
      password,
    },
    { headers: authHeader() }
  );
};

const login = (username, password) => {
  return API
    .post("/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};