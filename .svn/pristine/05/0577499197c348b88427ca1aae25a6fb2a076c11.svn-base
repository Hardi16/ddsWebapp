import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./Styles.module.css";

const EditDraggableSectionModal = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [secName, setSecName] = useState("");
  const handlEdit = () => {
    let obj = props.secHeadings;
    obj[props.secName] = secName;
    props.setSecHeadings(obj);
    localStorage.setItem("secHeadings", JSON.stringify(obj));
    props.setCardsString(props.secName + "" + secName);
    setSmShow(false);
  };
  return (
    <>
      <button onClick={() => setSmShow(true)} className={classes.pencilBtn}>
        <img
          className={classes.pencilImg}
          // src="https://i.ya-webdesign.com/images/pencil-icon-png-2.png"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pencil_icon_vector.svg/1280px-Pencil_icon_vector.svg.png"
        />
      </button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>
          <div className={classes.grpNameDiv}>
            <input
              type="text"
              placeholder={
                JSON.parse(localStorage.getItem("secHeadings"))[props.secName]
              }
              className={classes.secNameEditTextbox}
              onChange={(e) => {
                setSecName(e.target.value);
              }}
              autoFocus
            ></input>
            <Button
              variant="warning"
              onClick={() => {
                handlEdit();
              }}
            >
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditDraggableSectionModal;
