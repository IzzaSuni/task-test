import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://todo-api-18-140-52-65.rakamin.com",
});
export const login = () => {
  return customAxios
    .post("/auth/login", {
      email: "Izza@Izza.com",
      password: "passwordIzza",
    })
    .then((data) => data.data["auth_token"])
    .catch((err) => err);
};

export const getTodos = () => {
  return customAxios({
    method: "GET",
    url: "/todos",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data.data)
    .catch((err) => err);
};

export const getListTodos = (id, detailId) => {
  return customAxios({
    method: "GET",
    url: `/todos/${id}/items/${detailId ? detailId : ""}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data)
    .catch((err) => err);
};

export const postListTodos = (id, data, bearer) => {
  return customAxios({
    method: "POST",
    url: `/todos/${id}/items`,
    headers: {
      Authorization: `Bearer ${
        bearer ? bearer : localStorage.getItem("token")
      }`,
    },
    data: data,
  })
    .then((data) => data)
    .catch((err) => err);
};

export const editListTodos = (id, data, targetId, target) => {
  return customAxios({
    method: "PATCH",
    url: `/todos/${id}/items/${targetId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { target_todo_id: target ? target : id, ...data },
  })
    .then((data) => data)
    .catch((err) => err);
};

export const deleteListTodos = (id, targetId) => {
  return customAxios({
    method: "DELETE",
    url: `/todos/${id}/items/${targetId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data)
    .catch((err) => err);
};
