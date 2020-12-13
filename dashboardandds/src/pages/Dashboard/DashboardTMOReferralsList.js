import React, { useState, useEffect, useRef } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";

const DashboardTMOReferralsList = (props) => {
  const [tmoReferralsListTable, setTmoReferralsListTable] = useState([]);
  const [patientId, setpatientId] = useState([]);
  const [patientCity, setpatientCity] = useState([]);
  const [sentBy, setsentBy] = useState([]);
  const [sentTo, setsentTo] = useState([]);
  const [department, setdepartment] = useState([]);
  const [complaint, setcomplaint] = useState([]);
  const [sentDateTime, setsentDateTime] = useState([]);
  const [doctorsReplyDateTime, setdoctorsReplyDateTime] = useState([]);
  const [referralReplyComment, setreferralReplyComment] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    if(startDate=="" && endDate==""){
      let sdateDiffFormat = (new Date());
      let sdate =
      sdateDiffFormat.getFullYear().toString() +
      "-" +
      pad2(sdateDiffFormat.getMonth() + 1) +
      "-" +
      pad2(sdateDiffFormat.getDate() - 7);
      setStartDate(sdate);
      console.log("sdate", sdate);

    let sdateDiffFormat1 = (new Date());
      let edate =
      sdateDiffFormat1.getFullYear().toString() +
      "-" +
      pad2(sdateDiffFormat1.getMonth() + 1) +
      "-" +
      pad2(sdateDiffFormat1.getDate() );
      setEndDate(edate);
    console.log("sdate", edate);

     data = {
      currentDateStr1: sdate,
      currentDateStr2: edate,
    };
  }
  else{
    data = {
     currentDateStr1: startDate,
     currentDateStr2: endDate,
   };
 }
    console.log(data, "Data");

    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
        currentServer +
          "/RestEasy/DashboardWebService/getTmoRefferalDetail",
        data
      )
      .then((response) => {
        console.log("getTmoReferralsListResponse: ", response.data);

        let getTmoReferralsListResponse = response.data["ptAppointmentOrgList"];
        let getTmoReferralsListTableBody = getTmoReferralsListResponse.map(
          (item) => {
            return (
              <tr>
                <td>{item["patientId"]}</td>
                <td>{item["patientCity"]}</td>
                <td>{item["sentBy"]}</td>
                <td>{item["sentTo"]}</td>
                <td>{item["department"]}</td>
                <td>{item["complaint"]}</td>
                <td>{item["sentDateTime"]}</td>
                <td>{item["doctorsReplyDateTime"]}</td>
                <td>{item["referralReplyComment"]}</td>
              </tr>
            );
          }
        );
        let getTmoReferralsListTable = (
          <div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Patient City</th>
                  <th>Sent By</th>
                  <th>Sent To</th>
                  <th>Department</th>
                  <th>Complaint</th>
                  <th>Sent Date Time</th>
                  <th>Doctors Reply DateTime</th>
                  <th>Referral Reply Comment </th>
                </tr>
              </thead>
              <tbody>{getTmoReferralsListTableBody}</tbody>
            </Table>
          </div>
        );
        setTmoReferralsListTable(getTmoReferralsListTable);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("Tmo referrals error", err);
      });
    return () => {};    
  }, [startDate, endDate]);
  //use effect ends here
  return (
    <div className={classes.mainContainer}>
      <div className={classes.tableContainer} style={{ padding: "10px" }}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeadLeft}>
            {" "}
            &nbsp;TMO Referrals{" "}
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
            </Form.Row>
          </div>
        </div>
        <div className={classes.tableBody}>{tmoReferralsListTable}</div>
        <br />
      </div>
    </div>
  );
};
export default DashboardTMOReferralsList;
