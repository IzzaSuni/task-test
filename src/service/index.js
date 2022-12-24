import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://todo-api-18-140-52-65.rakamin.com",
});
export const login = async () => {
  return await customAxios
    .post("/auth/login", {
      email: "Izza@Izza.com",
      password: "passwordIzza",
    })
    .then((data) => localStorage.setItem("token", data.data["auth_token"]))
    .catch((err) => err);
};

export const getTodos = async () => {
  return await customAxios({
    method: "GET",
    url: "/todos",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data)
    .catch((err) => err);
};

export const getListTodos = async (id, detailId) => {
  return await customAxios({
    method: "GET",
    url: `/todos/${id}/items/${detailId ? detailId : ""}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data)
    .catch((err) => err);
};

export const postListTodos = async (id, data) => {
  return await customAxios({
    method: "POST",
    url: `/todos/${id}/items`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  })
    .then((data) => data)
    .catch((err) => err);
};

export const editListTodos = async (id, data, targetId, target) => {
  return await customAxios({
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

export const deleteListTodos = async (id, targetId) => {
  return await customAxios({
    method: "DELETE",
    url: `/todos/${id}/items/${targetId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => data)
    .catch((err) => err);
};
