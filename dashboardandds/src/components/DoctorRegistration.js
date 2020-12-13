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
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router";
import { addDays, subDays } from "date-fns";
import getMonth from "date-fns/getYear";
import getYear from "date-fns/getYear";
import { parseISO, format } from "date-fns";
import data from "./countrycode";
import { CloseOutlined } from "@material-ui/icons";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import { useHistory } from "react-router";
import { Dropdown } from "semantic-ui-react";
import styles from "./Styles.module.css";
const DoctorRegistration = (props) => {
  const [doctorName, setDoctorName] = useState("");
  const [docRegNumber, setDoctorRegNumber] = useState("");
  const [gender, setSex] = useState("");
  const [degree, setDegree] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [specialityId, setSpecialityId] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [docUserName, setdocUserName] = useState();
  const [docPassword, setdocPassword] = useState();
  const [options, setOptions] = useState(null);
  const [specialityObj, setSpecObj] = useState({});
  const [selectedSpecialityName, setSelectedSpecialityName] = "";
  const [selectedSpecialityId, setSelectedSpecialityId] = "";
  const [specialityDropdown, setSpecialityDropdown] = "";

  const [clinicOptions, setClinicOptions] = useState(null);
  const [clinicObj, setClinicObj] = useState({});
  const [clinicId, setClinicId] = useState("");
  const [clinic, setClinic] = useState("");
  const [clinicDropdown, setClinicDropdown] = useState(null);
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);
  const [selectedClinicName, setSelectedClinicName] = useState("");
  const [selectedClinicId, setSelectedClinicId] = "";
  //autocomplete
  const data = JSON.parse(localStorage.getItem("allspeciality"));

  const handleTextChange = (docName, docId, label) => {};

  const handleSubmitRegistration = (event) => {
    let sendName = localStorage.getItem("docUserName");
    let sendPassword = localStorage.getItem("docPassword");

    let data = {
      username: sendName,
      password: sendPassword,
    };
    let roleId;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/login",
        data
      )

      .then((response) => {
        console.log("login api response", response.data);
        let resp = response.data["ptAppointmentOrgList"];
        roleId = resp[0]["roleId"];
        console.log(resp[0]["userId"]);
        console.log("ROLE ID OF USER ", resp[0]["roleId"]);
        if (resp[0]["userId"] != 0) {
          if (resp[0]["roleId"] == "31" || resp[0]["roleId"] == "1") {
            if (resp[0]["roleId"] == "31") {
              localStorage.setItem("userId", resp[0]["userId"]);
            } else if (resp[0]["roleId"] == "1") {
              localStorage.setItem("doctorId", resp[0]["userId"]);
              localStorage.setItem("originalDoctorId", resp[0]["userId"]);
              localStorage.setItem("userId", resp[0]["userId"]);
              localStorage.setItem("userName", resp[0]["userName"]);
              localStorage.setItem(
                "docSpecialityName",
                resp[0]["docSpecialityName"]
              );
              localStorage.setItem("email", resp[0]["email"]);
            }
            localStorage.setItem("email", sendName);
            localStorage.setItem("roleId", roleId);
            localStorage.setItem("userName", resp[0]["userName"]);
          } else {
            alert("Invalid Credentials");
          }
        } else {
          alert("Invalid Credentials");
        }
        // ***********note
        //email is nothing but a username.
        if (localStorage.getItem("email")) {
          let clinicdata = {
            userId: localStorage.getItem("userId"),
            roleId: roleId,
          };
          axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
          axios
            .put(
              hostAddress +
                currentServer +
                "/RestEasy/DischargeSummaryWebService/findClinicByUser",
              clinicdata
            )
            .then((response) => {
              console.log("findClinicByUser resp", response);
              if (Object.keys(response.data).length === 0) {
                localStorage.setItem("allClinics", JSON.stringify([]));
              } else {
                localStorage.setItem(
                  "allClinics",
                  JSON.stringify(response.data["ptAppointmentOrgList"])
                );
              }

              // setRedirect(<Redirect to="/dischargeSummaryPage" />);
              history.push("/dischargeSummaryPage");
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })

      .catch((err) => {
        alert("Invalid");
        console.log("error", err);
      });
    // }
    // setValidated(true);
  };
  //Clinic List
  const handleDropdownClinicChange = (e, data) => {
    let clinicName = clinicObj[data.value]["clinicName"];
    let clinicId = clinicObj[data.value]["clinicId"];

    console.log("clinicName", clinicName);
    console.log("clinicId", clinicId);

    setClinic(clinicName);
    setClinicId(clinicId);
  };

  // useEffect(() => {
   
  // });
  //specialityList
  const handleDropdownChange = (e, data) => {
    let specialityNam = specialityObj[data.value]["specialityName"];
    console.log("specialityObj", specialityNam);
    let specialId = specialityObj[data.value]["specialityId"];
    console.log("specialityObj", specialId);
    setSpeciality(specialityNam);
    setSpecialityId(specialId);
  };
  useEffect(() => {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    let data = {
      os: "react",
    };
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/fetchEvolkoClinicDetails"
      )
      .then((response) => {
        console.log("getcliniclist: ", response.data);
        let clinics =
          response.data == null || response.data["ptAppointmentOrgList"] == null
            ? []
            : response.data["ptAppointmentOrgList"];
        let clinicDrodownVar = null;
        console.log("clinics", clinics);
        setClinic(clinics);
        localStorage.setItem("allClinics", JSON.stringify(clinics));
        //clinic dropdown
        clinicDrodownVar = clinics.map((item) => {
          console.log("clinics list", item);
          return (
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                handleTextChange(
                  item["clinicId"],
                  item["clinicName"],
                  "clinicName"
                );
                setSelectedClinicName(item["clinicName"]);
                setSelectedClinicId(item["clinicId"]);
              }}
            >
              {item["clinicName"]}
            </Dropdown.Item>
          );
        });
        let clinicObj = {};
        setClinicOptions(
          clinics.map((item) => {
            clinicObj[item["clinicName"]] = {
              clinicName: item["clinicName"],
              clinicId: item["clinicId"],
            };
            return {
              key: item["clinicId"],
              text: item["clinicName"],
              value: item["clinicName"],
              clinicId: item["clinicId"],
            };
          })
        );
        setClinicObj(clinicObj);
        setClinicDropdown(clinicDrodownVar);
      });
    //clinic ends
   // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    // let data = {
    //   os: "react",
    // };
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/PatientWebService/getspecialityList",
        data
      )
      .then((response) => {
        let speciality = response.data.specialityList;
        let specialityDropdownVar = null;
        localStorage.setItem("allspeciality", JSON.stringify(speciality));
        specialityDropdownVar = speciality.map((item) => {
          console.log("specialty item", item);
          return (
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                handleTextChange(
                  item["specialtyName"],
                  item["specialtyId"],
                  "Speciality Name"
                );
                setSelectedSpecialityName(item["specialtyName"]);
                setSelectedSpecialityId(item["specialtyId"]);
              }}
            >
              {item["specialtyName"]}
            </Dropdown.Item>
          );
        });
        let speDetsObj = {};
        setOptions(
          speciality.map((item) => {
            speDetsObj[item["specialtyName"]] = {
              specialityName: item["specialtyName"],
              specialityId: item["specialtyId"],
            };
            return {
              key: item["specialtyName"],
              text: item["specialtyName"],
              value: item["specialtyName"],
              specialityName: item["specialtyName"],
              specialtyId: item["specialtyName"],
            };
          })
        );
        setSpecObj(speDetsObj);
        setSpecialityDropdown(specialityDropdownVar);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);

  let history = useHistory();
  const registerDoctor = () => {
    let data = {
      ClinicCity: city,
      ClinicTiming: "",
      averageDailyFootFall: "",
      clinicAddress: address,
      clinicId: clinicId,
      clinicMobileNumber: "+918090974003",
      clinicName: clinic,
      countOfPtRecord: "",
      degree: degree,
      demoGiven: "",
      dob: "1985-05-20",
      doctorImagePath: "",
      drName: doctorName,
      drTitle: "Dr.",
      email: email,
      hasAssistant: "",
      initialSetupFeeStatus: "",
      loginUserId: 0,
      mobileNo: "+" + "91" + mobileNumber,
      patientBrochures: "",
      patientRecordKeeping: "",
      pinCode: pin,
      posterGiven: "",
      registrationNumber: docRegNumber,
      sex: gender,
      signedUp: "Yes",
      specialization: speciality,
      specializationId: specialityId,
      visitDate: "9-Oct-2020 ",
      visitTime: "8:49 PM",
      visitedPerson: "",
      initial_fee_detail: [],
    };
    console.log("alldata", data);
    if (doctorName === "") {
      alert("Please enter doctor name");
    } else if (docRegNumber === "") {
      alert("Please enter doctor resignation number");
    } else if (degree === "") {
      alert("Please select your degree");
    } else if (gender === "") {
      alert("Please select your gender");
    } else if (speciality === "") {
      alert("Please enter speciality name");
    } else if (address === "") {
      alert("Please enter your address");
    } else if (city === "") {
      alert("Please select your city");
    } else {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      axios
        .put(
          hostAddress +
            "https://dev2.evolko.com/RestEasy/DoctorRegistrationWebService/createCXMAccount",
          data
        )
        .then((response) => {
          let doctorRegistrationResponse = response.data.DoctorAccount[0];
          let docUserName = doctorRegistrationResponse.userName;
          localStorage.setItem("docUserName", docUserName);
          let docPassword = doctorRegistrationResponse.userPassword;
          localStorage.setItem("docPassword", docPassword);

          if (docUserName !== "" && docPassword !== "") {
            let docUserName = doctorRegistrationResponse.userName;
            let docPassword = doctorRegistrationResponse.userPassword;
            handleSubmitRegistration();
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div>
      <div className={classes.mainRegistationContainer}>
        <div className={classes.registerInner}>
          <div className={classes.title}></div>
          <h2 className="welcomeTxt">Registration Page</h2>
          <Form>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Doctor Name<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Doctor Name"
                  onChange={(e) => setDoctorName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid name.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Doctor Registration Number
                <span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Doctor Registration Number"
                  onChange={(e) => {
                    setDoctorRegNumber(e.target.value);
                    if (isNaN(docRegNumber)) {
                      alert("Please enter valid Registration number");
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Registration Number.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridSex"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Sex<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <div id="" name="" className={classes.selectGender}>
                  <div class="floatBlock">
                    <label for="male">
                      {" "}
                      <input
                        type="radio"
                        value="Male"
                        name="sex"
                        id="#radio1"
                        onChange={(e) => {
                          console.log(e.target.value);
                          setSex(e.target.value);
                        }}
                      />{" "}
                      Male &nbsp;
                    </label>
                  </div>
                  <div className="floatBlock">
                    <label for="female">
                      {" "}
                      <input
                        type="radio"
                        value="Female"
                        name="sex"
                        id="#radio2"
                        onChange={(e) => {
                          console.log(e.target.value);
                          setSex(e.target.value);
                        }}
                      />{" "}
                      Female{" "}
                    </label>
                  </div>
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Degree<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Degree"
                  onChange={(e) => setDegree(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a degree.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Speciality<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8} className={classes.autocompleteSpec}>
                <Dropdown
                  placeholder="Select Speciality"
                  search
                  selection
                  options={options}
                  fluid
                  defaultValue={localStorage.getItem("specialty")}
                  onChange={handleDropdownChange}
                  className={styles.doctorDropdown}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Mobile No.
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  disabled={true}
                  value={
                    localStorage.getItem("userPhoneNumber") == null
                      ? "Mobile Number"
                      : localStorage.getItem("userPhoneNumber")
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Clinic Name
              </Form.Label>
              <Col sm={8}>
                <Dropdown
                  placeholder="Select Clinic "
                  search
                  selection
                  options={clinicOptions}
                  defaultValue={localStorage.getItem("clinic")}
                  fluid
                  onChange={handleDropdownClinicChange}
                  className={styles.doctorDropdown}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Address<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid address.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                City<span className={classes.red}> *</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                {/* <Form.Control.Feedback type="invalid">
                Please enter a valid address.
              </Form.Control.Feedback> */}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formGridName"
              className={classes.rowbottommargin}
            >
              <Form.Label column sm={3}>
                Pin Code
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter Pin Code"
                  onChange={(e) => setPin(e.target.value)}
                />
                {/* <Form.Control.Feedback type="invalid">
                Please enter a valid address.
              </Form.Control.Feedback> */}
              </Col>
            </Form.Group>
          </Form>
          <Row className="mb-3">
            <Col sm={{ span: 8, offset: 3 }}>
              <Button
                className={classes.btnaddPatient}
                variant="primary"
                type="submit"
                onClick={() => registerDoctor()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
