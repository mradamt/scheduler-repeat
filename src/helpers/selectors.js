export function getAppointmentsForDay(state, day) {
  let keys = []
  
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      keys = dayObj.appointments
    }
  }

  return keys.map(id => state.appointments[id])
}
