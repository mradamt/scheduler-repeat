import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

import Appointment from "components/Appointment";

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

const setDay = day => setState({...state, day: day})

const dailyAppointments = getAppointmentsForDay(state, state.day)
  .map(appointment => (
    <Appointment 
      key={appointment.id} 
      {...appointment} 
      dailyInterviewersList={dailyInterviewersList}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
    />
  ))

const dailyInterviewersList = getInterviewersForDay(state, state.day)

const bookInterview = (id, interview) => {
  const newAppointment = {...state.appointments[id], interview: {...interview}}
  const newAppointments = {...state.appointments, [id]: newAppointment}
  const newState = {...state, appointments: newAppointments}
  return axios.put(`/api/appointments/${id}`, newAppointment).then(() => {setState(newState)})
};

const deleteInterview = (id) => {
  const newAppointment = {...state.appointments[id], interview: null}
  const newAppointments = {...state.appointments, [id]: newAppointment}
  const newState = {...state, appointments: newAppointments}
  return axios.delete(`/api/appointments/${id}`).then(() => {setState(newState)})
}

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers'),
  ]).then((all) => {
    setState(prev => ({
      ...prev, 
      days: all[0].data, 
      appointments: all[1].data,
      interviewers: all[2].data
    }))
  })
}, [])

export {
  state,
  setDay,
  dailyAppointments
}
