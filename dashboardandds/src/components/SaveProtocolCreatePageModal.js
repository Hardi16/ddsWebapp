import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import styles from "./Styles.module.css";
import { hostAddress } from "../assets/config";
import axios from "axios";
import { currentServer } from "../assets/config";
import { Redirect } from "react-router";
import SaveNewProtocolCreatePageModal from "./SaveNewProtocolCreatePageModal";

const SaveProtocolCreatePageModal = (props) => {
  const [show, setShow] = useState(true);
  const [redirectVar, setRedirectVar] = useState(null);
  const [radioBtnSelect, setRadioBtnSelect] = useState();
  const [newProtModal, setNewProtModal] = useState(null);

  const handleClose = () => setShow(false);
  const handleNext = () => {
    if (radioBtnSelect == "Save changes in existing protocol") {
      let data = {
        doctor_id: localStorage.getItem("doctorId"),
        clinic_id: localStorage.getItem("clinicId"),
        visitdateUTC: 1601387040000,
        pwProtocolDetail: [
          {
            allImgDownloaded: false,
            diagnosisName: JSON.parse(localStorage.getItem("protocolDetails"))[
              "diagnosis"
            ],
            evolkoVisitId: localStorage.getItem("visitId"),
            paymentDateUTC: 0,
            protocolId: 0,
            protocolName: JSON.parse(localStorage.getItem("protocolDetails"))[
              "protocolName"
            ],
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
          setRedirectVar(
            <Redirect
              to={{
                pathname: "/dischargeSummaryPage",
                state: { patient: props.patient },
              }}
            />
          );
        })
        .catch((err) => console.log("err", err));
    } else if (radioBtnSelect == "Create a new protocol") {
      setNewProtModal(
        <SaveNewProtocolCreatePageModal patient={props.patient} />
      );
    } else {
      handleClose();
      setRedirectVar(
        <Redirect
          to={{
            pathname: "/dischargeSummaryPage",
            state: { patient: props.patient },
          }}
        />
      );
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      {newProtModal}
      {redirectVar}
      <Modal.Header closeButton>
        <Modal.Title>Save protocol options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className={styles.saveModalRadioParent}>
            <input
              checked={radioBtnSelect == "Save changes in existing protocol"}
              type="radio"
              onClick={() => {
                setRadioBtnSelect("Save changes in existing protocol");
              }}
            />
            <span className={styles.saveModalRadioLabel}>
              Save changes in existing protocol
            </span>
          </div>
          <div className={styles.saveModalRadioParent}>
            <input
              type="radio"
              checked={radioBtnSelect == "Create a new protocol"}
              onClick={() => {
                setRadioBtnSelect("Create a new protocol");
              }}
            />
            <span className={styles.saveModalRadioLabel}>
              Create a new protocol
            </span>
          </div>
          <div className={styles.saveModalRadioParent}>
            <input
              type="radio"
              checked={
                radioBtnSelect == "Continue without changing the protocol"
              }
              onClick={() => {
                setRadioBtnSelect("Continue without changing the protocol");
              }}
            />
            <span className={styles.saveModalRadioLabel}>
              Continue without changing the protocol
            </span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleNext()}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveProtocolCreatePageModal;
