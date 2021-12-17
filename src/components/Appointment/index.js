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
  const create = "create";
  const edit = "edit";
  const empty = "empty";
  const error = "error";
  const show = "show";
  const saving = "saving";

  const { mode, transition, back } = useVisualMode(props.interview ? show : empty)
  
  const findInterviewer = id => {
    return props.dailyInterviewersList.find(interviewerObj => id === interviewerObj.id)
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(saving)
    props.bookInterview(props.id, interview)
      .then((res, rej) => transition(show))
      .catch(err => console.log(err))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === confirm && <Confirm
        message="hardcoded Confirm message"
        onConfirm={() => console.log("onConfirm func")}
        onCancel={() => console.log("onCancel func")}
      />}
      {mode === create && <Form 
        interviewers={props.dailyInterviewersList}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === edit && <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.dailyInterviewersList}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === empty && <Empty 
        onAdd={() => transition(create)}
      />}
      {mode === error && <Error 
        message="hardcoded Error message"
        onClose={() => console.log("onClose func")}      
      />}
      {mode === show && <Show
        student={props.interview.student}
        interviewer={findInterviewer(props.interview.interviewer)}
        onEdit={() => transition(edit)}
        onDelete={() => console.log("onDelete func")}
      />}
      {mode === saving && <Status
        message="... saving"
      />}
      
    </article>
  )
}
