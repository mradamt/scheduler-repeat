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
    // get dayId for day that includes id
    const day = state.days.filter(dayObj => dayObj.appointments.includes(id))[0]
    // console.log('day', day);
    // get list of appointmentIds for that day
    const apppointmentsList = day.appointments
    // console.log('list', apppointmentsList);
    // sum 'null' for that list of appointmentIds
    const spots = apppointmentsList.reduce((prev, cur) => {
      // const res = state.appointments[cur].interview ? 0 : 1
      // console.log('index:', cur, 'interview?', state.appointments[cur].interview, 'res:', res);
      return prev + (state.appointments[cur].interview ? 0 : 1)
    }, 0)
    // update state.days[dayId].spots
    // console.log('oldspots:', day.spots);
    // console.log('newspots:', spots);
    
  }
  
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
