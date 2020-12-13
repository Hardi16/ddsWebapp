import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { CardBody, Collapse } from "reactstrap";
import styles from "./Styles.module.css";

const WeightComponent = (props) => {
  const [weightCard, setWeightCard] = useState(null);
  const [weightValObj, setWeightValObj] = useState(
    localStorage.getItem("weightValObj") == null
      ? {}
      : JSON.parse(localStorage.getItem("weightValObj"))
  );
  const [doseValObj, setDoseValObj] = useState(
    localStorage.getItem("doseValObj") == null
      ? {}
      : JSON.parse(localStorage.getItem("doseValObj"))
  );
  //for handling actions performed on weight section text box
  const handleWeightSectionTextBox = (e, id) => {
    let etargetval = e.target.value;
    if (id == "w") {
      weightValObj[props.medicine] = etargetval;
      setWeightValObj(weightValObj);
      localStorage.setItem("weightValObj", JSON.stringify(weightValObj));
    } else if (id == "d") {
      doseValObj[props.medicine] = e.target.value;
      setDoseValObj(doseValObj);
      localStorage.setItem("doseValObj", JSON.stringify(doseValObj));
    }
    if (id == "w" && (etargetval == "" || etargetval < 1))
      setWeightCard(
        <Card className={styles.routesAndStuffCard}>
          <Card.Body>
            <Card.Title>Weight</Card.Title>
            <Card.Text>
              <input
                type="number"
                placeholder={
                  weightValObj[props.medicine] == null ||
                  weightValObj[props.medicine] == ""
                    ? "Enter Weight"
                    : weightValObj[props.medicine]
                }
                className={styles.weightTextboxQt}
                onChange={(e) => handleWeightSectionTextBox(e, "w")}
              ></input>
              kg
            </Card.Text>
          </Card.Body>
        </Card>
      );
    if ((id == "w" && etargetval != "" && etargetval > 0) || id == "d")
      setWeightCard(
        <Card className={styles.routesAndStuffCard}>
          <Card.Body>
            <Card.Title>Weight</Card.Title>
            <Card.Text>
              <input
                type="number"
                placeholder={
                  weightValObj[props.medicine] == null ||
                  weightValObj[props.medicine] == ""
                    ? "Enter Weight"
                    : weightValObj[props.medicine]
                }
                className={styles.weightTextboxQt}
                onChange={(e) => handleWeightSectionTextBox(e, "w")}
              ></input>
              kg
            </Card.Text>
            <Card.Text>
              <div className={styles.weightRow}>
                <div className={styles.weightRowLeft}>
                  <div className={styles.weightRowLeftName}>Dose </div>
                  <div>
                    <input
                      type="number"
                      placeholder={
                        doseValObj[props.medicine] == null ||
                        doseValObj[props.medicine] == ""
                          ? "Basis"
                          : doseValObj[props.medicine]
                      }
                      onChange={(e) => {
                        handleWeightSectionTextBox(e, "d");
                      }}
                      className={styles.mediDeetsModalTextboxQt}
                    ></input>
                  </div>
                  <div className={styles.weightRowRightName}>mg/kg</div>
                </div>
                <div className={styles.weightRowRight}>
                  <input
                    type="number"
                    placeholder={
                      weightValObj[props.medicine] == null ||
                      weightValObj[props.medicine] == "" ||
                      doseValObj[props.medicine] == null ||
                      doseValObj[props.medicine] == ""
                        ? "Dosage"
                        : weightValObj[props.medicine] *
                          doseValObj[props.medicine]
                    }
                    className={styles.mediDeetsModalTextboxQt}
                  ></input>

                  <div className={styles.weightRowRightName}>mg/day</div>
                </div>
              </div>
              {/* other row below */}
              <div className={styles.weightRow}>
                <div className={styles.weightRowLeft}>
                  <div className={styles.weightRowLeftName}>Syrup </div>
                  <div>
                    <input
                      type="number"
                      placeholder={"-"}
                      className={styles.mediDeetsModalTextboxQt}
                    ></input>
                  </div>
                  <div className={styles.weightRowRightName}>mg/</div>
                </div>
                <div className={styles.weightRowRight}>
                  <input
                    type="number"
                    placeholder={"ml"}
                    className={styles.mediDeetsModalTextboxQt}
                  ></input>
                  <div className={styles.weightRowRightName}>ml</div>
                </div>
              </div>
              {/* other row below */}
              <div className={styles.weightRow}>
                <div className={styles.weightRowLeft}>
                  <div className={styles.weightRowLeftName}>Drops </div>
                  <div>
                    <input
                      type="number"
                      placeholder={"-"}
                      className={styles.mediDeetsModalTextboxQt}
                    ></input>
                  </div>
                  <div className={styles.weightRowRightName}>mg/</div>
                </div>
                <div className={styles.weightRowRight}>
                  <input
                    type="number"
                    placeholder={"ml"}
                    className={styles.mediDeetsModalTextboxQt}
                  ></input>
                  <div className={styles.weightRowRightName}>ml</div>
                </div>
              </div>
              {/* other row below */}
              <div className={styles.weightRow}>
                <div className={styles.weightRowLeft}>
                  <div className={styles.weightRowLeftName}>Insulin </div>
                  <div>
                    <input
                      type="number"
                      placeholder={"-"}
                      className={styles.mediDeetsModalTextboxQt}
                    ></input>
                  </div>
                  <div className={styles.weightRowRightName}>IU/kg</div>
                </div>
                <div className={styles.weightRowRight}>
                  <input
                    type="number"
                    placeholder={"IU/day"}
                    className={styles.mediDeetsModalTextboxQt}
                  ></input>
                  <div className={styles.weightRowRightName}>IU/day</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      );
  };

  //for weight
  useEffect(() => {
    if (
      props.firstWord.toLowerCase() != "tab" &&
      props.firstWord.toLowerCase() != "cap"
    ) {
      setWeightCard(
        <Card className={styles.routesAndStuffCard}>
          <Card.Body>
            <Card.Title>Weight</Card.Title>
            <Card.Text>
              <input
                type="number"
                placeholder={
                  weightValObj[props.medicine] == null ||
                  weightValObj[props.medicine] == ""
                    ? "Enter Weight"
                    : weightValObj[props.medicine]
                }
                className={styles.weightTextboxQt}
                onChange={(e) => handleWeightSectionTextBox(e, "w")}
              ></input>
              kg
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }, []);

  return weightCard;
};

export default WeightComponent;
