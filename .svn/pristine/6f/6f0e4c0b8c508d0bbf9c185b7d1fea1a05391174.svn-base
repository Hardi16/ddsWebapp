import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Badge, Spinner } from "react-bootstrap";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import styles from "./Styles.module.css";
import classes from "../pages/DischargeSummary/DischargeSummary.module.css";
import CreatableSelect from "react-select/creatable";
import MedicineDetailsModal from "./MedicineDetailsModal";
import FrequencyQuantityModal from "./FrequencyQuantityModal";
import EditDraggableSectionModal from "./EditDraggableSectionModal";
import ReadMoreTextArea from "./ReadMoreTextArea";
import DraggableSectionHeading from "./DraggableSectionHeading";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";

const MedicineBar = (props) => {
  const [mediBtnGrp, setMediBtnGrp] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [mediObj, setMediObj] = useState({});
  const [mediBarBool, setMediBarBool] = useState(false);
  const [modalPrompt, setModalPrompt] = useState();
  const [isRouteCollapseOpen, setIsRouteCollapseOpen] = useState({});
  const [isDurCollapseOpen, setIsDurCollapseOpen] = useState({});
  const [isRemarksCollapseOpen, setIsRemarksCollapseOpen] = useState({});
  const [isBrandCollapseOpen, setIsBrandCollapseOpen] = useState({});

  let mediToAddArr = [],
    mediToAddWithBrackArr = [],
    routeOptions,
    durationOptions,
    remarksOptions,
    brandOptions,
    allMedicineDeets = {},
    brandDetails = {},
    brandValue = {},
    redirectVar = null;

  setPropsandConfigurations();
  function setPropsandConfigurations() {
    mediToAddArr =
      localStorage.getItem("mediToAddArr") == null
        ? []
        : localStorage.getItem("mediToAddArr").split(",");
    console.log("mediToAddArr1", mediToAddArr);
    mediToAddWithBrackArr =
      localStorage.getItem("mediToAddWithBrackArr") == null
        ? []
        : localStorage.getItem("mediToAddWithBrackArr").split(",");

    brandDetails =
      localStorage.getItem("brandDetails") == null
        ? {}
        : JSON.parse(localStorage.getItem("brandDetails"));

    allMedicineDeets = JSON.parse(localStorage.getItem("allMedicineDeets"));

    let arrForOptions = [];
    if (
      localStorage.getItem("routeOptions") == null ||
      localStorage.getItem("routeOptions") == []
    ) {
      routeOptions = [
        { value: "Orally", label: "Orally" },
        { value: "IV", label: "IV" },
        { value: "IM", label: "IM" },
        { value: "S/C", label: "S/C" },
        { value: "ID", label: "ID" },
        { value: "Inhaler", label: "Inhaler" },
        { value: "Sublingual", label: "Sublingual" },
        { value: "Apply Locally", label: "Apply Locally" },
        { value: "Suppository", label: "Suppository" },
      ];
      for (let i in routeOptions) {
        let objtemp = JSON.stringify(routeOptions[i]);
        arrForOptions.push(objtemp);
      }
      localStorage.setItem("routeOptions", JSON.stringify(arrForOptions));
    } else {
      let tempOptions = JSON.parse(localStorage.getItem("routeOptions"));
      routeOptions = tempOptions.map((item) => {
        return JSON.parse(item);
      });
      console.log("routeOptions", routeOptions);
    }
    arrForOptions = [];
    if (
      localStorage.getItem("durationOptions") == null ||
      localStorage.getItem("durationOptions") == []
    ) {
      durationOptions = [
        { value: "1 Day", label: "1 Day" },
        { value: "3 Days", label: "3 Days" },
        { value: "7 Days", label: "7 Days" },
        { value: "1 Month", label: "1 Month" },
        { value: "Lifetime", label: "Lifetime" },
      ];
      for (let i in durationOptions) {
        let objtemp = JSON.stringify(durationOptions[i]);
        arrForOptions.push(objtemp);
      }
      localStorage.setItem("durationOptions", JSON.stringify(arrForOptions));
    } else {
      let tempOptions = JSON.parse(localStorage.getItem("durationOptions"));
      durationOptions = tempOptions.map((item) => {
        return JSON.parse(item);
      });
      console.log("durationOptions", durationOptions);
    }
    arrForOptions = [];
    if (
      localStorage.getItem("remarksOptions") == null ||
      localStorage.getItem("remarksOptions") == []
    ) {
      remarksOptions = [
        { value: "Along with Food", label: "Along with Food" },
        { value: "After Food", label: "After Food" },
        { value: "Before Food", label: "Before Food" },
        { value: "With LID message", label: "With LID message" },
        { value: "After Breakfast", label: "After Breakfast" },
        { value: "After Lunch", label: "After Lunch" },
        { value: "After Dinner", label: "After Dinner" },
        { value: "Before Breakfast", label: "Before Breakfast" },
        { value: "Before Lunch", label: "Before Lunch" },
        { value: "Before Dinner", label: "Before Dinner" },
        { value: "At Bedtime", label: "At Bedtime" },
      ];
      for (let i in remarksOptions) {
        let objtemp = JSON.stringify(remarksOptions[i]);
        arrForOptions.push(objtemp);
      }
      localStorage.setItem("remarksOptions", JSON.stringify(arrForOptions));
    } else {
      let tempOptions = JSON.parse(localStorage.getItem("remarksOptions"));
      remarksOptions = tempOptions.map((item) => {
        return JSON.parse(item);
      });
      console.log("remarksOptions", remarksOptions);
    }

    if (
      localStorage.getItem("brandOptions") == null ||
      localStorage.getItem("brandOptions") == {}
    )
      brandOptions = {};
    else {
      brandOptions = JSON.parse(localStorage.getItem("brandOptions"));
      console.log("brandOptions", brandOptions);
    }

    if (
      localStorage.getItem("brandValue") == null ||
      localStorage.getItem("brandValue") == {}
    )
      brandValue = {};
    else {
      brandValue = JSON.parse(localStorage.getItem("brandValue"));
      console.log("brandValue", brandValue);
    }
  }
  const handleCreatableSelectChangeRoutes = (item, e) => {
    if (e != null) {
      console.log("e::", e);
      console.log("routeOptions::", routeOptions);
      if (!routeOptions.includes(e)) {
        let arrForOptions = [];
        routeOptions.push(e);
        for (let i in routeOptions) {
          let objtemp = JSON.stringify(routeOptions[i]);
          arrForOptions.push(objtemp);
        }
        localStorage.setItem("routeOptions", JSON.stringify(arrForOptions));
      }
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { routeVal: "Set Route" };
      console.log("allMedicineDeetsObj", allMedicineDeetsObj);
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["routeVal"] = e.value;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    } else {
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { routeVal: "Set Route" };
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["routeVal"] = null;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    }
    toggleRouteCollapse(item);
    setModalPrompt(Math.random());
  };
  const handleCreatableSelectChangeDuration = (item, e) => {
    if (e != null) {
      console.log("e::", e);
      console.log("durationOptions::", durationOptions);
      if (!durationOptions.includes(e)) {
        let arrForOptions = [];
        durationOptions.push(e);
        for (let i in durationOptions) {
          let objtemp = JSON.stringify(durationOptions[i]);
          arrForOptions.push(objtemp);
        }
        localStorage.setItem("durationOptions", JSON.stringify(arrForOptions));
      }
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { routeVal: "Set Duration" };
      console.log("123", allMedicineDeetsObj);
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["durVal"] = e.value;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    } else {
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { routeVal: "Set Duration" };
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["durVal"] = null;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    }
    toggleDurCollapse(item);
    setModalPrompt(Math.random());
  };
  const handleCreatableSelectChangeRemarks = (item, e) => {
    if (e != null) {
      console.log("e::", e);
      console.log("remarksOptions::", remarksOptions);
      if (!remarksOptions.includes(e)) {
        let arrForOptions = [];
        remarksOptions.push(e);
        for (let i in remarksOptions) {
          let objtemp = JSON.stringify(remarksOptions[i]);
          arrForOptions.push(objtemp);
        }
        localStorage.setItem("remarksOptions", JSON.stringify(arrForOptions));
      }
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { remarksVal: "Set Remarks" };
      console.log("123", allMedicineDeetsObj);
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["remarksVal"] = e.value;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    } else {
      let allMedicineDeetsObj = {};
      allMedicineDeetsObj[item] = { routeVal: "Set Remarks" };
      allMedicineDeetsObj = { ...allMedicineDeetsObj, ...allMedicineDeets };
      allMedicineDeetsObj[item]["remarksVal"] = null;
      localStorage.setItem(
        "allMedicineDeets",
        JSON.stringify(allMedicineDeetsObj)
      );
    }
    toggleRemarksCollapse(item);
    setModalPrompt(Math.random());
  };
  const handleCreatableSelectChangeBrand = (item, e) => {
    if (e != null) {
      console.log("item:", item, "e:", e);
      if (brandValue == null) brandValue = {};
      brandValue[item] = e.value;
      localStorage.setItem("brandValue", JSON.stringify(brandValue));
    } else {
      brandValue = {};
      brandValue[item] = null;
      localStorage.setItem("brandValue", JSON.stringify(brandValue));
    }
    toggleBrandCollapse(item);
    setModalPrompt(Math.random());
  };
  const toggleRouteCollapse = (item) => {
    let obj = isRouteCollapseOpen;
    obj[item] = obj[item] == null ? true : !obj[item];

    console.log("isRouteCollapseOpen", obj);
    setIsRouteCollapseOpen(obj);
    setPrompt(Math.random());
  };
  const toggleDurCollapse = (item) => {
    let obj = isDurCollapseOpen;
    obj[item] = obj[item] == null ? true : !obj[item];

    console.log("isDurCollapseOpen", obj);
    setIsDurCollapseOpen(obj);
    setPrompt(Math.random());
  };
  const toggleRemarksCollapse = (item) => {
    let obj = isRemarksCollapseOpen;
    obj[item] = obj[item] == null ? true : !obj[item];

    console.log("isRemarksCollapseOpen", obj);
    setIsRemarksCollapseOpen(obj);
    setPrompt(Math.random());
  };
  const toggleBrandCollapse = (item) => {
    let obj = isBrandCollapseOpen;
    obj[item] = obj[item] == null ? true : !obj[item];
    console.log("isBrandCollapseOpen", obj);
    setIsBrandCollapseOpen(obj);
    setPrompt(Math.random());
  };
  const setBrandOptions = (brandDetails, item) => {
    let index = mediToAddArr.indexOf(item);
    let mediNamewithBrack = mediToAddWithBrackArr[index];
    let brandDetailsOfOne = brandDetails[mediNamewithBrack];
    if (!(item in brandOptions)) brandOptions[item] = [];
    for (let i in brandDetailsOfOne) {
      let brandName = brandDetailsOfOne[i][0];
      let pharmaName = brandDetailsOfOne[i][1];
      let price =
        brandDetailsOfOne[i][2] == null
          ? "__ Rs."
          : brandDetailsOfOne[i][2] + " Rs.";
      let val = brandName + ", " + pharmaName + ", " + price;
      // "Brand: " + brandName + " Pharma: " + pharmaName + " Price: " + price;
      let obj = { value: val, label: val };
      brandOptions[item].push(obj);
    }
    localStorage.setItem("brandOptions", JSON.stringify(brandOptions));
    setPrompt(Math.random());
  };
  const handleBrand = (item) => {
    toggleBrandCollapse(item);
    if (isBrandCollapseOpen) {
      let index = mediToAddArr.indexOf(item);
      let mediNamewithBrack = mediToAddWithBrackArr[index];
      console.log("index", index, "mediNamewithBrack", mediNamewithBrack);
      if (mediNamewithBrack in brandDetails && !(item in brandOptions))
        setBrandOptions(brandDetails, item);
      else {
        let data = {
          searchText: mediNamewithBrack,
          pkgCode: "",
        };
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios
          .put(
            hostAddress +
              currentServer +
              "/RestEasy/elasticSearchWebService/searchMedicineBrandfromES",
            data
          )
          .then((response) => {
            console.log("searchMedicineBrandfromES resp", response.data);
            let hitsArr = response.data["hits"]["hits"];
            let brandArr = [];
            for (let i in hitsArr) {
              let item = hitsArr[i];
              console.log("--", item);
              let tempArr = [
                item["_source"]["dr_brand_drug_name"],
                item["_source"]["pharma_name"],
                item["_source"]["unit_price"],
              ];
              brandArr.push(tempArr);
            }
            brandDetails[mediNamewithBrack] = brandArr;
            localStorage.setItem("brandDetails", JSON.stringify(brandDetails));
            if (!(item in brandOptions)) setBrandOptions(brandDetails, item);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  };
  console.log("props mediarr", props.mediToAddArr);
  console.log("props medicineArr", props.medicineArr);
  let changeArrStr = "",
    changeArr = [];
  if (mediToAddArr != null && changeArrStr != mediToAddArr.toString()) {
    changeArrStr = mediToAddArr.toString();
    changeArr = mediToAddArr;
  }
  console.log("ls", mediToAddArr);
  console.log("changeArr", changeArr);
  useEffect(() => {
    console.log("in ue props mediarr", props.mediToAddArr);
    let mediBtnGrpObj =
      mediToAddArr == null
        ? null
        : mediToAddArr.map((item) => {
            let hasDeets =
              allMedicineDeets != null && allMedicineDeets[item] != null
                ? true
                : false;
            if (item != "")
              return (
                <>
                  <div className={styles.creatableSelectDiv}>
                    <div className={styles.creatableSelect}>
                      <Button
                        className={styles.creatableSelectLabel}
                        color="primary"
                        onClick={() => toggleRouteCollapse(item)}
                      >
                        {hasDeets && allMedicineDeets[item]["routeVal"] != null
                          ? allMedicineDeets[item]["routeVal"]
                          : "Set Route"}
                      </Button>
                      <Collapse
                        isOpen={isRouteCollapseOpen[item]}
                        className={styles.creatableSelectSelf}
                      >
                        <CreatableSelect
                          isClearable
                          onChange={(e) =>
                            handleCreatableSelectChangeRoutes(item, e)
                          }
                          onInputChange={(e) =>
                            console.log("CSelect input change", e)
                          }
                          options={routeOptions}
                          placeholder={"Select or Type Route"}
                        />
                      </Collapse>
                      <Button
                        className={[
                          styles.creatableSelectLabel,
                          brandValue == null || brandValue[item] == null
                            ? null
                            : styles.brandText,
                        ].join(" ")}
                        color="primary"
                        onClick={() => {
                          handleBrand(item);
                        }}
                      >
                        {brandValue == null || brandValue[item] == null
                          ? "Set Brand"
                          : brandValue[item].toString().split(",")[0] +
                            ", " +
                            brandValue[item].toString().split(",")[1]}
                      </Button>
                      <Collapse
                        isOpen={isBrandCollapseOpen[item]}
                        className={styles.creatableSelectSelf}
                      >
                        <CreatableSelect
                          isClearable
                          onChange={(e) =>
                            handleCreatableSelectChangeBrand(item, e)
                          }
                          onInputChange={(e) =>
                            console.log("CSelect input change", e)
                          }
                          options={brandOptions[item]}
                          placeholder={
                            brandOptions[item] == null ? (
                              <Spinner
                                animation="grow"
                                variant="success"
                                size="sm"
                              />
                            ) : (
                              "Select Brand"
                            )
                          }
                        />
                      </Collapse>
                      <FrequencyQuantityModal
                        medicine={item}
                      ></FrequencyQuantityModal>
                      <Button
                        className={styles.creatableSelectLabel}
                        color="primary"
                        onClick={() => toggleDurCollapse(item)}
                      >
                        {hasDeets &&
                        allMedicineDeets[item]["durVal"] != null &&
                        allMedicineDeets[item]["durVal"] != ""
                          ? allMedicineDeets[item]["durVal"]
                          : "Set Duration"}
                      </Button>
                      <Collapse
                        isOpen={isDurCollapseOpen[item]}
                        className={styles.creatableSelectSelf}
                      >
                        <CreatableSelect
                          isClearable
                          onChange={(e) =>
                            handleCreatableSelectChangeDuration(item, e)
                          }
                          onInputChange={(e) =>
                            console.log("CSelect input change", e)
                          }
                          options={durationOptions}
                          placeholder={"Select or Type Duration"}
                        />
                      </Collapse>
                      <Button
                        className={styles.creatableSelectLabel}
                        color="primary"
                        onClick={() => toggleRemarksCollapse(item)}
                      >
                        {hasDeets &&
                        allMedicineDeets[item]["remarksVal"] != null &&
                        allMedicineDeets[item]["remarksVal"] != ""
                          ? allMedicineDeets[item]["remarksVal"]
                          : "Set Remarks"}
                      </Button>
                      <Collapse
                        isOpen={isRemarksCollapseOpen[item]}
                        className={styles.creatableSelectSelf}
                      >
                        <CreatableSelect
                          isClearable
                          onChange={(e) =>
                            handleCreatableSelectChangeRemarks(item, e)
                          }
                          onInputChange={(e) =>
                            console.log("CSelect input change", e)
                          }
                          options={remarksOptions}
                          placeholder={"Select or Type Remarks"}
                        />
                      </Collapse>
                    </div>
                  </div>
                  <Button color="warning" className={classes.mediTabBarBtn}>
                    {item}
                  </Button>

                  <MedicineDetailsModal
                    medicineName={item}
                    setDeetsOfModal={setDeetsOfModal}
                    modalPrompt={modalPrompt}
                  ></MedicineDetailsModal>
                  <i
                    className={[styles.crossBtn, "fa fa-close"].join(" ")}
                    onClick={() => {
                      handleRemoveMedicine(item);
                    }}
                  ></i>
                  <br />
                  <br />
                </>
              );
          });
    setMediBtnGrp(mediBtnGrpObj);
  }, [
    prompt,
    props.mediToAddArr,
    modalPrompt,
    isRouteCollapseOpen,
    isDurCollapseOpen,
    isRemarksCollapseOpen,
    changeArrStr,
  ]); //renders the actual medicine bar

  const setDeetsOfModal = (mediName, deetsObj) => {
    console.log("deets mediName", mediName);
    console.log("deets deetsObj", deetsObj);
    let obj =
      JSON.parse(localStorage.getItem("allMedicineDeets")) == null
        ? {}
        : JSON.parse(localStorage.getItem("allMedicineDeets"));
    obj[mediName] = deetsObj;
    localStorage.setItem("allMedicineDeets", JSON.stringify(obj));
    setPrompt(Math.random());
  };

  const handleRemoveMedicine = (medi) => {
    let index = mediToAddArr.indexOf(medi);
    let mediNamewithBrack = mediToAddWithBrackArr[index];
    let mediWithBracSet = new Set();
    for (let item in mediToAddWithBrackArr)
      if (mediToAddWithBrackArr[item] !== mediNamewithBrack)
        mediWithBracSet.add(mediToAddWithBrackArr[item]);
    mediToAddWithBrackArr = Array.from(mediWithBracSet);
    localStorage.setItem("mediToAddWithBrackArr", mediToAddWithBrackArr);
    let tempObjBr = props.mediObjWithBrack;
    console.log(tempObjBr);
    tempObjBr[mediNamewithBrack] = false;
    props.setMediObjWithBrack(tempObjBr);
    localStorage.setItem("mediObjWithBrack", JSON.stringify(tempObjBr));

    let mediToAddSet = new Set();
    for (let item in mediToAddArr)
      if (mediToAddArr[item] != medi) mediToAddSet.add(mediToAddArr[item]);
    mediToAddArr = Array.from(mediToAddSet);
    localStorage.setItem("mediToAddArr", mediToAddArr);
    let tempObj = mediObj;
    console.log(mediObj);
    tempObj[medi] = false;
    setMediObj(tempObj);
    let tempMediObj = props.mediObj;
    tempMediObj[medi] = false;
    props.setMediObj(tempMediObj);
    localStorage.setItem("mediObj", JSON.stringify(tempMediObj));
    console.log("-medibar remove tempObjBr", tempObjBr);
    console.log("-medibar remove tempObj", tempObj);
    let allMedicineDeetsObj = JSON.parse(
      localStorage.getItem("allMedicineDeets")
    );
    if (allMedicineDeetsObj != null) delete allMedicineDeetsObj[medi];
    localStorage.setItem(
      "allMedicineDeets",
      JSON.stringify(allMedicineDeetsObj)
    );
    props.setMediToAddArr(mediToAddWithBrackArr);
    setPrompt(Math.random());
    props.setPrompt(Math.random());
    redirectVar = <Redirect to="/dischargeSummaryCreate" />;
  };
  const handleClear = () => {
    localStorage.removeItem("mediToAddArr");
    localStorage.removeItem("allMedicineDeets");
    localStorage.removeItem("brandDetails");
    localStorage.removeItem("brandValue");
    localStorage.removeItem("mediToAddWithBrackArr");
    localStorage.removeItem("mediObjWithBrack");
    localStorage.removeItem("mediObj");
    let grpSel = JSON.parse(localStorage.getItem("grpSel"));
    for (let gr in grpSel) grpSel[gr] = false;
    localStorage.setItem("grpSel", JSON.stringify(grpSel));
    props.setMediArr([]);
    props.setMediToAddArr([]);
    props.setMediObj({});
    props.setMediObjWithBrack({});
    setMediObj({});
    setPrompt(Math.random());
    redirectVar = <Redirect to="/dischargeSummaryCreate" />;
  };
  return (
    <div
      className={
        props.cardStyler["Medications at Discharge"]
          ? styles.createPageBarActive
          : styles.createPageBarActivePatient
      }
      onClick={() => {
        props.handleCardStyling("Medications at Discharge");
        props.setLeftPaneLabel("Medicines");
        setMediBarBool(!mediBarBool);
      }}
    >
      {redirectVar}
      <div className={classes.barDiv}>
        <div className={classes.barName}>
          <div className={styles.sectionHeader}>
            <DraggableSectionHeading label="Medications at Discharge" />

            <EditDraggableSectionModal
              secName="Medications at Discharge"
              secHeadings={props.secHeadings}
              setSecHeadings={props.setSecHeadings}
              setCardsString={props.setCardsString}
            ></EditDraggableSectionModal>
          </div>
        </div>
        <i
          className={[styles.crossBtn, "fa fa-close"].join(" ")}
          onClick={() => {
            props.handleRemoveSection("Medications at Discharge");
          }}
        ></i>
        {/* <Button
          color="danger"
          className={classes.clearBtn}
          onClick={() => handleClear()}
        >
          Clear
        </Button> */}
      </div>
      <br />
      {mediBtnGrp}
      <hr />
      <ReadMoreTextArea
        localStorageId="medicationsAtDischargeNotes"
        style={
          !props.cardStyler["Medications at Discharge Notes"]
            ? "greyBackground"
            : ""
        }
      ></ReadMoreTextArea>
    </div>
  );
};

export default MedicineBar;
