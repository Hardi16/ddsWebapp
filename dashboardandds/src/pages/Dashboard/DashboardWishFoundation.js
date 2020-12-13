import React, { useState, useEffect, useRef } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner, Form, Col} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactTextCollapse from "react-text-collapse";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";


const DashboardWishFoundation = (props) => {
  const [triageDetailsTable, setTriageDetailsTable] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clinicId, setClinicId] =useState(localStorage.getItem("clinicId"));
  const [textArea, setTextArea] = useState("");
  const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, 
    collapseText: '... Read more', 
    expandText: 'Read less', 
    minHeight:60,
    maxHeight:350
  }
  
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
      pad2(sdateDiffFormat.getDate());
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
      clinicId: clinicId,
    };
  }
  else{
     data = {
      currentDateStr1: startDate,
      currentDateStr2: endDate,
      clinicId: clinicId,
    };
  }
    console.log(data, "Wish F. Data");
    
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
        currentServer +
          "/RestEasy/DashboardWebService/getTriageDetails",
        data
      )
      .then((response) => {
        console.log("getTmoReferralsListResponse before: ", response.data);
        //data sorting
        let triageDataObj =
        response.data == null || response.data["ptAppointmentOrgList"] == null
          ? []
          : response.data["ptAppointmentOrgList"];
          triageDataObj.sort((a, b) => a.patientReferredDate.localeCompare(b.patientReferredDate));

        //let getTriageDetailsResponse = response.data["ptAppointmentOrgList"];
        let getTriageDetailsTableBody = triageDataObj.map(
          (item) => {
            return (
              <tr>
                <td className="text-left">{item["patientName"]}</td>
                <td>{item["patientAge"]}</td>
                <td>{item["patientGender"]}</td>
                <td>{item["patientDistrict"]}</td>
                <td>{item["patientCity"]}</td>
                <td className="text-left">  {item["patientTriageDetails"]} </td>
                <td>{item["patientComplaint"]}</td>
                <td>{item["patientReferredTo"]}</td>
                <td>{item["patientReferredSpeciality"]}</td>
                {/* <td>{item["patientReferredBy"]}</td> */}
                <td>{item["patientReferredDate"]}</td>
              </tr>
            );
          }
        );
        let getTriageDetailsTable = (
          <div>
            <Table striped hover className="counterTable">
              <thead>
                <tr>
                  <th className="text-left">Patient Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>District</th>
                  <th> City</th>
                  <th>Triage Details</th>
                  <th>Complaint</th>
                  <th>Refferred To</th>
                  <th> Referred Speciality </th>
                  {/* <th> Referred By</th> */}
                  <th> Referred Date</th>
                </tr>
              </thead>
              <tbody>{getTriageDetailsTableBody}</tbody>
            </Table>
          </div>
        );
        setTriageDetailsTable(getTriageDetailsTable);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("Traige details error", err);
      });
    return () => {};
  }, [startDate, endDate, clinicId]);
  //use effect ends here
  return (
    <div className={classes.mainContainer}>
      <div className={classes.tableContainer} style={{ padding: "10px" }}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeadLeft}>
            {" "}
            &nbsp;Triage Details{" "}
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
        <div className={classes.tableBody}>{triageDetailsTable}</div>
        <br />
      </div>
    </div>
  );
};
export default DashboardWishFoundation;
