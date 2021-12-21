import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

// import Appointment from "components/Appointment";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
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
  
  const setDay = day => setState({...state, day: day})
  
  const dailyInterviewersList = getInterviewersForDay(state, state.day)
  
  const dailyAppointmentList = getAppointmentsForDay(state, state.day)
  
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
  
  
  return {
    state,
    setDay,
    dailyAppointmentList,
    dailyInterviewersList,
    bookInterview,
    deleteInterview
  }
}
