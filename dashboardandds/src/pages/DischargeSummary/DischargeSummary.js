import React, { useState, useEffect } from "react";
import classes from "./DischargeSummary.module.css";
import _ from "lodash";
import {
  Form,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import AddNewPatientModal from "../../components/AddNewPatientModal";
import AddNewPatientModalSmall from "../../components/AddNewPatientModalSmall";
import PatientCard from "../../components/PatientCard";
import PullPatientDischargeInfo from "../../components/PullPatientDischargeInfo";
import DischargeSummaryForNew from "../../components/DischargeSummaryForNew";
import DischargeSummarySet from "../../components/DischargeSummarySet";
import axios from "axios";
import { hostAddress } from "../../assets/config";
import { currentServer } from "../../assets/config";
import convert from "xml-js";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HamburgerDropdown from "../../components/HamburgerDropdown";
import removeLocalStorage from "../../assets/removeLocalStorage";

const DischargeSummary = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [patients, setPatients] = useState([]);
  const [emailSet, setEmailSet] = useState([]);
  const [patientDetails, setPatientsDisplay] = useState([]);
  const [patientDischargeDetails, setPatientDischargeDetails] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [allClinics, setAllClinics] = useState([]);
  const [clinicsDropdown, setClinicsDropdown] = useState(null);
  const [selectedClinicName, setSelectedClinicName] = useState(
    localStorage.getItem("clinicName")
  );
  const [selectedClinicId, setSelectedClinicId] = useState(
    localStorage.getItem("clinicId")
  );
  // const[showForm , setShowForm] = useState(false);
  // const [doctorsDropdown, setDoctorsDropdown] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState(
    localStorage.getItem("doctorName")
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    localStorage.getItem("doctorId")
  );
  const [selectedRootClinicId, setSelectedRootClinicId] = useState(null);
  const [patientListState, setPatientListState] = useState(null);
  const [prompt, setPrompt] = useState();
  const [fillDb, setFillDb] = useState(false);
  const [leftHeaderHeading, setLeftHeaderHeading] = useState(
    <div className={classes.leftHeaderHeading}>
      <div className={classes.leftHeaderHeadingTitle}>
        <Dropdown>
          <Dropdown.Toggle className={classes.clinicName}></Dropdown.Toggle>
          <Dropdown.Menu>
            {" "}
            <Dropdown.Header></Dropdown.Header>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={classes.leftHeaderSubHeading}></div>
    </div>
  );
  let patientList = null;
  // const MyForm = (props)=> {

  //   let ageForm= true;
  //   console.log(ageForm)
  //   if (ageForm) {
  //     // alert('ok')
  //     // return <MyForm />;

  //   }
  //   setAgeForm(

  //      <div>
  //        {/* <input type="text"></input> */}
  //        <MyForm></MyForm>
  //      </div>
  //   )
  // }

  const addPatient = (patientDetails) => {
    console.log("added patientDetails", patientDetails);
    console.log("patients", patients);
    // if (emailSet.includes(patientDetails["email"]))
    //   alert("This patient already exists!");
    // else {
    // let tempArr = emailSet == null ? [] : emailSet;
    // console.log("emailset", emailSet);
    // tempArr = tempArr.push(patientDetails["email"]);
    // setEmailSet(tempArr);

    let patientObj = patientDetails;
    patientObj["clinicID"] = localStorage.getItem("clinicId");
    console.log(
      "clinicId",
      patientObj["clinicID"],
      localStorage.getItem("clinicId")
    );
    patientObj["rootClinicId"] = localStorage.getItem("rootClinicId");
    patientObj["doctorID"] = localStorage.getItem("doctorId");
    //patientObj["doctorName"] = localStorage.getItem("doctorName");
    patientObj["created_on"] = 0;
    patientObj["dateofBirth"] =
      patientObj["dateofBirth"] == ""
        ? "01/01/1990"
        : patientObj["dateofBirth"];
    patientObj["primaryLogin"] = 0;
    patientObj["primaryReason"] = "";
    patientObj["ptVerificationCode"] = "";
    patientObj["registrationSource"] = "PatientApp";
    patientObj["removeFlag"] = 0;
    patientObj["selected"] = 0;
    patientObj["passcodeVerified"] = false;
    patientObj["sqlLiteID"] = 0;
    let patientArr = [];
    patientArr.push(patientObj);
    let data = { patientList: patientArr };
    let mongoPtObj = patientObj;
    mongoPtObj["name"] = mongoPtObj["firstName"];
    mongoPtObj["sex"] = mongoPtObj["gender"];
    mongoPtObj["doctorId"] = mongoPtObj["doctorID"];
    mongoPtObj["clinicId"] = mongoPtObj["clinicId"];
    console.log("registerPatient data", data);

    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/registerPatient",
        data
      )
      .then((response) => {
        console.log("registerPatient response", response.data);
        setPrompt(Math.random());
        let mongoData = { ptObj: response.data };
        console.log("registerPatientOnMongo data", mongoData);
        // required::: req: ptId, res: ptDetails obj
        // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        // axios
        //   .post(
        //     hostAddress + currentServer + "/registerPatientOnMongo",
        //     mongoData
        //   )
        //   .then((response) => {
        //     console.log("registerPatientOnMongo response", response.data);
        //     setFillDb(true); //added to bypass mongo fetch when re-displaying the patients along with the new patients.
        //     setPrompt(Math.random());
        //   })
        //   .catch((err) => console.log("mongoRegister err", err));
      })
      .catch((err) => {
        console.log("registerPatient err", err);
      });
  };
  const parseSavedObjectToLocalStorage = () => {
    let savedObject = JSON.parse(localStorage.getItem("savedObject"));
    console.log("savedObject", savedObject);
    let cardStringToStringCase = [
      "Chief Complaint",
      "Medications at Discharge Notes",
      "Investigations at the Hospital",
      "Procedure Done",
      "Procedure Findings",
      "Course in the Hospital",
      "Treatment Given",
      "Advice on Discharge",
      "HealthRADAR",
      "Diagnosis at Discharge",
      "History of Present Illness",
    ];
    let cardStringToObjectCase = [
      "Diet on Discharge",
      "Therapy Orders",
      "Activity Orders",
      "Condition on Discharge",
      "Disposition To",
      "Allergies",
    ];
    let cardObjToObjCase = ["Physical Exam at Discharge", "Next Follow Up"];

    for (let i in savedObject) {
      console.log("itemInSaveobj", savedObject[i]["displayText"]);
      let obj = savedObject[i];
      let label = obj["displayText"];
      let lsKey = label;
      switch (lsKey) {
        case "HealthRADAR":
          lsKey = "HealthRADAR Monitoring (Duration, Condition)";
          break;
        case "Diet on Discharge":
          lsKey = "Dietary Instructions";
          break;
        case "Next Follow Up":
          lsKey = "Plans for Medical Follow-up";
          break;
        case "Condition on Discharge":
          lsKey = "Condition at Discharge";
          break;
        case "Diagnosis at Discharge":
          lsKey = "Diagnosis On Discharge";
          break;
        case "Diagnosis on Admission":
          lsKey = "Diagnosis On Admission";
          break;
      }
      let camelCaseName = _.camelCase(lsKey);
      let camelCaseNameWObj = _.camelCase(lsKey + "Obj");

      if (cardStringToStringCase.includes(label)) {
        let lsObj = obj["_description"];
        localStorage.setItem(camelCaseName, lsObj);
      } else if (cardStringToObjectCase.includes(label)) {
        let lsObj = {};
        let descArr = obj["_description"].split(",");
        descArr.forEach((item) => {
          lsObj[item] = true;
        });
        localStorage.setItem(camelCaseName, JSON.stringify(lsObj));
      } else if (cardObjToObjCase.includes(label)) {
        let grpArr = obj["groupedDetails"];
        let lsObj = {};
        grpArr.forEach((item) => {
          let key = item["_name"];
          let val = item["_description"];
          lsObj[key] = val;
        });
        localStorage.setItem(camelCaseNameWObj, JSON.stringify(lsObj));
      } else if (label == "Patient Information") {
        console.log("PIobj", obj);
        let lsObj = {};
        obj["groupedDetails"].forEach((item) => {
          lsObj[item["_name"]] = item["_description"];
        });
        localStorage.setItem("patientInformationObj", JSON.stringify(lsObj));
      } else if (label == "History") {
        let arr = obj["groupedDetails"];
        arr.forEach((item) => {
          let desc = item["_description"];
          let name = item["_name"];
          let lsArr = desc.split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = lsObj[key] == null ? {} : lsObj[key];
            lsObj[key][val] = true;
          }
          if (!(Object.keys(lsObj).length == 1 && Object.keys(lsObj)[0] == ""))
            localStorage.setItem(
              _.camelCase(name + "Obj"),
              JSON.stringify(lsObj)
            );
        });
      } else if (label == "Advised Investigation") {
        let arr = obj["selectedRxList"];
        let invArr = [];
        arr.forEach((item) => {
          let desc = item["investigationName"];
          invArr.push(desc);
        });
        localStorage.setItem("advisedInvestigations", JSON.stringify(invArr));
      } else if (label == "Diagnosis") {
        let name = "Diagnosis On Admission";
        let arr = obj["sectionObjectlist"];
        let diagArr = [];
        arr.forEach((item) => {
          let secondObj = item["sectionObjectlist"];
          let desc = secondObj[0]["printValue"];
          diagArr.push(desc);
        });
        localStorage.setItem(_.camelCase(name), JSON.stringify(diagArr));
      } else if (
        obj["_name"] == "Vitals" ||
        obj["_name"] == "Vitals on Discharge"
      ) {
        let lsKeyName =
          obj["_name"] == "Vitals"
            ? "vitalsOnAdmissionObj"
            : "vitalsOnDischargeObj";
        let arr = obj["groupedDetails"];
        let vitalsObj = {};
        arr.forEach((item) => {
          let key = item["_name"];
          let val = item["_description"];
          vitalsObj[key] = val;
        });
        localStorage.setItem(lsKeyName, JSON.stringify(vitalsObj));
      } else if (
        obj["_name"] == "Obs Profile" ||
        obj["_name"] == "Obs Score" ||
        obj["_name"] == "Gynae & Obs History"
      ) {
        let arr = obj["groupedDetails"];
        let obsObj = {};
        arr.forEach((item) => {
          let key = item["_name"];
          let val = item["_description"];
          obsObj[key] = val;
        });
        let obsLSObj =
          localStorage.getItem("historyOfPresentIllnessObj") == null
            ? {}
            : JSON.parse(localStorage.getItem("historyOfPresentIllnessObj"));
        obsLSObj[obj["_name"]] = obsObj;
        localStorage.setItem(
          "historyOfPresentIllnessObj",
          JSON.stringify(obsLSObj)
        );
      } else if (
        obj["_name"] != "Vitals" &&
        obj["_name"] != "Vitals on Discharge" &&
        obj["parentSection"] == "Clinical Exam"
      ) {
        let arr = obj["groupedDetails"];
        let obsObj = {};
        let obj1 = {}; //arr--[] of pages
        arr.forEach((item) => {
          // every page
          let key = item["_name"];
          let valArr = item["_description"].split(","); // subsections of each page, comma sep eg:clinci-nad, abc-xyz,...
          let obj2 = {};
          valArr.forEach((ele) => {
            //every section of each oage
            let k1 = ele.split("-")[0]; //clinically--subsection label
            let v1 = ele.split("-")[1]; //nad--subsection value
            let obj3 = {};
            obj3[v1] = true;
            obj2[k1] = obj3;
          });
          obj1[key] = obj2;
        });

        let phyExamLSObj =
          localStorage.getItem("physicalExamOnAdmissionObj") == null
            ? {}
            : JSON.parse(localStorage.getItem("physicalExamOnAdmissionObj"));
        phyExamLSObj[obj["_name"]] = obj1;
        localStorage.setItem(
          "physicalExamOnAdmissionObj",
          JSON.stringify(phyExamLSObj)
        );
      } else if (label == "Medicines") {
        let meditoAddArr = [];
        obj["selectedRxList"].forEach((medi) => {
          let remarks = medi["rxRemarks"];
          let durationLabel = medi["durationLabel"];
          let frequency = medi["frequency"];
          let route = medi["rxNotes"];
          let mediName = medi["medicineDisplayStr"];
          let brandName = medi["brandDrugName"];
          let quantity = medi["quantityUnit"];

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
          //
          mediObj[mediName] = true;
          let allMediDeetsItem = {};
          allMediDeetsItem["routeVal"] = route;
          allMediDeetsItem["durVal"] = durationLabel;
          allMediDeetsItem["remarksVal"] = remarks;
          allMedicineDeets[mediName] = allMediDeetsItem;
          freqValObj[mediName] = frequency;
          quantValObj[mediName] = [quantity];
          brandValue[mediName] = brandName;
          //
          localStorage.setItem("mediObj", JSON.stringify(mediObj));
          localStorage.setItem(
            "allMedicineDeets",
            JSON.stringify(allMedicineDeets)
          );
          localStorage.setItem("freqValObj", JSON.stringify(freqValObj));
          localStorage.setItem("quantValObj", JSON.stringify(quantValObj));
          localStorage.setItem("brandValue", JSON.stringify(brandValue));
          //
          meditoAddArr.push(mediName);
        });
        localStorage.setItem("mediToAddArr", meditoAddArr);
      }
      if (false) {
        if (obj["displayText"] == "Patient Information") {
          console.log("PIobj", obj);
          let lsObj = {};
          obj["groupedDetails"].forEach((item) => {
            lsObj[item["_name"]] = item["_description"];
          });
          localStorage.setItem("patientInformationObj", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Diagnosis On Admission") {
          let lsObj = JSON.stringify(obj["_description"].split(","));
          localStorage.setItem("diagnosisOnAdmission", lsObj);
        } else if (obj["displayText"] == "Diagnosis On Discharge") {
          let lsObj = obj["_description"];
          localStorage.setItem("diagnosisOnDischarge", lsObj);
        } else if (obj["displayText"] == "Chief Complaint") {
          let lsObj = obj["_description"];
          localStorage.setItem("chiefComplaint", lsObj);
        } else if (
          obj["displayText"] == "History of Present Illness & Obs Profile"
        ) {
          let lsObj = {};
          for (let i in obj["groupedDetails"]) {
            lsObj[obj["groupedDetails"][i]["displayText"]] = {};
            for (let j in obj["groupedDetails"][i]["groupedDetails"]) {
              let name = obj["groupedDetails"][i]["groupedDetails"][j]["_name"];
              let desc =
                obj["groupedDetails"][i]["groupedDetails"][j]["_description"];
              lsObj[obj["groupedDetails"][i]["displayText"]][name] = desc;
            }
          }
          localStorage.setItem(
            "historyOfPresentIllnessObj",
            JSON.stringify(lsObj)
          );
        } else if (obj["displayText"] == "Past Medical History") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = lsObj[key] == null ? {} : lsObj[key];
            lsObj[key][val] = true;
          }
          if (!(Object.keys(lsObj).length == 1 && Object.keys(lsObj)[0] == ""))
            localStorage.setItem(
              "pastMedicalHistoryObj",
              JSON.stringify(lsObj)
            );
        } else if (obj["displayText"] == "Past Surgical History") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = lsObj[key] == null ? {} : lsObj[key];
            lsObj[key][val] = true;
          }
          if (!(Object.keys(lsObj).length == 1 && Object.keys(lsObj)[0] == ""))
            localStorage.setItem(
              "pastSurgicalHistoryObj",
              JSON.stringify(lsObj)
            );
        } else if (obj["displayText"] == "Family History") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = lsObj[key] == null ? {} : lsObj[key];
            lsObj[key][val] = true;
          }
          if (!(Object.keys(lsObj).length == 1 && Object.keys(lsObj)[0] == ""))
            localStorage.setItem("familyHistoryObj", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Allergies") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            lsObj[lsArr[i]] = true;
          }
          localStorage.setItem("allergies", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Vitals on Admission") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = val;
          }
          localStorage.setItem("vitalsOnAdmissionObj", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Investigations at the Hospital") {
          let lsObj = obj["_description"];
          localStorage.setItem("investigationsAtTheHospital", lsObj);
        } else if (obj["displayText"] == "Investigations at the Hospital") {
          let lsObj = obj["_description"];
          localStorage.setItem("investigationsAtTheHospital", lsObj);
        } else if (obj["displayText"] == "Procedure Done") {
          let lsObj = obj["_description"];
          localStorage.setItem("procedureDone", lsObj);
        } else if (obj["displayText"] == "Procedure Findings") {
          let lsObj = obj["_description"];
          localStorage.setItem("procedureFindings", lsObj);
        } else if (obj["displayText"] == "Course in the Hospital") {
          let lsObj = obj["_description"];
          localStorage.setItem("courseInTheHospital", lsObj);
        } else if (obj["displayText"] == "Treatment Given") {
          let lsObj = obj["_description"];
          localStorage.setItem("treatmentGiven", lsObj);
        } else if (obj["displayText"] == "Vitals on Discharge") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = val;
          }
          localStorage.setItem("vitalsOnDischargeObj", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Condition at Discharge") {
          let lsObj = {};
          lsObj[obj["_description"]] = true;
          localStorage.setItem("conditionAtDischarge", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Dietary Instructions") {
          let lsObj = {};
          lsObj[obj["_description"]] = true;
          localStorage.setItem("dietaryInstructions", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Therapy Orders") {
          let lsObj = {};
          lsObj[obj["_description"]] = true;
          localStorage.setItem("therapyOrders", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Activity Orders") {
          let lsObj = {};
          lsObj[obj["_description"]] = true;
          localStorage.setItem("activityOrders", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Disposition To") {
          let lsObj = {};
          lsObj[obj["_description"]] = true;
          localStorage.setItem("dispostionTo", JSON.stringify(lsObj));
        } else if (obj["displayText"] == "Advised Investigations") {
          let lsArr = obj["_description"].split(",");
          localStorage.setItem("advisedInvestigations", JSON.stringify(lsArr));
        } else if (obj["displayText"] == "Advice on Discharge") {
          let lsObj = obj["_description"];
          localStorage.setItem("adviceOnDischarge", lsObj);
        } else if (obj["displayText"] == "Plans for Medical Follow-up") {
          let lsArr = obj["_description"].split(",");
          let lsObj = {};
          for (let i in lsArr) {
            let key = lsArr[i].split("-")[0];
            let val = lsArr[i].split("-")[1];
            lsObj[key] = val;
          }
          localStorage.setItem(
            "plansForMedicalFollowUpObj",
            JSON.stringify(lsObj)
          );
        } else if (
          obj["displayText"] == "HealthRADAR Monitoring (Duration, Condition)"
        ) {
          let lsObj = obj["_description"];
          localStorage.setItem("healthRadarMonitoringDurationCondition", lsObj);
        } else if (obj["displayText"] == "Doctor's Signature") {
          let lsObj = obj["_description"];
          localStorage.setItem("doctorsSignature", lsObj);
        } else if (obj["displayText"] == "Patient's Signature") {
          let lsObj = obj["_description"];
          localStorage.setItem("patientsSignature", lsObj);
        }
      }
    }
  };
  const pullDischargeData = (patient) => {
    console.log("patient in pullDischargeData", patient);

    let patientStatus = localStorage.getItem("patientStatus");
    if (patientStatus == "Just Saved") {
      setPatientDischargeDetails(
        <>
          <PullPatientDischargeInfo
            summaryDataArr={[]}
            patient={patient}
            prompt={Math.random()}
          ></PullPatientDischargeInfo>
        </>
      );
    } else {
      localStorage.setItem(
        "doctorId",
        localStorage.getItem("originalDoctorId")
      );
      localStorage.setItem(
        "doctorName",
        localStorage.getItem("originalDoctorName")
      );
      let data = {
        doctorId: localStorage.getItem("doctorId"),
        patientId: patient["id"],
        clinicId: localStorage.getItem("clinicId"),
      };
      console.log("getPatientDischargeSummary req data", data);
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      axios
        .put(
          hostAddress +
            currentServer +
            "/RestEasy/DischargeSummaryWebService/getPatientDischargeSummary",
          data
        )
        .then((response) => {
          console.log("getPatientDischargeSummary resp", response.data);

          if (response.data["dischargeSummary"].length === 0)
            setPatientDischargeDetails(
              <DischargeSummaryForNew
                patient={patient}
              ></DischargeSummaryForNew>
            );
          else {
            localStorage.setItem(
              "savedObject",

              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["displayJson"]
            );
            parseSavedObjectToLocalStorage();
            localStorage.setItem(
              "visitId",
              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["visit_id"]
            );

            localStorage.setItem(
              "patientId",
              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["patient_id"]
            );

            localStorage.setItem(
              "evolkoId",
              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["evolko_id"]
            );

            localStorage.setItem(
              "ptCaseId",
              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["pt_case_id"]
            );

            localStorage.setItem(
              "approved_status",
              response.data["dischargeSummary"][
                response.data["dischargeSummary"].length - 1
              ]["approved_status"]
            );
            setPatientDischargeDetails(
              <>
                <PullPatientDischargeInfo
                  summaryDataArr={[]}
                  patient={patient}
                  prompt={Math.random()}
                ></PullPatientDischargeInfo>
              </>
            );
          }
        })
        .catch((err) => {
          console.log("getPatientDischargeSummary err", err);
          setPatientDischargeDetails(
            <DischargeSummaryForNew patient={patient}></DischargeSummaryForNew>
          );
        });
    }
  };

  useEffect(() => {
    console.log("first useffect", localStorage.getItem("allClinics"));
    let clinics =
      JSON.parse(localStorage.getItem("allClinics")) == null
        ? []
        : JSON.parse(localStorage.getItem("allClinics"));
    setAllClinics(clinics);
    if (localStorage.getItem("startDate")) {
      console.log("ls startDate", new Date(localStorage.getItem("startDate")));
      console.log("startDate", startDate);

      setStartDate(new Date(localStorage.getItem("startDate")));
    }
    if (props != null && props.location != null && props.location.state != null)
      pullDischargeData(props.location.state.patient);
    if (clinics != null && clinics.length > 0 && clinics[0] != null) {
      // if (selectedClinicName == null)
      //   setSelectedClinicName(clinics[0]["clinicName"]);
      // if (selectedClinicId == null) setSelectedClinicId(clinics[0]["clinicId"]);
      setSelectedClinicName(
        localStorage.getItem("clinicName") == null
          ? clinics[0]["clinicName"]
          : localStorage.getItem("clinicName")
      );
      setSelectedClinicId(
        localStorage.getItem("clinicId") == null
          ? clinics[0]["clinicId"]
          : localStorage.getItem("clinicId")
      );
      localStorage.setItem(
        "clinicName",
        localStorage.getItem("clinicName") == null
          ? clinics[0]["clinicName"]
          : localStorage.getItem("clinicName")
      );
      localStorage.setItem(
        "clinicId",
        localStorage.getItem("clinicId") == null
          ? clinics[0]["clinicId"]
          : localStorage.getItem("clinicId")
      );
      localStorage.setItem(
        "rootClinicId",
        localStorage.getItem("rootClinicId") == null
          ? clinics[0]["rootClinicId"]
          : localStorage.getItem("rootClinicId")
      );
      setClinicsDropdown(
        clinics.map((item) => {
          console.log("allClinics item", item);
          localStorage.setItem("clinicName", item["clinicName"]);
          localStorage.setItem("clinicId", item["clinicId"]);
          localStorage.setItem("rootClinicId", item["rootClinicId"]);
          return (
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                console.log("clId", item["clinicId"]);
                setSelectedClinicName(item["clinicName"]);
                setSelectedClinicId(item["clinicId"]);
                setSelectedRootClinicId(item["rootClinicId"]);
                localStorage.setItem("clinicName", item["clinicName"]);
                localStorage.setItem("clinicId", item["clinicId"]);
                localStorage.setItem("rootClinicId", item["rootClinicId"]);
              }}
            >
              {item["clinicName"]}
            </Dropdown.Item>
          );
        })
      );
    }
  }, []);

  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }
  const renderPatients = (patientArr) => {
    let patientList = patientArr
      .slice(0)
      .reverse()
      .map((item) => {
        if (localStorage.getItem("roleId") != 1) {
          return (
            <button
              className={classes.patientCardBtn}
              onClick={() => {
                localStorage.setItem("patientStatus", "Existing");
                removeLocalStorage();
                localStorage.setItem("doctorName", item["doctorName"]);
                localStorage.setItem("doctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorName", item["doctorName"]);
                localStorage.setItem("patient", JSON.stringify(item));
                pullDischargeData(item);
              }}
            >
              <PatientCard patient={item} />
            </button>
          );
        } else if (
          localStorage.getItem("roleId") !== 1 &&
          localStorage.getItem("doctorId") === item["doctorId"]
        ) {
          // alert();
          return (
            <button
              className={classes.patientCardBtn}
              onClick={() => {
                localStorage.setItem("patientStatus", "Existing");
                removeLocalStorage();
                localStorage.setItem("doctorName", item["doctorName"]);
                localStorage.setItem("doctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorName", item["doctorName"]);
                localStorage.setItem("patient", JSON.stringify(item));
                pullDischargeData(item);
              }}
            >
              <PatientCard patient={item} />
            </button>
          );
        } else if (item["doctorId"] == localStorage.getItem("userId")) {
          // alert("sdf");
          return (
            <button
              className={classes.patientCardBtn}
              onClick={() => {
                localStorage.setItem("patientStatus", "Existing");
                removeLocalStorage();
                localStorage.setItem("patient", JSON.stringify(item));
                pullDischargeData(item);
              }}
            >
              <PatientCard patient={item} />
            </button>
          );
        }
      });
    localStorage.setItem("patientList", JSON.stringify(patientList));
    console.log("patientListFirst", patientList);

    setPatientsDisplay(
      <div>
        {patientList}
        <AddNewPatientModalSmall addPatient={addPatient} />
      </div>
    );
  };
  useEffect(() => {
    let dateDiffFormat =
      startDate.getFullYear().toString() +
      "-" +
      pad2(startDate.getMonth() + 1) +
      "-" +
      pad2(startDate.getDate()) +
      " " +
      pad2(startDate.getHours()) +
      ":" +
      pad2(startDate.getMinutes()) +
      ":" +
      pad2(startDate.getSeconds());
    // let data = {
    //   clinicId: selectedClinicId + "",
    //   doctorId: "",
    // };

    let data = {
      clinicId: localStorage.getItem("clinicId"), //selectedClinicId + "",
    };
    console.log("findDoctorByClinic req", data);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        hostAddress +
          currentServer +
          "/RestEasy/DischargeSummaryWebService/findDoctorByClinic",
        data
      )
      .then((response) => {
        console.log("findDoctorByClinic response", response.data);
        let doctors =
          response.data == null || response.data["ptAppointmentOrgList"] == null
            ? []
            : response.data["ptAppointmentOrgList"];
        localStorage.setItem("allDoctors", JSON.stringify(doctors));

        console.log("getPatientSearchList request data", data);
        if (false && localStorage.getItem("patientArr") !== null) {
          console.log("getClinicPatients from lS");
          let ptArr = JSON.parse(localStorage.getItem("patientArr"));
          setPatients(ptArr);
          renderPatients(ptArr);
        } else {
          let getClinicPatientsData = {
            allDoctors:
              JSON.parse(localStorage.getItem("allDoctors")) == null
                ? []
                : JSON.parse(localStorage.getItem("allDoctors")).map((obj) => {
                    return obj["doctorId"];
                  }),
          };

          //mongo below
          axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
          axios
            .get(hostAddress + currentServer + "/ping")
            .then((resp) => {
              let mongoPingResponse = resp.data;
              console.log("pingResponse", mongoPingResponse);
              if (!fillDb && mongoPingResponse == 1) {
                axios
                  .post(
                    hostAddress + currentServer + "/getClinicPatients",
                    getClinicPatientsData
                  )
                  .then((response) => {
                    console.log("getClinicPatients mongo res", response.data);
                    let tempArr = [];
                    if (response.data.length > 0) {
                      tempArr = response.data;
                      if (localStorage.getItem("roleId") == 1) {
                        let ptArr = tempArr.filter(
                          (ele) =>
                            ele["doctorId"] == localStorage.getItem("userId")
                        );
                        setPatients(ptArr);

                        localStorage.setItem(
                          "patientArr",
                          JSON.stringify(ptArr)
                        );
                        console.log("setting patientArr for doctor", ptArr);
                      } else {
                        setPatients(tempArr);
                        localStorage.setItem(
                          "patientArr",
                          JSON.stringify(tempArr)
                        );
                        console.log("setting patientArr for dataop", tempArr);
                      }
                      renderPatients(response.data);
                    } else setFillDb(true);

                    // if (!fillDb) renderPatients(response.data);
                  })
                  .catch((err) => console.log("getClinicPatients err", err));
              }
              if (fillDb || mongoPingResponse !== 1) {
                console.log("getClinicPatients sql api call");
                axios.defaults.headers.common["X-Requested-With"] =
                  "XMLHttpRequest";
                axios
                  .put(
                    hostAddress +
                      currentServer +
                      "/RestEasy/DischargeSummaryWebService/getAllPatientsForClinic",
                    data
                  )
                  .then((response) => {
                    console.log(
                      "getClinicPatients sql response",
                      response.data
                    );
                    let mongoReq = {
                      selectedClinicId: selectedClinicId,
                      ptObj: response.data["ptAppointmentOrgList"],
                      //[id1, id2]
                      allDoctors:
                        JSON.parse(localStorage.getItem("allDoctors")) == null
                          ? []
                          : JSON.parse(localStorage.getItem("allDoctors")).map(
                              (obj) => {
                                return obj["doctorId"];
                              }
                            ),
                    };
                    axios.defaults.headers.common["X-Requested-With"] =
                      "XMLHttpRequest";
                    if (response.data["ptAppointmentOrgList"][0] !== undefined)
                      // update mongo code:
                      axios
                        .post(
                          hostAddress +
                            currentServer +
                            "/updateAllClinicPatients",
                          mongoReq
                        )
                        .then((resp) => {
                          console.log("mongoResp", resp.data);
                          let tempArr = [];
                          if (
                            response.data["ptAppointmentOrgList"][0] !==
                              undefined &&
                            response.data["ptAppointmentOrgList"].length > 0
                          )
                            tempArr = response.data["ptAppointmentOrgList"];

                          if (localStorage.getItem("roleId") == 1) {
                            let ptArr = tempArr.filter(
                              (ele) =>
                                ele["doctorId"] ==
                                localStorage.getItem("userId")
                            );
                            setPatients(ptArr);
                            localStorage.setItem(
                              "patientArr",
                              JSON.stringify(ptArr)
                            );
                            console.log("setting patientArr for doctor", ptArr);
                          } else {
                            setPatients(tempArr);

                            localStorage.setItem(
                              "patientArr",
                              JSON.stringify(tempArr)
                            );
                            console.log(
                              "setting patientArr for dataop",
                              tempArr
                            );
                          }
                          renderPatients(response.data["ptAppointmentOrgList"]);
                        })
                        .catch((err) => {
                          console.log("mongo error", err);
                        });
                  })
                  .catch((err) => {
                    console.log("getpatientlist err", err);
                  });
              }
            })
            .catch((err) => console.log("pingError", err));

          //imp: non-mongo impl for heroku below. Uncomment the above part for the full part with mongo

          // console.log("getClinicPatients sql api call");
          // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
          // axios
          //   .put(
          //     hostAddress +
          //       currentServer +
          //       "/RestEasy/DischargeSummaryWebService/getAllPatientsForClinic",
          //     data
          //   )
          //   .then((response) => {
          //     console.log("getClinicPatients sql response", response.data);
          //     let mongoReq = {
          //       selectedClinicId: selectedClinicId,
          //       ptObj: response.data["ptAppointmentOrgList"],
          //       //[id1, id2]
          //       allDoctors:
          //         JSON.parse(localStorage.getItem("allDoctors")) == null
          //           ? []
          //           : JSON.parse(localStorage.getItem("allDoctors")).map(
          //               (obj) => {
          //                 return obj["doctorId"];
          //               }
          //             ),
          //     };
          //     axios.defaults.headers.common["X-Requested-With"] =
          //       "XMLHttpRequest";
          //     let tempArr = [];
          //     if (
          //       response.data["ptAppointmentOrgList"][0] !== undefined &&
          //       response.data["ptAppointmentOrgList"].length > 0
          //     )
          //       tempArr = response.data["ptAppointmentOrgList"];

          //     if (localStorage.getItem("roleId") == 1) {
          //       let ptArr = tempArr.filter(
          //         (ele) => ele["doctorId"] == localStorage.getItem("userId")
          //       );
          //       setPatients(ptArr);
          //       localStorage.setItem("patientArr", JSON.stringify(ptArr));
          //       console.log("setting patientArr for doctor", ptArr);
          //     } else {
          //       setPatients(tempArr);

          //       localStorage.setItem("patientArr", JSON.stringify(tempArr));
          //       console.log("setting patientArr for dataop", tempArr);
          //     }
          //     renderPatients(response.data["ptAppointmentOrgList"]);
          //   })
          //   .catch((err) => {
          //     console.log("getpatientlist err", err);
          //   });
        }
      })
      .catch((err) => {
        console.log("findDoctorByClinic err", err);
      });
  }, [selectedClinicId, selectedDoctorId, prompt, fillDb]);

  const handleSearch = (e) => {
    let etargetval = e.target.value;
    // if (false) {
    //   setPatientsDisplay(
    //     <div>
    //       {patientListState}
    //       <AddNewPatientModalSmall addPatient={addPatient} />
    //     </div>
    //   );
    // }

    if (etargetval != "") {
      let patientArr = JSON.parse(localStorage.getItem("patientArr"));
      if (patientArr != null) {
        let TrieSearch = require("trie-search");
        let arr = patientArr;
        let ts = new TrieSearch("name");

        ts.addAll(arr);

        let brr = ts.get(etargetval);
        console.log("ts", ts);
        let patientList = brr.map((item) => {
          return (
            <button
              className={classes.patientCardBtn}
              onClick={() => {
                localStorage.setItem("patientStatus", "Existing");
                localStorage.setItem("doctorName", item["doctorName"]);
                localStorage.setItem("doctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorId", item["doctorId"]);
                localStorage.setItem("originalDoctorName", item["doctorName"]);
                localStorage.setItem("patient", JSON.stringify(item));
                pullDischargeData(item);
              }}
            >
              <PatientCard patient={item} />
            </button>
          );
        });
        localStorage.setItem("patientList", JSON.stringify(patientList));
        setPatientsDisplay(
          <div>
            {patientList}
            <AddNewPatientModalSmall addPatient={addPatient} />
          </div>
        );
      }
    } else setPrompt(Math.random());
  };
  return (
    <div className={classes.mainContainer}>
      {!localStorage.getItem("email") ? (
        <Redirect to="/dischargeSummary" />
      ) : null}
      {redirect}
      <div className={classes.leftPane}>
        <div className={classes.leftPaneHeader}>
          <div className={classes.leftHeaderImageContainer}>
            {/* <img
              className={classes.leftHeaderImage}
              src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            ></img> */}
          </div>
          {/* {leftHeaderHeading} */}
          <div className={classes.leftHeaderHeading}>
            <div className={classes.leftHeaderHeadingTitle}>
              {localStorage.getItem("allClinics") == null ? null : JSON.parse(
                  localStorage.getItem("allClinics")
                ).length == 1 ? (
                JSON.parse(localStorage.getItem("allClinics"))[0]["clinicName"]
              ) : (
                <Dropdown>
                  <Dropdown.Toggle className={classes.clinicName}>
                    {localStorage.getItem("clinicName") == null
                      ? selectedClinicName
                      : localStorage.getItem("clinicName")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {" "}
                    <Dropdown.Header>Select Clinic</Dropdown.Header>
                    {clinicsDropdown}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className={classes.leftHeaderSubHeading}>
              {localStorage.getItem("roleId") != "31"
                ? localStorage.getItem("userName")
                : null}
              {/* {localStorage.getItem("roleId") != "31" ? (
                localStorage.getItem("userName")
              ) : (
                <Dropdown>
                  <Dropdown.Toggle className={classes.docName}>
                    {localStorage.getItem("doctorName") == null
                      ? selectedDoctorName
                      : localStorage.getItem("doctorName")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {" "}
                    <Dropdown.Header>Select Doctor</Dropdown.Header>
                    {doctorsDropdown}
                  </Dropdown.Menu>
                </Dropdown>
              )} */}
            </div>
          </div>
          <HamburgerDropdown></HamburgerDropdown>
        </div>
        <div className={classes.leftPaneSearch}>
          <div className={classes.searchDiv}>
            <Form>
              <Form.Control
                className={classes.searchbar}
                placeholder="Search"
                onChange={(e) => {
                  handleSearch(e);
                }}
                onKeyPress={(e) => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                  }
                }}
              />
            </Form>
          </div>
          {/* <div className={classes.dateDiv}>
            <DatePicker
              className={classes.datepicker}
              selected={startDate}
              onChange={(date) => {
                console.log("date", date);
                setStartDate(date);
                localStorage.setItem("startDate", date);
              }}
            />
          </div> */}
          {/* <div>
            <img src="sign"/>
          </div> */}
        </div>
        <div className={classes.leftPaneContent}>
          {patients.length < 1 ? (
            <AddNewPatientModal addPatient={addPatient} />
          ) : (
            <div className={classes.patientDetails}>{patientDetails}</div>
          )}
        </div>
      </div>
      <div className={classes.rightPane}>
        {patientDischargeDetails}
        {/* <div>
     
    <button  onClick={MyForm }>Click Me</button>
     </div> */}
      </div>
    </div>
  );
};

export default DischargeSummary;
