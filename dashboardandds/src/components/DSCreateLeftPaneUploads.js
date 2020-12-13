import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import { hostAddress } from "../assets/config";
import { Redirect } from "react-router";
import HamburgerDropdown from "./HamburgerDropdown";
import axios from "axios";
import {
  DropzoneArea,
  DropzoneAreaBase,
  DropzoneDialog,
  DropzoneDialogBase,
} from "material-ui-dropzone";

const DSCreateLeftPaneUploads = (props) => {
  useEffect(() => {}, []);
  const [open, setOpen] = React.useState(false);

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

      <div className={classes.leftPaneContentCreate}>
        <div>
          {" "}
          <Button onClick={() => setOpen(true)}>Your Uploads</Button>
          <DropzoneDialog
            acceptedFiles={["image/*", "application/pdf"]}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={50000000}
            open={open}
            onClose={() => setOpen(false)}
            onSave={(files) => {
              console.log("Files:", files);
              setOpen(false);
            }}
            filesLimit="20"
            showPreviews={true}
            showFileNamesInPreview={true}
          />
        </div>
      </div>
    </>
  );
};

export default DSCreateLeftPaneUploads;
