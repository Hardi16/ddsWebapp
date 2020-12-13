import React, { useState } from "react";
import classes from "./DischargeSummary.module.css";
import styles from "../../components/Styles.module.css";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Card,
  Collapse,
  Dropdown,
} from "react-bootstrap";
import AddNewPatientModal from "../../components/AddNewPatientModal";
import AddNewPatientModalSmall from "../../components/AddNewPatientModalSmall";
import PatientCard from "../../components/PatientCard";
import PullPatientDischargeInfo from "../../components/PullPatientDischargeInfo";
import DischargeSummaryForNew from "../../components/DischargeSummaryForNew";
import DischargeSummarySet from "../../components/DischargeSummarySet";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import convert from "xml-js";
import { Redirect } from "react-router";

const DischargeSummaryDoctorList = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [open, setOpen] = useState(false);
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

  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftPane}>
        <div className={classes.leftPaneHeader}>
          <div className={classes.leftHeaderImageContainer}>
            <img
              className={classes.leftHeaderImage}
              src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            ></img>
          </div>
          <div className={classes.leftHeaderHeading}>
            <div className={classes.leftHeaderHeadingTitle}>Pulse Hospital</div>
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
        <div className={classes.leftPaneContent}>
          {/* <Button className={classes.addNewBtn} >
                <span>+</span> Add New Doctors
                </Button> */}
          <div className={classes.patientDetails}>
            <div className={classes.doctorListContainer}>
              <ul>
                <li className={classes.active}>Dr. Ashish Kumar</li>
                <li>Dr. Rishi Sethi </li>
                <li>Dr. Sulabh Kumar</li>
                <li>Dr. GK Singh</li>
                <li>Dr. Vineet Sharma</li>
              </ul>
            </div>
            <div className={classes.addNewBtnSmallDiv}>
              <Button className={classes.addNewBtnSmall}>+</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.rightPane}>
        <div className={classes.mainDischargeSummary}>
          <div className={styles.rightTop}>
            <div className={classes.rightTopLeft}>
              <div className={classes.patientCardProfile}>
                <img
                  className={classes.rightHeaderImage}
                  src={require("../../assets/img-profile.png")}
                ></img>
              </div>
              <div className={classes.nameDischargeSummary}>
                Dr. Ashish Kumar
                <span className={classes.perAge}>Orthopedic Surgeon</span>
              </div>
            </div>
          </div>
          <div className={styles.rightMid}>
            <Container>
              <Row>
                <Col>
                  <div className={classes.rightDetailContainer}>
                    <Card className={classes.tempDoctorCard}>
                      <Card.Body>
                        <div>
                          <h5 className={classes.dName}>Dr. Ashish Kumar</h5>
                          <p>
                            MS Ortho <br />
                            <span className={classes.drProfile}>
                              Orthopedic Surgeon
                            </span>
                            <br />
                            <span className={classes.drContactNo}>
                              +91-9415052221
                            </span>{" "}
                          </p>
                        </div>

                        <h5>Discharge Approval Request</h5>
                        <p>Patient: Ayush Singh 74Y/3M</p>
                        <p>Patient ID: 7485416</p>
                        <h5>Approval Note:</h5>
                        <Form.Group
                          controlId="exampleForm.ControlTextarea1"
                          className={classes.aprovalNote}
                        >
                          <Form.Control
                            as="textarea"
                            rows="5"
                            placeholder="My notes are written here..."
                          />
                        </Form.Group>
                        <Button className={classes.btnSend}>Send </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DischargeSummaryDoctorList;
