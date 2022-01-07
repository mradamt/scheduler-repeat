import React, { useState, useEffect } from "react";
import axios from "axios";


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
    
  const bookInterview = (id, interview) => {
    const newAppointment = {...state.appointments[id], interview: {...interview}}
    const newAppointments = {...state.appointments, [id]: newAppointment}
    const newState = {...state, appointments: newAppointments}
    updateSpotsRemaining(newState, id)
    return axios.put(`/api/appointments/${id}`, newAppointment).then(() => {setState(newState)})
  };
  
  const deleteInterview = (id) => {
    const newAppointment = {...state.appointments[id], interview: null}
    const newAppointments = {...state.appointments, [id]: newAppointment}
    const newState = {...state, appointments: newAppointments}
    updateSpotsRemaining(newState, id)
    return axios.delete(`/api/appointments/${id}`).then(() => {setState(newState)})
  }
  
  const updateSpotsRemaining = (state, id) => {
    const newDays = state.days.map(day => {
      if (day.appointments.includes(id)) {
        day.spots = day.appointments.filter(aptId => !state.appointments[aptId].interview).length
      }
      return day
    })
    setState({...state, days: newDays})
  }
  
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
