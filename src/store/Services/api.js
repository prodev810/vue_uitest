import axios from "axios";

const urlPrefix = process.env.VUE_APP_API_URL;

export function setHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        axios.defaults.headers.common['Authorization'] = '';
    }
}

export async function get(subURL) {
  return axios.get(urlPrefix + subURL)
      .then((response) => {
        return response.data;
      }).catch((error) => {
        console.warn("Error GET" + error);
        return error;
      });
}

export async function post(subURL, data) {
  return axios.post(urlPrefix + subURL, data)
    .then((response) => {
      return response.data
    }).catch((error) => {
      console.warn("Error POST" + error);
      return error;
    });
}

export async function put(subURL, data) {
  return axios.put(urlPrefix + subURL, data)
    .then((response) => {
      return response.data
    }).catch((error) => {
      console.warn("Error PUT" + error);
      return error;
    });
}

export async function deleteAPI(subURL) {
  return axios.delete(urlPrefix + subURL)
    .then((response) => {
      return response.data
    }).catch((error) => {
      console.warn("Error DELETE" + error);
      return error;
    });
}
