import React, { useState, useEffect } from "react";
import classes from "./Dashboard.module.css";
import { Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import DoctorDetailsTable from "../../components/DoctorDetailsTable";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";

const DashboardCityDoctorsList = () => {
  const [
    doctorAppointmentOrgTable,
    setDoctorAppointmentCountListTable,
  ] = useState(
    <div className={classes.tableSpinner}>
      <Spinner animation="border"></Spinner>
    </div>
  );
  const [doctorName, setdoctorName] = useState(
    <Spinner animation="grow" size="sm" />
  );
  const [cityName, setcityName] = useState(
    <Spinner animation="grow" size="sm" />
  );
  const [DoctorDetailsTable, setOrgDetailsTable] = useState(null);

  const showDoctorInfo = (doctorId, doctorName) => {
    localStorage.setItem("doctorId", doctorId);
    localStorage.setItem("doctorName", doctorName);
    window.open("/DoctorInfo", "_blank");
    // setOrgDetailsTable(<DoctorDetailsTable doctorId={doctorId} orgName={orgName} />);
  };

  useEffect(() => {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
        currentServer +
          "/RestEasy/DashboardWebService/getDoctorsAndCityListWhoHaveDrApp"
      )
      .then((response) => {
        console.log("getDoctorAppointmentCountListResponse: ", response.data);
        let getDoctorAppointmentCountListResponse =
          response.data["ptAppointmentOrgList"];
        let getPatientAppointmentCountListTableBody = getDoctorAppointmentCountListResponse.map(
          (item) => {
            return (
              <tr>
                <td className={classes.doctorName}>
                  <div
                    className={classes.pointer}
                    onClick={() =>
                      showDoctorInfo(item["doctorId"], item["doctorName"])
                    }
                  >
                    {item["doctorName"]}
                  </div>
                </td>
                <td>{item["cityName"]}</td>
              </tr>
            );
          }
        );
        let getPatientAppointmentCountListTable = (
          <Table striped hover>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>{getPatientAppointmentCountListTableBody}</tbody>
          </Table>
        );
        setDoctorAppointmentCountListTable(getPatientAppointmentCountListTable);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("dashboard error", err);
      });
    return () => {};
  }, []);
  //use effect ends here
  return (
    <div className={classes.mainContainer}>
      <div className={classes.tableContainer}>
        <div className={classes.tableHeader}>Doctors By City</div>
        <div className={classes.tableBody}>{doctorAppointmentOrgTable}</div>
      </div>
      <div className={classes.DoctorDetailsTable}>{DoctorDetailsTable}</div>
    </div>
  );
};
export default DashboardCityDoctorsList;
