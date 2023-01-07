import { useEffect, useState } from "react";
import { getListTodos, getTodos, login } from "../service";

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
      console.log(res);
      console.log(res);
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

  useEffect(() => {
    getData();
  }, [update]);

  return { list };
};
