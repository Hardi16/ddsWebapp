import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const DietaryInstructionsTable = (props) => {
  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("dietaryInstructionsObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("dietaryInstructionsObj"));
    obj[label] = e.target.value;
    localStorage.setItem("dietaryInstructionsObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>Healthy Diet</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Healthy Diet")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Fruits and Vegetables</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Fruits and Vegetables")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Fiber</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Fiber")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Grains and Sugar</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Grains and Sugar")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Fat</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Fat")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Red Meat</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Red Meat")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Foliate</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Foliate")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Antioxidants</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Antioxidants")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Calcium and Vitamin D</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Calcium and Vitamin D")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Calories Intake</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={[
                  styles.insideTableTextAutoSizeGrey,
                  styles.greyBackground,
                ].join(" ")}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Calories Intake")}
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

export default DietaryInstructionsTable;
