import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteListTodos,
  editListTodos,
  getListTodos,
  postListTodos,
} from "../../service";
import Button from "../Button";
import Input from "../Input";
import Text from "../Text";

export default function Modal({ title, handleClose, open, type, id, detail }) {
  const [value, setValue] = useState({ name: "", progress_percentage: 0 });

  // handle change value
  const handleChange = (event) => {
    const values = event.target.value;
    const name = event.target.name;
    if (name === "progress_percentage") {
      if (values >= 100) return setValue({ ...value, [name]: 100 });
    }
    setValue({ ...value, [name]: values });
  };

  // handle reset value when close popup
  useEffect(() => {
    if (open === false) {
      setValue({ name: "", progress_percentage: 0 });
    }
  }, [open]);

  // handle submit
  const handleSubmit = () => {
    if (type === "create") {
      return postListTodos(id, value).then(() => handleClose(true));
    } else if (type === "edit") {
      return editListTodos(detail.todo_id, value, detail.id).then(() =>
        handleClose(true)
      );
    } else if (type === "delete") {
      return deleteListTodos(detail.todo_id, detail.id).then(() =>
        handleClose(true)
      );
    }
  };

  //handle set default value when click setting
  useEffect(() => {
    if (detail)
      setValue({
        name: detail.name,
        progress_percentage: detail.progress_percentage,
      });
  }, [detail]);

  //select type of modal
  switch (type) {
    case "delete":
      return (
        <div className="modal-delete">
          <div
            className="align-center justify-between"
            style={{ marginBottom: "16px" }}
          >
            <div className="align-center">
              <img
                src="/assets/Exclamation.svg"
                width={"24px"}
                style={{ marginRight: "8px" }}
                onClick={handleClose}
              />
              <Text size={"big"} bold>
                {title}
              </Text>
            </div>
            <img
              src="/assets/close.svg"
              className="modal-close"
              onClick={handleClose}
            />
          </div>
          <Text size={"medium"}>
            Are you sure want to delete this task? your action can’t be
            reverted.
          </Text>
          <div className="modal-wrap-button">
            <Button onClick={handleClose} type={"secondary"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type={"danger"}>
              Delete
            </Button>
          </div>
        </div>
      );

    //render edit and create
    default:
      return (
        <div className="modal">
          <div className="align-center justify-between">
            <Text size={"big"} bold style={{ marginBottom: "8px" }}>
              {title}
            </Text>
            <img
              src="/assets/close.svg"
              className="modal-close"
              onClick={handleClose}
            />
          </div>
          <Input
            onChange={handleChange}
            label="Task Name"
            width="100%"
            name={"name"}
            value={value.name}
            placeholder="Type your Task"
          />
          <Input
            name="progress_percentage"
            label="Progress"
            width="143px"
            type={"number"}
            onChange={handleChange}
            min={0}
            max={100}
            style={{ color: "white" }}
            shadow
            value={value.progress_percentage}
          />
          <div className="modal-wrap-button">
            <Button onClick={handleClose} type={"secondary"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type={"primary"}>
              Save Task
            </Button>
          </div>
        </div>
      );
  }
}
