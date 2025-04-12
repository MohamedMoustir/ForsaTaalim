import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 

function MyFullCalendar() {
  const [events, setEvents] = useState([]);

  // const handleDateClick = (info) => {
  //   alert('Date clicked: ' + info.dateStr);
  // };

  const handleEventClick = (info) => {
    alert('Event clicked: ' + info.event.title);
  };
  const handleDateClick = (arg) => {
    const eventTitle = prompt("");
    if (eventTitle) {
      setEvents([
        ...events,
        { title: eventTitle, date: arg.dateStr },
      ]);
    }
  };
  
  return (
    <div>
      <h2>Full Calendar Example</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default MyFullCalendar;
