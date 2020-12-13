import React, { useState } from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";
import ReadMoreTextArea from "./ReadMoreTextArea";
import TextareaAutosize from "react-textarea-autosize";

const GynTable = (props) => {
  const [lmpDate, setLmpDate] = useState(new Date());
  const [eddDate, setEddDate] = useState(new Date());
  const [eddUsgDate, setEddUsgDate] = useState(new Date());

  const handleTextChange = (e, label) => {
    let obj =
      localStorage.getItem("gynAndObsObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("gynAndObsObj"));
    obj[label] = e.target.value;
    localStorage.setItem("gynAndObsObj", JSON.stringify(obj));
  };
  const handeleDateChange = (date, label) => {
    // date = date.toString().split(" ");
    // let dateGood = date[2] + " " + date[1] + " " + date[3];
    let obj =
      localStorage.getItem("gynAndObsObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("gynAndObsObj"));
    obj[label] = date;
    localStorage.setItem("gynAndObsObj", JSON.stringify(obj));
  };
  return (
    <div className={styles.patientTableDiv}>
      <Table responsive size="sm" className={styles.patientInfoTable}>
        <tbody>
          <tr>
            <td className={styles.tableCell}>LMP</td>
            <td className={styles.tableCell}>
              <DatePicker
                className={classes.datepickerCreatePg}
                selected={lmpDate}
                onChange={(date) => {
                  handeleDateChange(date, "LMP");
                  setLmpDate(date);
                  props.setPrompt(Math.random());
                }}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>EDD</td>
            <td className={styles.tableCell}>
              <DatePicker
                className={classes.datepickerCreatePg}
                selected={eddDate}
                onChange={(date) => {
                  handeleDateChange(date, "EDD");
                  setEddDate(date);
                  props.setPrompt(Math.random());
                }}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>EDD(USG)</td>
            <td className={styles.tableCell}>
              <DatePicker
                className={classes.datepickerCreatePg}
                selected={eddUsgDate}
                onChange={(date) => {
                  handeleDateChange(date, "EDDUSG");
                  setEddUsgDate(date);
                  props.setPrompt(Math.random());
                }}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>POG</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "POG")}
              ></TextareaAutosize>
            </td>
          </tr>
          <tr>
            <td className={styles.tableCell}>Obs Score</td>
            <td className={styles.tableCell}>
              <TextareaAutosize
                rows={2}
                className={styles.insideTableTextAutoSize}
                placeholder="Type Here"
                onChange={(e) => handleTextChange(e, "Obs Score")}
              ></TextareaAutosize>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default GynTable;
