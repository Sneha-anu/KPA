import axios from "axios";

axios.defaults.baseURL = "https://kpa-backend.herokuapp.com";

export function fetchUserProfile() {
  return axios.get("/user");
}

export function fetchUsersWithKpa() {
  return axios.all([axios.get("/user"), axios.get("/kpaCreation")]);
}
export function updateUserProfile(url, data) {
  return axios.patch(url, data);
}
