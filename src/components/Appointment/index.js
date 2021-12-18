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
  const deleting = "deleting";
  const deletionError = "deletionError";
  const edit = "edit";
  const empty = "empty";
  const show = "show";
  const saving = "saving";
  const savingError = "savingError"

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
      .catch(err => {
        console.log(err)
        transition(savingError)
      })
  }

  const delAppointment = () => {
    transition(deleting)
    props.deleteInterview(props.id)
      .then((res, rej) => transition(empty))
      .catch((err) => {
        console.log(err)
        transition(deletionError)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === confirm && <Confirm
        message="Confirm delete?"
        onConfirm={delAppointment}
        onCancel={() => back()}
      />}
      {mode === create && <Form 
        interviewers={props.dailyInterviewersList}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === deleting && <Status
        message="...deleting"
      />}
      {mode === deletionError && <Error 
        message="Deletion failed"
        onClose={() => transition(show, true)}
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
      {mode === show && <Show
        student={props.interview.student}
        interviewer={findInterviewer(props.interview.interviewer)}
        onEdit={() => transition(edit)}
        onDelete={() => transition(confirm)}
      />}
      {mode === saving && <Status
        message="... saving"
        />}
      {mode === savingError && <Error 
        message="Save failed"
        onClose={() => transition(empty, true)}
      />}
      
    </article>
  )
}
