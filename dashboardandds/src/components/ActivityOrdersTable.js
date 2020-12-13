import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const ActivityOrdersTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("activityOrdersObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("activityOrdersObj"));
    obj[label] = e.target.value;
    localStorage.setItem("activityOrdersObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Complete Bed Rest</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Complete Bed Rest")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>
              Bed Rest with Bathroom Privileges
            </td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) =>
                  handleTextChange(e, "Bed Rest with Bathroom Privileges")
                }
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Up in Chair/Assist</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Up in Chair/Assist")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>May Walk in Hall</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "May Walk in Hall")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Activity as Tolerated</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Activity as Tolerated")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>No Restrictions on Activity</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) =>
                  handleTextChange(e, "No Restrictions on Activity")
                }
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Other</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
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

export default ActivityOrdersTable;
