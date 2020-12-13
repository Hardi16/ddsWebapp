import React from "react";
const DraggableSectionHeading = (props) => {
  return (
    <>
      {localStorage.getItem("secHeadings") != null
        ? JSON.parse(localStorage.getItem("secHeadings"))[props.label]
        : props.label}
    </>
  );
};
export default DraggableSectionHeading;
