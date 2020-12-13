import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./Styles.module.css";
import axios from "axios";
import { hostAddress } from "../assets/config";
import { currentServer } from "../assets/config";

const SearchDiagnosis = (props) => {
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState(null);

  useEffect(() => {
    console.log("query changed", query);
    let data = {
      searchText: query,
      doctorID: "118",
    };
    if (query == null || query == "") {
      setSearchList(null);
      props.setdiagnosisOnAdmission(null);
    }
    if (query != null && query != "" && query.length >= 3) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      axios
        .put(
          hostAddress +
            currentServer +
            "/RestEasy/elasticSearchWebService/searchDiagnosisfromES",
          data
        )
        .then((response) => {
          console.log("searchDiagnosisfromES response", response.data);
          let diagArr =
            response.data["hits"] == null ? [] : response.data["hits"]["hits"];
          setSearchList(
            diagArr.map((hit) => {
              return (
                <div className={classes.searchItem}>
                  <button
                    className={classes.searchItemBtn}
                    onClick={() => {
                      props.showSelectedDiagnosis(
                        hit["_source"]["diagnosis_name"]
                      );
                      setSearchList(null);
                    }}
                  >
                    {hit["_source"]["diagnosis_name"]}
                  </button>
                </div>
              );
            })
          );
        })
        .catch((err) => {
          console.log("searchInitialMedicine err", err);
        });
    }
  }, [query]);
  return (
    <>
      <Form className={classes.searchForm}>
        <Form.Control
          className={classes.searchbar}
          placeholder="Search Diagnosis"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </Form>
      <div className={classes.searchList}>
        {query != "" ? searchList : null}
      </div>
    </>
  );
};

export default SearchDiagnosis;
