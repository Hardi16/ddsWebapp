import React, { useState, useEffect } from "react";
import styles from "./Styles.module.css";
const QuantityComponent = (props) => {
  let freq = props.freq;
  let medicine = props.medicine;
  let firstWord = props.firstWord;
  const [prompt, setPrompt] = useState();
  const [quantityReturn, setQuantityReturn] = useState(null);
  const [val, setVal] = useState("Morning");
  const [quantValObj, setQuantValObj] = useState(
    localStorage.getItem("quantValObj") == null
      ? {}
      : JSON.parse(localStorage.getItem("quantValObj"))
  );

  useEffect(() => {
    if (freq == "OID") setQtOID();
    else if (freq == "BID") setQtBID();
    else if (freq == "TID") setQtTID();
    else if (freq == "QID") setQtQID();
    else if (freq == "6 Times") setQt6ID();
    else if (freq == "8 Times") setQt8ID();
    else if (freq == "SoS") setQuantityReturn(null);
    else if (freq == "Stat") setQuantityReturn(null);
    else if (freq == "Once") setQuantityReturn(null);
  }, [freq]);

  const setQuantForTimeOfDay = (e, index) => {
    if (!(medicine in quantValObj)) quantValObj[medicine] = [];
    quantValObj[medicine][index] = e.target.value;
    setQuantValObj(quantValObj);
    localStorage.setItem("quantValObj", JSON.stringify(quantValObj));
  };

  const setQtOID = () => {
    setQuantityReturn(
      <div className={styles.QtDiv}>
        <div className={styles.mediDeetsModalTextboxBtnQt}>
          <input
            type="number"
            placeholder={
              quantValObj[medicine] == null ||
              quantValObj[medicine][0] == "" ||
              quantValObj[medicine][0] == null
                ? "Type Here"
                : quantValObj[medicine][0]
            }
            onChange={(e) => setQuantForTimeOfDay(e, 0)}
            className={styles.mediDeetsModalTextboxQt}
          ></input>
        </div>
        <div>{firstWord}(s)</div>
      </div>
    );
  };

  const setQtBID = () => {
    setQuantityReturn(
      <div className={styles.QtDivParent}>
        <div className={styles.QtDiv}>
          <div>Morning</div>
          <div className={styles.mediDeetsModalTextboxBtnQt}>
            <input
              type="number"
              placeholder={
                quantValObj[medicine] == null ||
                quantValObj[medicine][0] == "" ||
                quantValObj[medicine][0] == null
                  ? "Type Here"
                  : quantValObj[medicine][0]
              }
              onChange={(e) => setQuantForTimeOfDay(e, 0)}
              className={styles.mediDeetsModalTextboxQt}
            ></input>
          </div>
          <div>{firstWord}(s)</div>
        </div>
        <div className={styles.QtDiv}>
          <div>Evening</div>
          <div className={styles.mediDeetsModalTextboxBtnQt}>
            <input
              type="number"
              placeholder={
                quantValObj[medicine] == null ||
                quantValObj[medicine][1] == "" ||
                quantValObj[medicine][1] == null
                  ? "Type Here"
                  : quantValObj[medicine][1]
              }
              onChange={(e) => setQuantForTimeOfDay(e, 1)}
              className={styles.mediDeetsModalTextboxQt}
            ></input>
          </div>
          <div>{firstWord}(s)</div>
        </div>
      </div>
    );
  };
  const setQtTID = () => {
    setQuantityReturn(
      <div className={styles.QtDivParent}>
        <div className={styles.QtDiv}>
          <div>Morning</div>
          <div className={styles.mediDeetsModalTextboxBtnQt}>
            <input
              type="number"
              className={styles.mediDeetsModalTextboxQt}
              placeholder={
                quantValObj[medicine] == null ||
                quantValObj[medicine][0] == "" ||
                quantValObj[medicine][0] == null
                  ? "Type Here"
                  : quantValObj[medicine][0]
              }
              onChange={(e) => setQuantForTimeOfDay(e, 0)}
            ></input>
          </div>
          <div>{firstWord}(s)</div>
        </div>
        <div className={styles.QtDiv}>
          <div>Noon</div>
          <div className={styles.mediDeetsModalTextboxBtnQt}>
            <input
              type="number"
              placeholder={
                quantValObj[medicine] == null ||
                quantValObj[medicine][1] == "" ||
                quantValObj[medicine][1] == null
                  ? "Type Here"
                  : quantValObj[medicine][1]
              }
              onChange={(e) => setQuantForTimeOfDay(e, 1)}
              className={styles.mediDeetsModalTextboxQt}
            ></input>
          </div>
          <div>{firstWord}(s)</div>
        </div>
        <div className={styles.QtDiv}>
          <div>Evening</div>
          <div className={styles.mediDeetsModalTextboxBtnQt}>
            <input
              type="number"
              placeholder={
                quantValObj[medicine] == null ||
                quantValObj[medicine][2] == "" ||
                quantValObj[medicine][2] == null
                  ? "Type Here"
                  : quantValObj[medicine][2]
              }
              onChange={(e) => setQuantForTimeOfDay(e, 2)}
              className={styles.mediDeetsModalTextboxQt}
            ></input>
          </div>
          <div>{firstWord}(s)</div>
        </div>
      </div>
    );
  };
  const setQtQID = () => {
    setQuantityReturn(
      <>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>Morning</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][0] == "" ||
                  quantValObj[medicine][0] == null
                    ? "Type Here"
                    : quantValObj[medicine][0]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 0)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>Noon</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][1] == "" ||
                  quantValObj[medicine][1] == null
                    ? "Type Here"
                    : quantValObj[medicine][1]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 1)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>Evening</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][2] == "" ||
                  quantValObj[medicine][2] == null
                    ? "Type Here"
                    : quantValObj[medicine][2]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 2)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>Night</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][3] == "" ||
                  quantValObj[medicine][3] == null
                    ? "Type Here"
                    : quantValObj[medicine][3]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 3)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
      </>
    );
  };
  const setQt6ID = () => {
    setQuantityReturn(
      <>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>6 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][0] == "" ||
                  quantValObj[medicine][0] == null
                    ? "Type Here"
                    : quantValObj[medicine][0]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 0)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>10 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][1] == "" ||
                  quantValObj[medicine][1] == null
                    ? "Type Here"
                    : quantValObj[medicine][1]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 1)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>2 pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][2] == "" ||
                  quantValObj[medicine][2] == null
                    ? "Type Here"
                    : quantValObj[medicine][2]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 2)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>6pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][3] == "" ||
                  quantValObj[medicine][3] == null
                    ? "Type Here"
                    : quantValObj[medicine][3]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 3)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>10pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][4] == "" ||
                  quantValObj[medicine][4] == null
                    ? "Type Here"
                    : quantValObj[medicine][4]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 4)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>2am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][5] == "" ||
                  quantValObj[medicine][5] == null
                    ? "Type Here"
                    : quantValObj[medicine][5]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 5)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
      </>
    );
  };
  const setQt8ID = () => {
    setQuantityReturn(
      <>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>6 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][0] == "" ||
                  quantValObj[medicine][0] == null
                    ? "Type Here"
                    : quantValObj[medicine][0]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 0)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>9 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][1] == "" ||
                  quantValObj[medicine][1] == null
                    ? "Type Here"
                    : quantValObj[medicine][1]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 1)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>12 pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][2] == "" ||
                  quantValObj[medicine][2] == null
                    ? "Type Here"
                    : quantValObj[medicine][2]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 2)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>3 pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][3] == "" ||
                  quantValObj[medicine][3] == null
                    ? "Type Here"
                    : quantValObj[medicine][3]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 3)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>6 pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][4] == "" ||
                  quantValObj[medicine][4] == null
                    ? "Type Here"
                    : quantValObj[medicine][4]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 4)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>9 pm</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][5] == "" ||
                  quantValObj[medicine][5] == null
                    ? "Type Here"
                    : quantValObj[medicine][5]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 5)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
        <div className={styles.QtDivParent}>
          <div className={styles.QtDiv}>
            <div>12 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][6] == "" ||
                  quantValObj[medicine][6] == null
                    ? "Type Here"
                    : quantValObj[medicine][6]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 6)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
          <div className={styles.QtDiv}>
            <div>3 am</div>
            <div className={styles.mediDeetsModalTextboxBtnQt}>
              <input
                type="number"
                placeholder={
                  quantValObj[medicine] == null ||
                  quantValObj[medicine][7] == "" ||
                  quantValObj[medicine][7] == null
                    ? "Type Here"
                    : quantValObj[medicine][7]
                }
                onChange={(e) => setQuantForTimeOfDay(e, 7)}
                className={styles.mediDeetsModalTextboxQt}
              ></input>
            </div>
            <div>{firstWord}(s)</div>
          </div>
        </div>
      </>
    );
  };
  return <div>{quantityReturn}</div>;
};
export default QuantityComponent;
