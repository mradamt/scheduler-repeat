import React, {Fragment} from "react";

import "components/Appointment/styles.scss"

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Show from "./Show";
import Status from "./Status";

export default function Appointment(props) {
  const confirm = "confirm";
  const empty = "empty";
  const error = "error";
  const form = "form";
  const show = "show";
  const status = "status";

  const { mode, transition, back } = useVisualMode(props.interview ? show : empty)
  
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === confirm && <Confirm
        message="hardcoded Confirm message"
        onConfirm={() => console.log("onConfirm func")}
        onCancel={() => console.log("onCancel func")}
      />}
      
      {mode === empty && <Empty 
        onAdd={() => transition(form)}
      />}
      
      {mode === error && <Error 
        message="hardcoded Error message"
        onClose={() => console.log("onClose func")}      />}
      
      {mode === form && <Form 
        student="hardcoded Form student name"
        interviewer={3}
        interviewers={props.interviewers}
        onSave={() => console.log("onSave func")}
        onCancel={() => console.log("onCancel func")}
      />}
      
      {mode === show && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => console.log("onEdit func")}
        onDelete={() => console.log("onDelete func")}
      />}
    
      {mode === status && <Status
        message="hardcoded Status message"
      />}
      
    </article>
  )
}
