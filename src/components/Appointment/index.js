import React, {Fragment, useEffect} from "react";

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
  const interview = props.interview

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const STATUS_SAVING = "STATUS_SAVING";
  const STATUS_DELETING = "STATUS_DELETING";
  const ERROR_SAVING = "ERROR_SAVING"
  const ERROR_DELETING = "ERROR_DELETING";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)
  
  useEffect(() => {
    mode === SHOW && !interview && transition(EMPTY)
    mode === EMPTY && interview && transition(SHOW)
  }, [interview, mode, transition])

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(STATUS_SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        console.log(err)
        transition(ERROR_SAVING, true)
      })
  }

  const delAppointment = () => {
    transition(STATUS_DELETING, true)
    props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        console.log(err)
        transition(ERROR_DELETING, true)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && interview && <Show
        student={interview.student}
        interviewerName={interview.interviewer.name}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE && <Form 
        interviewers={props.interviewersForDay}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === EDIT && <Form 
        student={interview.student}
        interviewerId={interview.interviewer.id}
        interviewers={props.interviewersForDay}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === CONFIRM && <Confirm
        message="Confirm delete?"
        onConfirm={delAppointment}
        onCancel={() => back()}
      />}
      {mode === STATUS_SAVING && <Status
        message="... saving"
      />}
      {mode === STATUS_DELETING && <Status
        message="...deleting"
      />}
      {mode === ERROR_SAVING && <Error 
        message="Save failed"
        onClose={() => back()}
      />}
      {mode === ERROR_DELETING && <Error 
        message="Deletion failed"
        onClose={() => back()}
      />}
    </article>
  )
}
