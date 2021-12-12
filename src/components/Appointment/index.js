import React from "react";

import "./styles.scss"

export default function Appointment(props) {
  return <article className="appointment">Appointment{props.time && ` @ ${props.time}`}</article>
}
