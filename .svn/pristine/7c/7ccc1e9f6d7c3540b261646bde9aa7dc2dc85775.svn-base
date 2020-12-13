import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./Styles.module.css";

const MakeMediGrpModal = props => {
  const [smShow, setSmShow] = useState(false);
  const [grpName, setGrpName] = useState("");

  const handleSave = () => {
    setSmShow(false);
    let mediObj = JSON.parse(localStorage.getItem("mediObj"));
    let tempArr = [];
    let tempObj =
      JSON.parse(localStorage.getItem("grpObj")) != null
        ? JSON.parse(localStorage.getItem("grpObj"))
        : {};
    for (let medi in mediObj) {
      if (mediObj[medi]) {
        console.log(grpName, " item", medi);
        tempArr.push(medi);
      }
    }
    let grpSel =
      JSON.parse(localStorage.getItem("grpSel")) == null
        ? {}
        : JSON.parse(localStorage.getItem("grpSel"));
    grpSel[grpName] = true;
    localStorage.setItem("grpSel", JSON.stringify(grpSel));

    tempObj[grpName] = tempArr;
    localStorage.setItem("grpObj", JSON.stringify(tempObj));
    let tempBtnHeaderStyleObj = {};
    tempBtnHeaderStyleObj["favs"] = true;
    props.setBtnHeaderStyleObj(tempBtnHeaderStyleObj);
    props.setChecked(grpName, "group");
    props.handleFavourites();
  };
  return (
    <>
      {/* <Button
        variant="success"
        className={classes.addBtnGrp}
        onClick={() => setSmShow(true)}
      >
        Make Group
      </Button> */}
      <Form className={classes.grpCheckbox}>
        <div key={`custom-${"checkbox"}`} className="mb-3">
          <Form.Check
            custom
            type={"checkbox"}
            id={`custom-${"checkbox"}`}
            label={`Make a group of these items`}
            onClick={() => setSmShow(true)}
          />
        </div>
      </Form>
      <Button
        variant="success"
        className={classes.addBtn}
        onClick={() => {
          // setLeftContent(favObj);
          props.handleAddMedicine();
        }}
      >
        Add
      </Button>
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
              placeholder={"Select a Group Name"}
              className={classes.mediGrpNameTextbox}
              onChange={e => {
                setGrpName(e.target.value);
              }}
              autoFocus
            ></input>
            <Button variant="warning" onClick={() => handleSave()}>
              Create
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MakeMediGrpModal;
