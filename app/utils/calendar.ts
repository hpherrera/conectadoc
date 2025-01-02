interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  details: string;
}

export function addToCalendar({ title, date, time, details }: CalendarEvent) {
  // Format date and time for Google Calendar
  const formattedDate = date.replace(/-/g, '');
  const formattedTime = time.replace(':', '');
  const startDateTime = `${formattedDate}T${formattedTime}00`;
  
  // Add one hour for end time
  const [hours, minutes] = time.split(':');
  const endTime = `${String(Number(hours) + 1).padStart(2, '0')}${minutes}00`;
  const endDateTime = `${formattedDate}T${endTime}`;

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(details)}`;
  
  window.open(calendarUrl, '_blank');
}