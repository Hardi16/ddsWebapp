import React, { useState, useEffect } from "react";
import styles from "../../components/Styles.module.css";
import classes from "./DischargeSummary.module.css";
import _, { forEach } from "lodash";
import { Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import MakeMediGrpModal from "../../components/MakeMediGrpModal";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";
import DischargeSummaryRightPane from "../../components/DischargeSummaryRightPane";
import DSCreateLeftPaneMedicines from "../../components/DSCreateLeftPaneMedicines";
import DSCreateLeftPaneDiagnosis from "../../components/DSCreateLeftPaneDiagnosis";
import DSCreateLeftPaneCommon from "../../components/DSCreateLeftPaneCommon";
import DSCreateLeftPaneTreatmentProtocol from "../../components/DSCreateLeftPaneTreatmentProtocol";
import DSCreateLeftPaneInvestigation from "../../components/DSCreateLeftPaneInvestigation";
import DSCreateLeftPanePhysicalExam from "../../components/DSCreateLeftPanePhysicalExam";
import DSCreateLeftPaneUploads from "../../components/DSCreateLeftPaneUploads";
import DSCreateLeftPaneDietAndOthers from "../../components/DSCreateLeftPaneDietAndOthers";
import DSCreateLeftPaneHistoryOfPresentIllness from "../../components/DSCreateLeftPaneHistoryOfPresentIllness";
import DSCreateLeftPaneLanding from "../../components/DSCreateLeftPaneLanding";
import DSCreateLeftPanePastMedicalHistory from "../../components/DSCreateLeftPanePastMedicalHistory";
import DSCreateLeftPanePastSurgicalHistory from "../../components/DSCreateLeftPanePastSurgicalHistory";
import DSCreateLeftPaneFamilyHistory from "../../components/DSCreateLeftPaneFamilyHistory";
import DSCreateLeftPaneToxicity from "../../components/DSCreateLeftPaneToxicity";
import DSCreateLeftPaneSite from "../../components/DSCreateLeftPaneSite";
import DSCreateLeftPaneChiefComplaint from "../../components/DSCreateLeftPaneChiefComplaint";
import HamburgerDropdown from "../../components/HamburgerDropdown";
import SaveProtocolCreatePageModal from "../../components/SaveProtocolCreatePageModal";
import { ListItemText } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";

const DischargeSummaryCreate = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [mediArr, setMediArr] = useState([]);
  const [mediToAddArr, setMediToAddArr] = useState([]);
  const [mediToAddWithArr, setMediToAddWithBrackArr] = useState([]);
  const [medicineName, setMedicineName] = useState();
  const [mediObj, setMediObj] = useState({});
  const [mediObjWithBrack, setMediObjWithBrack] = useState({});
  const [leftContentMedi, setLeftContentMedi] = useState();
  const [favChecked, setFavChecked] = useState({});
  const [grpChecked, setGrpChecked] = useState({});
  const [leftContent, setLeftContent] = useState(leftContentMedi);
  const [onPage, setOnPage] = useState("home");
  const [btnHeaderStyleObj, setBtnHeaderStyleObj] = useState({ home: true });
  const [grpSel, setGrpSel] = useState({});
  const [redirectVar, setRedirectVar] = useState(null);
  const [leftPaneLabel, setLeftPaneLabel] = useState("LandingLeftDSC");
  const [leftPaneSansMedicine, setLeftPaneSansMedicine] = useState(null);
  const [createDsStateChange, setCreateDsStateChange] = useState([]);
  const [leftPrompt, setLeftPrompt] = useState(0);
  const [dateOfDischarge, setDateOfDischarge] = useState(new Date());
  const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
  const [loader, setLoader] = useState(null);
  const [toggleValue, setToggleValue] = useState();
  const [saveProtocolModal, setSaveProtocolModal] = useState(false);

  let patient,
    mediSet,
    mediNameWithBrackSet,
    patientId,
    ptCaseID,
    evolkoId,
    cellphone,
    patientName,
    age,
    email,
    visitId,
    doctorName;
  const setConfigurations = () => {
    console.log("DischargeSummaryCreate props", props);
    patient =
      props.location != null && props.location.state != null
        ? props.location.state.patient
        : JSON.parse(localStorage.getItem("patient"));

    console.log("patient:", patient);

    mediSet = new Set();
    mediNameWithBrackSet = new Set();
    patientId =
      props.location != null && props.location.state != null
        ? props.location.state.patient["id"]
        : patient != null
        ? patient["id"]
        : 0;

    ptCaseID =
      props.location != null && props.location.state != null
        ? props.location.state.patient["ptcaseId"]
        : patient["ptcaseId"];
    console.log("patientids", patientId, ptCaseID);
    evolkoId =
      props.location != null && props.location.state != null
        ? props.location.state.patient["cardNumber"]
        : patient["cardNumber"];
    cellphone =
      props.location != null && props.location.state != null
        ? props.location.state.patient["celllphone"]
        : patient["celllphone"];
    patientName =
      props.location != null && props.location.state != null
        ? props.location.state.patient["name"]
        : patient["name"];
    age =
      props.location != null && props.location.state != null
        ? props.location.state.patient["age"]
        : patient["age"];
    email =
      props.location != null && props.location.state != null
        ? props.location.state.patient["email"]
        : patient["email"];
    doctorName =
      props.location != null && props.location.state != null
        ? localStorage.setItem(
            "doctorName",
            props.location.state.patient["doctorName"]
          )
        : patient["doctorName"];
    console.log("patient doctorName:", doctorName);
  };
  setConfigurations();
  // for setting the left pane ie diagnosis and others
  useEffect(() => {
    if (leftPaneLabel == "LandingLeftDSC") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneLanding
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    }
    if (leftPaneLabel == "Diagnosis")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDiagnosis
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "Investigation")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneInvestigation
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "PhysicalExam")
      setLeftPaneSansMedicine(
        <DSCreateLeftPanePhysicalExam
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "Toxicity")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneToxicity
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "Site")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneSite
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "History of Present Illness & Obs Profile")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneHistoryOfPresentIllness
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );

    if (leftPaneLabel == "Past Medical History")
      setLeftPaneSansMedicine(
        <DSCreateLeftPanePastMedicalHistory
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          setLeftPaneLabel={setLeftPaneLabel}
        />
      );
    if (leftPaneLabel == "Past Surgical History")
      setLeftPaneSansMedicine(
        <DSCreateLeftPanePastSurgicalHistory
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "Family History")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneFamilyHistory
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    //
    if (leftPaneLabel == "Dietary Instructions") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDietAndOthers
          setRedirect={setRedirect}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          createDsStateChange={createDsStateChange}
          label="Dietary Instructions"
          reqName="Diet"
        />
      );
    }
    if (leftPaneLabel == "Condition at Discharge") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDietAndOthers
          setRedirect={setRedirect}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          createDsStateChange={createDsStateChange}
          label="Condition at Discharge"
          reqName="Condition"
        />
      );
    }
    if (leftPaneLabel == "Discharged To") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDietAndOthers
          setRedirect={setRedirect}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          createDsStateChange={createDsStateChange}
          label="Discharged To"
          reqName="Discharged To"
        />
      );
    }
    if (leftPaneLabel == "Activity Orders") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDietAndOthers
          setRedirect={setRedirect}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          createDsStateChange={createDsStateChange}
          label="Activity Orders"
          reqName="Activity Orders"
        />
      );
    }
    if (leftPaneLabel == "Therapy Orders") {
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneDietAndOthers
          setRedirect={setRedirect}
          leftPrompt={leftPrompt}
          setCreateDsStateChange={setCreateDsStateChange}
          createDsStateChange={createDsStateChange}
          label="Therapy Orders"
          reqName="Therapy Orders"
        />
      );
    }
    if (leftPaneLabel == "Treatment Protocol")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneTreatmentProtocol
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setLeftPaneLabel={setLeftPaneLabel}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
    if (leftPaneLabel == "Chief Complaint")
      setLeftPaneSansMedicine(
        <DSCreateLeftPaneChiefComplaint
          setRedirect={setRedirect}
          getSelectedMedFromSearch={getSelectedMedFromSearch}
          setLeftContent={setLeftContent}
          btnHeaderStyleObj={btnHeaderStyleObj}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          setOnPage={setOnPage}
          setPrompt={setPrompt}
          handleFavourites={handleFavourites}
          handleSelect={handleSelect}
          leftContent={leftContent}
          leftPrompt={leftPrompt}
          setLeftPaneLabel={setLeftPaneLabel}
          setCreateDsStateChange={setCreateDsStateChange}
        />
      );
  }, [leftPaneLabel, leftPrompt, createDsStateChange]);

  const checkForDirtyness = () => {
    if (localStorage.getItem("protocolSet")) {
      let lsStr =
        localStorage.getItem("cardsLabel") +
        localStorage.getItem("deletedSection") +
        localStorage.getItem("conditionAtDischarge") +
        localStorage.getItem("chiefComplaint") +
        localStorage.getItem("dietaryInstructions") +
        localStorage.getItem("courseInTheHospital") +
        localStorage.getItem("dateOfDischarge") +
        localStorage.getItem("durationOptions") +
        localStorage.getItem("historyOfIllnessPages") +
        localStorage.getItem("investigationsAtTheHospital") +
        localStorage.getItem("phyExamSelectedOneId") +
        localStorage.getItem("treatmentGiven") +
        localStorage.getItem("procedureFindings") +
        localStorage.getItem("therapyOrdersContent") +
        localStorage.getItem("therapyOrders") +
        localStorage.getItem("procedureDone") +
        localStorage.getItem("phyExamAllPagesOfSelectedOne") +
        localStorage.getItem("cardStyler") +
        localStorage.getItem("pastSurgicalHistoryObj") +
        localStorage.getItem("diagnosisOnDischarge") +
        localStorage.getItem("scheduleDate") +
        localStorage.getItem("conditionAtDischargeContent") +
        localStorage.getItem("allergies") +
        localStorage.getItem("phyExamPageNumber") +
        localStorage.getItem("vitalsOnAdmissionObj") +
        localStorage.getItem("physicalExamContent") +
        localStorage.getItem("familyHistoryObj") +
        localStorage.getItem("remarksOptions") +
        localStorage.getItem("pastMedicalHistoryObj") +
        localStorage.getItem("activityOrdersContent") +
        localStorage.getItem("dateOfAdmission") +
        localStorage.getItem("plansForMedicalFollowUpObj") +
        localStorage.getItem("vitalsOnDischargeObj") +
        localStorage.getItem("lsObj") +
        localStorage.getItem("uploadFiles") +
        localStorage.getItem("routeOptions") +
        localStorage.getItem("dispositionToContent") +
        localStorage.getItem("healthRadarMonitoringDurationCondition") +
        localStorage.getItem("diagnosisOnAdmission") +
        localStorage.getItem("dietaryInstructionsContent") +
        localStorage.getItem("activityOrders") +
        localStorage.getItem("physicalExamAtDischargeObjNad") +
        localStorage.getItem("dispostionTo") +
        localStorage.getItem("historyOfPresentIllnessObj") +
        localStorage.getItem("patientsSignTextbox") +
        localStorage.getItem("siteObj") +
        localStorage.getItem("savedObject") +
        localStorage.getItem("advisedInvestigations") +
        localStorage.getItem("adviceOnDischarge");

      let protocolDataString = localStorage.getItem("protocolDataString");
      console.log("lsStr", lsStr, "protocolDataString", protocolDataString);

      if (
        localStorage.getItem("protocolDataString") !== null &&
        protocolDataString !== lsStr
      )
        localStorage.setItem("isDirtySave", true);
      return true;
    }
    return false;
  };
  const setSaveParameters = (id, sectionName) => {
    let nameVal = sectionName,
      displayTextVal = sectionName;
    // if (sectionName == "Treatment Protocol") nameVal = "Treatment Protocol";
    if (sectionName == "Patient Information") nameVal = "Admission Details";
    if (sectionName == "Diagnosis On Admission") {
      nameVal = "Diagnosis";
      displayTextVal = "Diagnosis on Admission";
    }
    if (sectionName == "Diagnosis On Discharge") {
      nameVal = "Diagnosis at Discharge";
      displayTextVal = "Diagnosis at Discharge";
    }
    if (sectionName == "Reason for Admission") nameVal = "Reason for Admission";
    if (sectionName == "Chief Complaint") nameVal = "Complaint";
    if (sectionName == "History of Present Illness & Obs Profile") {
      nameVal = "Clinical History";
      displayTextVal = "History";
    }
    if (sectionName == "Condition at Discharge") {
      nameVal = "Condition";
      displayTextVal = "Condition on Discharge";
    }
    if (sectionName == "Plans for Medical Follow-up") {
      displayTextVal = "Next Follow Up";
      nameVal = "Follow Up";
    }
    if (sectionName == "Dietary Instructions") {
      nameVal = "Diet";
      displayTextVal = "Diet on Discharge";
    }
    if (sectionName == "HealthRADAR Monitoring (Duration, Condition)") {
      displayTextVal = "HealthRADAR";
      nameVal = "HealthRADAR";
    }

    let saveObj = {
      _description: "",
      _id: id,
      _name: nameVal,
      dataVisibility: 0,
      displayText: displayTextVal,
      dynamicSection: false,
      editableData: false,
      finalValue: "",
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -256,
      titleVisibility: 0,
    };

    let camelCaseName = _.camelCase(sectionName);
    let camelCaseNameWObj = _.camelCase(camelCaseName + "Obj");

    let cardTextToStringCase = [
      "Medications at Discharge Notes",
      "Investigations at the Hospital",
      "Procedure Done",
      "Procedure Findings",
      "Course in the Hospital",
      "Treatment Given",
      "Advice on Discharge",
      "HealthRADAR Monitoring (Duration, Condition)",
      "Diagnosis On Discharge",
      "History of Present Illness",
    ];
    if (cardTextToStringCase.includes(sectionName)) {
      let val =
        localStorage.getItem(camelCaseName) == null
          ? ""
          : localStorage.getItem(camelCaseName);

      saveObj["_description"] = val.toString();
      if (sectionName == "HealthRADAR Monitoring (Duration, Condition)")
        saveObj["_description"] =
          "Active -General Health for " + localStorage.getItem("radarDuration");
      saveObj["finalValue"] = val.toString();
    }
    let cardObjToStringCase = [
      "Chief Complaint",
      "Dietary Instructions",
      "Therapy Orders",
      "Activity Orders",
      "Condition at Discharge",
      "Discharged To",
      "Allergies",
    ];
    if (cardObjToStringCase.includes(sectionName)) {
      let obj = JSON.parse(localStorage.getItem(camelCaseName));
      let arr = [];
      for (let objitem in obj) {
        let key = objitem;
        let val = obj[key];
        if (val == true) arr.push(key);
      }
      saveObj["_description"] = arr.toString();
      saveObj["finalValue"] = arr.toString();
    }
    let cardObjToObjCase = [
      "Patient Information",
      "Physical Exam at Discharge",
      "Vitals on Discharge",
      "Plans for Medical Follow-up",
    ];
    if (cardObjToObjCase.includes(sectionName)) {
      saveObj["isHeaderItem"] =
        sectionName == "Patient Information" ? true : false;
      saveObj["isTabularForm"] = true;
      let piObj =
        JSON.parse(localStorage.getItem(camelCaseNameWObj)) == null
          ? {}
          : JSON.parse(localStorage.getItem(camelCaseNameWObj));
      saveObj["groupedDetails"] = Object.keys(piObj).map((item) => {
        let obj = {
          _name: item,
          _description: piObj[item],
        };
        return obj;
      });
    }
    let signObjects = ["Doctor's Signature", "Patient's Signature"];
    if (signObjects.includes(sectionName)) {
      let val =
        localStorage.getItem(camelCaseName) == null
          ? ""
          : localStorage.getItem(camelCaseName);
      let ptLine =
        sectionName == "Patient's Signature"
          ? "I have received all relevant documents and records"
          : "";
      saveObj["_description"] = val + "\n " + ptLine;
      saveObj["finalValue"] = val + "\n " + ptLine;
    }
    if (
      !cardTextToStringCase.includes(sectionName) &&
      !cardObjToStringCase.includes(sectionName) &&
      !cardObjToObjCase.includes(sectionName) &&
      !signObjects.includes(sectionName)
    ) {
      let obj = JSON.parse(localStorage.getItem(camelCaseNameWObj));
      if (obj == null) {
        let val =
          localStorage.getItem(camelCaseName) == null
            ? ""
            : localStorage.getItem(camelCaseName);

        saveObj["_description"] = val;
        saveObj["finalValue"] = val;
      } else {
        console.log("obj", obj);
        let arr = [];
        for (let objitem in obj) {
          let key = objitem;
          let val = obj[key];
          if (typeof val === "object" && val !== null) {
            val = val[Object.keys(val)[0]] ? Object.keys(val)[0] : "";
            if (val != "") {
              arr.push(key + "-" + val);
            }
          } else if (val == true || val == false) {
            arr.push(key);
          } else arr.push(key + "-" + val);
        }
        saveObj["_description"] = arr.toString();
        saveObj["finalValue"] = arr.toString();
      }
    }
    return saveObj;
  };
  const setHistoryFields = (id) => {
    let saveObj = {
      _description: "",
      _id: id,
      _name: "Clinical History",
      dataVisibility: 0,
      displayText: "History",
      dynamicSection: false,
      editableData: false,
      finalValue: "",
      groupedDetails: [],
      isDescription1Exist: false,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -256,
      titleVisibility: 0,
      isDescription1Exist: false,
      isHeaderItem: false,
      isTabularForm: true,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -107760,
      titleVisibility: 0,
    };
    let groupedDetailsMediHis = {
      _description: "",
      _id: 0,
      _name: "Past Medical History",
      dataVisibility: 0,
      dynamicSection: true,
      editableData: false,
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      parentSection: "Clinical History",
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: false,
      selectedRxList: [],
      sequenceId: id,
      titleColor: 0,
      titleVisibility: 0,
    };
    let groupedDetailsSurgHis = {
      _description: "",
      _id: 0,
      _name: "Past Surgical History",
      dataVisibility: 0,
      dynamicSection: true,
      editableData: false,
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      parentSection: "Clinical History",
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: false,
      selectedRxList: [],
      sequenceId: id,
      titleColor: 0,
      titleVisibility: 0,
    };
    let groupedDetailsFamHis = {
      _description: "",
      _id: 0,
      _name: "Family History",
      dataVisibility: 0,
      dynamicSection: true,
      editableData: false,
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      parentSection: "Clinical History",
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: false,
      selectedRxList: [],
      sequenceId: id,
      titleColor: 0,
      titleVisibility: 0,
    };

    let pastMedicalHistoryObj = JSON.parse(
      localStorage.getItem("pastMedicalHistoryObj")
    );
    let pastMedicalHistoryObjStr =
      pastMedicalHistoryObj == null
        ? ""
        : Object.keys(pastMedicalHistoryObj)
            .map((item) => {
              let obj = pastMedicalHistoryObj[item];
              if (obj[Object.keys(obj)[0]]) {
                if (Object.keys(obj)[0] == "Yes") return item;
                else return item + "-" + Object.keys(obj)[0];
              }
            })
            .filter((ele) => ele != null || ele != "");
    pastMedicalHistoryObjStr = pastMedicalHistoryObjStr.toString();
    groupedDetailsMediHis["_description"] = pastMedicalHistoryObjStr;

    let pastSurgicalHistoryObj = JSON.parse(
      localStorage.getItem("pastSurgicalHistoryObj")
    );
    let pastSurgicalHistoryObjStr =
      pastSurgicalHistoryObj == null
        ? ""
        : Object.keys(pastSurgicalHistoryObj)
            .map((item) => {
              let obj = pastSurgicalHistoryObj[item];
              if (obj[Object.keys(obj)[0]]) {
                if (Object.keys(obj)[0] == "Yes") return item;
                else return item + "-" + Object.keys(obj)[0];
              }
            })
            .filter((ele) => ele != null || ele != "");
    pastSurgicalHistoryObjStr = pastSurgicalHistoryObjStr.toString();
    groupedDetailsSurgHis["_description"] = pastSurgicalHistoryObjStr;

    let familyHistoryObj = JSON.parse(localStorage.getItem("familyHistoryObj"));
    let familyHistoryObjStr =
      familyHistoryObj == null
        ? ""
        : Object.keys(familyHistoryObj)
            .map((item) => {
              let obj = familyHistoryObj[item];
              if (Object.keys(obj).length <= 1 && obj[Object.keys(obj)[0]]) {
                if (Object.keys(obj)[0] == "Yes") return item;
                else return item + "-" + Object.keys(obj)[0];
              } else {
                let arrtemp = Object.keys(obj)
                  .map((ele) => {
                    return obj[ele] ? ele : null;
                  })
                  .filter((ele) => ele != null);
                let strtemp = arrtemp.toString();
                return arrtemp.length > 0 ? item + "-" + strtemp : "";
              }
            })
            .filter((ele) => ele != null || ele != "");
    familyHistoryObjStr = familyHistoryObjStr.toString();
    groupedDetailsFamHis["_description"] = familyHistoryObjStr;
    let cardStates =
      localStorage.getItem("cardStates") == null
        ? {}
        : JSON.parse(localStorage.getItem("cardStates"));
    if (
      cardStates["Past Medical History"] == null ||
      cardStates["Past Medical History"]
    )
      saveObj["groupedDetails"].push(groupedDetailsMediHis);

    if (
      cardStates["Past Surgical History"] == null ||
      cardStates["Past Surgical History"]
    )
      saveObj["groupedDetails"].push(groupedDetailsSurgHis);

    if (cardStates["Family History"] == null || cardStates["Family History"])
      saveObj["groupedDetails"].push(groupedDetailsFamHis);

    return saveObj;
  };
  const setPhysicalExamFields = (id, recordDisplayJsonArr) => {
    let obj =
      JSON.parse(localStorage.getItem("physicalExamOnAdmissionObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("physicalExamOnAdmissionObj"));
    let grpArr = [];
    for (let i in obj) {
      let grpObj = {
        _id: id,
        _name: i,
        dataVisibility: 0,
        dynamicSection: true,
        editableData: false,
        groupedDetails: [],
        isDescription1Exist: false,
        isHeaderItem: false,
        isTabularForm: true,
        modified: false,
        parentSection: "Clinical Exam",
        protocolDataArrayPresent: false,
        saveAsCategoryList: false,
        selected: true,
        selectedParentName: i,
        selectedRxList: [],
        sequenceId: id,
        titleColor: 0,
        titleVisibility: 0,
      };
      //i gen phy exam
      let jarr = [];
      for (let j in obj[i]) {
        // j skin,heent
        console.log("jvalues", j);

        let karr = [];
        for (let k in obj[i][j]) {
          console.log("kvalues", k);

          //k clinically
          let lval = "";
          for (let l in obj[i][j][k]) {
            //l NAD
            console.log("lvalues", k, l);
            if (obj[i][j][k][l]) lval = l;
          }
          if (lval.length != 0) karr.push(k + "-" + lval);
        }
        let jarrObj = {
          _id: id,
          dataVisibility: 0,
          dynamicSection: false,
          editableData: false,
          isDescription1Exist: false,
          isHeaderItem: false,
          modified: false,
          protocolDataArrayPresent: false,
          saveAsCategoryList: false,
          selected: false,
          selectedRxList: [],
          sequenceId: id,
          titleColor: 0,
          titleVisibility: 0,
        };
        jarrObj["_name"] = j;
        jarrObj["_description"] = karr.join();
        jarr.push(jarrObj);
      }
      grpObj["groupedDetails"] = jarr;
      recordDisplayJsonArr.push(grpObj);
      id++;
    }
    console.log("recordDisplayJsonArrPhyExam", recordDisplayJsonArr);
    return recordDisplayJsonArr;
  };
  const setObsProfileCardsFields = (id, recordDisplayJsonArr) => {
    let obj =
      JSON.parse(localStorage.getItem("historyOfPresentIllnessObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("historyOfPresentIllnessObj"));
    let grpArr = [];
    for (let i in obj) {
      let grpObj = {
        _id: id,
        _name: i,
        dataVisibility: 0,
        dynamicSection: true,
        editableData: false,
        groupedDetails: [],
        isDescription1Exist: false,
        isHeaderItem: false,
        isTabularForm: true,
        modified: false,
        parentSection: "Clinical History",
        protocolDataArrayPresent: false,
        saveAsCategoryList: true,
        selected: true,
        selectedRxList: [],
        sequenceId: id,
        showEditBtn: true,
        titleColor: 0,
        titleVisibility: 0,
      };
      //i obs score
      let jarr = [];
      for (let j in obj[i]) {
        // j LMP
        let jarrObj = {
          _id: id,
          dataVisibility: 0,
          dynamicSection: false,
          editableData: false,
          isDescription1Exist: false,
          isHeaderItem: false,
          modified: false,
          protocolDataArrayPresent: false,
          saveAsCategoryList: false,
          selected: false,
          selectedRxList: [],
          sequenceId: id,
          titleColor: 0,
          titleVisibility: 0,
          units: "",
        };
        jarrObj["_name"] = j;
        jarrObj["_description"] = obj[i][j];
        jarr.push(jarrObj);
      }
      grpObj["groupedDetails"] = jarr;
      recordDisplayJsonArr.push(grpObj);
      id++;
    }
    console.log("recordDisplayJsonArrObsProfile", recordDisplayJsonArr);
    return recordDisplayJsonArr;
  };
  const setMedicationFields = (id) => {
    let saveObj = {
      _description: "",
      _id: id,
      _name: "Medicines",
      dataVisibility: 8,
      displayText: "Medicines",
      dynamicSection: false,
      editableData: false,
      finalValue: "",
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -15560961,
      titleVisibility: 0,
    };

    let mediObj =
      JSON.parse(localStorage.getItem("mediObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("mediObj"));
    let allMedicineDeets =
      JSON.parse(localStorage.getItem("allMedicineDeets")) == null
        ? {}
        : JSON.parse(localStorage.getItem("allMedicineDeets"));
    let freqValObj =
      JSON.parse(localStorage.getItem("freqValObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("freqValObj"));
    let quantValObj =
      JSON.parse(localStorage.getItem("quantValObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("quantValObj"));
    let brandValue =
      JSON.parse(localStorage.getItem("brandValue")) == null
        ? {}
        : JSON.parse(localStorage.getItem("brandValue"));
    let medistr = "";
    let selectedRxListArr = Object.keys(mediObj)
      .filter((ele) => mediObj[ele])
      .map((ele) => {
        medistr += ele;
        return {
          brandDrugID: 1,
          brandDrugName:
            brandValue[ele] == null
              ? ""
              : brandValue[ele].toString().split(",")[0],
          categoryId: 0,
          categoryName: "General",
          dataFromDB: false,
          dateCreated: "1600259633968",
          dateupdated: "1600259633968",
          doctorId: 64,
          doseBasisType: "",
          duration:
            allMedicineDeets[ele] == null
              ? ""
              : allMedicineDeets[ele]["durVal"],
          durationLabel:
            allMedicineDeets[ele] == null
              ? ""
              : allMedicineDeets[ele]["durVal"],
          favourite: true,
          frequency: freqValObj[ele],
          genericName: brandValue[ele],
          genericQtyUOM: ele,
          manufacturer:
            brandValue[ele] == null
              ? ""
              : brandValue[ele].toString().split(",")[1],
          medicineDisplayStr: ele,
          multiQytJson: "",
          pediatricDoseGiven: false,
          pkgCode: "",
          price:
            brandValue[ele] == null
              ? ""
              : brandValue[ele].toString().split(",")[2],
          quaninty:
            quantValObj[ele] == null || quantValObj[ele].length == 0
              ? ""
              : quantValObj[ele][0],
          quanintyUnit:
            quantValObj[ele] == null || quantValObj[ele].length == 0
              ? ""
              : quantValObj[ele][0],
          rxNotes:
            allMedicineDeets[ele] == null
              ? ""
              : allMedicineDeets[ele]["routeVal"],
          rxRemarks:
            allMedicineDeets[ele] == null
              ? ""
              : allMedicineDeets[ele]["remarksVal"],
          selected: true,
          selectedPharmacyId: 0,
          checked: false,
          id: 1,
          matchStr: ele,
        };
      });
    saveObj["selectedRxList"] = selectedRxListArr;
    saveObj["_description"] = medistr;
    console.log("selectedRxListArr", selectedRxListArr);
    return saveObj;
  };
  const setInvestigationsFields = (id) => {
    let advisedInvestigations =
      JSON.parse(localStorage.getItem("advisedInvestigations")) == null
        ? []
        : JSON.parse(localStorage.getItem("advisedInvestigations"));
    let invStr = "";
    advisedInvestigations.forEach((ele) => {
      invStr += ele + "\n";
    });
    let saveObj = {
      _description: invStr,
      _id: id,
      _name: "Investigations",
      dataVisibility: 0,
      displayText: "Advised Investigation",
      dynamicSection: false,
      editableData: false,
      finalValue: invStr,
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      sectionObjectlist: [],
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -15560961,
      titleVisibility: 0,
    };

    saveObj["selectedRxList"] = advisedInvestigations.map((ele) => {
      return {
        categoryId: 0,
        favourite: false,
        imagingStatus: 0,
        investigationId: 6,
        investigationName: ele,
        investigationOptions: "",
        labFindings: true,
        lateralityState: "",
        printValue: ele,
        selected: false,
        selectedLabId: 0,
        _selectedLabId: 0,
        checked: false,
        id: 6,
      };
    });
    console.log("investgSaveObj", saveObj);
    return saveObj;
  };
  const setDiagnosisOnAdmission = (id) => {
    let diagnosisContent =
      JSON.parse(localStorage.getItem("diagnosisOnAdmission")) == null
        ? []
        : JSON.parse(localStorage.getItem("diagnosisOnAdmission"));
    let diagnosisContentTextBox = localStorage.getItem(
      "diagnosisOnAdmissionText"
    );
    if (
      diagnosisContentTextBox != null &&
      !diagnosisContent.includes(diagnosisContentTextBox)
    )
      diagnosisContent.push(diagnosisContentTextBox);
    localStorage.setItem(
      "diagnosisOnAdmission",
      JSON.stringify(diagnosisContent)
    );
    let diagStr = "";
    diagnosisContent.forEach((ele) => {
      diagStr += ele + "\n";
    });
    let saveObj = {
      _description: diagStr,
      _id: id,
      _name: "Diagnosis",
      dataVisibility: 0,
      displayText: "Diagnosis",
      dynamicSection: false,
      editableData: false,
      finalValue: diagStr,
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      modified: false,
      protocolDataArrayPresent: false,
      saveAsCategoryList: false,
      sectionObjectlist: [],
      selected: true,
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: -15560961,
      titleVisibility: 0,
    };

    saveObj["sectionObjectlist"] = diagnosisContent.map((ele) => {
      return {
        _id: 0,
        _name: "Diagnosis",
        dataVisibility: 0,
        dynamicSection: false,
        editableData: false,
        isDescription1Exist: false,
        isHeaderItem: false,
        modified: false,
        protocolDataArrayPresent: false,
        saveAsCategoryList: false,
        sectionObjectlist: [
          {
            caseID: 1,
            caseText: ExpandLess,
            categoryName: "Common",
            dateCreated: "1600259559343",
            doctorId: 64,
            favourite: true,
            printValue: ele,
            selected: true,
            checked: false,
            id: 1,
          },
        ],
        selected: false,
        selectedRxList: [],
        sequenceId: id,
        titleColor: 0,
        titleVisibility: 0,
      };
    });
    console.log("diagSaveObj", saveObj);
    return saveObj;
  };
  const setVitalsOnAdmissionFields = (id) => {
    let saveObj = {
      _id: id,
      _name: "Vitals",
      dataVisibility: 0,
      dynamicSection: true,
      editableData: false,
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      isTabularForm: true,
      modified: false,
      parentSection: "Clinical Exam",
      protocolDataArrayPresent: false,
      saveAsCategoryList: true,
      selected: true,
      selectedParentName: "Vitals",
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: 0,
      titleVisibility: 0,
    };
    let vitalsObj =
      JSON.parse(localStorage.getItem("vitalsOnAdmissionObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("vitalsOnAdmissionObj"));
    saveObj["groupedDetails"] = Object.keys(vitalsObj).map((ele) => {
      return {
        _description: vitalsObj[ele],
        _id: 0,
        _name: ele,
        dataVisibility: 0,
        dynamicSection: false,
        editableData: false,
        isDescription1Exist: false,
        isHeaderItem: false,
        modified: false,
        protocolDataArrayPresent: false,
        saveAsCategoryList: false,
        selected: false,
        selectedRxList: [],
        sequenceId: id,
        titleColor: 0,
        titleVisibility: 0,
        units: ele == "Temperature" ? "F" : ele == "BP" ? "mmHg" : "bpm",
      };
    });
    console.log("vitalsSaveObj", saveObj);
    return saveObj;
  };
  const setVitalsOnDischargeFields = (id) => {
    let saveObj = {
      _id: id,
      _name: "Vitals on Discharge",
      dataVisibility: 0,
      dynamicSection: true,
      editableData: false,
      groupedDetails: [],
      isDescription1Exist: false,
      isHeaderItem: false,
      isTabularForm: true,
      modified: false,
      parentSection: "Clinical Exam",
      protocolDataArrayPresent: false,
      saveAsCategoryList: true,
      selected: true,
      selectedParentName: "Vitals on Discharge",
      selectedRxList: [],
      sequenceId: id,
      showEditBtn: true,
      titleColor: 0,
      titleVisibility: 0,
    };
    let vitalsObj =
      JSON.parse(localStorage.getItem("vitalsOnDischargeObj")) == null
        ? {}
        : JSON.parse(localStorage.getItem("vitalsOnDischargeObj"));
    saveObj["groupedDetails"] = Object.keys(vitalsObj).map((ele) => {
      return {
        _description: vitalsObj[ele],
        _id: 0,
        _name: ele,
        dataVisibility: 0,
        dynamicSection: false,
        editableData: false,
        isDescription1Exist: false,
        isHeaderItem: false,
        modified: false,
        protocolDataArrayPresent: false,
        saveAsCategoryList: false,
        selected: false,
        selectedRxList: [],
        sequenceId: id,
        titleColor: 0,
        titleVisibility: 0,
        units: ele == "Temperature" ? "F" : ele == "BP" ? "mmHg" : "bpm",
      };
    });
    console.log("vitalsDischSaveObj", saveObj);
    return saveObj;
  };
  let getToggleVal = localStorage.getItem("toggleValue");
  console.log("toggleValue", getToggleVal);

  const setSave = () => {
    checkForDirtyness();
    let arr = [
      JSON.parse(localStorage.getItem("cardsLabel")),
      JSON.parse(localStorage.getItem("secHeadings")),
    ];
    let data = {
      userId: localStorage.getItem("userId"),
      doctorId: localStorage.getItem("doctorId"),
      cardSequence: arr,
    };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/saveDsCardsSequence",
        data
      )
      .then((response) => {
        console.log("saveDsCardsSequence resp", response.data);
      })
      .catch((err) => console.log("err", err));

    let dataFetch = {
      patientList: [],
      last_synchronized_time_from_server: 0,
      os: "iOS",
      registrationID: "",
      doctorID: localStorage.getItem("originalDoctorId"),
      orgId: localStorage.getItem("clinicId"),
    };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/PatientWebService/fetchPatientAtDoctorLogin",
        dataFetch
      )
      .then((response) => {
        console.log(
          "saveapis: 1. fetchPatientAtDoctorLogin resp final",
          response.data
        );
        let patientDetails = {};
        if (response.data != null) {
          for (let i in response.data["patientList"]) {
            if (
              response.data["patientList"][i]["patientID"] ==
              JSON.parse(localStorage.getItem("patient"))["id"]
            )
              patientDetails = response.data["patientList"][i];
          }

          if (Object.keys(patientDetails).length == 0) patientDetails = patient;
          console.log("patientDetails", patientDetails);

          // let planDrugXml = setPlanDrug();
          // planDrugXml = planDrugXml.substring(22); //29,len-8
          // console.log("planDrugXml", planDrugXml);
          // let printDrugXml = setPrintDrug();
          // printDrugXml = printDrugXml.substring(22);
          // console.log("printDrugXml", printDrugXml);
          let recordDisplayJsonArr = [];
          let cardsLabel = JSON.parse(localStorage.getItem("cardsLabel"));
          let id = 0;
          let cardStates =
            localStorage.getItem("cardStates") == null
              ? {}
              : JSON.parse(localStorage.getItem("cardStates"));
          cardsLabel.forEach((label) => {
            if (
              label != "Course Label" &&
              label != "Treatment Protocol" &&
              label != "Instructions Label" &&
              label != "Past Medical History" &&
              label != "Past Surgical History" &&
              label != "Family History" &&
              label != "Medications at Discharge" &&
              label != "Advised Investigations" &&
              label != "Diagnosis On Admission" &&
              label != "Physical Exam on Admission" &&
              label != "Vitals on Admission" &&
              label != "Vitals on Discharge" &&
              label != "Discharge Label" &&
              label != "History of Present Illness & Obs Profile" &&
              label != "Doctor's Signature" &&
              label != "Patient's Signature" &&
              (cardStates[label] == null || cardStates[label])
            ) {
              recordDisplayJsonArr.push(setSaveParameters(id, label));
              id++;
            }
          });
          recordDisplayJsonArr.push(setHistoryFields(id++));

          if (
            cardStates["Medications at Discharge"] == null ||
            cardStates["Medications at Discharge"]
          )
            recordDisplayJsonArr.push(setMedicationFields(id++));

          if (
            cardStates["Advised Investigations"] == null ||
            cardStates["Advised Investigations"]
          )
            recordDisplayJsonArr.push(setInvestigationsFields(id++));

          if (
            cardStates["Diagnosis On Admission"] == null ||
            cardStates["Diagnosis On Admission"]
          )
            recordDisplayJsonArr.push(setDiagnosisOnAdmission(id++)); //advised inv and diagnosis on adm has same localstorage structure

          if (
            cardStates["Physical Exam on Admission"] == null ||
            cardStates["Physical Exam on Admission"]
          )
            recordDisplayJsonArr = setPhysicalExamFields(
              id++,
              recordDisplayJsonArr
            );
          if (
            cardStates["History of Present Illness & Obs Profile"] == null ||
            cardStates["History of Present Illness & Obs Profile"]
          )
            recordDisplayJsonArr = setObsProfileCardsFields(
              id++,
              recordDisplayJsonArr
            );
          if (
            cardStates["Vitals on Admission"] == null ||
            cardStates["Vitals on Admission"]
          )
            recordDisplayJsonArr.push(setVitalsOnAdmissionFields(id++));
          if (
            cardStates["Vitals on Discharge"] == null ||
            cardStates["Vitals on Discharge"]
          )
            recordDisplayJsonArr.push(setVitalsOnDischargeFields(id++));

          cardsLabel.forEach((label) => {
            if (
              label == "Doctor's Signature" &&
              label == "Patient's Signature"
            ) {
              recordDisplayJsonArr.push(setSaveParameters(id, label));
              id++;
            }
          });
          console.log("recordDisplayJsonA˚ºrr", recordDisplayJsonArr);

          console.log(
            "patientDetailssssssssssssssssssssssssssssssssssssss",
            patientDetails
          );

          let visitDatajsonFormat = {
            PatientDetailVO: [patientDetails],
            complaintObject: [
              {
                Id: 0,
                complaintAreaId: 0,
                complaintId: 0,
                selected: true,
                specialtyId: 0,
                text: "",
              },
            ],
            DiagnosisObject: [
              {
                Question: "",
                complaintAreaId: 0,
                diagnosisCaseId: 204,
                diagnosisCaseName: "Common",
                diagnosisLaterality: "",
                diagnosisPertinents: "",
                diagnosisState: "",
                diagnosisStatus: "Active",
                quesId: 0,
                selected: true,
              },
            ],
            InvestigationObject: [
              {
                additionalNotes: "" + localStorage.getItem("investigation"),
                discount: 0,
                investId: 0,
                investName: "",
                selected: true,
                urgent: 0,
              },
            ],
            Allergies: [],
            patientInstruction:
              localStorage.getItem("instructions") == null
                ? ""
                : localStorage.getItem("instructions"),
            patientSelfMonitoring:
              localStorage.getItem("radarDuration") == null
                ? "24 weeks"
                : localStorage.getItem("radarDuration"),
            historyObject: "",
            examination: "",
            physiotheraphyNotes: "",
            followUpNotes:
              localStorage.getItem("followup") == null
                ? ""
                : localStorage.getItem("followup"),
            remarks: "",
            patientMedicine: "",
            updateTraigeVisit: "0",
            medicineNotes: "",
            triageNotes: "",
            suggestedTreatmentNotes: "",
            prognosisNotes: "",
            chiefdifferentialDiagnosisNotes: "",
            patientVitals: null,
            patientAdvisedSurgery:
              localStorage.getItem("surgeryNotes") == null
                ? ""
                : localStorage.getItem("surgeryNotes"),
            patientTriageCondition: "",
            patientTriageResult: "",
            latitude: 0,
            longitude: 0,
            referTo: "",
            Chemotherapy:
              localStorage.getItem("chemotherapyNotes") == null
                ? ""
                : localStorage.getItem("chemotherapyNotes"),
            Radiation:
              localStorage.getItem("radiationTherapyNotes") == null
                ? ""
                : localStorage.getItem("radiationTherapyNotes"),
            Management: "",
            Diet: "",
            // plainDrugs: planDrugXml,
            // printDrugs: printDrugXml,
            tmoTabularDataXml: "",
            SectionList: "",
            DoctorFav: false,
            doctorID: localStorage.getItem("doctorId"),
            clinicID: localStorage.getItem("clinicId"),
            updatedByName: localStorage.getItem("userName"),
            updatedById: localStorage.getItem("userId"),
            patientID: JSON.parse(localStorage.getItem("patient"))["id"],
            evolkoID: evolkoId,
            ptCaseID: ptCaseID,
            todayVisitedDateTime: patientDetails["visitedonDateUTC"],
            sqlLiteVisitID: "25",
            doctorName: localStorage.getItem("doctorName"),
            clinicName: localStorage.getItem("clinicName"),
            patientName: patientName,
            patientCellPhone: cellphone,
            ptAge: age,
            userEmail: email,
            parentVisitId: 0,
            checkInType: "Discharge Summary",
            recordDisplayJson: recordDisplayJsonArr,
          };

          visitDatajsonFormat = JSON.stringify(visitDatajsonFormat);
          console.log("visitDatajsonFormat", visitDatajsonFormat);
          let data = {
            patientVisitDetails: [
              {
                deviceRegistrationID:
                  "eulu7zh2hTA:APA91bG9tPJ3JpnqqV7ZW7mwlH1CHSLA79aoguTDBgO3FdEUtFcaE7nBRr6p5fceHlduQ_nX9kAFre3RbhMhtuzViWzGyA-7mEcFwdIeQ5vh430EdZvUcyRW8lZQRFcEYgJUv4vvQyQ5",
                doctoID: localStorage.getItem("doctorId"),
                lastSyncTimeFromServer: 0,
                patientId: JSON.parse(localStorage.getItem("patient"))["id"],
                protocolId: 0,
                ptCaseID: ptCaseID,
                ptVisitSubList: [
                  {
                    evolkoId: evolkoId,
                    patientId: patientId,
                    protocolId: 0,
                    ptCaseID: ptCaseID,
                    referredByClinicID: 0,
                    referredByDoctorID: 0,
                    referredToClinicID: 0,
                    referredToDoctorID: 0,
                    sqlLiteID: 25,
                    sqlLiteVisitID: 25,
                    visitDatajsonFormat: visitDatajsonFormat,
                    // visitDatajsonFormat:
                    //   '{"PatientDetailVO":[{"addressLine1":" ","age":"30Y","allImgDownloaded":false,"city":"","clinicID":600022878,"country":"","dateofBirth":"1989-11-05","diagnosisName":"","emailID":"test2@xyz.com","evolkoID":919132,"fatherName":"","firstName":"test lab 5 nov 1","gender":"M","mobileNo1":"0000000000","mobileNo2":"","otherIDDetails":"","otherIdLabel":"","patientDOB":"Nov 5, 1989 00:00:00","patientExistOnRadar":4,"patientID":701671348,"patientSqlLiteID":11,"patientUserName":"919132","paymentDateUTC":0,"ptCaseID":38235,"radarEndDate":"","recordDateUTC":0,"recordParsedDataList":[],"registrationDateUTC":"1572949530000","sqlLiteID":11,"state":"","visitedOnDateUTCFromPTVisit":1593420333803,"visitedonDateUTC":"1572949529512"}],"complaintObject":[{"Id":0,"complaintAreaId":0,"complaintId":0,"selected":true,"specialtyId":0,"text":""}],"DiagnosisObject":[{"Question":"","complaintAreaId":0,"diagnosisCaseId":204,"diagnosisCaseName":"Common","diagnosisLaterality":"","diagnosisPertinents":"","diagnosisState":"","diagnosisStatus":"Active","quesId":0,"selected":true}],"InvestigationObject":[{"additionalNotes":"","discount":0,"investId":0,"investName":"","selected":true,"urgent":0}],"Allergies":[],"patientInstruction":"FROM REACT-DRINK WATER","patientSelfMonitoring":"","historyObject":"","examination":"","physiotheraphyNotes":"","followUpNotes":"","remarks":"","patientMedicine":"","updateTraigeVisit":"0","medicineNotes":"","triageNotes":"","suggestedTreatmentNotes":"","prognosisNotes":"","chiefdifferentialDiagnosisNotes":"","patientVitals":null,"patientAdvisedSurgery":"","patientTriageCondition":"","patientTriageResult":"","latitude":0,"longitude":0,"referTo":"","Chemotherapy":"","Radiation":"","Management":"","Diet":"","plainDrugs":"","printDrugs":"","tmoTabularDataXml":"","SectionList":"","DoctorFav":false,"doctorID":"701628870","clinicID":"600022878","updatedByName":"Dr. Rajni onco1","updatedById":701628870,"patientID":"701671348","evolkoID":"919132","ptCaseID":"38235","todayVisitedDateTime":"1593420680026","sqlLiteVisitID":"25","doctorName":"Dr. Rajni onco1","clinicName":"Dr. Rajni onco1\'s Clinic","patientName":"test lab 5 nov 1","patientCellPhone":"0000000000","ptAge":" 30Y\\/M","userEmail":"","parentVisitId":0}',
                  },
                ],
                referredByClinicID: 0,
                referredByDoctorID: 0,
                referredToClinicID: 0,
                referredToDoctorID: 0,
              },
            ],
          };
          console.log("final request for save", data);
          console.log("final request for save stringify", JSON.stringify(data));

          axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
          axios
            .put(
              hostAddress +
                currentServer +
                "/RestEasy/PatientWebService/savePatientVisitOnServer",
              data
            )
            .then((response) => {
              localStorage.setItem("patientStatus", "Just Saved");
              console.log(
                "saveapis: 2. savePatientVisitOnServer resp",
                response.data
              );
              // generateDischargeSummary(patientId, ptCaseID);
              // alert();
              if (response.data != null) {
                for (let i in response.data["patientVisitDetails"]) {
                  visitId =
                    response.data["patientVisitDetails"][i]["evolkoVisitId"];
                }
              }

              console.log("visitId resp", visitId);

              // localStorage.setItem("patientId", patientId);
              // localStorage.setItem("visitId", visitId);
              // localStorage.setItem("evolkoId", evolkoId);

              if (
                !localStorage.getItem("isDirtySave") ||
                localStorage.getItem("isDirtySave") == "false"
              )
                setRedirectVar(
                  <Redirect
                    to={{
                      pathname: "/dischargeSummaryPage",
                      state: { patient: patient },
                    }}
                  />
                );
              else {
                setSaveProtocolModal(true);
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleAddMedicine = () => {
    let mediToAddArr = localStorage.getItem("mediToAddArr");
    mediToAddArr = mediToAddArr == null ? [] : mediToAddArr.split(",");
    let mediToAddSet = new Set();
    for (let item in mediToAddArr) mediToAddSet.add(mediToAddArr[item]);
    for (let item in mediObj) {
      if (mediObj[item]) {
        mediToAddSet.add(item);
      } else if (mediToAddSet.has(item)) {
        mediToAddSet.delete(item);
      }
    }
    mediToAddArr = Array.from(mediToAddSet);
    localStorage.setItem("mediToAddArr", mediToAddArr);
    console.log(mediToAddSet);
    setMediToAddArr(Array.from(mediToAddSet));

    let mediToAddWithBrackArr = localStorage.getItem("mediToAddWithBrackArr");
    mediToAddWithBrackArr =
      mediToAddWithBrackArr == null ? [] : mediToAddWithBrackArr.split(",");
    let mediToAddWithBrackSet = new Set();
    for (let item in mediToAddWithBrackArr)
      mediToAddWithBrackSet.add(mediToAddWithBrackArr[item]);
    for (let item in mediObjWithBrack) {
      if (mediObjWithBrack[item]) {
        mediToAddWithBrackSet.add(item);
      } else if (mediToAddWithBrackSet.has(item)) {
        mediToAddWithBrackSet.delete(item);
      }
    }
    mediToAddWithBrackArr = Array.from(mediToAddWithBrackSet);
    localStorage.setItem("mediToAddWithBrackArr", mediToAddWithBrackArr);
    console.log(mediToAddWithBrackSet);
    setMediToAddWithBrackArr(Array.from(mediToAddWithBrackSet));
  };
  const setChecked = (mediNameWithoutBrack, type) => {
    if (type == "group") {
      let tempObj = {};
      if (localStorage.getItem("grpChecked") != null)
        tempObj = JSON.parse(localStorage.getItem("grpChecked"));
      tempObj[mediNameWithoutBrack] =
        tempObj[mediNameWithoutBrack] == null
          ? true
          : !tempObj[mediNameWithoutBrack];
      setGrpChecked(tempObj);
      localStorage.setItem("grpChecked", JSON.stringify(tempObj));
    } else {
      let tempObj = {};
      if (localStorage.getItem("favChecked") != null)
        tempObj = JSON.parse(localStorage.getItem("favChecked"));
      tempObj[mediNameWithoutBrack] =
        tempObj[mediNameWithoutBrack] == null
          ? true
          : !tempObj[mediNameWithoutBrack];
      setFavChecked(tempObj);

      localStorage.setItem("favChecked", JSON.stringify(tempObj));
    }
  };
  const getSelectedMedFromSearch = (mediName) => {
    console.log(mediName);
    setMedicineName(mediName);
    let data = {
      searchText: mediName,
      from: "0",
      doctorID: "118",
    };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/elasticSearchWebService/searchMedicinefromES",
        data
      )
      .then((response) => {
        console.log("searchMedicinefromES resp", response.data);
        setMediArr(response.data["hits"]["hits"]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleFavourites = () => {
    setOnPage("favs");
    let favMedi = null,
      groups = null;
    let favCheckedObj = JSON.parse(localStorage.getItem("favChecked"));
    if (favCheckedObj != null) {
      let favCheckedArr = Object.keys(favCheckedObj);
      console.log("favCheckedArr", favCheckedArr);
      let favChecked = JSON.parse(localStorage.getItem("favChecked"));
      favMedi = favCheckedArr
        .filter((medi) => favCheckedObj[medi])
        .map((medi) => {
          console.log("favs", medi);
          let mediNameWithoutBrack =
            medi.charAt(0) == "(" && medi.charAt(medi.length - 1) == ")"
              ? medi.substring(1, medi.length - 1)
              : medi;
          return (
            <button
              className={[
                mediObj[mediNameWithoutBrack]
                  ? styles.medicineBtnActive
                  : styles.medicineBtn,
                styles.medicineDiv,
              ].join(" ")}
              onClick={() => {
                let tempObj = mediObj;
                console.log(mediObj);
                tempObj[mediNameWithoutBrack] =
                  tempObj[mediNameWithoutBrack] == null ||
                  !tempObj[mediNameWithoutBrack]
                    ? true
                    : false;
                let tempObjWithBrack = mediObjWithBrack;
                console.log(mediObjWithBrack);
                tempObjWithBrack[medi] =
                  tempObjWithBrack[medi] == null || !tempObjWithBrack[medi]
                    ? true
                    : false;
                setMediObj(tempObj);
                setMediObjWithBrack(tempObjWithBrack);
                localStorage.setItem("mediObj", JSON.stringify(mediObj));
                localStorage.setItem(
                  "mediObjWithBrack",
                  JSON.stringify(mediObjWithBrack)
                );
                console.log(mediObj);
                setPrompt(Math.random());
                handleAddMedicine();
              }}
            >
              <div className={styles.medicineName}>
                <div>{mediNameWithoutBrack}</div>
                <div>
                  <span
                    className={[
                      !favChecked[medi] ? classes.starUnc : classes.starCh,
                      "fa fa-star",
                    ].join(" ")}
                    onClick={() => {
                      mediObj[mediNameWithoutBrack] = !mediObj[
                        mediNameWithoutBrack
                      ];
                      setChecked(mediNameWithoutBrack);
                    }}
                  ></span>
                </div>
              </div>
            </button>
          );
        });
    }
    let grpObj = JSON.parse(localStorage.getItem("grpObj"));
    groups = null;
    if (grpObj != null) {
      let grpSel =
        JSON.parse(localStorage.getItem("grpSel")) == null
          ? {}
          : JSON.parse(localStorage.getItem("grpSel"));
      let grpArr = Object.keys(grpObj);
      console.log("grpArr", grpArr);
      groups = grpArr.map((grp) => {
        console.log("grp", grp);
        return (
          <button
            className={[
              grpSel[grp] ? styles.medicineBtnActive : styles.medicineBtn,
              styles.medicineDiv,
            ].join(" ")}
            onClick={() => {
              let tempObj = mediObj;
              console.log(mediObj);
              let grpArr = [],
                grpObj = JSON.parse(localStorage.getItem("grpObj"));
              if (grpObj != null) grpArr = grpObj[grp];
              for (let i in grpArr) {
                let medi = grpArr[i];

                // let associatedGrp=JSON.parse(localStorage.getItem('associatedGrp'))
                // if(tempObj[medi] && associatedGrp[medi]!=null){
                //   let tempArr=associatedGrp[medi].filter((item)=>item!=grp)
                //   localStorage.setItem('associatedGrp',tempArr)
                //   if(tempArr.length==0){
                //     tempObj[medi] =
                //     tempObj[medi] == null || !tempObj[medi] ? true : false;
                //   let tempObjWithBrack = mediObjWithBrack;
                //   console.log(mediObjWithBrack);
                //   tempObjWithBrack[medi] =
                //     tempObjWithBrack[medi] == null || !tempObjWithBrack[medi]
                //       ? true
                //       : false;
                //   setMediObj(tempObj);
                //   setMediObjWithBrack(tempObjWithBrack);
                //   }
                // }
                // else if(!tempObj[medi] && associatedGrp[medi]!=null){

                // }
                tempObj[medi] =
                  tempObj[medi] == null || !tempObj[medi] ? true : false;
                let tempObjWithBrack = mediObjWithBrack;
                console.log(mediObjWithBrack);
                tempObjWithBrack[medi] =
                  tempObjWithBrack[medi] == null || !tempObjWithBrack[medi]
                    ? true
                    : false;
                setMediObj(tempObj);
                setMediObjWithBrack(tempObjWithBrack);
              }
              let grpTempObj = grpSel;
              console.log("grpTempObj1", grpTempObj);

              grpTempObj[grp] =
                grpTempObj[grp] == null || !grpTempObj[grp] ? true : false;
              setGrpSel(grpTempObj);
              console.log("grpTempObj", grpTempObj);
              localStorage.setItem("grpSel", JSON.stringify(grpTempObj));
              localStorage.setItem("mediObj", JSON.stringify(mediObj));
              localStorage.setItem(
                "mediObjWithBrack",
                JSON.stringify(mediObjWithBrack)
              );
              console.log(mediObj);
              setPrompt(Math.random());
            }}
          >
            <div className={styles.medicineName}>
              <div>{grp}</div>
              <div>
                <span
                  className={[
                    !JSON.parse(localStorage.getItem("grpChecked"))[grp]
                      ? classes.starUnc
                      : classes.starCh,
                    "fa fa-star",
                  ].join(" ")}
                  onClick={() => {
                    mediObj[grp] = !mediObj[grp];
                    setChecked(grp, "group");
                  }}
                ></span>
              </div>
            </div>
          </button>
        );
      });
    }

    let favObj = (
      <div className={classes.favDiv}>
        {favMedi}
        <div className={classes.grpHeader}>Here are your groups</div>
        {groups}
        {/* <Button
          variant="success"
          className={classes.addBtn}
          onClick={() => {
            setLeftContent(favObj);
            handleAddMedicine();
          }}
        >
          Add
        </Button> */}
      </div>
    );
    setLeftContent(favObj);
  };
  const handleSelect = () => {
    setOnPage("select");
    let selectedMedi = null;
    let mediObj = JSON.parse(localStorage.getItem("mediObj"));
    if (mediObj != null) {
      let selectedArr = Object.keys(mediObj);
      console.log("selectedArr", selectedArr);
      selectedMedi = selectedArr
        .filter((medi) => mediObj[medi])
        .map((medi) => {
          console.log("selects", medi);
          return (
            <button
              className={[
                mediObj[medi] ? styles.medicineBtnActive : styles.medicineBtn,
                styles.medicineDiv,
              ].join(" ")}
              onClick={() => {
                let tempObj = mediObj;
                console.log(mediObj);
                tempObj[medi] =
                  tempObj[medi] == null || !tempObj[medi] ? true : false;
                let tempObjWithBrack = mediObjWithBrack;
                console.log(mediObjWithBrack);
                tempObjWithBrack[medi] =
                  tempObjWithBrack[medi] == null || !tempObjWithBrack[medi]
                    ? true
                    : false;
                setMediObj(tempObj);
                setMediObjWithBrack(tempObjWithBrack);
                localStorage.setItem("mediObj", JSON.stringify(mediObj));
                localStorage.setItem(
                  "mediObjWithBrack",
                  JSON.stringify(mediObjWithBrack)
                );
                console.log(mediObj);
                setPrompt(Math.random());
              }}
            >
              <div className={styles.medicineName}>
                <div>{medi}</div>
                <div>
                  <span
                    className={[
                      !favChecked[medi] ? classes.starUnc : classes.starCh,
                      "fa fa-star",
                    ].join(" ")}
                    onClick={() => {
                      mediObj[medi] = !mediObj[medi];
                      setChecked(medi);
                    }}
                  ></span>
                </div>
              </div>
            </button>
          );
        });
    }
    let selObj = (
      <div className={classes.favDiv}>
        {selectedMedi}
        <MakeMediGrpModal
          handleFavourites={handleFavourites}
          setChecked={setChecked}
          setBtnHeaderStyleObj={setBtnHeaderStyleObj}
          handleAddMedicine={handleAddMedicine}
        ></MakeMediGrpModal>
      </div>
    );
    setLeftContent(selObj);
  };
  useEffect(() => {
    let i = -1;
    console.log("--in useeffect of dscreate", mediArr);
    let leftMedi = (
      <div className={classes.mediLeftContentInnerDiv}>
        {" "}
        {mediArr.map((item) => {
          console.log("=>", item["_source"]["generic_name"], "-", medicineName);
          if (item["_source"]["generic_name"] != null)
            if (
              item["_source"]["generic_name"] != null &&
              item["_source"]["generic_name"] == medicineName &&
              !mediSet.has(
                item["_source"]["pkg_code"] +
                  " " +
                  String(item["_source"]["generic_qty_uom"]).substring(
                    1,
                    String(item["_source"]["generic_qty_uom"]).length - 1
                  )
              )
            ) {
              let mediNameWithoutBrack =
                String(item["_source"]["generic_qty_uom"]).charAt(0) == "(" &&
                String(item["_source"]["generic_qty_uom"]).charAt(
                  String(item["_source"]["generic_qty_uom"]).length - 1
                ) == ")"
                  ? String(item["_source"]["generic_qty_uom"]).substring(
                      1,
                      String(item["_source"]["generic_qty_uom"]).length - 1
                    )
                  : String(item["_source"]["generic_qty_uom"]);
              if (
                mediNameWithoutBrack != "null" &&
                mediNameWithoutBrack != "" &&
                mediNameWithoutBrack != null
              ) {
                mediNameWithoutBrack =
                  item["_source"]["pkg_code"] + " " + mediNameWithoutBrack;
                mediSet.add(mediNameWithoutBrack);
                mediNameWithBrackSet.add(item["_source"]["generic_qty_uom"]);
              }
              i++;
              console.log("set", mediSet);
              if (mediNameWithoutBrack == "null") return;
              else
                return (
                  <button
                    className={[
                      mediObj[mediNameWithoutBrack]
                        ? styles.medicineBtnActive
                        : styles.medicineBtn,
                      styles.medicineDiv,
                    ].join(" ")}
                    onClick={() => {
                      let tempObj = mediObj;
                      console.log(mediObj);
                      tempObj[mediNameWithoutBrack] =
                        tempObj[mediNameWithoutBrack] == null ||
                        !tempObj[mediNameWithoutBrack]
                          ? true
                          : false;
                      let tempObjWithBrack = mediObjWithBrack;
                      console.log(mediObjWithBrack);
                      tempObjWithBrack[item["_source"]["generic_qty_uom"]] =
                        tempObjWithBrack[item["_source"]["generic_qty_uom"]] ==
                          null ||
                        !tempObjWithBrack[item["_source"]["generic_qty_uom"]]
                          ? true
                          : false;
                      setMediObj(tempObj);
                      setMediObjWithBrack(tempObjWithBrack);
                      console.log("mediObj", mediObj);
                      console.log("mediObjWithBrack", mediObjWithBrack);
                      localStorage.setItem("mediObj", JSON.stringify(mediObj));
                      localStorage.setItem(
                        "mediObjWithBrack",
                        JSON.stringify(mediObjWithBrack)
                      );
                      setPrompt(Math.random());
                      handleAddMedicine();
                    }}
                  >
                    <div className={styles.medicineName}>
                      <div>{mediNameWithoutBrack}</div>
                      <div>
                        <span
                          className={[
                            !favChecked[mediNameWithoutBrack]
                              ? classes.starUnc
                              : classes.starCh,
                            "fa fa-star",
                          ].join(" ")}
                          onClick={() => {
                            mediObj[mediNameWithoutBrack] = !mediObj[
                              mediNameWithoutBrack
                            ];
                            setChecked(mediNameWithoutBrack);
                          }}
                        ></span>
                      </div>
                    </div>
                  </button>
                );
            }
        })}
        {/* <Button
          variant="success"
          className={classes.addBtn}
          onClick={() => {
            handleAddMedicine();
          }}
        >
          Add
        </Button> */}
      </div>
    );
    if (onPage == "home") {
      setLeftContentMedi(leftMedi);
      setLeftContent(leftMedi);
    } else if (onPage == "favs") {
      handleFavourites();
    } else if (onPage == "select") {
      handleSelect();
    }
  }, [mediArr, medicineName, prompt]); //for getting the home list on the left pane for medicines

  return (
    <div className={classes.mainContainer}>
      {!localStorage.getItem("email") || patient == null ? (
        <Redirect to="/dischargeSummary" />
      ) : null}
      {redirectVar}
      {redirect}
      {saveProtocolModal ? (
        <SaveProtocolCreatePageModal patient={patient} />
      ) : null}
      <div className={classes.leftPaneCreatePage}>
        <DSCreateLeftPaneCommon
          setLeftPaneLabel={setLeftPaneLabel}
        ></DSCreateLeftPaneCommon>

        {leftPaneLabel == "Medicines" ? (
          <DSCreateLeftPaneMedicines
            setRedirect={setRedirect}
            getSelectedMedFromSearch={getSelectedMedFromSearch}
            setLeftContent={setLeftContent}
            btnHeaderStyleObj={btnHeaderStyleObj}
            setBtnHeaderStyleObj={setBtnHeaderStyleObj}
            setOnPage={setOnPage}
            setPrompt={setPrompt}
            handleFavourites={handleFavourites}
            handleSelect={handleSelect}
            leftContent={leftContent}
          />
        ) : (
          leftPaneSansMedicine
        )}
      </div>
      <div className={classes.rightPaneCreatePage}>
        <div className={styles.mainDischargeSummaryForNew}>
          <div className={styles.rightTopFixed}>
            <div className={styles.rightTop}>
              {/* <div className={styles.rightTopLeft}> */}
              {/* <div className={styles.nameDischargeSummaryForNew}>
                  {patient["name"]}
                </div> */}
              <div className={styles.patientNameHeadingBox}>
                <div className={styles.patientHeaderImage}>
                  <i class="fa fa-user-circle fa-lg"></i>
                </div>
                <div className={styles.patientNameHeadingName}>
                  {JSON.parse(localStorage.getItem("patient")) == null
                    ? ""
                    : JSON.parse(localStorage.getItem("patient"))["name"]}
                  ,
                </div>
                <div className={styles.patientNameHeadingAge}>
                  {" "}
                  {JSON.parse(localStorage.getItem("patient")) == null
                    ? ""
                    : JSON.parse(localStorage.getItem("patient"))["age"]}{" "}
                  /{" "}
                  {JSON.parse(localStorage.getItem("patient")) == null
                    ? ""
                    : JSON.parse(localStorage.getItem("patient"))["sex"]}
                </div>
              </div>
              {/* </div> */}

              <div className={styles.rightTopRight}>
                <div className={styles.saveBtnDiv}>
                  <div>
                    <Button
                      className={styles.saveBtn}
                      onClick={() => {
                        setLoader(
                          <Spinner
                            animation="border"
                            size="md"
                            variant="success"
                          />
                        );
                        setSave();
                      }}
                    >
                      Save
                    </Button>
                  </div>
                  <HamburgerDropdown></HamburgerDropdown>
                  <div className={styles.saveLoader}>
                    {!saveProtocolModal ? loader : null}
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className={styles.createPageBarActivePatientInfo}
              value="Patient Information"
            >
              <DraggableSectionHeading label="Patient Information" />
              <PatientInformation
                setPrompt={setPrompt}
                dateOfDischarge={dateOfDischarge}
                setDateOfDischarge={setDateOfDischarge}
                dateOfAdmission={dateOfAdmission}
                setDateOfAdmission={setDateOfAdmission}
              ></PatientInformation>
            </div> */}
            {/* <hr className={styles.hrline} /> */}
          </div>
          <div className={styles.rightPaneDiv}>
            <DischargeSummaryRightPane
              setLeftContent={setLeftContent}
              mediToAddArr={mediToAddArr}
              handleFavourites={handleFavourites}
              onPage={onPage}
              setMediArr={setMediArr}
              setMediToAddArr={setMediToAddArr}
              setMediObj={setMediObj}
              setMediObjWithBrack={setMediObjWithBrack}
              mediObjWithBrack={mediObjWithBrack}
              mediObj={mediObj}
              setPrompt={setPrompt}
              setLeftPrompt={setLeftPrompt}
              setLeftPaneLabel={setLeftPaneLabel}
              dateOfDischarge={dateOfDischarge}
              setDateOfDischarge={setDateOfDischarge}
              dateOfAdmission={dateOfAdmission}
              setDateOfAdmission={setDateOfAdmission}
              setCreateDsStateChange={setCreateDsStateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DischargeSummaryCreate;
