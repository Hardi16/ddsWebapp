import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Modal,
  Button,
  Form,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import classes from "./Styles.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import getMonth from "date-fns/getYear";
import getYear from "date-fns/getYear";
import { parseISO, format } from "date-fns";
import data from "./countrycode";
import { CloseOutlined } from "@material-ui/icons";
import { Redirect } from "react-router";
import Login from "../pages/Login/Login";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import VerifyOtpNumber from "./VerifyOtpNumber";
import { useHistory } from "react-router";
import Select from 'react-select';
const SelfRegistrationDoctor = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [countrycode, setCountrycode] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
 
  let history = useHistory();

  const handleSetCountryCode = (e) => {
    let code = e.target.value;
    setCountry(code);
  };
 
  let countryList = data;
 
  const validateMobileNumber = () => {
    if (mobile.length != 10) {
      alert("Please enter 10 digit mobile number");
    }
    else{
      
    let countryAndCode = countrycode+mobile
    let setPhone = localStorage.setItem('userPhoneNumber',countryAndCode);
    let getPhone = localStorage.getItem('userPhoneNumber');
    let data = {
      passWord: "",
      mobileNumber: countryAndCode,
      os: "iOS-PatientApp",
      browserName: "Mozilla",
      userIpAddress: "127.0.0.0",
      userName: "",
    };
  
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          "https://dev2.evolko.com/RestEasy/PatientRadarWebService/validateDoctorMobileNumber",
        data
      )
      .then((response) => {
        history.push("/VerifyOtpNumber");
      })
      .catch((err) => {});
  }

};
  
  //country data
  useEffect(() => {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        console.log("getCurrentLocationResponse: ", response.data);
       let countryDialCode = response.data.country_calling_code;
       let countryName = response.data.country_name;
       setCountry(countryName);
       setCountrycode(countryDialCode);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);

  return (
    <div>
      <div className={classes.mainContainer}>
        <Card className={classes.registerCard}>
          <Card.Body>
            <Card.Title className={classes.title}>
              <img
                className={classes.img}
                src={require("../assets/logo-blue.png")}
              />
            </Card.Title>
            <h2 className="welcomeTxt">Welcome to Evolko Doctor!</h2>
            <Row className="mb-4">
              {/* <Col sm="12">
              <Form.Label >
              Select Country.<span className={classes.red}> *</span>
            </Form.Label></Col> */}

              <Col sm="12">            
                <Dropdown className={classes.drpSelectCountry}>
                {/* <Dropdown.Toggle className={classes.countryName}>
                  {country}
                </Dropdown.Toggle> */}
                   <Dropdown.Toggle
                    variant="secondary-outline"
                    id="dropdown-basic"
                  >
                    {country == "" ? "Select Country" : country}
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                
                  {" "}
                  <Dropdown.Header>Select Country</Dropdown.Header>
                  {countryList.map((s) => (
                    <Dropdown.Item
                      value={country}
                     onClick={(e) => {
                        handleSetCountryCode(e);
                        setCountry(s.name);
                        setSelectedCountryName(s.name)
                        setCountrycode(s.dial_code);
                      }}
                    >
                      {s.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm="3">
                <Dropdown className={classes.drpCountryCode}>
                  <Dropdown.Toggle>{countrycode}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {" "}
                    <Dropdown.Header>Select Country</Dropdown.Header>
                    {countryList.map((s) => (
                      <Dropdown.Item
                        value={s.dial_code}
                        onClick={(e) => {
                          setCountrycode(s.dial_code);
                        }}
                      >
                        {s.dial_code}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm="9">
                <Form.Control
                  required
                  keyboardType="numeric"
                  placeholder="Mobile  No."
                  pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  onChange={(e) => {                  
                    setMobile(e.target.value);
                    let mobile = e.target.value.replace(".", "");
                    if (isNaN(mobile)) {
                      alert("Please enter valid mobile number");
                    }
                  }}
                />
              </Col>
            </Row>
            <div>
              <Button
                className={classes.btnVerify}
                variant="primary"
                type="submit"
                onClick={() => validateMobileNumber()}
              >
                Send Otp
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SelfRegistrationDoctor;
