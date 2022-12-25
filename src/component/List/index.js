import { Menu, MenuItem } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { editListTodos } from "../../service";
import Icons from "../Icon";
import ProgressBar from "../ProgressBar";
import Text from "../Text";

export default function List({
  id,
  listTitle,
  progress,
  handleOpen,
  detail,
  row,
  handleCloses,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const first = row[0];
  const last = row[row?.length - 1];

  //handle set anchor and open dialog
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //handle close dialog
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handle menu from dialog
  const handleSelect = (type, detail) => {
    handleClose();
    handleOpen(type, detail);
  };

  // handle move list
  const handleMoveList = (id, target, detailId) => {
    editListTodos(id, { target_todo_id: target }, detailId).then(() => {
      handleCloses(true);
      handleClose();
    });
  };

  // handle render menu
  const handleMenu = () => {
    return dialog.map((itm, idx) => {
      if (id === first && itm.type === "left") return;
      if (id === last && itm.type === "right") return;
      const currentRow = row.findIndex((val) => val === id);

      //return handle menu
      return (
        <div
          key={idx}
          className={`align-center dialog-${
            itm.type === "delete" ? "delete" : "item"
          } `}
          onClick={() => {
            if (itm.type === "edit" || itm.type === "delete")
              return handleSelect(itm.type, detail);
            else if (itm.type === "right")
              return handleMoveList(id, row[currentRow + 1], detail.id);
            else if (itm.type === "left")
              return handleMoveList(id, row[currentRow - 1], detail.id);
            else return handleSelect(itm.type);
          }}
        >
          <Icons type={itm.type} />
          <Text className="dialog-text">{itm.text}</Text>
        </div>
      );
    });
  };

  //render menu wrapping
  const renderMenuWrap = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        sx={{
          "& .MuiPopover-paper": {
            boxShadow: "0px 4px 4px rgb(0 0 0 / 8%) !important",
          },
        }}
      >
        <div className="dialog-wrapper">{handleMenu()}</div>
      </Menu>
    );
  };

  //handle is Drag
  const handleIsDrag = (ev) => {
    ev.dataTransfer.setData("data", JSON.stringify(detail));
    ev.target.classList.add("list-drag");
  };
  const handleEndDrag = (ev) => {
    ev.target.classList.remove("list-drag");
  };

  return (
    <>
      <div
        draggable
        className="card-list-element"
        onDragStart={handleIsDrag}
        onDragEnd={handleEndDrag}
      >
        <Text
          color="black"
          bold
          size={"medium"}
          className="card-list-element-title"
        >
          {listTitle}
        </Text>
        <div
          className="align-center justify-between"
          style={{ marginTop: "8px" }}
        >
          <ProgressBar width={progress} />
          <img
            src="/assets/Setting.svg"
            className="setting"
            onClick={handleClick}
          />
        </div>
      </div>
      {renderMenuWrap()}
    </>
  );
}

const dialog = [
  { text: "Move Right", img: "arrow-right.svg", type: "right" },
  { text: "Move Left", img: "arrow-left.svg", type: "left" },
  { text: "Edit", img: "edit-alt.svg", type: "edit" },
  { text: "Delete", img: "trash.svg", type: "delete" },
];
