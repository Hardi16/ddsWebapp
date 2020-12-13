import React,{useState} from 'react';
import {Modal, Button, Form, Col} from 'react-bootstrap';
import classes from './Styles.module.css';
import AddModal from './AddModalPatientDS';


  const AddNewPatientModalSmall=(props)=> {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
      <div className={classes.addNewBtnSmallDiv}>
        <Button className={classes.addNewBtnSmall} onClick={() => setModalShow(true)}>
         +
        </Button>
        </div>
        <AddModal
            addPatient={props.addPatient}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  export default AddNewPatientModalSmall;