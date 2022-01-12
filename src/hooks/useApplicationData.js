import React, { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = 'SET_DAY'
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
const SET_INTERVIEW = 'SET_INTERVIEW'

const updateSpotsRemaining = (days, appointments, id) => {
  return days.map(day => {
    if (day.appointments.includes(id)) {
      day.spots = day.appointments.filter(aptId => !appointments[aptId].interview).length
    }
    return day
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day}

    case SET_APPLICATION_DATA:
      return {
        ...state, 
        days: [...action.days], 
        appointments: {...action.appointments}, 
        interviewers: {...action.interviewers}
      }

    case SET_INTERVIEW:
      const appointment = {...state.appointments[action.id], interview: action.interview}
      const appointments = {...state.appointments, [action.id]: appointment}
      const days = updateSpotsRemaining(state.days, appointments, action.id)
      return {...state, days, appointments}
      
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

  let connection = null;

  useEffect(() => {
    connection = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
    connection.onopen = event => {
      connection.send("ping")
    }
    connection.onmessage = event => {
      const dataObj = JSON.parse(event.data)
      console.log(dataObj);
      dataObj.type === SET_INTERVIEW && dispatch(JSON.parse(event.data))
    }

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

  // connection.onmessage = event => {
  //   dispatch(JSON.parse(event.data))
  // }
  
  const setDay = day => dispatch({type: SET_DAY, day})
    
  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, {...state.appointments[id], interview: {...interview}})
      .then(() => dispatch({type: SET_INTERVIEW, id, interview}))
  };
  
  const deleteInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({type: SET_INTERVIEW, id, interview: null}))
  }
  
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
