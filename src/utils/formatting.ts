export const playtime = (seconds: number, timeView: string): string => {
  let timeStr = ''
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  minutes %= 60

  if (timeView === 'days') {
    hours %= 24
    if (days) timeStr += days + 'd '
  }

  if (hours) timeStr += hours + 'h '
  if (minutes) timeStr += minutes + 'm'

  return timeStr.length > 0 ? timeStr : 'N/A'
}
