import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const TherapyTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("therapyOrdersObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("therapyOrdersObj"));
    obj[label] = e.target.value;
    localStorage.setItem("therapyOrdersObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Physiotherapy</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Physiotherapy")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Wound Management</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Wound Management")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Hot and Cold Fomentation</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) =>
                  handleTextChange(e, "Hot and Cold Fomentation")
                }
              ></TextareaAutosize>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TherapyTable;
