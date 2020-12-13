import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import { hostAddress } from "../assets/config";
import { Redirect } from "react-router";
import HamburgerDropdown from "./HamburgerDropdown";
import SearchDiagnosis from "./SearchDiagnosis";
import axios from "axios";
import convert from "xml-js";

const DSCreateLeftPaneSite = (props) => {
  const [content, setContent] = useState(null);
  const [prompt, setPrompt] = useState(null);
  useEffect(() => {
    let arr = [
      "Brain",
      "Eye",
      "Head & Neck",
      "Oral",
      "Thyroid",
      "Breast",
      "Lung",
      "Esophageal",
      "Stomach",
      "Liver",
      "Gallbladder",
      "Pancreas",
      "Intestine",
      "Rectum",
      "Kidney",
      "Urinary Bladder",
      "Ureter",
      "Prostate",
      "Testicular",
      "Penis",
      "Ovary",
      "Uterus",
      "Cervix",
      "Skin",
    ];
    let arrContent = arr.map((item) => {
      return (
        <Button
          variant="primary"
          className={
            JSON.parse(localStorage.getItem("siteObj")) == null ||
            JSON.parse(localStorage.getItem("siteObj"))[item] == null ||
            !JSON.parse(localStorage.getItem("siteObj"))[item]
              ? styles.toxicityInactive
              : styles.toxicityActive
          }
          onClick={() => {
            let obj =
              JSON.parse(localStorage.getItem("siteObj")) == null
                ? {}
                : JSON.parse(localStorage.getItem("siteObj"));
            obj[item] = obj == {} || obj[item] ? false : true;
            localStorage.setItem("siteObj", JSON.stringify(obj));
            setPrompt(Math.random());
            props.setCreateDsStateChange(JSON.stringify(obj));
          }}
        >
          {item}
        </Button>
      );
    });
    setContent(
      <div className={styles.scrollleft}>
        <div className={styles.vitalsDiv}>
          <div className={styles.vitalsHead}></div>
          <div className={styles.generalsBody}>{arrContent}</div>
        </div>
      </div>
    );
  }, [props.leftPrompt, prompt]);

  return (
    <>
      {/* <div className={classes.leftPaneHeaderDSCreate}>
        <div className={classes.leftHeaderImageContainer}>
          <img
            alt=""
            className={classes.leftHeaderImage}
            src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
          ></img>
        </div>
        <div className={classes.leftHeaderHeading}>
          <div className={classes.leftHeaderHeadingTitle}>
            <Button
              className={classes.createPageClinicNameBtn}
              onClick={() =>
                props.setRedirect(<Redirect to="/dischargeSummaryPage" />)
              }
            >
              {localStorage.getItem("clinicName")}
            </Button>
          </div>
          <div className={classes.leftHeaderSubHeading}>
            {localStorage.getItem("doctorName")}
          </div>
          <div className={classes.leftHeaderSubHeadingRight}>
            {localStorage.getItem("docSpecialityName")}
          </div>
        </div>
        <HamburgerDropdown></HamburgerDropdown>
      </div> */}
      <div className={classes.leftPaneSearchCreatePage}></div>
      <div className={classes.leftPaneContentCreate}>
        <div className={classes.leftHeaders}>
          <div className={styles.phyExamMainHead}>
            <h4>Site</h4>
            <hr />
          </div>
        </div>
        <div className={styles.physicalExamContent}>{content}</div>
      </div>
    </>
  );
};

export default DSCreateLeftPaneSite;
