import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import { hostAddress } from "../assets/config";
import { Redirect } from "react-router";
import HamburgerDropdown from "./HamburgerDropdown";
import SearchInvestigation from "./SearchInvestigation";
import axios from "axios";

const DSCreateLeftPaneInvestigation = (props) => {
  const [advisedInvestigations, setadvisedInvestigations] = useState(null);
  useEffect(() => {
    let contentArr =
      localStorage.getItem("advisedInvestigations") == null
        ? []
        : JSON.parse(localStorage.getItem("advisedInvestigations"));
    renderInvestigationList(contentArr);
  }, [props.leftPrompt]);

  const showSelectedInvestigation = (investigation) => {
    let contentArr =
      localStorage.getItem("advisedInvestigations") == null
        ? []
        : JSON.parse(localStorage.getItem("advisedInvestigations"));
    if (!contentArr.includes(investigation)) contentArr.push(investigation);
    localStorage.setItem("advisedInvestigations", JSON.stringify(contentArr));
    renderInvestigationList(contentArr);
  };
  const renderInvestigationList = (contentArr) => {
    setadvisedInvestigations(
      contentArr.map((item) => {
        return (
          <div className={styles.diagnosisRow}>
            <div className={styles.diagnosisRowName}>{item}</div>
            <i class="fa fa-close" onClick={() => removeElement(item)}></i>
          </div>
        );
      })
    );
  };
  const removeElement = (investigationToRemove) => {
    let contentArr =
      localStorage.getItem("advisedInvestigations") == null
        ? []
        : JSON.parse(localStorage.getItem("advisedInvestigations"));
    contentArr = contentArr.filter((item) => item != investigationToRemove);
    localStorage.setItem("advisedInvestigations", JSON.stringify(contentArr));
    renderInvestigationList(contentArr);
  };

  return (
    <>
      <div className={classes.leftPaneHeaderFix}>
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
          <SearchInvestigation
            setadvisedInvestigations={setadvisedInvestigations}
            showSelectedInvestigation={showSelectedInvestigation}
          />
        </div>
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
            All Investigations
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
          {/* <Button
            className={
              props.btnHeaderStyleObj["selected"]
                ? classes.leftHeaderBtnActive
                : classes.leftHeaderBtnPassive
            }
            onClick={() => {
              let tempBtnHeaderStyleObj = {};
              tempBtnHeaderStyleObj["selected"] = true;
              props.setBtnHeaderStyleObj(tempBtnHeaderStyleObj);
              props.handleSelect();
            }}
            variant="success"
          >
            Selected
          </Button> */}
        </div>
        <div className={styles.advisedInvestigations}>
          {advisedInvestigations}
          <Button
            variant="success"
            className={classes.addBtn}
            onClick={() => {
              props.setCreateDsStateChange(
                JSON.stringify(advisedInvestigations)
              );
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default DSCreateLeftPaneInvestigation;
