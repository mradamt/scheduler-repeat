import React from "react";

import "components/Application.scss";

import Appointment from "./Appointment";
import DayList from "./DayList";
import useApplicationData from 'hooks/useApplicationData'
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData()
  
  const interviewersForDay = getInterviewersForDay(state, state.day)

  const appointmentsForDay = getAppointmentsForDay(state, state.day)
    .map(appointment => (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interviewersForDay={interviewersForDay}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    ))

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
          {appointmentsForDay}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
