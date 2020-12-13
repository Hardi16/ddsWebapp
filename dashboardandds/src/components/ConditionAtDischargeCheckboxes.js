import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import styles from "./Styles.module.css";

const ConditionAtDischargeCheckboxes = (props) => {
  const handleCheckBox = (e, label) => {
    let obj =
      localStorage.getItem("conditionAtDischargeObj") == null
        ? {}
        : JSON.parse(localStorage.getItem("conditionAtDischargeObj"));
    obj[label] = obj[label] == null || obj[label] == false ? true : false;
    localStorage.setItem("conditionAtDischargeObj", JSON.stringify(obj));
  };
  return (
    <div>
      <form className={styles.checkboxForm}>
        <div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Good")}
            />
            <label className={styles.checkboxLabel}>Good</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Fair")}
            />
            <label className={styles.checkboxLabel}>Fair</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Stable")}
            />
            <label className={styles.checkboxLabel}>Stable</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Stable but Confused")}
            />
            <label className={styles.checkboxLabel}>Stable but Confused</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Requires assistance")}
            />
            <label className={styles.checkboxLabel}>Requires assistance</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBox(e, "Disoriented")}
            />
            <label className={styles.checkboxLabel}>Disoriented</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) =>
                handleCheckBox(e, "Walking without walker /help")
              }
            />
            <label className={styles.checkboxLabel}>
              Walking without walker /help
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) =>
                handleCheckBox(e, "Walking without walker /help")
              }
            />
            <label className={styles.checkboxLabel}>
              Walking without walker /help
            </label>
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
};

export default ConditionAtDischargeCheckboxes;
