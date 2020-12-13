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
import { Redirect } from "react-router";
import Login from "../pages/Login/Login";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";
import { useHistory } from "react-router";

// import Recaptcha from "react-recaptcha";

const ResetPassword = () => {
  const [username, setUsername] = useState("");

  const [receivername, setReceivername] = useState("");
  const [receiveremail, setReceiveremail] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [randomNumber, setRandomNumber] = useState( localStorage.getItem("randomNumber"));
  const [modalShow, setModalShow] = React.useState(false);
 

  useEffect(() => {


var rString = randomString(
    6,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  console.log("rString", rString);
  localStorage.setItem("randomNumber", rString);



  }, []);

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  

 function enableSubmit() {
      console.log("enableSubmit"+username);

       let data = {
      username: username,
      };



    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getEmailForUserName",
        data
      )
      .then((response) => {
        console.log(
          "get username email: ",
          response.data.successString
        );
        if (response.data.successString == receiveremail) {

              document.getElementById('noDiv').style.display="none";

              document.getElementById("yesDiv").style.display="block";



        } else {

             document.getElementById("yesDiv").style.display="none";

             document.getElementById('noDiv').style.display="block";
             if(document.getElementById('noDiv').style.display="block") {
              var para = document.createElement("span");
                para.innerHTML = "Please enter correct email.";
                document.getElementById("myDIV").appendChild(para).color("red");
             }


        }
      })
      .catch((err) => {});
      document.getElementById("yesBtn").disabled = false;
 


}


  // }
  const handleSumbit = (event) => {
      console.log("rhandleSumbit");

    // checkRandomNumberSame();
    let data = {
      username: username,
      receivername: "",
      receiveremail: receiveremail,
    };
    
    console.log("data", data);
  //   if (receiveremail === "") {
  //     alert("Please enter your email");
  //   } else if (newpass === "") {
  //     alert("Please enter new password");
  //   } else if (confirmpass === "") {
  //     alert("Please enter confirm password");
  //   } 
  // // else{
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/resetLoginPassword",
        data
      )
      .then((response) => {
        console.log("reset password: ", response.data.successString);
      })
      .catch((err) => {});
   // }
  };

  return (
    <div>
      <div className={classes.mainResetContainer}>
        <Card className={classes.resetCard}>
          <Card.Body>
            <Card.Title className={classes.title}>
              <h2 className="mb-4">Reset Your Password</h2>
            </Card.Title>

            <Row className="mb-4">
              <Col sm="12">
               <Form.Control
                  required
                  keyboardType="sername"
                  placeholder="Enter username"
                  onChange={e => { setUsername(e.target.value);  }}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm="12">
                <Form.Control
                  required
                  
                  keyboardType="email"
                  placeholder="Enter your email"
                  onChange={e => { setReceiveremail(e.target.value); }}
                  onBlur={e => { enableSubmit(e.target.value); }}
                />
              </Col>
              <div id="myDIV">
              </div>

              <div id="yesDiv" style={{display: 'none' } }>
              <img
                width="25"
                id="yesBtn"
                className={classes.img}
                src={require("../assets/yes.png")}
              />
            </div>

            <div id="noDiv" style={{display: 'none' } }>
              <img
                width="15"
                id="noBtn"
                className={classes.img}
                src={require("../assets/no.png")}
              />
            </div>



            </Row>
            <Row className="mb-4">
              <Col sm="12">
                <Form.Control
                  required
                  type="password"
                  placeholder="New Password"
                 onChange={e => { setNewpass(e.target.value);  }}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm="12">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  onChange={e => { setConfirmpass(e.target.value);  }}

                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm="12">
                <Form.Control
                  required
                  keyboardType="text"
                  id="match"
                  placeholder="Enter Matching key"
                    onChange={e => { setInputCode(e.target.value); }}

                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm="12">
                <Form.Control
                  required
                  keyboardType="text"
                  readOnly={true}
                  value={randomNumber}
                />
              </Col>
            </Row>
            <div>
              <Button
                className={classes.btnVerify}
                variant="primary"
                id="submitBtn"
                type="submit"
                disabled={!(randomNumber == inputCode && newpass == confirmpass)}

                //onClick={handleSumbit}
                onClick={() => handleSumbit()}
              >
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;