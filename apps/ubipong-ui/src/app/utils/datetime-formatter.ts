export function formatTime(dateTime: string) {
  const timeWithDayPeriod = new Date(dateTime).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  } as Intl.DateTimeFormatOptions)
  const spaceIndex = timeWithDayPeriod.search(' ')
  return timeWithDayPeriod.substring(0, spaceIndex)
}
