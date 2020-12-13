import React, { useEffect, useState } from "react";
import {
  Form,
  Spinner,
  Table,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";
import classes from "../pages/Dashboard/Dashboard.module.css";

const InformPatientsTable = (props) => {
  const [display, setDisplay] = useState(
    <div className={classes.tableSpinner}>
      <Spinner animation="border"></Spinner>
    </div>
  );
  const hideDisplay = () => {
    setDisplay(null);
  };
  useEffect(() => {
    let data = { orgId: props.orgId };
    console.log("data", data);

    let orgTableBody = (
      <tbody>
        <tr>
          <td>{<Form.Check aria-label="option 1" />}</td>
          <td>
            <select>
              <option value="selectdoctor">Select Doctor</option>
              <option value="doctor1">Doctor 1</option>
              <option selected value="doctor2">
                Doctor 2
              </option>
              <option value="doctor3">Doctor 3</option>
            </select>
          </td>
          <td>45m</td>
          <td>
            <Badge variant="warning">JUST LATE</Badge>
          </td>
          <td>
            <Badge variant="danger">CANCEL</Badge>
          </td>
          <td>
            <textarea
              type="textarea"
              className={classes.informTextArea}
            ></textarea>
            {/* <InputGroup>
    <FormControl as="textarea" aria-label="With textarea" />
  </InputGroup> */}
          </td>
          <td>
            <Button variant="success">Send</Button>
          </td>
        </tr>
        <tr>
          <td>{<Form.Check aria-label="option 1" />}</td>
          <td>
            <select>
              <option value="selectdoctor">Select Doctor</option>
              <option value="doctor1">Doctor 1</option>
              <option selected value="doctor2">
                Doctor 2
              </option>
              <option value="doctor3">Doctor 3</option>
            </select>
          </td>
          <td>1h30m</td>
          <td>
            <Badge variant="primary">RESCHEDULE</Badge>
          </td>
          <td>
            <Badge variant="success">REFUND</Badge>
          </td>
          <td>
            <textarea
              type="textarea"
              className={classes.informTextArea}
            ></textarea>
            {/* <InputGroup>
<FormControl as="textarea" aria-label="With textarea" />
</InputGroup> */}
          </td>
          <td>
            <Button variant="success">Send</Button>
          </td>
        </tr>
        <tr>
          <td>{<Form.Check aria-label="option 1" />}</td>
          <td>
            <select>
              <option value="selectdoctor">Select Doctor</option>
              <option value="doctor1">Doctor 1</option>
              <option selected value="doctor2">
                Doctor 2
              </option>
              <option value="doctor3">Doctor 3</option>
            </select>
          </td>
          <td>30m</td>
          <td>
            <Badge variant="warning">JUST LATE</Badge>
          </td>
          <td>
            <Badge variant="danger">CANCEL</Badge>
          </td>
          <td>
            <textarea
              type="textarea"
              className={classes.informTextArea}
            ></textarea>
            {/* <InputGroup>
<FormControl as="textarea" aria-label="With textarea" />
</InputGroup> */}
          </td>
          <td>
            <Button variant="success">Send</Button>
          </td>
        </tr>
      </tbody>
    );
    let orgTableStucture = (
      <div className={classes.tableContainer}>
        <div
          className={[classes.tableHeader, classes.tableHeaderWithHide].join(
            " "
          )}
        >
          <div className={classes.tableHeadLeft}>INFORM PATIENTS STATUS</div>
          <div
            onClick={() => {
              hideDisplay();
            }}
            className={[classes.tableHeadRight, classes.pointer].join(" ")}
          >
            Hide
          </div>
        </div>
        <div className={classes.tableBody}>
          <Table striped hover>
            <thead>
              <tr>
                <th></th>
                <th>Doctor Name</th>
                <th>Time</th>
                <th>Actions</th>
                <th>Status</th>
                <th>Additional Message</th>
                <th></th>
              </tr>
            </thead>
            {/* <tbody> */}
            {orgTableBody}
            {/* </tbody> */}
          </Table>
        </div>
      </div>
    );
    setDisplay(orgTableStucture);
  }, [props.checker]);

  return display;
};

export default InformPatientsTable;
