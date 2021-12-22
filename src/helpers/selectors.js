export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day)
  if (!dayObj) return []
  return dayObj.appointments.map(id => state.appointments[id])
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day)
  if (!dayObj) return []
  return dayObj.interviewers.map(id => state.interviewers[id])
}

export function getInterview(state, interview) {
  if (!interview) return null
  const foundInterviewer = state.interviewers[interview.interviewer]
  if (!foundInterviewer) return []
  return {...interview, interviewer: foundInterviewer}
}
