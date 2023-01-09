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
  const [boardTarget, setboardTarget] = useState({});
  const [swap, setSwap] = useState({ src: "", target: "" });
  const [manipulated, setManipulated] = useState();

  //get list todo
  let { list, changeList } = useGetListTodo(data.id, update, manipulated, swap);

  const doSetListTarget = (id, todo_id) => {
    setSwap({ src: "", target: { id: Number(id), todo_id: Number(todo_id) } });
  };
  console.log(swap)
  useEffect(() => {
    if (swap.target.todo_id === swap.src.todo_id) changeList();
  }, [swap]);

  //handle move
  const handleMove = async (data) => {
    await editListTodos(
      data.todo_id,
      {},
      data.id,
      boardTarget.id,
      props?.bearer
    );
    return handleClose(true);
  };

  // handle drop
  const handleDrop = (event) => {
    const ok = JSON.parse(event.dataTransfer.getData("data"));
    setSwap({
      ...swap,
      src: { id: Number(ok.order), todo_id: Number(ok.todo_id) },
    });
    setManipulated(true);
    if (ok.todo_id === boardTarget.id)
      return document.getElementById(ok.divId)?.classList.remove("list-drag");
    return handleMove(ok);
  };

  // handle dragover
  const handleDragOver = (event) => {
    event.preventDefault();
    return setboardTarget(data);
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
      <div className="listWrap">
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
            doSetListTarget={doSetListTarget}
            index={idx}
          />
        ))}
        {list.length === 0 && (
          <div className="card-list-nolist">
            <Text color="#757575">No Task</Text>
          </div>
        )}
      </div>
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
