const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const multer = require("multer");
const upload = multer();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: false,
  })
);

// Mongo stuff
const connectDb = require("./models/connection");
const mongoose = require("mongoose");
const Patients = require("./models/Patients.js");

app.get("/https://dev2.evolko.com/ping", function (req, res) {
  console.log("DBStatusInPing", mongoose.connection.readyState);
  res.end(mongoose.connection.readyState.toString());
});
app.post(
  "/https://dev2.evolko.com/registerPatientOnMongo",
  function (req, res) {
    console.log("in post request of registering patient", req);
    let ptObj = req.body.ptObj;
    var newPt = new Patients(ptObj);
    newPt.save(function (err, patient) {
      if (err) res.json(err);
      console.log("saved to Patients collection.", patient);
      res.json(patient);
    });
  }
);
app.post("/https://dev2.evolko.com/updatePatient", function (req, res) {
  console.log("in post request of updating patient", req);
  let ptObj = req.body.ptObj;
  // let allDoctors = req.body.allDoctors;
  // Patients.find({ doctorId: { $in: allDoctors } })
  //   .then((ele) => {
  //     console.log("findanswer", ele);
  //   })
  //   .catch((err) => {
  //     console.log("findanswererr", err);
  //   });

  ptObj.forEach((ele) => {
    Patients.update(
      { id: ele["id"] },
      // { $set: { name: "bobby" } },
      ele,
      { multi: true }
    ).then((ele) => {
      console.log("findanswerupdate", ele);
    });
  });

  res.end();
});
app.post(
  "/https://dev2.evolko.com/updateAllClinicPatients",
  function (req, res) {
    console.log("in post request of updateAllClinicPatients", req);
    let ptObj = req.body.ptObj;
    ptObj.forEach((ele) => {
      var newPt = new Patients(ele);
      newPt.save(function (err, patient) {
        // if (err) res.json(err);
        // console.log("saved to Patients collection.", patient);
      });
    });
    res.end();
  }
);
app.get("/https://dev2.evolko.com/getAllPatients", function (req, res) {
  Patients.find({})
    .then((patients) => {
      res.json(patients);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post("/https://dev2.evolko.com/getClinicPatients", function (req, res) {
  console.log("getClinicPatientsReq", req.body);
  let allDoctors = req.body.allDoctors;
  Patients.find({ doctorId: { $in: allDoctors } })
    .then((patients) => {
      res.json(patients);
    })
    .catch((err) => {
      res.json(err);
    });
});

// The non-mongo endpoints
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientDischargeSummary",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientDischargeSummary",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/updatedDischargeSummaryApprovedStatus",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/updatedDischargeSummaryApprovedStatus",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getSpecialityForDoctor",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getSpecialityForDoctor",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/fetchDsCardsSequence",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/fetchDsCardsSequence",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/saveDsCardsSequence",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/saveDsCardsSequence",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/downloadOriginalPrescription",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/downloadOriginalPrescription",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

/*
app.post('/fileUpload' , multer.single('fileFieldName'), (req , res) => {
    const fileRecievedFromClient = req.file; //File Object sent in 'fileFieldName' field in multipart/form-data
    console.log(req.file)

    let form = new FormData();
    form.append('fileFieldName', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);

    axios.post('http://server2url/fileUploadToServer2', form, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
        }).then((responseFromServer2) => {
            res.send("SUCCESS")
        }).catch((err) => {
            res.send("ERROR")
        })
})
*/

app.post(
  "/https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImage",
  upload.any(),
  (req, res) => {
    const formData = req.body;
    console.log("formdata", formData);
    let temp = {};
    formdata.forEach((value, key) => {
      temp[key] = value;
    });
    console.log("uploadOriginalImageReq formdata obj", temp);
    const headers = {
      // "Content-Type": "multipart/form-data",
      "Accept-Encoding": "multipart/form-data",
    };
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .post(
        "https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImage",
        formData
      )
      .then((response) => {
        console.log("uploadOriginalImageRes", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("uploadOriginalImageERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

// app.post(
//   "/https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImageold",
//   upload.array(),
//   function (req, res, next) {
//     console.log("reqfils", req.files);
//     console.log("reqbody", req.body);
//     let obj = req.body;
//     const headers = {
//       "Content-Type": "multipart/form-data",
//       "Accept-Encoding": "multipart/form-data",
//     };
//     const formdata = new FormData();
//     formdata.append("uploaded", JSON.stringify(obj["uploaded"]));
//     formdata.append("ptInvestigationID", obj["ptInvestigationID"]);
//     formdata.append("imageFileName", obj["imageFileName"]);
//     formdata.append("todayDate", obj["todayDate"]);
//     formdata.append("imageTag", obj["imageTag"]);
//     formdata.append("sqlLiteID", obj["sqlLiteID"]);
//     let temp = {};
//     // formdata.forEach((value, key) => {
//     //   temp[key] = value;
//     // });
//     // for (var pair of formdata.entries()) {
//     //   console.log("dekho", pair[0] + ", " + pair[1]);
//     // }
//     axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
//     axios
//       .post(
//         "https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImage",
//         formdata,
//         { headers }
//       )
//       .then((response) => {
//         console.log("uploadOriginalImageRes", response.data);
//         res.json(response.data);
//       })
//       .catch((err) => {
//         console.log("ERR", err);
//         return res.status(500).json({ type: "error", message: err });
//       });
//   }
// );

/*
app.post(
  "/https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImage",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .post(
        "https://dev2.evolko.com/RestEasy/multimediaServices/uploadOriginalImage", 
        req.body, 
        
         headers = {
            //"Content-Type": "multipart/form-data",
            //"content-type": "multipart/form-data", // boundary=--------------------------966991448654339731356450",
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "form-data",
             Accept: "application/json;charset=UTF-8",
             //"Accept-Encoding": "multipart/form-data",
          },  
        
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
*/

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientSearchList",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientSearchList",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/login",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/login",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findClinicByUser",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findClinicByUser",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getCountOfPatientAppDownloadsByDoctorAndCity",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getCountOfPatientAppDownloadsByDoctorAndCity",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/multimediaServices/saveMultiMediathroughSynFramework",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/multimediaServices/saveMultiMediathroughSynFramework",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchMedicineBrandfromES",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchMedicineBrandfromES",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getPatientOrgDeptAppointmentList",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getPatientOrgDeptAppointmentList",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findPatientVisits",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findPatientVisits",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchDiagnosisfromES",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchDiagnosisfromES",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchLabInvestigationfromES",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchLabInvestigationfromES",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchInitialMedicine",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchInitialMedicine",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getPatientAppointmentCountList",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getPatientAppointmentCountList",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getDoctorsAndCityListWhoHaveDrApp",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getDoctorsAndCityListWhoHaveDrApp",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getCountAppointmentPerWeek",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getCountAppointmentPerWeek",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getNewDoctorDetails",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getNewDoctorDetails",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getNewTmoDetails",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getNewTmoDetails",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getTmoRefferalDetail",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getTmoRefferalDetail",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/getTmoRefferalPatientsTotalCount",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/getTmoRefferalPatientsTotalCount",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/registerPatient",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/registerPatient",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/pullDischargeData",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/pullDischargeData",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientProfile",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientProfile",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findDoctorByClinic",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/findDoctorByClinic",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientSearchList",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getPatientSearchList",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/fetchPatientAtDoctorLogin",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/fetchPatientAtDoctorLogin",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/savePatientVisitOnServer",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/savePatientVisitOnServer",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchMedicinefromES",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/elasticSearchWebService/searchMedicinefromES",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DashboardWebService/pullDischargeData",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DashboardWebService/pullDischargeData",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/sendDischargeSummaryAlert",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/sendDischargeSummaryAlert",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/generateDischargeData",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/multimediaServices/saveMultiMediathroughSynFramework",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/multimediaServices/saveMultiMediathroughSynFramework",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.post(
  "/ht1.evolko.com:8080/helloworld/jsp/fileuploaddemo.jsp",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .post("ht1.evolko.com:8080/helloworld/jsp/fileuploaddemo.jsp", req.body, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/getComplaintForDoctorTriaging",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/getComplaintForDoctorTriaging",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/fetchComplaintQuestionnaire",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/fetchComplaintQuestionnaire",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/fetchProtocol",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/fetchProtocol",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/fetchProtocolDetail",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/fetchProtocolDetail",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
app.put(
  "/https://dev2.evolko.com/RestEasy/PatientWebService/saveEMRVisitAsProtocol",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/PatientWebService/saveEMRVisitAsProtocol",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);

app.put(
  "/https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getAllPatientsForClinic",
  (req, res) => {
    console.log(req.body);
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios
      .put(
        "https://dev2.evolko.com/RestEasy/DischargeSummaryWebService/getAllPatientsForClinic",
        req.body
      )
      .then((response) => {
        console.log("res", response.data);
        res.json(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        return res.status(500).json({ type: "error", message: err });
      });
  }
);
// Here's the template, just replace 'X' with the api.
// app.put(
//   "/X",
//   (req, res) => {
//     console.log(req.body);
//     axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
//     axios
//       .put(
//         "X",
//         req.body
//       )
//       .then((response) => {
//         console.log("res", response.data);
//         res.json(response.data);
//       })
//       .catch((err) => {
//         console.log("ERR", err);
//         return res.status(500).json({ type: "error", message: err });
//       });
//   }
// );

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log(
      "MongoDb connected with status code:",
      mongoose.connection.readyState
    );
  });
});
