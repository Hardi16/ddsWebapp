import React, { useState, useEffect } from "react";
import classes from "./DischargeSummary.module.css";
import { Dropdown, Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import HamburgerDropdown from "../../components/HamburgerDropdown";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";


const DischargeSummarySendForApproval = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [doctorList, setDoctorList] = useState(null);
  const [rightPaneContent, setRightPaneContent] = useState(null);
  const [doctorStyleObj, setDoctorStyleObj] = useState({});

  let docId,
    docName = "",
    note = "";
  console.log("props", props);

  const handleSend = () => {
    let msgString =
      "Dicharge Summary Draft Ready for Approval \n\n" +
      "Patient: " +
      props.location.state.patient["name"] +
      " " +
      props.location.state.patient["age"] +
      "/" +
      (props.location.state.patient["sex"] == null
        ? ""
        : props.location.state.patient["sex"].substring(0, 1)) +
      "\n\n" +
      "Message: " +
      note +
      "\n\n" +
      "Hosptital: " +
      localStorage.getItem("clinicName") +
      "\n\n" +
      "Prepared by: " +
      localStorage.getItem("userName");
    let data = {
      senderId: JSON.parse(localStorage.getItem("userId")),
      receiverId: docId,
      senderRoleId: 31,
      receiverRoleId: 1,
      inAppMsg: msgString,
      evolkoId: JSON.parse(localStorage.getItem("evolkoId")),
      patientId: JSON.parse(localStorage.getItem("patientId")),
    };
    console.log("sendDischargeSummaryAlert req data", data);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress + currentServer +
          "/RestEasy/PatientWebService/sendDischargeSummaryAlert",
        data
      )

      .then((response) => {
        console.log("sendDischargeSummaryAlert resp", response.data);
        let data = {
          approvedStatus: 1,
          approvedById: localStorage.getItem("userId"),
          visitId: localStorage.getItem("visitId"),
        };
        console.log("generateDischargeSummary data", data);
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios
          .put(
            hostAddress + currentServer +
              "/RestEasy/DischargeSummaryWebService/updatedDischargeSummaryApprovedStatus",
            data
          )
          .then((response) => {
            console.log("generateDischargeData resp", response.data);
            // setDraftTag("PENDING  APPROVAL");
            // setLinkToCreatePage();
            setRedirect(<Redirect to="/dischargeSummaryPage" />);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => console.log("err", err));
  };
  const handleDoctorClick = (item) => {
    console.log("clicked doc", item);
    docId = item["doctorId"];
    docName = item["doctorName"];
    let tempObj = {};
    tempObj[item["doctorName"]] = true;
    setDoctorStyleObj(tempObj);
    setRightPaneContent(
      <Card className={classes.doctorCardApprovalPage}>
        <Card.Body>
          <b>Doctor Details</b>
          <div>Name: {item["doctorName"]}</div>
          <div>Phone Number: {item["phone"]}</div>
          <br />
          <b>Discharge Approval Request</b>
          <br />
          <br />
          <b>Patient Details</b>
          <div>Name: {props.location.state.patient["name"]}</div>
          <div>
            Age/Sex: {props.location.state.patient["age"]}/
            {props.location.state.patient["sex"]}
          </div>
          <div>
            Address: {props.location.state.patient["address"]},{" "}
            {props.location.state.patient["city"]},
            {props.location.state.patient["countryName"]}{" "}
          </div>
        </Card.Body>
        <Card.Body>
          <div>
            <b>Approval Note</b>
            <div>
              <textarea
                className={classes.textAreaApproval}
                placeholder={note == "" ? "My notes are written here" : note}
                onChange={(e) => (note = e.target.value)}
              ></textarea>
            </div>
            <div>
              <Button
                variant="success"
                className={classes.sendBtnApprovePg}
                onClick={() => handleSend()}
              >
                Send
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  useEffect(() => {
    console.log("doctorStyleObj", doctorStyleObj);
    let allDoctors = JSON.parse(localStorage.getItem("allDoctors"));
    console.log("allDoctors", allDoctors);
    setDoctorList(
      allDoctors.map((item) => {
        return (
          <Button
            variant="none"
            className={
              doctorStyleObj[item["doctorName"]]
                ? classes.doctorListDsApprovePageActive
                : classes.doctorListDsApprovePagePassive
            }
            onClick={() => handleDoctorClick(item)}
          >
            {item["doctorName"]}
          </Button>
        );
      })
    );
  }, [Object.keys(doctorStyleObj)[0]]);

  return (
    <div>
      {redirect}
      <div className={classes.mainContainer}>
        <div className={classes.leftPane}>
          <div className={classes.leftPaneHeader}>
            <div className={classes.leftHeaderImageContainer}>
              <img
                className={classes.leftHeaderImage}
                src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
              ></img>
            </div>
            {/* {leftHeaderHeading} */}
            <div className={classes.leftHeaderHeading}>
              <div className={classes.leftHeaderHeadingTitle}>
                <Button
                  className={classes.createPageClinicNameBtn}
                  onClick={() =>
                    setRedirect(<Redirect to="/dischargeSummaryPage" />)
                  }
                >
                  {localStorage.getItem("clinicName")}
                </Button>
              </div>
              <div className={classes.leftHeaderSubHeading}>
                {localStorage.getItem("doctorName")}
              </div>
            </div>
            <HamburgerDropdown></HamburgerDropdown>
          </div>
          <div className={classes.leftPaneSearch}>
            <div className={classes.searchDivDsApprove}>
              <Form className={classes.searchBarApprovePage}>
                <Form.Control
                  className={classes.searchbar}
                  placeholder="Search"
                  onChange={(e) => {}}
                />
              </Form>
              <Button variant="success" className={classes.addBtnApprove}>
                Add Dr.
              </Button>
            </div>
          </div>
          <div className={classes.leftPaneContent}>
            <div className={classes.patientDetails}>{doctorList}</div>
          </div>
        </div>
        <div className={classes.rightPane}>{rightPaneContent}</div>
      </div>
    </div>
  );
};

export default DischargeSummarySendForApproval;
