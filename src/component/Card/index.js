import { Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { editListTodos, getListTodos } from "../../service";
import Button from "../Button";
import Label from "../Label";
import List from "../List";
import ProgressBar from "../ProgressBar";
import Text from "../Text";

export default function Card({
  data,
  theme,
  handleOpen,
  update,
  row,
  handleClose,
}) {
  const [list, setList] = useState([]);
  const [target, setTarget] = useState({});

  //get list todo
  useEffect(() => {
    getListTodos(data.id).then((val) => setList(val.data));
  }, [update]);

  //render list
  const renderList = () => {
    return (
      <>
        {list?.map((itm, idx) => (
          <List
            key={idx}
            progress={`${itm?.progress_percentage}%`}
            listTitle={itm?.name}
            handleOpen={handleOpen}
            detail={itm}
            row={row}
            id={data.id}
            handleCloses={handleClose}
          />
        ))}
        {list.length === 0 && (
          <div className="card-list-nolist">
            <Text color="#757575">No Task</Text>
          </div>
        )}
      </>
    );
  };

  const handleMove = (data) => {
    return editListTodos(data.todo_id, {}, data.id, target).then(() =>
      handleClose(true)
    );
  };

  //return
  return (
    <div
      id={data.id}
      className="card"
      onDrop={(ev) => {
        const ok = JSON.parse(ev.dataTransfer.getData("data"));
        return handleMove(ok);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setTarget(data.id);
      }}
      style={{
        background: theme.background,
        border: `1px solid ${theme.border}`,
      }}
    >
      <Label desc={data?.description} theme={theme} title={data?.title} />
      <div className="listWrap">{renderList()}</div>
      <Button
        type="base"
        style={{ marginTop: "8px" }}
        icon={"/plus-circle.svg"}
        className="align-center"
        buttonStyle={{ width: "25px", paddingRight: "5px" }}
        onClick={() => handleOpen("create", data.id)}
      >
        New task
      </Button>
    </div>
  );
}
