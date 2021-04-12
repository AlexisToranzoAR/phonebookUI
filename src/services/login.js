import axios from "axios";

const baseUrl = "https://frozen-temple-36424.herokuapp.com/api/login";

export async function login(credentials) {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
}
