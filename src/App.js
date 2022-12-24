import logo from "./logo.svg";
import "./App.scss";
import Text from "./component/Text";
import Button from "./component/Button";
import { useEffect, useState } from "react";
import { getTodos, login } from "./service";
import Card from "./component/Card";
import { theme } from "./utils";
import PopUp from "./molecules/PopUp";
import Modal from "./component/Modal";

function App() {
  const [todo, setTodo] = useState();
  const [row, setRow] = useState();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState({ state: false, detail: "" });
  const [update, setUpdate] = useState(false);
  const [modalType, setModalType] = useState("");

  //getting todo data begin with login
  useEffect(() => {
    login().then(() =>
      getTodos().then((e) => {
        setTodo(e.data);
        setReady(true);
      })
    );
  }, []);

  //getting todo data w/out login when update
  useEffect(() => {
    if (ready === true)
      getTodos().then((e) => {
        setTodo(e.data);
      });
  }, [update]);

  // save todo id
  useEffect(() => {
    if (todo) {
      let arr = [];
      todo.map((e) => {
        arr.push(e.id);
      });
      setRow(arr);
    }
  }, [todo]);

  //handle open modal
  const handleOpen = (ev, detail) => {
    setOpen({ state: true, detail: detail });
    setModalType(ev);
  };

  //handle close modal
  const handleClose = (ev) => {
    if (ev) setUpdate(!update);
    setOpen({ state: false, detailId: "" });
  };

  //select render modal
  const renderModal = (type) => {
    switch (type) {
      case "create":
        return (
          <Modal
            type={"create"}
            id={open.detail}
            title={"Create Task"}
            handleClose={handleClose}
            open={open.state}
          />
        );
      case "edit":
        return (
          <Modal
            type={"edit"}
            detail={open.detail}
            title={"Edit Task"}
            handleClose={handleClose}
            open={open.state}
          />
        );
      case "delete":
        return (
          <Modal
            id={todo}
            type={"delete"}
            title={"Delete Task"}
            detail={open.detail}
            handleClose={handleClose}
            open={open.state}
          />
        );
    }
  };

  //return
  return (
    <>
      <PopUp handleClose={handleClose} open={open.state}>
        {renderModal(modalType)}
      </PopUp>
      <div className="task">
        <div className="task-header">
          <Text bold size={"big"}>
            Product Roadmap
          </Text>
          <Button icon={"plus.svg"}>Add New Group</Button>
        </div>
        <div className="task-main">
          {todo?.map((itm, idx) => (
            <Card
              handleOpen={handleOpen}
              theme={theme[idx]}
              key={idx}
              data={itm}
              update={update}
              row={row}
              handleClose={handleClose}
            />
          ))}
          {!todo && <Text>Loading</Text>}
        </div>
      </div>
    </>
  );
}

export default App;
