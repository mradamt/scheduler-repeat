import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // const setDay = day => setState({...state, day})
  // const setDays = days => setState(prev => ({...prev, days}))

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewersList = getInterviewersForDay(state, state.day)
  const bookInterview = (id, interview) => console.log(id, interview);

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
            days={state.days}
            day={state.day}
            setDay={day => setState({...state, day: day})}
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
          {dailyAppointments.map(appt => (
              <Appointment 
                key={appt.id} 
                {...appt} 
                dailyInterviewersList={dailyInterviewersList}
                bookInterview={bookInterview}
              />
          ))}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
