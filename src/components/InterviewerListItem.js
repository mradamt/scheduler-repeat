import React, { useState } from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  // const {interviewer, setInterviewer} = useState("Betsy")

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sally Nomates"
      />
      Sally Nomates
    </li>
  )
}