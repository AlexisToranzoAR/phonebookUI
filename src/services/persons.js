import axios from "axios";

const baseUrl = "https://frozen-temple-36424.herokuapp.com";

export function getPersons() {
  return axios.get(`${baseUrl}/api/persons`).then(function (response) {
    return response.data;
  });
}

export function postPerson(person, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${baseUrl}/api/persons`, person, config)
    .then((response) => response)
    .catch(function (error) {
      return new Error(error);
    });
}

export function deletePerson(id) {
  return axios
    .delete(`${baseUrl}/api/persons/${id}`)
    .then((response) => response);
}

export function putPerson(id, person) {
  return axios
    .put(`${baseUrl}/api/persons/${id}`, person)
    .then((response) => response);
}
