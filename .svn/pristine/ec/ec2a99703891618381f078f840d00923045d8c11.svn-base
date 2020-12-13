import React, { useState, useEffect, useRef } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";


const DashboardCutis = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [
    orgDeptAppointmentCountListTable,
    setOrgDeptAppointmentCountListTable,
  ] = useState();
  const [orgId, setorgId] = useState(localStorage.getItem("orgId"));
  const [textArea, setTextArea] = useState("");

  function handeDatePicker(e) {
    console.log("StartDate:" + e.target.value);
    setStartDate(e.target.value);
  }
  function handeDatePicker1(e) {
    console.log("EndDate:" + e.target.value);
    setEndDate(e.target.value);
  }
  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }

  useEffect(() => {
    let data;
    if (startDate == "" && endDate == "") {
      let sdateDiffFormat = new Date();
      let sdate =
        sdateDiffFormat.getFullYear().toString() +
        "-" +
        pad2(sdateDiffFormat.getMonth() + 1) +
        "-" +
        pad2(sdateDiffFormat.getDate());
      setStartDate(sdate);
      console.log();
      
    let sdateDiffFormat1 = (new Date());
    let edate =
    sdateDiffFormat1.getFullYear().toString() +
    "-" +
    pad2(sdateDiffFormat1.getMonth() + 1) +
    "-" +
    pad2(sdateDiffFormat1.getDate() );
    setEndDate(edate);
     console.log("sdate", sdate + "edate", edate);
     
     data = {
        orgId: orgId,
        dateStr1: sdate,
        dateStr2: edate,
      };
    } else {
      data = {
        orgId: orgId,
        dateStr1: startDate,
        dateStr2: endDate,
      };
    }

    console.log(data, "Cutis org Data");
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
        currentServer +
          "/RestEasy/DashboardWebService/getPatientOrgDeptAppointmentList",
        data
      )
      .then((response) => {
        console.log("getPatientOrgDeptAppointmentList", response.data);
        let getPatientOrgDeptAppointmentListResponse =
          response.data["ptAppointmentOrgDeptList"];
        let orgTableBody = getPatientOrgDeptAppointmentListResponse.map(
          (item) => {
            return (
              <tr>
                <td>{item["clinicName"]}</td>
                <td>{item["doctorName"]}</td>
                <td>{item["patientName"]}</td>
                <td>{item["patientContact"]}</td>
                <td>{item["apptDate"]}</td>
                <td>{item["startTime"]}</td>
              </tr>
            );
          }
        );
        let orgTableStucture = (
          <div className={classes.tableBody}>
            <Table striped hover id="orgAppointment">
              <thead>
                <tr>
                  <th>Clinic name</th>
                  <th>Doctor Name</th>
                  <th>Patient Name</th>
                  <th>Patient Contact</th>
                  <th>Appointment Date</th>
                  <th>Start Time</th>
                </tr>
              </thead>
              <tbody>{orgTableBody}</tbody>
            </Table>
          </div>
        );
        setOrgDeptAppointmentCountListTable(orgTableStucture);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("error orgDetailsTable", err);
      });
    return () => {};
  }, [startDate, endDate, orgId]);
  //use effect ends here
  return (
    <div className={classes.mainContainer}>
      <div className={classes.tableContainer} style={{ padding: "10px" }}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeadLeft}>
            {" "}
            &nbsp;Organization Details{" "}
          </div>
          <div className={classes.tableHeadRight}>
            <Form.Row>
              <Col>
                <Form.Group controlId="">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handeDatePicker}
                    placeholder="Select Start Date"
                    value={startDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="">
                  <Form.Label>End Date &nbsp;</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handeDatePicker1}
                    placeholder="Select End Date"
                    value={endDate}
                  />
                  &nbsp;
                </Form.Group>
              </Col>
              <Col>
              <br></br><ReactHTMLTableToExcel style={"float","right"} 
                                                className="btn btn-secondary btnExcel ml-3 mt-2"  
                                                table="orgAppointment"  
                                                filename="OrgDeptReportExcel"  
                                                sheet="Sheet"  
                                                buttonText="Download Excel" /> 
              </Col>
            </Form.Row>
          </div>
        </div>
        <div className={classes.tableBody}>
          {orgDeptAppointmentCountListTable}
        </div>
        <br />
      </div>
    </div>
  );
};
export default DashboardCutis;
