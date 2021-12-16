export function getAppointmentsForDay(state, day) {
  let keys = []
  
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      keys = dayObj.appointments
    }
  }

  return keys.map(id => state.appointments[id])
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(dayObj => dayObj.name === day)

  if (!foundDay) return []

  return foundDay.interviewers.map(id => state.interviewers[id])
}
