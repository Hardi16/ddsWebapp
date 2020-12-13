import React, { useState } from "react";
import classes from "./Styles.module.css";
import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";

const DischargeSummarySet = props => {
  const [redirect, setRedirect] = useState(null);
  const [rightLower, setRightLower] = useState(
    <div clasName={classes.rightLower}>
      <div className={classes.rightMid}>
        <Card className={classes.cardTemp}>
          <Card.Body className={classes.cardBodyTemp}>
            <div>Discharge Summary will appear here</div>
            <Button
              className={classes.btnTem}
              onClick={() => handleRightLower()}
            >
              Get started
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className={classes.rightBottom}>
        <div className={classes.temprxpad}>RxPAD</div>
        <Form>
          <Form.Control
            type="text"
            className={classes.tempTextBox}
          ></Form.Control>
        </Form>
      </div>
    </div>
  );
  const handleRightLower = () => {
    setRedirect(
      <Redirect
        to={{
          pathname: "/dischargeSummaryCreate",
          state: { name: props.name, age: props.age, sex: props.sex }
        }}
      />
    );
    //         setRightLower(<div>
    //             <Card  className={classes.cardTemp1}>
    //   <Card.Body>Diagnosis</Card.Body>
    // </Card>
    // <Card className={classes.cardTemp1}>
    //   <Card.Body>Medicines</Card.Body>
    // </Card>
    // <Card className={classes.cardTemp1}>
    //   <Card.Body>Instructions</Card.Body>
    // </Card>
    // <Card className={classes.cardTemp1}>
    //   <Card.Body>Investigation</Card.Body>
    // </Card>
    // <Card className={classes.cardTemp1}>
    //   <Card.Body>Follow-up</Card.Body>
    // </Card>
    //         </div>)
  };
  localStorage.clear();
  return (
    <div className={classes.mainDischargeSummaryForNew}>waiting for api</div>
  );
};

export default DischargeSummarySet;
