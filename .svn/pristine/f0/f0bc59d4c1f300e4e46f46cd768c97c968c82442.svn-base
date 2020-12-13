import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const PhysicalExamTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("physicalExamAtDischargeObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("physicalExamAtDischargeObj"));
    obj[label] = e.target.value;
    localStorage.setItem("physicalExamAtDischargeObj", JSON.stringify(obj));
  };
  const [
    physicalExamAtDischargeObjNad,
    setPhysicalExamAtDischargeObjNad,
  ] = useState("");
  const [prompt, setPrompt] = useState(0);

  return (
    <div className={styles.phyExamTableDiv}>
      <Table responsive size="sm">
        <tbody>
          <tr>
            <td className={styles.tableCell}>ENT</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["ENT"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["ENT"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["ENT"] =
                      nadObj["ENT"] == null || !nadObj["ENT"] ? true : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["ENT"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["ENT"]
                  }
                  onChange={(e) => handleTextChange(e, "ENT")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Neck</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Neck"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Neck"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["Neck"] =
                      nadObj["Neck"] == null || !nadObj["Neck"] ? true : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["Neck"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["Neck"]
                  }
                  onChange={(e) => handleTextChange(e, "Neck")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Lungs</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Lungs"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Lungs"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["Lungs"] =
                      nadObj["Lungs"] == null || !nadObj["Lungs"]
                        ? true
                        : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["Lungs"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["Lungs"]
                  }
                  onChange={(e) => handleTextChange(e, "Lungs")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Heart</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Heart"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Heart"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["Heart"] =
                      nadObj["Heart"] == null || !nadObj["Heart"]
                        ? true
                        : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["Heart"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["Heart"]
                  }
                  onChange={(e) => handleTextChange(e, "Heart")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Abdomen</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Abdomen"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Abdomen"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["Abdomen"] =
                      nadObj["Abdomen"] == null || !nadObj["Abdomen"]
                        ? true
                        : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["Abdomen"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["Abdomen"]
                  }
                  onChange={(e) => handleTextChange(e, "Abdomen")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Extremities</td>
            <td className={styles.tableCell}>
              <div className={styles.phyExamTableRowVal}>
                <Button
                  className={
                    localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Extremities"] == null ||
                    !JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObjNad")
                    )["Extremities"]
                      ? styles.examNadTable
                      : styles.examNadTableActive
                  }
                  onClick={() => {
                    let nadObj =
                      localStorage.getItem("physicalExamAtDischargeObjNad") ==
                      null
                        ? {}
                        : JSON.parse(
                            localStorage.getItem(
                              "physicalExamAtDischargeObjNad"
                            )
                          );
                    nadObj["Extremities"] =
                      nadObj["Extremities"] == null || !nadObj["Extremities"]
                        ? true
                        : false;
                    localStorage.setItem(
                      "physicalExamAtDischargeObjNad",
                      JSON.stringify(nadObj)
                    );
                    setPrompt(Math.random());
                  }}
                >
                  NAD
                </Button>
                <TextareaAutosize
                  rows={2}
                  className={styles.insideTableTextAutoSize}
                  placeholder={
                    localStorage.getItem("physicalExamAtDischargeObj") ==
                      null ||
                    JSON.parse(
                      localStorage.getItem("physicalExamAtDischargeObj")
                    )["Extremities"] == null
                      ? "Type Here"
                      : JSON.parse(
                          localStorage.getItem("physicalExamAtDischargeObj")
                        )["Extremities"]
                  }
                  onChange={(e) => handleTextChange(e, "Extremities")}
                ></TextareaAutosize>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PhysicalExamTable;
