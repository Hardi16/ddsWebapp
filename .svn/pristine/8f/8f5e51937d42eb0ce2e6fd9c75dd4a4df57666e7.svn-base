import React, { useState } from "react";
import { render } from "react-dom";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import styles from "./Styles.module.css";

const SortableItem = sortableElement(({ value }) => {
  return (
    <li id="draggable" draggable="true" className={styles.dragListItem}>
      {value}
    </li>
  );
});

const SortableList = sortableContainer(({ cards }) => {
  console.log("cards", cards);
  return (
    <ul>
      {cards.map((value, index) => (
        <SortableItem key={`cards-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const DraggableCardsDS = (props) => {
  console.log("in dr", props.mediToAddArr);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex != 0 && newIndex != 0) {
      console.log("old cardsLabel", props.cardsLabel);
      let newArrLabel = arrayMove(props.cardsLabel, oldIndex, newIndex);
      console.log("new cardsLabel", newArrLabel);
      props.setCardsLabel(newArrLabel);
    }
  };
  return (
    <SortableList
      distance={1}
      cards={props.cards}
      onSortEnd={onSortEnd}
      draggable="true"
    />
  );
};

export default DraggableCardsDS;
