import React, { useState, useEffect } from "react";
import {
  Row,
  Modal,
  Button,
  Form,
  Col,
  DropdownButton,
  Card,
} from "react-bootstrap";
import classes from "./Styles.module.css";
import DatePicker from "react-datepicker";
import styles from "./Styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import { useHistory } from "react-router";
import { CloseOutlined } from "@material-ui/icons";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import { Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router";

const RegisterClinic = (props) => {
  const [clinic, setClinic] = useState("");
  const [orgClinic, setOrgClinic] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicNameOrg, setClinicNameForOrg] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isClinic, setClinicActive] = useState(true);
  const [orgOptions, setOrgOptions] = useState(null);
  const [orgObj, setOrgObj] = useState({});
  const [orgId, setOrgId] = useState("");
  const [org, setOrg] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [OrgDropdown, setOrgDropdown] = useState(null);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [selectedOrgName, setSelectedOrgName] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState("");
  let history = useHistory();
  useEffect(() => {
    let organisationsIds;
    let isActive = false;
    let isClinic = true;
    let OrgId = "0";
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/fetchEvolkoOrganizationDetails"
      )
      .then((response) => {
        console.log("fetchEvolkoOrganizationDetails response", response.data);
        let Organizations =
          response.data == null || response.data["ptAppointmentOrgList"] == null
            ? []
            : response.data["ptAppointmentOrgList"];

        console.log("responseOfOrgData", Organizations);

        localStorage.setItem("Organizations", JSON.stringify(Organizations));
        if (
          Organizations != null &&
          Organizations.length > 0 &&
          Organizations[0] != null
        ) {
          setSelectedOrgName(
            localStorage.getItem("orgName") == null
              ? Organizations[0]["orgName"]
              : localStorage.getItem("orgName")
          );
          setSelectedOrgId(
            localStorage.getItem("orgId") == null
              ? Organizations[0]["orgrId"]
              : localStorage.getItem("orgId")
          );
          localStorage.setItem(
            "orgName",
            localStorage.getItem("orgName") == null
              ? Organizations[0]["orgName"]
              : localStorage.getItem("orgName")
          );
          localStorage.setItem(
            "orgId",
            localStorage.getItem("orgId") == null
              ? Organizations[0]["orgId"]
              : localStorage.getItem("orgId")
          );
        }
        console.log("objOrglist item", Organizations);
        //Orgnaization dropdown
        let orgDrodownVar = null;
        orgDrodownVar = Organizations.map((item) => {
          return (
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                handleTextChange(
                  item["orgName"],
                  item["orgrId"],
                  "Orgnization Name"
                );
                setSelectedOrgName(item["orgName"]);
                setSelectedOrgId(item["orgId"]);
              }}
            >
              {item["OrgName"]}
            </Dropdown.Item>
          );
        });
        let orgDetsObj = {};
        setOrgOptions(
          Organizations.map((item) => {
            orgDetsObj[item["orgName"]] = {
              orgName: item["orgName"],
              orgId: item["orgId"],
            };
            return {
              key: item["orgId"],
              text: item["orgName"],
              value: item["orgName"],
              orgId: item["orgId"],
            };
          })
        );
        console.log("orgObjData=", orgDetsObj);
        setOrgObj(orgDetsObj);
        setOrgDropdown(orgDrodownVar);
      })
      .catch((err) => {});
    // return {};
  }, []);

  const handleTextChange = (OrgName, OrgId, label) => {};
  const handleDropdownOrgChange = (e, data) => {
    let orgName = orgObj[data.value]["orgName"];
    let orgId = orgObj[data.value]["orgId"];

    console.log("orgName", orgName);
    console.log("orgId", orgId);

    setOrg(orgName);
    setOrgId(orgId);
  };
  const callRegisterClinic = () => {
    let organisationsIds = "0";

    if (orgClinic === "Clinic") {
      organisationsIds = "0";
    }
    if (orgClinic === "Organisation") {
      organisationsIds = orgId;
    }
    let data = {
      clinicName: clinicName,
      orgId: organisationsIds,
    };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/createClinic",
        data
      )
      .then((response) => {
        console.log("data", response.data);
        alert("Clinic Added successfully");
        setRedirect(<Redirect to="/dischargeSummary" />);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      {redirect}
      <div className={classes.mainContainer}>
        <Card className={[classes.registerCard, classes.clinicCard].join(" ")}>
          <Card.Body>
            <Card.Title className={classes.title}>
              <img
                className={classes.img}
                src={require("../assets/logo-blue.png")}
              />
              <h2 className="mb-4"> Register Clinic or Organisation</h2>
            </Card.Title>
            <Form noValidate className="mb-4">
              <Form.Group
                as={Row}
                controlId="formGridSex"
                className={classes.rowbottommargin}
              >
                <div className={classes.selectGender}>
                  <Col sm="3">
                    <div class="floatBlock">
                      <label for="male">
                        {" "}
                        <input
                          type="radio"
                          value="Clinic"
                          name="clinic"
                          defaultChecked
                          id="#radio1"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setOrgClinic(e.target.value);
                            setIsActive(false);
                            setClinicActive(true);
                          }}
                        />
                        &nbsp; &nbsp; Clinic
                      </label>
                    </div>
                  </Col>
                  <Col sm="9">
                    <div class="floatBlock">
                      <label for="female">
                        {" "}
                        <input
                          type="radio"
                          value="Organisation"
                          name="clinic"
                          id="#radio2"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setOrgClinic(e.target.value);
                            setIsActive(true);
                            setClinicActive(false);
                          }}
                        />
                        &nbsp; Organisation{" "}
                      </label>
                    </div>
                  </Col>
                </div>
              </Form.Group>
              {isClinic ? (
                <div id="clinicDiv" className="">
                  <Form.Group as={Row} className={classes.rowbottommargin}>
                    <Col sm="12">
                      <Form.Control
                        type="text"
                        id="clinicInput"
                        placeholder="Enter clinic name"
                        onChange={(e) => setClinicName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </div>
              ) : (
                <div id="organisationDiv" className="mb-4">
                  <Form.Group as={Row} className={classes.rowbottommargin}>
                    <Col sm="12">
                      <Form.Control
                        type="text"
                        id="clinicInputOrg"
                        placeholder="Enter clinic name"
                        onChange={(e) => setClinicName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className={classes.rowbottommargin}>
                    <Col sm="12">
                      <Dropdown
                        placeholder="Select Organization "
                        search
                        selection
                        options={orgOptions}
                        defaultValue={localStorage.getItem("orgName")}
                        fluid
                        onChange={handleDropdownOrgChange}
                        className={styles.doctorDropdown}
                      />
                    </Col>
                  </Form.Group>
                </div>
              )}
            </Form>
            <div className={classes.addDiscardDiv}>
              <Button
                className={classes.btnaddPatient}
                variant="primary"
                type="submit"
                id="cliBtn"
                onClick={() => callRegisterClinic()}
              >
                Create
              </Button>
              {/* <Button
                className={classes.btnaddPatient}
                variant="primary"
                type="submit"
                id="orgBtn"
                onClick={() => callRegisterOrganisation()}
              >
                Create Organisation
              </Button> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RegisterClinic;
