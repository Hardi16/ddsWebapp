import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import classes from "./App.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.page}>
        <Dashboard />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
