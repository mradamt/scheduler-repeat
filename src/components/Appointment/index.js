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
  const empty = "empty";
  const show = "show";
  const create = "create";
  const edit = "edit";
  const confirm = "confirm";
  const status_saving = "status_saving";
  const status_deleting = "status_deleting";
  const error_onSave = "error_onSave"
  const error_onDelete = "error_onDelete";

  const { mode, transition, back } = useVisualMode(props.interview ? show : empty)
  
  const findInterviewer = id => {
    return props.interviewersForDay.find(interviewerObj => id === interviewerObj.id)
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(status_saving)
    props.bookInterview(props.id, interview)
      .then(() => transition(show))
      .catch(err => {
        console.log(err)
        transition(error_onSave, true)
      })
  }

  const delAppointment = () => {
    transition(status_deleting, true)
    props.deleteInterview(props.id)
      .then(() => transition(empty))
      .catch((err) => {
        console.log(err)
        transition(error_onDelete, true)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === empty && <Empty 
        onAdd={() => transition(create)}
      />}
      {mode === show && <Show
        student={props.interview.student}
        interviewer={findInterviewer(props.interview.interviewer)}
        onEdit={() => transition(edit)}
        onDelete={() => transition(confirm)}
      />}
      {mode === create && <Form 
        interviewers={props.interviewersForDay}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === edit && <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewersForDay}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === confirm && <Confirm
        message="Confirm delete?"
        onConfirm={delAppointment}
        onCancel={() => back()}
      />}
      {mode === status_saving && <Status
        message="... saving"
      />}
      {mode === status_deleting && <Status
        message="...deleting"
      />}
      {mode === error_onSave && <Error 
        message="Save failed"
        onClose={() => back()}
      />}
      {mode === error_onDelete && <Error 
        message="Deletion failed"
        onClose={() => back()}
      />}
    </article>
  )
}
