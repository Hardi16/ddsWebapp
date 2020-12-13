import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { CardBody, Collapse } from "reactstrap";
import styles from "./Styles.module.css";
import QuantityComponent from "./QuantityComponent";
import WeightComponent from "./WeightComponent";

const FreqQuantModal = (props) => {
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [quantityContent, setQuantityContent] = useState(null);
  const [freqValObj, setFreqValObj] = useState(
    localStorage.getItem("freqValObj") == null
      ? {}
      : JSON.parse(localStorage.getItem("freqValObj"))
  );
  const [freqVal, setFreqVal] = useState("");
  const [freqStyleObj, setFreqStyleObj] = useState({});
  const [freqContent, setFreqContent] = useState();
  const [freqPrompt, setFreqPrompt] = useState();
  const [freqTextBoxVal, setFreqTextBoxVal] = useState("Type Here");
  const freqArr = [
    "OID",
    "BID",
    "TID",
    "QID",
    "6 Times",
    "8 Times",
    "SoS",
    "Stat",
    "Once",
  ];
  let firstWord = props.firstWord;

  //handle freq select
  const handleFreqSelect = (e) => {
    let etargetval = e.target.value;
    setFreqVal(etargetval);
    let tempObj = {};
    tempObj[etargetval] = !tempObj[etargetval];
    quantityHandler(etargetval, props.medicine);
    setFreqTextBoxVal(freqArr.includes(etargetval) ? "Type Here" : etargetval);
    setFreqStyleObj(tempObj);

    let freqTempObj =
      localStorage.getItem("freqValObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("freqValObj"));
    freqTempObj[props.medicine] = etargetval;
    setFreqValObj(freqTempObj);
    localStorage.setItem("freqValObj", JSON.stringify(freqTempObj));
    setFreqPrompt(Math.random());
    if (!isQuantityOpen) setIsQuantityOpen(!isQuantityOpen);
  };

  //for setting quantity content
  const quantityHandler = (freq, medicine) => {
    console.log("freq", freq, "medicine", medicine);
    firstWord = medicine.split(" ")[0];
    console.log("firstWord", firstWord);
    let res = (
      <QuantityComponent
        freq={freq}
        medicine={medicine}
        firstWord={firstWord}
      ></QuantityComponent>
    );
    setQuantityContent(res);
  };

  //for setting freq content
  useEffect(() => {
    let styleObj = freqStyleObj;
    for (let med in freqValObj) {
      let freq = freqValObj[med];
      let tempObj = {};
      tempObj[freq] = true;
      styleObj[med] = tempObj;
    }

    if (freqStyleObj[props.medicine] != null) {
      setIsQuantityOpen(true);
      quantityHandler(
        Object.keys(freqStyleObj[props.medicine]),
        props.medicine
      );
    }
    console.log("styleObj", styleObj);
    setFreqStyleObj(styleObj);
    console.log("freqStyleObj", freqStyleObj);
    console.log("freqVal", freqVal);
    let freqBtns = freqArr.map((freqItem) => {
      console.log("freqStyleObj[freqItem]", freqItem);
      return (
        <Button
          className={
            freqStyleObj == null ||
            freqStyleObj[props.medicine] == null ||
            !freqStyleObj[props.medicine][freqItem]
              ? styles.mediDeetsModalBtnsPassive
              : styles.mediDeetsModalBtnsActive
          }
          value={freqItem}
          onClick={(e) => handleFreqSelect(e)}
        >
          {freqItem}
        </Button>
      );
    });
    setFreqContent(
      <>
        {freqBtns}
        <div className={styles.mediDeetsModalTextboxBtn}>
          <input
            type="text"
            placeholder={
              freqTextBoxVal == "" || freqArr.includes(freqTextBoxVal)
                ? "Type Here"
                : freqTextBoxVal
            }
            className={styles.mediDeetsModalTextbox}
            onChange={(e) => {
              handleFreqSelect(e);
            }}
          ></input>
        </div>
      </>
    );
  }, [freqPrompt]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.medicine}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WeightComponent
          firstWord={props.firstWord}
          medicine={props.medicine}
        ></WeightComponent>
        <Card className={styles.routesAndStuffCard}>
          <Card.Body>
            <Card.Title>Frequency</Card.Title>
            <Card.Text>{freqContent}</Card.Text>
          </Card.Body>
        </Card>
        <Collapse isOpen={isQuantityOpen}>
          <Card>
            <CardBody>
              <Card.Title>Quantity</Card.Title>
              <Card.Text>{quantityContent}</Card.Text>
            </CardBody>
          </Card>
        </Collapse>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Close
        </Button>
        <Button variant="success" onClick={props.onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FrequencyQuantityModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  let firstWord = props.medicine.split(" ")[0];
  console.log("firstWord", firstWord);

  return (
    <>
      <Button
        className={styles.creatableSelectLabel}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        {JSON.parse(localStorage.getItem("freqValObj")) == null ||
        JSON.parse(localStorage.getItem("freqValObj"))[props.medicine] == null
          ? "Frequency"
          : JSON.parse(localStorage.getItem("freqValObj"))[props.medicine]}{" "}
        {JSON.parse(localStorage.getItem("quantValObj")) == null ||
        JSON.parse(localStorage.getItem("quantValObj"))[props.medicine] == null
          ? "Quantity"
          : JSON.parse(localStorage.getItem("quantValObj"))[props.medicine] > 1
          ? JSON.parse(localStorage.getItem("quantValObj"))[props.medicine] +
            " Times"
          : JSON.parse(localStorage.getItem("quantValObj"))[props.medicine] +
            " Time"}
      </Button>

      <FreqQuantModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        medicine={props.medicine}
        firstWord={firstWord}
      />
    </>
  );
};

export default FrequencyQuantityModal;
