import { useEffect, useState } from "react";
import {
  deleteListTodos,
  editListTodos,
  getListTodos,
  getTodos,
  login,
  postListTodos,
} from "../service";

export const useGetTodo = (update, Todo) => {
  const [todo, setTodo] = useState([]);
  const [row, setRow] = useState([]);
  const isToken = localStorage.getItem("token");
  const getData = async () => {
    try {
      if (!isToken) {
        const token = await login();
        if (token) localStorage.setItem("token", token);
      }
      const res = await getTodos();
      if (res) {
        const arr = [];
        res?.map((item) => arr.push(item.id));
        setTodo(res);
        return setRow(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { todo, row };
};
export const useGetListTodo = (id, update) => {
  const [list, setList] = useState([]);
  const getData = async () => {
    try {
      const res = await getListTodos(id);
      if (!res) return;
      if (res) {
        return setList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeList = (value) => {
    setList(value);
  };

  useEffect(() => {
    getData();
  }, [update]);

  return { list, changeList };
};
export const useModalHooks = (close, detail, open, changeValue) => {
  const postData = async (type, details, value, bearer) => {
    try {
      if (type === "create") {
        await postListTodos(details.id, value, bearer);
        // return changeValue()
      } else if (type === "edit") {
        await editListTodos(details.todo_id, value, details.id, "", bearer);
      } else if (type === "delete") {
        await deleteListTodos(details.todo_id, details.id, bearer);
      }
      return close(true);
    } catch (err) {
      console.log(err);
      return close(true);
    }
  };
  useEffect(() => {
    if (open) {
      changeValue({ name: "", progress_percentage: 0 });
    }
    if (detail)
      changeValue({
        name: detail.name,
        progress_percentage: detail.progress_percentage,
      });
  }, [open, detail]);

  return { postData };
};
