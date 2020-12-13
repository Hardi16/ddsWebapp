import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./Styles.module.css";

const DSCreateManageSectionsModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [allSectionsDisplay, setAllSectionDisplay] = useState(null);
  const [cardStates, setCardStates] = useState("");

  useEffect(() => {
    let cards =
      localStorage.getItem("cardsLabel") == null
        ? []
        : JSON.parse(localStorage.getItem("cardsLabel"));
    let cardStates =
      localStorage.getItem("cardStates") == null
        ? {}
        : JSON.parse(localStorage.getItem("cardStates"));
    setAllSectionDisplay(
      cards.map((card) => {
        if (
          card != "Patient Information" &&
          card != "Doctor's Signature" &&
          card != "Patient's Signature"
        )
          return (
            <div className={classes.checkboxRowManageSections}>
              <div>{card}</div>
              <div>
                <Form>
                  <Form.Check
                    className={classes.checkboxStyleManageSections}
                    type="checkbox"
                    id="custom-switch"
                    onClick={() => {
                      let cardStates =
                        localStorage.getItem("cardStates") == null
                          ? {}
                          : JSON.parse(localStorage.getItem("cardStates"));
                      cardStates[card] =
                        cardStates[card] == null ? false : !cardStates[card];
                      localStorage.setItem(
                        "cardStates",
                        JSON.stringify(cardStates)
                      );
                      setCardStates(JSON.stringify(cardStates));
                    }}
                    checked={cardStates[card] == null || cardStates[card]}
                  />
                </Form>
              </div>
            </div>
          );
      })
    );
  }, [
    localStorage.getItem("cardStates"),
    localStorage.getItem("cardsLabel"),
    cardStates,
  ]);
  return (
    <>
      <Button
        className={classes.dsrightbottombtn}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        ADD/REMOVE SECTIONS
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manage Sections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{allSectionsDisplay}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.setPrompt(Math.random());
              setModalShow(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DSCreateManageSectionsModal;
