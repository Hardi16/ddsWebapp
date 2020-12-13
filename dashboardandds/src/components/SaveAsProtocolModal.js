import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import { Button, Modal, Form } from "react-bootstrap";

const SaveAsProtocolModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [diagnosis, setDiagnosis] = useState("");
  const [protocolName, setProtocolName] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSaveAsProtocol = () => {
    let data = {
      doctor_id: localStorage.getItem("doctorId"),
      clinic_id: localStorage.getItem("clinicId"),
      visitdateUTC: 1601387040000,
      pwProtocolDetail: [
        {
          allImgDownloaded: false,
          diagnosisName: diagnosis,
          evolkoVisitId: localStorage.getItem("visitId"),
          paymentDateUTC: 0,
          protocolId: 0,
          protocolName: protocolName,
          recordDateUTC: 0,
          recordParsedDataList: [],
          remark: "DS",
          visitId: localStorage.getItem("visitId"),
        },
      ],
      checkInType: "Discharge Summary",
    };
    console.log("saveEMRVisitAsProtocolData", data);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/PatientWebService/saveEMRVisitAsProtocol",
        data
      )
      .then((response) => {
        console.log("saveEMRVisitAsProtocol resp", response.data);
        handleClose();
        // parseSavedObjectToLocalStorage(protObj);
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <>
      <div variant="primary" onClick={handleShow}>
        Save As protocol
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save As Protocol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Diagnosis"
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Protocol Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Protocol Name"
                onChange={(e) => setProtocolName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tag a Keyword</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Keywords eg: STEMI, HEART"
                onChange={(e) => setKeywords(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveAsProtocol()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveAsProtocolModal;
