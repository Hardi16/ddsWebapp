import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../App.module.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import DoctorDetailsTable from "../../components/DoctorDetailsTable";

const DoctorInfo = props => {
  return (
    <div className={classes.main}>
      {/* <Navbar2/> */}
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.page}>
        <DoctorDetailsTable
          doctorId={localStorage.getItem("userId")}
          doctorName={localStorage.getItem("doctorName")}
        />
      </div>
      {/* <div className={classes.footer}><Footer /></div> */}
    </div>
  );
};

export default DoctorInfo;
