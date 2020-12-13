import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const DispositionTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("dispositionObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("dispositionObj"));
    obj[label] = e.target.value;
    localStorage.setItem("dispositionObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Going Home</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Going Home")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Refer to Higher Center</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Refer to Higher Center")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Going to relatives</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Going to relatives")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Going to senior center</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Going to senior center")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Other</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Other")}
              ></TextareaAutosize>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DispositionTable;
