import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = numSpots => {
  let text = `${numSpots} spots`
  if (numSpots === 0) text="no spots"
  if (numSpots === 1) text="1 spot"

  return `${text} remaining`
}

export default function DayListItem(props) {
  let dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": props.selected},
    {"day-list__item--full": !props.spots}
  )

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
};
