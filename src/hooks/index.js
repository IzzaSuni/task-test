import _ from "lodash";
import { useEffect, useState } from "react";
import {
  deleteListTodos,
  editListTodos,
  getListTodos,
  getTodos,
  login,
  postListTodos,
} from "../service";
import { swapMovePosition, swapPosition } from "../utils";

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
export const useGetListTodo = (id, update, manipulate, swap) => {
  const [list, setList] = useState([]);
  const getData = async () => {
    try {
      const res = await getListTodos(id);
      if (!res) return;
      if (res) {
        const arr = res.data;
        const arrId = [];
        const oldArrayId = [];
        arr.map((e) => arrId.push(e.id));
        list.map((e) => oldArrayId.push(e.id));
        const updatedId = arrId.filter((newId) => !oldArrayId.includes(newId));
        if (updatedId && manipulate) {
          const objNew = arr.find((e) => e.id === updatedId[0]);
          setList(arr);
          return changeList(objNew);
        }
        return setList(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeList = (objNew) => {
    if (typeof swap.src.id === "number" && typeof swap.target.id === "number") {
      if (swap.src.todo_id === swap.target.todo_id) {
        const { newArr } = swapPosition(list, swap.src.id, swap.target.id);
        setList(newArr);
      } else {
        if (objNew) {
          const { newArr2 } = swapMovePosition(list, swap.target.id, objNew);
          setList(newArr2);
        }
      }
    }
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
