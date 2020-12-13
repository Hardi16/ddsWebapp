import React, { useState, useEffect, useRef } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";

const DashboardTmoRefferalPatientsTotalCount = (props) => {
  const [tmoRefferalPatientsCountListTable, setTmoRefferalPatientsCountListTable] = useState([]);
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

  useEffect(() => {
   
    let data = {
      currentDateStr1: "2020-07-05",
      currentDateStr2: "2020-07-15",
    };
    console.log(data, "Data");

    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DashboardWebService/getTmoRefferalPatientsTotalCount",
        data
      )
      .then((response) => {
        console.log("getTmoRefferalPatientsCountListResponse: ", response.data);
        let getTmoRefferalPatientsCountListResponse =
        response.data["ptAppointmentOrgList"];
        let getTmoRefferalPatientsCountListTableBody = getTmoRefferalPatientsCountListResponse.map(
          (item) => {
            return (
              <tr>
                <td>{item["doctorId"]}</td>
                <td>{item["doctorName"]}</td>
                <td>{item["countOfPatients"]}</td>
              </tr>
            );
          }
        );
        let getTmoRefferalPatientsCountListTable = (
          <div>
            <Table striped hover>
              <thead>
                <tr>
                
                  <th>Doctor Id</th>
                  <th>DoctorName</th>
                  <th>Total Patients  </th>
                </tr>
              </thead>
              <tbody>{getTmoRefferalPatientsCountListTableBody}</tbody>
            </Table>
          </div>
        );
        setTmoRefferalPatientsCountListTable(getTmoRefferalPatientsCountListTable);
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
           Tmo Referred Total Patients

        </div>
        <div className={classes.tableBody}>{tmoRefferalPatientsCountListTable}</div>
        <br />
      </div>
    </div>
  );
};
export default DashboardTmoRefferalPatientsTotalCount;
