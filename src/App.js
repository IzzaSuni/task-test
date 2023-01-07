import "./App.scss";
import Text from "./component/Text";
import Button from "./component/Button";
import { useState } from "react";
import Card from "./component/Card";
import { theme } from "./utils";
import PopUp from "./molecules/PopUp";
import Modal from "./component/Modal";
import { useGetTodo } from "./hooks";

function App() {
  const [open, setOpen] = useState({ state: false, detail: "" });
  const [update, setUpdate] = useState(false);
  const [modalType, setModalType] = useState("");
  //hooks for getting data
  const { row, todo } = useGetTodo();

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

  // refactor
  //select render modal
  const renderModal = (type) => {
    const firstText = `${type[0]?.toUpperCase() + type?.substring(1)}`;
    const detail = type === "create" ? { id: open.detail } : open.detail;
    return (
      <Modal
        type={type}
        title={`${firstText} Task`}
        handleClose={handleClose}
        open={open.state}
        detail={detail}
      />
    );
  };

  // handle repeat index too choose theme index so it will always 0,1,2,3
  const handleRepeat = (idx) => {
    const multiple = Math.floor(idx / 4);
    return idx < 4 ? idx : idx - 4 * multiple;
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
          {todo?.map((itm, idx) => {
            const repeatedId = handleRepeat(idx);
            return (
              <Card
                handleOpen={handleOpen}
                theme={theme[repeatedId]}
                key={idx}
                data={itm}
                update={update}
                row={row}
                handleClose={handleClose}
              />
            );
          })}
          {todo?.length === 0 && <Text>Loading...</Text>}
        </div>
      </div>
    </>
  );
}

export default App;
