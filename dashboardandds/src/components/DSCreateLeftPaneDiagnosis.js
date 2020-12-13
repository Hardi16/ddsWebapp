import React, { useState, useEffect } from "react";
import { Button, Badge,Dropdown } from "react-bootstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import { hostAddress } from "../assets/config";
import { Redirect } from "react-router";
import HamburgerDropdown from "./HamburgerDropdown";
import SearchDiagnosis from "./SearchDiagnosis";
import axios from "axios";
import { currentServer } from "../assets/config";

const DSCreateLeftPaneDiagnosis = (props) => {
  const [diagnosisOnAdmission, setdiagnosisOnAdmission] = useState(null);
  
  useEffect(() => {
    let contentArr =
      localStorage.getItem("diagnosisOnAdmission") == null
        ? []
        : JSON.parse(localStorage.getItem("diagnosisOnAdmission"));
    renderDiagnosisList(contentArr);
  }, [props.leftPrompt]);

  const showSelectedDiagnosis = (diagnosis) => {
    let contentArr =
      localStorage.getItem("diagnosisOnAdmission") == null
        ? []
        : JSON.parse(localStorage.getItem("diagnosisOnAdmission"));
    if (!contentArr.includes(diagnosis)) contentArr.push(diagnosis);
    localStorage.setItem("diagnosisOnAdmission", JSON.stringify(contentArr));
    renderDiagnosisList(contentArr);
  };
  const renderDiagnosisList = (contentArr) => {
    setdiagnosisOnAdmission(
      contentArr.map((item) => {
        return (
          <div className={styles.diagnosisRow}>
            <div
              className={styles.diagnosisRowName}
              onClick={() =>
                props.setCreateDsStateChange(
                  JSON.stringify(diagnosisOnAdmission)
                )
              }
            >
              {item}
            </div>
            <i class="fa fa-close" onClick={() => removeElement(item)}></i>
          </div>
        );
      })
    );
  };
  const removeElement = (diagnosisToRemove) => {
    let contentArr =
      localStorage.getItem("diagnosisOnAdmission") == null
        ? []
        : JSON.parse(localStorage.getItem("diagnosisOnAdmission"));
    contentArr = contentArr.filter((item) => item != diagnosisToRemove);
    localStorage.setItem("diagnosisOnAdmission", JSON.stringify(contentArr));
    renderDiagnosisList(contentArr);
  };

  return (
    <>
      {/* <div className={classes.leftPaneHeaderDSCreate}>
        
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
      </div> */}
      <div className={classes.leftPaneSearchCreatePage}>
        <SearchDiagnosis
          setdiagnosisOnAdmission={setdiagnosisOnAdmission}
          showSelectedDiagnosis={showSelectedDiagnosis}
        />
      </div>
      <div className={classes.leftPaneContentCreate}>
        <div className={classes.leftHeaders}>
          <Button
            className={
              props.btnHeaderStyleObj["home"]
                ? classes.leftHeaderBtnActive
                : classes.leftHeaderBtnPassive
            }
            variant="success"
            onClick={() => {
              let tempBtnHeaderStyleObj = {};
              tempBtnHeaderStyleObj["home"] = true;
              props.setBtnHeaderStyleObj(tempBtnHeaderStyleObj);
              props.setOnPage("home");
              props.setPrompt(Math.random());
            }}
          >
            All Diagnosis
          </Button>
          <Button
            className={
              props.btnHeaderStyleObj["favs"]
                ? classes.leftHeaderBtnActive
                : classes.leftHeaderBtnPassive
            }
            variant="success"
            onClick={() => {
              let tempBtnHeaderStyleObj = {};
              tempBtnHeaderStyleObj["favs"] = true;
              props.setBtnHeaderStyleObj(tempBtnHeaderStyleObj);
              props.handleFavourites();
            }}
          >
            Favourites
          </Button>
        </div>
        <div className={styles.diagnosisOnAdmission}>
          {diagnosisOnAdmission}
          {/* <Button
            variant="success"
            className={classes.addBtn}
            onClick={() => {
              // props.setdiagnosisOnAdmission(diagnosisOnAdmission);
              props.setCreateDsStateChange(JSON.stringify(diagnosisOnAdmission));
            }}
          >
            Add
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default DSCreateLeftPaneDiagnosis;
