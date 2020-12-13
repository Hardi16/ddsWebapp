import React, { useState, useEffect } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";

const DashboardNewDoctorList = () => {

  const [newDoctorAccountsListTable, setNewDoctorAccountsListTable] = useState(null);
  const [doctorName, setDoctorName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [specialityName, setSpecialityName] = useState([]);
  const [dateCreated, setDateCreated] = useState([]);
  const [createdBeforeHowManydays, setCreatedBeforeHowManydays] = useState([]);
  const [appInstalled, setAppInstalled] = useState([]);
  const [feeType, setFeeType] = useState([]);
  const [durationMode, setDurationMode] = useState([]);
  const [scheduleName, setScheduleName] = useState("");
 

  useEffect(() => {
    let data = {  currentDateStr:'2020-06-28 00:00:00'};
    console.log("data", data);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
        currentServer +
          "/RestEasy/DashboardWebService/getNewDoctorDetails",data
      )
      .then((response) => {
        console.log("getnewDoctorAccountsListResponse: ", response.data);
        let getnewDoctorAccountsListResponse =
          response.data["ptAppointmentOrgList"];
        let getnewDoctorAccountsListTableBody = getnewDoctorAccountsListResponse.map(
          (item) => {
            return (
              <tr>
                <td className={classes.doctorName}>{item["doctorName"]} </td>
                <td>{item["cityName"]}</td>
                <td>{item["specialityName"]}</td>
                <td>{item["dateCreated"]}</td>
                <td>{item["createdBeforeHowManydays"]}</td>
                <td>{item["appInstalled"]}</td>
                <td>{item["feeType"]}</td>
                <td>{item["durationMode"]}</td>
                <td>{item["scheduleName"]}</td>
              </tr>
            );
          }
        );
        let getnewDoctorAccountsListTable = (
          <Table striped hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>City</th>
                <th>Speciality Name</th>
                <th>Date Created</th>
                <th>Created Before How Many days</th>
                <th>App Installed</th>
                <th>Fee Type</th>
                <th>Duration Mode</th>
                <th>Schedule Name </th>
              </tr>
            </thead>
            <tbody>{getnewDoctorAccountsListTableBody}</tbody>
          </Table>
        );
        setNewDoctorAccountsListTable(getnewDoctorAccountsListTable);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("New Doctor accounts error", err);
      });
    return () => {};
  }, []);
  //use effect ends here
  return (
    <div className={classes.mainContainer}>
      <div className={classes.tableContainer}> 
      <div className={classes.tableHeader}> New Doctors List </div>
        <div className={classes.tableBody}>{newDoctorAccountsListTable}</div>
      </div>
    </div>
  );
};
export default DashboardNewDoctorList;
