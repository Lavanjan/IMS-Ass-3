import api from "./axios";

const getAllItems = async (id) => {
  return new Promise((resolve, reject) => {
    api("get", null, `/item`, null, null, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createItem = async (body) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/item`, null, body, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateItem = async (id, body) => {
  return new Promise((resolve, reject) => {
    api("put", null, `/item/${id}`, null, body, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const removeItem = async (id) => {
  return new Promise((resolve, reject) => {
    api("delete", null, `/item/${id}`, null, null, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const signIn = async (body) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/user/login`, null, body, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const signup = async (body) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/user/register`, null, body, null)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAllItems, createItem, updateItem, removeItem, signIn, signup };
