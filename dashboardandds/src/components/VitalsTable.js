import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const VitalsTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("vitalsAtDischargeObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("vitalsAtDischargeObj"));
    obj[label] = e.target.value;
    localStorage.setItem("vitalsAtDischargeObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Temperature</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={1}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Temperature")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>PR</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "PR")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>RR</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "RR")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>BP</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "BP")}
              ></TextareaAutosize>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default VitalsTable;
