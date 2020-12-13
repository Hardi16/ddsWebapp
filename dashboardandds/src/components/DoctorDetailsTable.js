import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import axios from "axios";
import classes from "../pages/Dashboard/Dashboard.module.css";
import { hostAddress, serverPort } from "../assets/config";

const DoctorDetailsTable = (props) => {
  const [display, setDisplay] = useState(
    <div className={classes.tableSpinner}>
      <Spinner animation="border"></Spinner>
    </div>
  );
  const hideDisplay = () => {
    setDisplay(null);
  };
  useEffect(() => {
    let data = { doctorId: "701097038" };
    console.log("data", data);
    setDisplay(null);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          "https://dev2.evolko.com/RestEasy/DashboardWebService/getCountOfPatientAppDownloadsByDoctorAndCity",
        data
      )

      .then((response) => {
        console.log("getDocotorcityCountAppointmentList", response.data);
        let getDocotorcityCountAppointmentListResponse =
          response.data["ptAppointmentOrgList"];
        let doctorTableBody = getDocotorcityCountAppointmentListResponse.map(
          (item) => {
            return (
              <tr>
                <td>{item["doctorName"]}</td>
                <td>{item["cityName"]}</td>
                <td>{item["countOfPatients"]}</td>
              </tr>
            );
          }
        );
        let orgTableStucture = (
          <div className={classes.tableContainer}>
            {/* <div
            className={[
              classes.tableHeader,
              classes.tableHeaderWithHide
            ].join(" ")}
          >
            <div className={classes.tableHeadLeft}>{props.doctorName}</div>
            <div
              onClick={() => {
                hideDisplay();
              }}
              className={[classes.tableHeadRight, classes.pointer].join(" ")}
            >
              Hide
            </div>
          </div> */}
            <div className={classes.tableBody}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>City </th>
                    <th>No. of Pateints</th>
                  </tr>
                </thead>
                <tbody>{doctorTableBody}</tbody>
              </Table>
            </div>
          </div>
        );
        //  setDisplay(null)
        setDisplay(orgTableStucture);
      })
      .catch((err) => {
        console.log("err.status");
        console.log("error pateintAppDetailsTable", err);
      });
  }, [props.doctorId]);

  return display;
};
export default DoctorDetailsTable;
