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
import classes from "../../components/Styles.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import getMonth from "date-fns/getYear";
import getYear from "date-fns/getYear";
import { parseISO, format } from "date-fns";
import data from "../../components/countrycode";
import { CloseOutlined } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { hostAddress } from "../../assets/config";

import { currentServer } from "../../assets/config";
import VerifyOtpNumber from "../../components/VerifyOtpNumber";
import { useHistory } from "react-router";


const DoctorRegistration = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState(localStorage.getItem("country"));
  const [countrycode, setCountrycode] = useState(
    localStorage.getItem("countrycode")
  );
  const [selectedCountryName, setSelectedCountryName] = useState(
    localStorage.getItem("country")
  );
  const handleSetCountryCode = (e) => {
    let code = e.target.value;
  };


  let history = useHistory();


  let countryList = data;
  const validateMobileNumber = () => {


        
    let data = {
      passWord: "",
      mobileNumber: "+919044798859",
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
        console.log("getDoctorAppointmentCountListResponse: ", response.data);
        history.push('/VerifyOtpNumber') 
     


      })
      .catch((err) => {});
  };
  useEffect(() => {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        console.log("getCurrentLocationResponse: ", response.data["dial_code"]);
        setSelectedCountryName(response.data["country_name"]);
        setCountrycode(response.data["dial_code"]);
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
                src={require("../../assets/logo-white.png")}
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
                <Dropdown.Toggle className={classes.countryName}>
                  {selectedCountryName}
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
                    console.log(e.target.value);
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

export default DoctorRegistration;