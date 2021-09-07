import axios from "axios";

const client = axios.create({
  withCredentials: true,
  timeout: 30000,
  timeoutErrorMessage: "time out error",
  baseURL: "https://cowket-api.stackunderflow.xyz",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return status < 500;
  },
});

export default client;
