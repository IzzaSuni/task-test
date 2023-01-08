import { useEffect, useState } from "react";
import { useGetListTodo } from "../../hooks";
import { editListTodos, getListTodos } from "../../service";
import Button from "../Button";
import Label from "../Label";
import List from "../List";
import Text from "../Text";

export default function Card({
  data,
  theme = 1,
  handleOpen = () => {},
  update,
  row,
  handleClose = () => {},
  ...props
}) {
  const [target, setTarget] = useState({});

  //get list todo
  const { list } = useGetListTodo(data.id, update);

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

  const handleMove = async (data) => {
    await editListTodos(
      data.todo_id,
      {},
      data.id,
      target.id,
      props?.bearer
    );
    return handleClose(true);
  };

  // handle drop
  const handleDrop = (event) => {
    const ok = JSON.parse(event.dataTransfer.getData("data"));
    if (ok.todo_id === target.id) return;
    return handleMove(ok);
  };

  // handle dragover
  const handleDragOver = (event) => {
    event.preventDefault();
    return setTarget(data);
  };

  //return
  return (
    <div
      id={data.id}
      className="card"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
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
