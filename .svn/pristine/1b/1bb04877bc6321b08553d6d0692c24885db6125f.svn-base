import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../App.module.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import OrgDetailsTable from "../../components/OrgDetailsTable";

const OrgInfo = props => {
  return (
    <div className={classes.main}>
      {/* <Navbar2/> */}
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.page}>
        <OrgDetailsTable
          orgId={localStorage.getItem("orgId")}
          orgName={localStorage.getItem("orgName")}
        />
      </div>
      {/* <div className={classes.footer}><Footer /></div> */}
    </div>
  );
};

export default OrgInfo;
