import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import { Redirect } from "react-router";
import HamburgerDropdown from "./HamburgerDropdown";
import SearchMedicine from "./SearchMedicine";
import "loading-dots/loading-dots.css";
import { Dot } from "react-animated-dots";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import { Dropdown } from "semantic-ui-react";

const DSCreateLeftPaneCommon = (props) => {
  const [doctorName, setDoctorName] = useState(
    localStorage.getItem("doctorName")
  );
  const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId"));
  const [doctorsDropdown, setDoctorsDropdown] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [options, setOptions] = useState(null);
  const [docObj, setDocObj] = useState({});

  const handleTextChange = (docName, docId, label) => {
   
  };

  useEffect(() => {
    if (
      localStorage.getItem("roleId") == "31" ||
      localStorage.getItem("roleId") == "1"
    ) {
      let data = {
        clinicId: localStorage.getItem("clinicId"), //selectedClinicId + "",
      };
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      axios
        .put(
          hostAddress +
            currentServer +
            "/RestEasy/DischargeSummaryWebService/findDoctorByClinic",
          data
        )
        .then((response) => {
          console.log("findDoctorByClinic response", response.data);

          let doctors =
            response.data == null ||
            response.data["ptAppointmentOrgList"] == null
              ? []
              : response.data["ptAppointmentOrgList"];
          let doctorsDrodownVar = null;
          localStorage.setItem("allDoctors", JSON.stringify(doctors));
          if (doctors != null && doctors.length > 0 && doctors[0] != null) {
            setSelectedDoctorName(
              localStorage.getItem("doctorName") == null
                ? doctors[0]["doctorName"]
                : localStorage.getItem("doctorName")
            );
            setSelectedDoctorId(
              localStorage.getItem("doctorId") == null
                ? doctors[0]["doctorId"]
                : localStorage.getItem("doctorId")
            );
            localStorage.setItem(
              "doctorName",
              localStorage.getItem("doctorName") == null
                ? doctors[0]["doctorName"]
                : localStorage.getItem("doctorName")
            );
            localStorage.setItem(
              "doctorId",
              localStorage.getItem("doctorId") == null
                ? doctors[0]["doctorId"]
                : localStorage.getItem("doctorId")
            );
            doctorsDrodownVar = doctors.map((item) => {
              console.log("allDoctors item", item);
              return (
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => {
                    handleTextChange(
                      item["doctorName"],
                      item["doctorId"],
                      "Doctor Name"
                    );
                    setSelectedDoctorName(item["doctorName"]);
                    setSelectedDoctorId(item["doctorId"]);
                    props.setLeftPaneLabel("LandingLeftDSC");
                    localStorage.setItem("doctorName", item["doctorName"]);
                    localStorage.setItem("doctorId", item["doctorId"]);
                  }}
                >
                  {item["doctorName"]}
                </Dropdown.Item>
              );
            });
            let docDetsObj = {};
            setOptions(
              doctors.map((item) => {
                docDetsObj[item["doctorName"]] = {
                  docName: item["doctorName"],
                  docId: item["doctorId"],
                };
                return {
                  key: item["doctorName"],
                  text: item["doctorName"],
                  value: item["doctorName"],
                  docName: item["doctorName"],
                  docId: item["doctorName"],
                };
              })
            );
            setDocObj(docDetsObj);
            setDoctorsDropdown(doctorsDrodownVar);
          }
        })
        .catch((err) => {});
    }
  }, []);
  const handleDropdownChange = (e, data) => {
    let docName = docObj[data.value]["docName"];
    let docId = docObj[data.value]["docId"];

    setDoctorName(docName);
    setDoctorId(docId);
    localStorage.setItem("doctorName", docName);
    localStorage.setItem("doctorId", docId);
    let obj =
      localStorage.getItem("LandingLeftDSC") == null
        ? {}
        : JSON.parse(localStorage.getItem("LandingLeftDSC"));
    obj["Doctor Name"] = docName;
    localStorage.setItem("LandingLeftDSC", JSON.stringify(obj));
  };
  return (
    <>
      <div className={classes.leftPaneHeaderFix}>
        <div className={classes.leftPaneHeaderDSCreate}>
          <div className={classes.leftHeaderHeading}>
            <div className={classes.leftHeaderHeadingTitle}>
              <Button
                className={classes.createPageClinicNameBtn}
                // onClick={() =>
                //   props.setRedirect(<Redirect to="/dischargeSummaryPage" />)
                // }
              >
                {localStorage.getItem("clinicName")}
              </Button>
            </div>
            <div className={classes.leftHeaderSubHeading}>
              {/* <Dropdown>
                <Dropdown.Toggle
                  className={classes.docName}
                  variant="secondary-outline"
                  id="dropdown-basic"
                >
                  {doctorName == "" || doctorName == null
                    ? "Select Doctor"
                    : doctorName}
                </Dropdown.Toggle>
                <Dropdown.Menu>{doctorsDropdown}</Dropdown.Menu>
              </Dropdown> */}

              <Dropdown
                placeholder="Select Doctor"
                search
                selection
                options={options}
                fluid
                defaultValue={localStorage.getItem("doctorName")}
                onChange={handleDropdownChange}
                className={styles.doctorDropdownSemantic}
              />
            </div>
            <div className={classes.leftHeaderSubHeadingRight}>
              {localStorage.getItem("docSpecialityName")}
            </div>
          </div>
        </div>
        {/* <div className={classes.leftPaneSearchCreatePage}></div>
        <div className={styles.dotsParentDiv}>
          <div className={styles.leftPaneContentCreateLanding}>
            <div>
              <h1 className={styles.dotsH}>.....</h1>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className={classes.leftContentScroll}> {props.leftContent}</div> */}
    </>
  );
};

export default DSCreateLeftPaneCommon;
