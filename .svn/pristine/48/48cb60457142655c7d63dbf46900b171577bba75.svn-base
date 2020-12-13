import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const ProcedureTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("proceduresObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("proceduresObj"));
    obj[label] = e.target.value;
    localStorage.setItem("proceduresObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <thead>
          <td className={styles.tableCell}>Operative</td>
          <td className={styles.tableCell}>#</td>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Pre Operative</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Pre Operatives")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Peri Operative</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Peri Operatives")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Post Operative</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Post Operatives")}
              ></TextareaAutosize>
            </td>
          </tr>
        </tbody>
        <tr>
          <td className={styles.tableCell}>Non Operative</td>
          <td className={styles.tableCell}>
            <TextareaAutosize
              rows={2}
              className={styles.insideTableTextAutoSize}
              placeholder="Type Here"
              onChange={(e) => handleTextChange(e, "Non Operatives")}
            ></TextareaAutosize>
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default ProcedureTable;
