import { useState } from "react";
import { useModalHooks } from "../../hooks";
import Button from "../Button";
import Input from "../Input";
import Text from "../Text";

export default function Modal({
  handleClose = () => {},
  open,
  type,
  detail,
  ...props
}) {
  const [value, setValue] = useState({ name: "", progress_percentage: 0 });

  // change value from hooks
  const handleChangeFromHooks = (val) => {
    if (typeof val.name === "string") setValue(val);
  };

  // hooks
  const { postData } = useModalHooks(
    handleClose,
    detail,
    open,
    handleChangeFromHooks
  );

  // handle change value
  const handleChange = (event) => {
    let values = event.target.value;
    const name = event.target.name;
    if (name === "progress_percentage") {
      values = parseInt(values);
      if (values >= 100) return setValue({ ...value, [name]: 100 });
      if (!values || values <= 0) return setValue({ ...value, [name]: 0 });
    }
    setValue({ ...value, [name]: values });
  };

  // handle submit
  const handleSubmit = () => {
    postData(type, detail, value, props.bearer);
  };

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
                {`${type[0]?.toUpperCase() + type?.substring(1)} Task`}
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
              {`${type[0]?.toUpperCase() + type?.substring(1)} Task`}
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
