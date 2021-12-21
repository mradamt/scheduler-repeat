import React, { useState, useEffect } from "react";
// import axios from "axios";

import "components/Application.scss";

import Appointment from "./Appointment";
import DayList from "./DayList";
import {
  state,
  setDay,
  dailyAppointments
} from '/hooks/useApplicationData'
// import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })

  // const dailyAppointments = getAppointmentsForDay(state, state.day)
  //   .map(appointment => (
  //     <Appointment 
  //       key={appointment.id} 
  //       {...appointment} 
  //       dailyInterviewersList={dailyInterviewersList}
  //       bookInterview={bookInterview}
  //       deleteInterview={deleteInterview}
  //     />
  //   ))
  // const dailyInterviewersList = getInterviewersForDay(state, state.day)

  // const bookInterview = (id, interview) => {
  //   const newAppointment = {...state.appointments[id], interview: {...interview}}
  //   const newAppointments = {...state.appointments, [id]: newAppointment}
  //   const newState = {...state, appointments: newAppointments}
  //   return axios.put(`/api/appointments/${id}`, newAppointment).then(() => {setState(newState)})
  // };

  // const deleteInterview = (id) => {
  //   const newAppointment = {...state.appointments[id], interview: null}
  //   const newAppointments = {...state.appointments, [id]: newAppointment}
  //   const newState = {...state, appointments: newAppointments}
  //   return axios.delete(`/api/appointments/${id}`).then(() => {setState(newState)})
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers'),
  //   ]).then((all) => {
  //     setState(prev => ({
  //       ...prev, 
  //       days: all[0].data, 
  //       appointments: all[1].data,
  //       interviewers: all[2].data
  //     }))
  //   })
  // }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {dailyAppointments}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
