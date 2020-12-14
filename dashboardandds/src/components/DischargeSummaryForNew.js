import React, { useState } from "react";
import classes from "./Styles.module.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import removeLocalStorage from "../assets/removeLocalStorage";

const DischargeSummaryForNew = (props) => {
  console.log("DischargeSummaryForNew props", props);
  const [redirect, setRedirect] = useState(null);
  const handleRightLower = () => {
    localStorage.setItem(
      "patient",
      typeof props.patient == "string"
        ? props.patient
        : JSON.stringify(props.patient)
    );
    removeLocalStorage();
    setRedirect(
      <Redirect
        to={{
          pathname: "/dischargeSummaryCreate",
          state: {
            patient: props.patient,
          },
        }}
      />
    );
  };
  return (
    <div className={classes.mainDischargeSummaryForNewEmpty}>
      {redirect}
      <div className={classes.rightTopNew}>
        <div className={classes.patientCardProfile}>
          <img
            className={classes.rightHeaderImage}
            src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
          ></img>
        </div>
        <div className={classes.nameDischargeSummaryForNew}>
          {props.patient.name}
          <span className={classes.perAge}>
            {props.patient.age}/
            {props.patient["sex"] == "" || props.patient["sex"] == null
              ? ""
              : props.patient["sex"].substring(0, 1)}
          </span>
        </div>

        <div className={classes.contactActions}>
          <img
            className={classes.imgActions}
            src={require("../assets/phone.png")}
          />
          <img
            className={classes.imgActions}
            src={require("../assets/video-camera.png")}
          />
        </div>
      </div>
      <div className={classes.rightMid}>
        <Row className="align-items-center justify-content-center">
          <Col md="8">
            <Card className={classes.cardTemp}>
              <Card.Body className={classes.cardBodyTemp}>
                <div className={classes.title}>
                  {" "}
                  Discharge Summary <span>will appear here</span>
                </div>
                <div className={classes.desc}>
                  Prescription, Discharge Summary, Images, Videos, Lab Tests CT,
                  MRI, X-Ray, Echo, Angiography, etc.
                </div>
                <Button
                  className={classes.btnTem}
                  onClick={() => handleRightLower()}
                >
                  Get started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className={classes.rightBottom}>
        <div className={classes.temprxpad}>
          {" "}
          <img
            className={classes.imgTemp}
            src={require("../assets/camera.png")}
          />
          RxPAD
        </div>
        <Form className={classes.tempinput}>
          <Form.Control
            type="text"
            className={classes.tempTextBox}
          ></Form.Control>
        </Form>
      </div>
    </div>
  );
};

export default DischargeSummaryForNew;
