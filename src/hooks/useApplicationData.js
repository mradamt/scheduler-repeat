import React, { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = 'SET_DAY'
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
const SET_INTERVIEW = 'SET_INTERVIEW'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value}

    case SET_APPLICATION_DATA:
      return {...state, ...action.value}

    case SET_INTERVIEW:
      return {}

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [])
  
  const setDay = day => dispatch({type: SET_DAY, day})
    
  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: {...interview}}
    const appointments = {...state.appointments, [id]: appointment}
    const days = updateSpotsRemaining(appointments, id)
    // const newState = {appointments: appointments, days: newDays}
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({
        type: SET_INTERVIEW, 
        value: {appointments, days}
      }))
  };
  
  const deleteInterview = (id) => {
    const newAppointment = {...state.appointments[id], interview: null}
    const newAppointments = {...state.appointments, [id]: newAppointment}
    const newState = {...state, appointments: newAppointments}
    updateSpotsRemaining(newState, id)
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({type: SET_INTERVIEW, interview: null}))
  }
  
  const updateSpotsRemaining = (appointments, id) => {
    return state.days.map(day => {
      if (day.appointments.includes(id)) {
        day.spots = day.appointments.filter(aptId => !appointments[aptId].interview).length
      }
      return day
    })
  }
  
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
