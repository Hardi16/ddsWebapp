import React, { useState } from "react";
import classes from "./DischargeSummary.module.css";
import { Form, Col, Button, Card, Collapse, Dropdown } from "react-bootstrap";
import AddNewPatientModal from "../../components/AddNewPatientModal";
import AddNewPatientModalSmall from "../../components/AddNewPatientModalSmall";
import PatientCard from "../../components/PatientCard";
import PullPatientDischargeInfo from "../../components/PullPatientDischargeInfo";
import DischargeSummaryForNew from "../../components/DischargeSummaryForNew";
import DischargeSummarySet from "../../components/DischargeSummarySet";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";
import convert from "xml-js";
import { Redirect } from "react-router";

const DischargeSummaryDisplay = (props) => {
  const [redirect, setRedirect] = useState(null);
  const handleLogout = () => {
    localStorage.clear();
    setRedirect(<Redirect to="/dischargeSummary" />);
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={classes.hamburgerBtn}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img
        className={classes.hamburger}
        src="https://i.ya-webdesign.com/images/hamburger-menu-icon-png-white-12.png"
      ></img>
    </button>
  ));
  const [patients, setPatients] = useState([]);
  const [emailSet, setEmailSet] = useState([]);
  const [patientDetails, setPatientsDisplay] = useState([]);
  const [patientDischargeDetails, setPatientDischargeDetails] = useState("");
  const [open, setOpen] = useState(false);
  const addPatient = (patientDetails) => {
    console.log(patientDetails);
    if (emailSet.includes(patientDetails["email"]))
      alert("This patient already exists!");
    else {
      setEmailSet(emailSet.push(patientDetails["email"]));
      setPatients(patients.push(patientDetails));
      //   let patientList = patients.map(item => {
      //     return (
      //       <button
      //         className={classes.patientCardBtn}
      //         onClick={() => {
      //           pullDischargeData(item);
      //         }}
      //       >
      //         <PatientCard patient={item} />
      //       </button>
      //     );
      //   });
      let patientList = localStorage.getItem("patientList");
      setPatientsDisplay(
        <div>
          {patientList}
          <AddNewPatientModalSmall addPatient={addPatient} />
        </div>
      );
    }
  };
  const pullDischargeData = (patient) => {
    if (patient["oldnewValue"] == "New")
      setPatientDischargeDetails(
        <DischargeSummaryForNew
          name={patient["name"]}
          age={patient["age"]}
          sex={patient["sex"]}
        ></DischargeSummaryForNew>
      );
    else {
      if (patient["oldnewValue"] == "Old")
        setPatientDischargeDetails(
          <PullPatientDischargeInfo
            summaryDataArr={[]}
          ></PullPatientDischargeInfo>
        );
      // let data = { patientId: 700000024 };
      // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      // axios
      //   .put(
      //     hostAddress + currentServer +
      //       "/RestEasy/DashboardWebService/pullDischargeData",
      //     data
      //   )
      //   .then((response) => {
      //     let dischargeSummaryXml =
      //       response.data["ptAppointmentOrgList"][0]["dischargeSummary"];
      //     let dischargeSummaryJson = JSON.parse(
      //       convert.xml2json(dischargeSummaryXml, { compact: true, spaces: 4 })
      //     );

      //     let dateofAdmis =
      //       dischargeSummaryJson["DischargeSummary"]["DateAdmission"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"]["Lbl"]["_cdata"];
      //     let dateofDischarge =
      //       dischargeSummaryJson["DischargeSummary"]["DateDischarge"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"]["Lbl"]["_cdata"];
      //     let drName =
      //       dischargeSummaryJson["DischargeSummary"]["DoctorDetails"][
      //         "DoctorName"
      //       ]["_cdata"];
      //     let clinicName =
      //       dischargeSummaryJson["DischargeSummary"]["Header"]["ClinicName"][
      //         "_cdata"
      //       ];
      //     let orgName =
      //       dischargeSummaryJson["DischargeSummary"]["Header"][
      //         "OrganizationName"
      //       ]["_cdata"];
      //     let patientName =
      //       dischargeSummaryJson["DischargeSummary"]["Header"][
      //         "PatientPortion"
      //       ]["_attributes"]["name"];
      //     let patientCardNo =
      //       dischargeSummaryJson["DischargeSummary"]["Header"][
      //         "PatientPortion"
      //       ]["_attributes"]["cardNo"];
      //     let patientVisit =
      //       dischargeSummaryJson["DischargeSummary"]["Header"][
      //         "PatientPortion"
      //       ]["_attributes"]["visit"];
      //     let status =
      //       dischargeSummaryJson["DischargeSummary"]["Status"]["SectionLists"][
      //         "SectionList"
      //       ]["Section"]["Val"]["_cdata"];
      //     let complaint =
      //       dischargeSummaryJson["DischargeSummary"]["Complaint"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let diagnosis =
      //       dischargeSummaryJson["DischargeSummary"]["Diagnosis"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let comorbidDetails =
      //       dischargeSummaryJson["DischargeSummary"]["CoMorbidDetails"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let investigations =
      //       dischargeSummaryJson["DischargeSummary"]["Investigations"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let investigationFindings =
      //       dischargeSummaryJson["DischargeSummary"]["InvestigationFindings"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let surgery =
      //       dischargeSummaryJson["DischargeSummary"]["Surgery"]["SectionLists"][
      //         "SectionList"
      //       ]["Section"];
      //     let procedure =
      //       dischargeSummaryJson["DischargeSummary"]["Procedure"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let adviseRx =
      //       dischargeSummaryJson["DischargeSummary"]["AdviseRx"][
      //         "SectionLists"
      //       ]["SectionList"];
      //     let instruction =
      //       dischargeSummaryJson["DischargeSummary"]["Instruction"][
      //         "SectionLists"
      //       ]["SectionList"]["Section"];
      //     let remark =
      //       dischargeSummaryJson["DischargeSummary"]["Remark"]["SectionLists"][
      //         "SectionList"
      //       ]["Section"];

      //     console.log("dateofAdmis", dateofAdmis);
      //     console.log("dateofDischarge", dateofDischarge);
      //     console.log("drName", drName);
      //     console.log("clinicName", clinicName);
      //     console.log("orgName", orgName);
      //     console.log("patientName", patientName);
      //     console.log("patientCardNo", patientCardNo);
      //     console.log("patientVisit", patientVisit);
      //     console.log("status", status);
      //     console.log("complaint", complaint);
      //     console.log("diagnosis", diagnosis);
      //     console.log("comorbidDetails", comorbidDetails);
      //     console.log("investigations", investigations);
      //     console.log("investigationFindings", investigationFindings);
      //     console.log("surgery", surgery);
      //     console.log("procedure", procedure);
      //     console.log("adviseRx", adviseRx);
      //     console.log("instruction", instruction);
      //     console.log("remark", remark);

      //     let summaryDataArr = {
      //       dateofAdmis,
      //       dateofDischarge,
      //       drName,
      //       clinicName,
      //       orgName,
      //       patientName,
      //       patientCardNo,
      //       patientVisit,
      //       status,
      //       complaint,
      //       diagnosis,
      //       comorbidDetails,
      //       investigations,
      //       investigationFindings,
      //       surgery,
      //       procedure,
      //       adviseRx,
      //       instruction,
      //       remark,
      //     };
      //     if (patient["oldnewValue"] == "Old")
      //       setPatientDischargeDetails(
      //         <PullPatientDischargeInfo
      //           summaryDataArr={summaryDataArr}
      //         ></PullPatientDischargeInfo>
      //       );
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });
    }
  };

  return (
    <div className={classes.mainContainer}>
      {!localStorage.getItem("email") ? (
        <Redirect to="/dischargeSummary" />
      ) : null}
      {redirect}
      <div className={classes.leftPane}>
        <div className={classes.leftPaneHeader}>
          <div className={classes.leftHeaderImageContainer}>
            <img
              className={classes.leftHeaderImage}
              src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            ></img>
          </div>
          <div className={classes.leftHeaderHeading}>
            <div className={classes.leftHeaderHeadingTitle}>
              Jain Nursing Home
            </div>
            <div className={classes.leftHeaderSubHeading}>Dr. Vinay Kumar</div>
          </div>
          <div className={classes.hamburgerDiv}>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                Custom toggle
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item eventKey="1">Reset Password</Dropdown.Item> */}
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={classes.leftPaneSearch}>
          <Form>
            <Form.Control className={classes.searchbar} placeholder="Search" />
          </Form>
        </div>
        {/* <div className={classes.leftPaneContent}>
          {patients.length < 1 ? (
            <AddNewPatientModal addPatient={addPatient} />
          ) : (
            <div className={classes.patientDetails}>{patientDetails}</div>
          )}
        </div> */}
      </div>
      <div className={classes.rightPane}>
        <Card className={classes.tempCard1}>
          <Card.Body>
            <h4>
              <strong>Rx</strong>
            </h4>
            Tab Licinopril 20mg OID x 30d <br /> Tab Amlodipine 5mg OID x 30d
            <br />
            <br />
            <h4>Instructions</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br />
            <h4>Investigations</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br />
            <h4>Follow up</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Body>
        </Card>
        <div className={classes.collapse}>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className={classes.filterBtn}
          >
            <i class="fa fa-filter" aria-hidden="true"></i>
          </Button>
          <Collapse in={open}>
            <div className={classes.filterDropDiv}>
              <Button className={classes.filterDropRx}>Rx</Button>
              <Button className={classes.filterDropCal}>
                <i class="fa fa-calendar"></i>
              </Button>
              <Button className={classes.filterDropRupee}>
                <i class="fa fa-rupee"></i>
              </Button>
              <Button className={classes.filterDropMicroscope}>
                <i class="fa fa-plus-square"></i>
              </Button>
              <Button className={classes.filterDropImage}>
                <i class="fa fa-image"></i>
              </Button>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default DischargeSummaryDisplay;
